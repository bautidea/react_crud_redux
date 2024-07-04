import { usePopUpWindowActions } from "../../hooks/usePopUpWindowActions";
import "./PopUpWindow.css";

export const PopUpWindow = () => {
	const { message, popUpWVisible, hideMessageWindow, acceptActionExecution } =
		usePopUpWindowActions();

	if (!popUpWVisible) {
		return;
	}

	return (
		<div className="popWindowContainer">
			<div className="popWindow">
				<p className="displayText">{message}</p>

				<div className="actionBtn">
					<button type="button" onClick={acceptActionExecution}>
						Got it!
					</button>
					<button type="button" onClick={hideMessageWindow}>
						No
					</button>
				</div>
			</div>
		</div>
	);
};
