import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./users/slice";

// Store (the name of the folder) is a place in which im going to save my states, and where
// states are going to be managed.
export const store = configureStore({
	reducer: {
		users: usersReducer,
	},
});

// Since im using TS i have to specify the type of the store.
// In Redux documentation they recommend to export the types from store, by inferring
// types from the store itself, because the states correctly updates as we add more
// state slices.
//* Redux doc = https://redux.js.org/usage/usage-with-typescript

// Get the type of the store variable
export type AppStore = typeof store;
// Infer the 'RootState' from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Infer the 'AppDispatch' from the store also.
export type AppDispatch = AppStore["dispatch"];
