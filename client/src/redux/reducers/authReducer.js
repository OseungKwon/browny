import { CLEAR_ERROR_FAILURE, CLEAR_ERROR_REQUEST, CLEAR_ERROR_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from '../types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: '',
    userId: '',
    userName: '',
    userRole: '',
    errorMessage: '',
    successMessage: '',
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                isLoading: true,
                errorMessage:'',
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
                userId: action.payload.user.id,
                userRole: action.payload.user.role,
                errorMessage:'',
            }
        case LOGIN_FAILURE:
            localStorage.removeItem('token');
            return {
                ...state,
                ...action.payload,
                token: null,
                user: null,
                userId: null,
                isAuthenticated: false,
                isLoading: false,
                userRole: null,
                errorMessage: action.payload.data.msg,
            }
        case CLEAR_ERROR_REQUEST:
            return {
                ...state,
                errorMessage: null
            }
        case CLEAR_ERROR_SUCCESS:
            return {
                ...state,
                errorMessage: null
            }
        case CLEAR_ERROR_FAILURE:
            return {
                ...state,
                errorMessage: null
            }
        
        default:
            return state;
    }
}

export default authReducer;