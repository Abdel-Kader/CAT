import {
	ADD_USER_BEGIN,
	ADD_USER_SUCCESS,
    ADD_USER_FAILURE,
    FETCH_PROFILE_SUCCESS,
    FETCH_PROFILE_FAILURE
} from "../actions/actionTypes";

const initialState = {
	newUser: null,
	userInfo: null,
	userAdded: false,
	loader: false,
	loading: false,
	error: null,
};

export default function userReducer(state = initialState, action) {
	switch (action.type) {
		case ADD_USER_BEGIN:
			return {
				...state,
				loading: true,
				error: null,
			};
		case ADD_USER_SUCCESS:
			return {
				...state,
				loading: false,
				newUser: action.payload.user,
				userAdded: true,
			};

		case ADD_USER_FAILURE:
			return {
				...state,
				loading: false,
				newUser: null,
				error: action.payload.error,
				userAdded: false,
            };
        
		case FETCH_PROFILE_SUCCESS:
			console.log(action.payload.user)
            return {
                ...state,
                loading: false,
                userInfo: action.payload
            };
        
        case FETCH_PROFILE_FAILURE:
            return {
                ...state,
                loading: false,
                userInfo: null,
                error: action.payload.error
            };
        
		default:
			return state;
	}
}
