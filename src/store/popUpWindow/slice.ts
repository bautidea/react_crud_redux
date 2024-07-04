import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { PopUpWindow } from "../../types";

const initialState: PopUpWindow = {
	popUpWVisible: false,
	triggerAction: false,
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

		executeAction: (state) => {
			state.triggerAction = true;
			state.popUpWVisible = false;
		},
	},
});

export const { showPopUpWindow, hidePopUpWindow, setMessage, executeAction } =
	popUpWindowSlice.actions;

export default popUpWindowSlice.reducer;
