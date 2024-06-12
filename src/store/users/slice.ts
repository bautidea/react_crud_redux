import { createSlice } from "@reduxjs/toolkit";

// A slice is a section to manage a state for a specific use case, in this case
// this slice will manage all states for users.

// Creating interface to validate types.
export interface User {
	name: string;
	email: string;
	github: string;
}

// We have two types of user, the user as person, and the the user that we use for data storage
export interface UserWithId extends User {
	id: string;
}

const initialState: UserWithId[] = [
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

// All Slices needs three things, a name to be called, its initial state, and the reducers.
export const usersSlice = createSlice({
	name: "users",
	initialState: initialState,
	reducers: {},
});

// Here im exporting as default only the reducer, because it is the main item i need form a slice.
// By using default export im making the import statement concise and clear.
export default usersSlice.reducer;
