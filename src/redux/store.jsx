import { combineReducers, legacy_createStore as createStore } from 'redux';
import { filterReducer, infoReducer, idxReducer, figureReducer, addressReducer } from './reducer';
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
    figureReducer: figureReducer,
    addressReducer:addressReducer
})
const persistedReducer = persistReducer(persistConfig, reducers);
export const store = createStore(persistedReducer);
export const persistor = persistStore(store); 