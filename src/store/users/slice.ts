import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// A slice is a section to manage a state for a specific use case, in this case
// this slice will manage all states for users.

// Creating interface to validate types.
export interface User {
	name: string;
	email: string;
	github: string;
}

// We have two types of user, the user as person, and the the user that we use for data storage
export type UserId = string;
export interface UserWithId extends User {
	id: UserId;
}

const DEFAULT_STATE: UserWithId[] = [
	{
		id: "1",
		name: "John Doe",
		email: "doe.jhon@gmail.com",
		github: "DoeJohn",
	},
	{
		id: "2",
		name: "Jane Smith",
		email: "jane.smith@hotmail.com",
		github: "JaneSmith",
	},
	{
		id: "3",
		name: "Alice Johnson",
		email: "alice.johnson@gmal.com",
		github: "AliceJohnson",
	},
];

// To set the initial state im using an IIFE (Immediately Invoked Function Expression), is a function
// that runs the moment it is invoked or called in the event loop.
const initialState: UserWithId[] = (() => {
	const persistedState = localStorage.getItem("__redux_state__");

	return persistedState ? JSON.parse(persistedState).users : DEFAULT_STATE;
})();

// All Slices needs three things, a name to be called, its initial state, and the reducers.
export const usersSlice = createSlice({
	name: "users",
	initialState: initialState,
	reducers: {
		deleteUserById: (state, action: PayloadAction<UserId>) => {
			const idToRemove = action.payload;
			return state.filter((user) => user.id !== idToRemove);
		},
	},
});

// Here im exporting as default only the reducer, because it is the main item i need form a slice.
// By using default export im making the import statement concise and clear.
export default usersSlice.reducer;

// The best thing to do when you have a reducer is to export the action, Redux Toolkit allows this in an
// easy way.
export const { deleteUserById } = usersSlice.actions;
