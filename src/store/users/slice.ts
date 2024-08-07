import {
	createAsyncThunk,
	createSlice,
	type PayloadAction,
} from "@reduxjs/toolkit";
import { fetchUsers } from "../../services/users";
import type { User, UserId, UserWithId } from "../../types";

// A slice is a section to manage a state for a specific use case, in this case
// this slice will manage all states for users.

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
			// I add the state of being edited, and initialize it to false.
			const beingEdit = false;

			// We have to generate the id in order to create a new user first.
			// This should be generated by the Data Base but..
			const id = state.length > 0 ? state[state.length - 1].id + 1 : 1;

			// action.payload  = { name, email, github }

			// In REDUX we dont have to return a new state
			// -> return [...state, { id, ...action.payload }];
			// Thanks to Immer we can modify or mutate the original state.
			state.push({ id, ...action.payload, beingEdit });
		},

		deleteUserById: (state, action: PayloadAction<UserId>) => {
			const idToRemove = action.payload;

			return state.filter((user) => user.id !== idToRemove);
		},

		editUserById: (state, action: PayloadAction<UserId>) => {
			const idToEdit = action.payload;

			return state.map((user) => {
				if (user.id === idToEdit) {
					return { ...user, beingEdit: !user.beingEdit };
				}
				return { ...user, beingEdit: false };
			});
		},

		userUpdate(state, action: PayloadAction<UserWithId>) {
			const editedUser = action.payload;

			return state.map((user) => {
				if (user.id === editedUser.id) {
					return { ...editedUser, beingEdit: false };
				}

				return { ...user };
			});
		},

		rollbackAddToState: (state, action: PayloadAction<UserWithId>) => {
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

		rollbackDropFromState: (state, action: PayloadAction<UserId>) => {
			const idToFilter = action.payload;

			return state.filter((user) => user.id !== idToFilter);
		},

		rollbackRetrievePreviousEdit: (
			state,
			action: PayloadAction<UserWithId>,
		) => {
			// This rollback is when a user couldn't be updated in DB, im going to
			// assign the previous values the used had prior to update.
			const userEdited = action.payload;

			return state.map((user) => {
				if (user.id === userEdited.id) {
					return { ...userEdited, beingEdit: false };
				}

				return { ...user };
			});
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
export const {
	addNewUser,
	deleteUserById,
	editUserById,
	userUpdate,
	rollbackAddToState,
	rollbackDropFromState,
	rollbackRetrievePreviousEdit,
} = usersSlice.actions;
