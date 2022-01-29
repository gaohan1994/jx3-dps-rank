import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import multi from 'redux-multi';
import thunk from 'redux-thunk';
import rootReducers from './root-reducers';

const middlewares = [createLogger(), multi, thunk];

const enhancer = compose(applyMiddleware(...middlewares));

export const store = createStore(rootReducers, enhancer);
