import { combineReducers, legacy_createStore as createStore } from 'redux';
import { filterReducer, infoReducer, idxReducer } from './reducer';

const reducers = combineReducers({
    filterReducer: filterReducer,
    infoReducer: infoReducer,
    idxReducer: idxReducer
})

export const store = createStore(reducers);