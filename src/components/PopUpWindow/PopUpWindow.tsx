import { usePopUpWindowActions } from "../../hooks/usePopUpWindowActions";
import "./PopUpWindow.css";

export const PopUpWindow = () => {
	const { message, popUpWVisible, hideMessageWindow, executeAction } =
		usePopUpWindowActions();

	if (!popUpWVisible) {
		return;
	}

	return (
		<div className="popWindowContainer">
			<div className="popWindow">
				<p className="displayText">{message}</p>

				<div className="actionBtn">
					<button type="button" onClick={executeAction}>
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
