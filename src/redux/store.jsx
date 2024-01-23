import { combineReducers, legacy_createStore as createStore } from 'redux';
import { filterReducer, infoReducer } from './reducer';

const reducers = combineReducers({
    filterReducer: filterReducer,
    infoReducer: infoReducer
})

export const store = createStore(reducers);