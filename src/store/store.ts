import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import rootReducers from './root-reducers';

const middlewares = [];

middlewares.push(createLogger());

const enhancer = compose(applyMiddleware(...middlewares));

export const store = createStore(rootReducers, enhancer);
