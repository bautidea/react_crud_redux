import {
	executeAction,
	hidePopUpWindow,
	setMessage,
	showPopUpWindow,
} from "../store/popUpWindow/slice";
import { useAppDispatch, useAppSelector } from "./store";

export function usePopUpWindowActions() {
	const { message, popUpWVisible } = useAppSelector(
		(state) => state.popUpWindow,
	);
	const dispatch = useAppDispatch();

	const showMessageWindow = () => {
		dispatch(showPopUpWindow());
	};

	const hideMessageWindow = () => {
		dispatch(hidePopUpWindow());
	};

	const setTextMessageWindow = (message: string) => {
		dispatch(setMessage(message));
	};

	const acceptActionExecution = () => {
		dispatch(executeAction());
	};

	return {
		message,
		popUpWVisible,
		hideMessageWindow,
		showMessageWindow,
		setTextMessageWindow,
		acceptActionExecution,
	};
}
