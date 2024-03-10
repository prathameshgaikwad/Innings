import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { matchManagementReducer } from "./state/match/matchManagement";
import { matchReducer } from "./state/match/matchSlice";
import storage from "redux-persist/lib/storage";
import { teamReducer } from "./state/team/teamSlice";
import { thunk } from "redux-thunk";
import { tournamentPageReducer } from "./state/tournament/tournamentPageSlice";
import { tournamentReducer } from "./state/tournament/tournamentSlice";
import { tournamentSetupReducer } from "./state/tournament/tournamentSetupSlice";
import { userReducer } from "./state/user/userSlice";

const rootReducer = combineReducers({
  user: userReducer,
  tournaments: tournamentReducer,
  tournamentSetup: tournamentSetupReducer,
  tournamentPage: tournamentPageReducer,
  team: teamReducer,
  match: matchReducer,
  matchManagement: matchManagementReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => [
    thunk,
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  ],
});

const persistor = persistStore(store);

export { store, persistor };
