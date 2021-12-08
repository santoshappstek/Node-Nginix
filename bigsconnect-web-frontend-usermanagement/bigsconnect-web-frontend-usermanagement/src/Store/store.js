import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import combineReducers from './index';

// export function dispatchAndLog(store, action) {
//     // if(environment==="Dev") {
//        //console.log('Prev State', store.getState())
//     // }
//      store.dispatch(action)
//     //  if(environment==="Dev") {
//       //console.log('next state', store.getState())
//     // }
//   }
export const store = createStore(combineReducers, applyMiddleware(thunk));

export default store;