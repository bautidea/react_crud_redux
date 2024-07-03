import { useState } from "react";
import { XCircle } from "../../assets/icons";
import "./PopUpWindow.css";

export const PopUpWindow = () => {
	const [showPopUpWindow, setShowPopUpWindow] = useState<boolean>(false);
	const [actionDesision, setActionDesision] = useState<boolean | null>(null);

	if (!showPopUpWindow) {
		return;
	}

	return (
		<div className="popWindowContainer">
			<div className="popWindow">
				<button type="button" className="closeBtn">
					<XCircle />
				</button>

				<p className="displayText">Message</p>

				<div className="actionBtn">
					<button type="button">Got it!</button>
					<button type="button">Decline</button>
				</div>
			</div>
		</div>
	);
};
