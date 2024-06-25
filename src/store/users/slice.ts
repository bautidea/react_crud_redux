import {
	createAsyncThunk,
	createSlice,
	type PayloadAction,
} from "@reduxjs/toolkit";
import { fetchUsers } from "../../services/users";

// A slice is a section to manage a state for a specific use case, in this case
// this slice will manage all states for users.

// Creating interface to validate types.
export interface User {
	name: string;
	email: string;
	github: string;
}

// We have two types of user, the user as person, and the the user that we use for data storage
export type UserId = number;
export interface UserWithId extends User {
	id: UserId;
}

export const obtainUsers = createAsyncThunk("users/obtainUsers", async () => {
	const persistedState = localStorage.getItem("__redux_state__");

	return persistedState ? JSON.parse(persistedState) : await fetchUsers();
});

const initialState: UserWithId[] = [];

// All Slices needs three things, a name to be called, its initial state, and the reducers.
export const usersSlice = createSlice({
	name: "users",
	initialState: initialState,
	reducers: {
		addNewUser: (state, action: PayloadAction<User>) => {
			// We have to generate the id in order to create a new user first.
			// This should be generated by the Data Base but..
			const id = state.slice(-1)[0].id + 1;

			// action.payload  = { name, email, github }

			// In REDUX we dont have to return a new state
			// -> return [...state, { id, ...action.payload }];
			// Thanks to Immer we can modify or mutate the original state.
			state.push({ id, ...action.payload });
		},
		deleteUserById: (state, action: PayloadAction<UserId>) => {
			const idToRemove = action.payload;

			return state.filter((user) => user.id !== idToRemove);
		},
		rollbackUser: (state, action: PayloadAction<UserWithId>) => {
			// First checking if the removed user is on the state.
			const isUserAlreadyDefined = state.some(
				(user) => user.id === action.payload.id,
			);

			// If the user couldn't be found we add it again.
			if (!isUserAlreadyDefined) {
				// Fist adding the deleted user.
				state.push(action.payload);
				// Then sorting the array so users gets ordered by id number.
				state.sort((a, b) => {
					return a.id - b.id;
				});
			}
		},
	},
	extraReducers(builder) {
		builder.addCase(obtainUsers.fulfilled, (_state, action) => {
			return action.payload;
		});
	},
});

// Here im exporting as default only the reducer, because it is the main item i need form a slice.
// By using default export im making the import statement concise and clear.
export default usersSlice.reducer;

// The best thing to do when you have a reducer is to export the action, Redux Toolkit allows this in an
// easy way.
export const { addNewUser, deleteUserById, rollbackUser } = usersSlice.actions;
