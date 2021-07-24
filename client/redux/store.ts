import { configureStore } from "@reduxjs/toolkit"
import { contactsApi } from "./apiSlice"

export const store = configureStore({
  reducer: {
    [contactsApi.reducerPath]: contactsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(contactsApi.middleware),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// setUpListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
