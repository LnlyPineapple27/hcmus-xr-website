import { createSlice } from '@reduxjs/toolkit';

import { getLoggedIn, getUser, getToken } from '../Utils/Common';

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		name: getUser(),
		accessToken: getToken(),
		loggedIn: getLoggedIn(),
	},
	reducers: {
		update: (state, action) => {
			state.name = action.payload.name;
			state.accessToken = action.payload.accessToken;
			state.loggedIn = true;
		},
		remove: (state) => { 
            state.name = ''; 
            state.accessToken = '';
            state.loggedIn = false; 
        },
	},
});

export const { update, remove } = userSlice.actions;
export default userSlice.reducer;
