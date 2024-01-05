import { combineReducers, configureStore } from '@reduxjs/toolkit';
import nodesSlice from './nodesSlice';
import edgesSlice from './edgesSlice';

import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';

import thunk from 'redux-thunk';

const persistConfigNodes = {
  //add
  key: 'nodes',
  storage,
};
const persistConfigEdges = {
  //add
  key: 'edges',
  storage,
};

const rootReducer = combineReducers({
  edges: persistReducer(persistConfigEdges, edgesSlice),
  nodes: persistReducer(persistConfigNodes, nodesSlice),
});

export const store = configureStore({
  reducer: rootReducer,

  middleware: [thunk],
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
