import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import './index.css';
import App from './App';
import { wholeReducer } from './Store';
import * as serviceWorker from './serviceWorker';

const persistConfig = {
  key:'root',
  storage:storage,
  blacklist: ['now', 'to'],     // 初期ユーザーとほめる相手は保存しない
  whitelist: ['data', 'item']   // 各ユーザーのポイントと投稿は保存する
};

const persistedReducer = persistReducer(persistConfig, wholeReducer);

let store = createStore(persistedReducer);
let pstore = persistStore(store);


ReactDOM.render(
  <Provider store = {store}>
    <PersistGate loading = {<p>loading...</p>} persistor={pstore}>
      <App/>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
