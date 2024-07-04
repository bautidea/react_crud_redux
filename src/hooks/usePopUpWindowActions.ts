import {
	hidePopUpWindow,
	setMessage,
	showPopUpWindow,
} from "../store/popUpWindow/slice";
import { useAppDispatch, useAppSelector } from "./store";

export function usePopUpWindowActions() {
	const { message, actionDecision, popUpWVisible } = useAppSelector(
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

	return {
		message,
		actionDecision,
		popUpWVisible,
		hideMessageWindow,
		showMessageWindow,
		setTextMessageWindow,
	};
}
