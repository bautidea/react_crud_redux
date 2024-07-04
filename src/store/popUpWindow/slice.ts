import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { popUpWindow } from "../../types";

const initialState: popUpWindow = {
	popUpWVisible: false,
	actionDecision: null,
	message: "",
};

export const popUpWindowSlice = createSlice({
	name: "popUpWindow",
	initialState,
	reducers: {
		showPopUpWindow: (state) => {
			state.popUpWVisible = true;
		},

		hidePopUpWindow: (state) => {
			state.popUpWVisible = false;
		},

		setMessage: (state, action: PayloadAction<string>) => {
			state.message = action.payload;
		},
	},
});

export const { showPopUpWindow, hidePopUpWindow, setMessage } =
	popUpWindowSlice.actions;

export default popUpWindowSlice.reducer;
