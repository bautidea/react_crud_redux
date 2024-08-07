// Creating interface to validate types.
export interface User {
	name: string;
	email: string;
	github: string;
}

// We have two types of user, the user as person, and the the user that we use for data storage
export type UserId = number;

export interface UserWithId extends User {
	id: UserId;
	beingEdit?: boolean;
}

export interface FetchedData {
	id: number;
	name: string;
	email: string;
	username: string;
}

export type UserCellProps = {
	user: UserWithId;
};

export type ActionTypes =
	| { type: "REMOVE_USER"; payload: UserId }
	| { type: "UPDATE_USER"; payload: UserWithId };

export interface PopUpWindow {
	popUpWVisible: boolean;
	triggerAction: ActionTypes | null;
	message: string;
}
