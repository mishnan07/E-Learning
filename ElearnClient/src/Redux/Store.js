import { configureStore } from "@reduxjs/toolkit";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import ClientAuth from "./ClientAuth";
import AdminAuth from "./AdminAuth";

const userPersistConfig = { key: 'Client', storage };
const userPersistReducer = persistReducer(userPersistConfig, ClientAuth);

const adminPersistConfig = { key: 'admin', storage };
const adminPersistReducer = persistReducer(adminPersistConfig, AdminAuth);

const store = configureStore({
  reducer: {
    ClientAuth: userPersistReducer,
    AdminAuth: adminPersistReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };
