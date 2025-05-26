import React from 'react';
import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { slugify } from '../../../../core/common/helpers';
import { setBreadcrumbs } from '../../../../core/actions/actions';

function Breadcrumbs({ breadcrumbs, setBreadcrumbs }) {
  const location = useLocation();

  React.useEffect(() => {
    let newTrail = [];
    if (location.pathname !== '/') {
      newTrail = location.pathname.substring(1).split('/');
      for (let i = 0; i < newTrail.length; i += 1) {
        newTrail[i] = newTrail[i].charAt(0).toUpperCase() + newTrail[i].slice(1);
        newTrail[i] = newTrail[i].replace(/-/g, ' ');
      }
    }
    newTrail.reverse();
    setBreadcrumbs(newTrail);
  }, [location]);

  let links = null;

  if (breadcrumbs) {
    links = breadcrumbs.map((item, i) => {
      let url = '';
      for (let j = 0; j < i + 1; j += 1) {
        url += `/${slugify(breadcrumbs[j])}`;
      }
      return (
        <li className="item" key={item}>
          <Link to={url}>{item}</Link>
        </li>
      );
    });
  }

  return (
    <div className="breadcrumbs">
      <ul className="breadcrumbs-items">
        <li className="item">
          <Link to="/">Home</Link>
        </li>
        {links}
      </ul>
    </div>
  );
}

const mapDispatchToProps = {
  setBreadcrumbs
};

const mapStateToProps = ({
  mainReducer: {
    breadcrumbs
  }
}) => ({ breadcrumbs });

export default connect(mapStateToProps, mapDispatchToProps)(Breadcrumbs);
