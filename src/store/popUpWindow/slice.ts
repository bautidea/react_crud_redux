import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ActionTypes, PopUpWindow } from "../../types";

const initialState: PopUpWindow = {
	popUpWVisible: false,
	triggerAction: null,
	message: "",
};

export const possibleActions = {
	remove: "REMOVE_USER" as const,
};

export const popUpWindowSlice = createSlice({
	name: "popUpWindow",
	initialState,
	reducers: {
		showPopUpWindow: (state) => {
			state.popUpWVisible = true;
		},

		setMessage: (state, action: PayloadAction<string>) => {
			state.message = action.payload;
		},

		setAction: (state, action: PayloadAction<ActionTypes>) => {
			state.triggerAction = action.payload;
		},

		resetState: () => {
			return { ...initialState };
		},
	},
});

export const { showPopUpWindow, setMessage, setAction, resetState } =
	popUpWindowSlice.actions;

export default popUpWindowSlice.reducer;
