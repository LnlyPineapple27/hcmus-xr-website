// return the user data from the session storage
export const getUser = () => {
    const userStr = localStorage.getItem('name');
    if (userStr) return JSON.parse(userStr);
    else return null;
}

export const getLoggedIn = () => {
    const loggedIn = localStorage.getItem('loggedIn');
    if (loggedIn) return JSON.parse(loggedIn);
    else return null;
}

export const getToken = () => {
    return localStorage.getItem('token') || null;
}

// remove the token and user from the session storage
export const removeUserLocal = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.setItem('loggedIn', false);
}

// set the token and user from the session storage
export const setUserLocal = (name, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('loggedIn', true);
    localStorage.setItem('name', JSON.stringify(name));
}