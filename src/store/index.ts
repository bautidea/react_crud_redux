import { configureStore, type Middleware } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { createUser, deleteUser, updateUser } from "../services/users";
import type { UserWithId } from "../types";
import usersReducer, {
	rollbackAddToState,
	rollbackDropFromState,
	rollbackRetrievePreviousEdit,
} from "./users/slice";
/* 
Im defining a 'middleware' to make data persist in time. 
* https://www.freecodecamp.org/news/what-is-redux-middleware-and-how-to-create-one-from-scratch/ 

Middleware allows to intercept every action tat is sent to the reducer, so we can make changes to
their actions or cancel the action.

To define a middleware we need to declare a three nested function, the below code is equivalent to:

  const loggerMiddleware = function (store) {
    return function (next) {
      return function (action) {
      };
    };
  };

The reason of the three functions is because the middleware executes in different points of reducer execution
each one returns and inject the needed information in a given instance.
In one side we want to read the 'store', but also we would like to call the reducer (to update the state), and we
want a function to go to the next step.

In this case the function would perform like this when deleting a user

  const persistanceLocalStorageMiddleware = (store) => (next) => (action) => {
    console.log(store.getState()); -> { users: [ {...}, {...}, {...} ] } (Array of users)
    console.log(action); -> {type: 'users/deleteUserById', payload: '2'}

    next(action);

    console.log(store.getState()); -> { users: [ {...}, {...} ] } (Array of users, without the deleted one)
  };
*/
const persistanceLocalStorageMiddleware: Middleware =
	(store) => (next) => async (action) => {
		// In this case after every action we would like to store the current state.
		next(action);

		if (action.type !== "users/obtainUsers/pending") {
			localStorage.setItem(
				"__redux_state__",
				JSON.stringify(store.getState().users),
			);
		}
	};

const syncWithData: Middleware = (store) => (next) => async (action) => {
	const { type, payload } = action;
	const previousState = store.getState();

	next(action);
	// Middleware to catch when a user gets added into DB.
	if (type === "users/addNewUser") {
		// After the UI gets updated im retrieving the generated user id.
		const id = store.getState().users.slice(-1)[0].id;
		// Using a try - catch block to perform a rollback.
		try {
			// Calling API call to create user in DB.
			const response = await createUser({ id, ...payload });

			if (response.ok) {
				toast.success("User created!");
			}
			// Id response is not ok then i throw an error to be catch.
			else {
				throw new Error("Connection with DB was not successful");
			}
		} catch (error) {
			// Catching error and deleting the created new user.
			toast.error("User couldn't be created");

			store.dispatch(rollbackDropFromState(id));
		}
	}

	// Middleware to catch when a user gets deleted.
	if (type === "users/deleteUserById") {
		const userToRemove = previousState.users.find(
			(user: UserWithId) => user.id === payload,
		);

		try {
			const response = await deleteUser(payload);

			if (response.ok) toast.success("User deleted!");
			else {
				throw new Error("Connection with DB was not successful");
			}
		} catch (error) {
			toast.error("User couldn't be deleted");

			// Doing rollback when user to be removed is found.
			if (userToRemove) store.dispatch(rollbackAddToState(userToRemove));
		}
	}

	// Middleware to catch when a user get updated.
	if (type === "users/userUpdate") {
		const userPreviousEdit = previousState.users.find((user: UserWithId) => {
			return user.id === payload.id;
		});

		try {
			const response = await updateUser(payload);

			if (response.ok) toast.success(`User ${payload.id} updated correctly!`);
			else {
				throw new Error("Connection with DB was not successful");
			}
		} catch (error) {
			toast.error(`User ${payload.id} couldn't be updated, server error.`);

			// If the update in DB is not successful then im retrieving state previous
			// information and pass it as update values.
			if (userPreviousEdit)
				store.dispatch(rollbackRetrievePreviousEdit(userPreviousEdit));
		}
	}
};

// Store (the name of the folder) is a place in which im going to save my states, and where
// states are going to be managed.
export const store = configureStore({
	reducer: {
		users: usersReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat([
			persistanceLocalStorageMiddleware,
			syncWithData,
		]),
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
