import { combineReducers } from 'redux';
import { firebaseStateReducer } from 'redux-react-firebase';
import mainReducer from './mainReducer';

const rootReducer = combineReducers({
  mainReducer,
  firebase: firebaseStateReducer
});

export default rootReducer;
