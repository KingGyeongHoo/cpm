import { combineReducers, legacy_createStore as createStore, applyMiddleware } from 'redux';
import { filterReducer, infoReducer, idxReducer, figureReducer } from './reducer';
import { persistStore, persistReducer  } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: "root", // localStorage key 
    storage, // localStorage
    whitelist: ["figureReducer"], // target (reducer name)
  }

const reducers = combineReducers({
    filterReducer: filterReducer,
    infoReducer: infoReducer,
    idxReducer: idxReducer,
    figureReducer: figureReducer
})
const persistedReducer = persistReducer(persistConfig, reducers);
export const store = createStore(persistedReducer);
export const persistor = persistStore(store); 