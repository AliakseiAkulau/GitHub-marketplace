export const saveToLS = (name, token) => localStorage.setItem(name, token);
export const getFromLS = (name) => localStorage.getItem(name);
export const removeFromLS = (name) => localStorage.removeItem(name);

export const checkAuth = () => {
	return !!getFromLS('token');
};

export const deleteUserFromLS = () => {
	removeFromLS('token');
	removeFromLS('username');
	removeFromLS('email');
};
