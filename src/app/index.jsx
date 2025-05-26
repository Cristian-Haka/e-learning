import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import ReactGA from 'react-ga';
import firebase from 'firebase';
import { ADMIN_LEVEL } from './core/constants/constants';
import store from './store';
import './bundle.scss';
import App from './core/app';
import Home from './themes/nekomy/pages/home/home';
import Dashboard from './themes/nekomy/pages/dashboard/dashboard';
import AccountSettings from './themes/nekomy/pages/account/settings';
import AccountNotifications from './themes/nekomy/pages/account/notifications';
import Listing from './themes/nekomy/pages/listing/listing';
import Page from './themes/nekomy/pages/page/page';
import Post from './themes/nekomy/pages/post/post';
import Course from './themes/nekomy/pages/course/course';
import Subject from './themes/nekomy/pages/subject/subject';
import Module from './themes/nekomy/pages/module/module';
import Activity from './themes/nekomy/pages/activity/activity';
import NotFound from './themes/nekomy/pages/notFound/notFound';
import Admin from './core/admin/admin';
import AwarenessMain from './themes/nekomy/pages/awareness/mainMenu';
import TriviaMenu from './themes/nekomy/pages/awareness/triviaMenu';
import AprendeMenu from './themes/nekomy/pages/awareness/aprendeMenu';
import BuscaMenu from './themes/nekomy/pages/awareness/buscaMenu';
import ReportaUrl from './themes/nekomy/pages/awareness/reportaUrl';
import Configuracion from './themes/nekomy/pages/awareness/configuracion';

ReactGA.initialize('UA-00000000-1', {
  debug: false,
  titleCase: false,
  gaOptions: {}
});

function logPageView() {
  if (process.env.NODE_ENV === 'production') {
    ReactGA.set({ page: window.location.href });
    ReactGA.pageview(window.location.href);
  }
}

function RequireAuth({ children, level = 0 }) {
  const navigate = useNavigate();
  const [allowed, setAllowed] = React.useState(false);

  React.useEffect(() => {
    const unsub = firebase.auth().onAuthStateChanged((user) => {
      if (!user || !user.emailVerified) {
        navigate('/');
      } else if (level > 0) {
        firebase.database().ref(`/users/${user.uid}`).once('value').then((snapshot) => {
          if (!snapshot.val() || !snapshot.val().info.level || (snapshot.val().info.level < level)) {
            navigate('/');
          } else {
            setAllowed(true);
          }
        });
      } else {
        setAllowed(true);
      }
    });
    return () => unsub();
  }, [level, navigate]);

  return allowed ? children : null;
}

const root = createRoot(document.getElementById('react-root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}> 
          <Route index element={<Home />} />
          <Route path="dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
          <Route path="account" element={<RequireAuth><AccountSettings /></RequireAuth>} />
          <Route path="account/notifications" element={<RequireAuth><AccountNotifications /></RequireAuth>} />
          <Route path="courses" element={<Listing />} />
          <Route path="courses/:slug" element={<Course />} />
          <Route path="courses/:slug/register" element={<Course />} />
          <Route path="courses/:slug/subjects" element={<Course />} />
          <Route path="courses/:slug/fees" element={<Course />} />
          <Route path="courses/:slug/requirements" element={<Course />} />
          <Route path="subjects" element={<Listing />} />
          <Route path="subjects/:slug" element={<Subject />} />
          <Route path="subjects/:slug/modules" element={<Subject />} />
          <Route path="subjects/:slug/activities" element={<Subject />} />
          <Route path="modules" element={<Listing />} />
          <Route path="modules/:slug" element={<Module />} />
          <Route path="activities" element={<Listing />} />
          <Route path="activities/:slug" element={<Activity />} />
          <Route path="blog" element={<Listing />} />
          <Route path="blog/:slug" element={<Post />} />
          <Route path="awareness" element={<AwarenessMain />} />
          <Route path="awareness/trivia" element={<TriviaMenu />} />
          <Route path="awareness/aprende" element={<AprendeMenu />} />
          <Route path="awareness/busca" element={<BuscaMenu />} />
          <Route path="awareness/reporta" element={<ReportaUrl />} />
          <Route path="awareness/config" element={<Configuracion />} />
          <Route path="about" element={<Page />} />
          <Route path="about/jobs" element={<Page />} />
          <Route path="about/contact" element={<Page />} />
          <Route path="admin" element={<RequireAuth level={ADMIN_LEVEL}><Admin /></RequireAuth>} />
          <Route path="admin/:type/:action" element={<RequireAuth level={ADMIN_LEVEL}><Admin /></RequireAuth>} />
          <Route path="admin/:type/:action/:slug" element={<RequireAuth level={ADMIN_LEVEL}><Admin /></RequireAuth>} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
