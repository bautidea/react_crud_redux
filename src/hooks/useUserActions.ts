import { useCallback } from "react";
import { useAppDispatch } from "../hooks/store";
import {
	addNewUser,
	deleteUserById,
	obtainUsers,
	type User,
	type UserId,
} from "../store/users/slice";

export function useUserActions() {
	// In order to use reducer, first we must retrieve the way of performing
	// actions, by using 'useAppDispatch'. This dispatch allow us to send
	// actions.
	const dispatch = useAppDispatch();

	const getUsers = useCallback(() => {
		dispatch(obtainUsers());
	}, [dispatch]);

	const addUser = ({ name, email, github }: User) => {
		dispatch(addNewUser({ name, email, github }));
	};

	const removeUser = (id: UserId) => {
		dispatch(deleteUserById(id));
	};

	return { getUsers, addUser, removeUser };
}
