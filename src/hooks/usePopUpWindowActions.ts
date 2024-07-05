import {
	possibleActions,
	resetState,
	setAction,
	setMessage,
	showPopUpWindow,
} from "../store/popUpWindow/slice";
import type { ActionTypes } from "../types";
import { useAppDispatch, useAppSelector } from "./store";
import { useUserActions } from "./useUserActions";

export function usePopUpWindowActions() {
	const { message, popUpWVisible, triggerAction } = useAppSelector(
		(state) => state.popUpWindow,
	);

	const dispatch = useAppDispatch();

	const { removeUser } = useUserActions();

	const showMessageWindow = (message: string, actionToExecute: ActionTypes) => {
		dispatch(setMessage(message));
		dispatch(setAction(actionToExecute));
		dispatch(showPopUpWindow());
	};

	const hideMessageWindow = () => {
		dispatch(resetState());
	};

	const executeAction = () => {
		if (triggerAction) {
			const { type, payload } = triggerAction;

			if (type === possibleActions.remove) {
				removeUser(payload);
				hideMessageWindow();
			}
		} else return;
	};
	return {
		message,
		popUpWVisible,
		hideMessageWindow,
		showMessageWindow,
		executeAction,
	};
}
