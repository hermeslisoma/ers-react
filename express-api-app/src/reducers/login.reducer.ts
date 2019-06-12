import { ILoginState } from ".";
import { loginTypes } from "../actions/login.action";
import { logoutTypes } from "../actions/logout.action";
import { registerTypes } from "../actions/register.action";


const initialState: ILoginState = {
    currentUser: undefined,
    errorMessage: undefined
}


export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case loginTypes.INVALID_CREDENTIALS:
            return {
                ...state,
                errorMessage: 'Invalid Credentials'
            }
        case loginTypes.FAILED_TO_LOGIN:
            return {
                ...state,
                errorMessage: 'Failed to login, oopsie'
            }
        case loginTypes.SUCCESSFUL_LOGIN:
            return {
                ...state,
                currentUser: action.payload.user,
                errorMessage:undefined
            }
        case logoutTypes.SUCCESSFUL_LOGOUT:
            return {
                ...state,
                currentUser: undefined,
                errorMessage:undefined
            }
        case registerTypes.SUCCESSFUL_REGISTER:
            return {
                ...state,
                currentUser: action.payload.user,
                errorMessage:undefined
            }
        case registerTypes.FAILED_TO_REGISTER:
            return {
                ...state,
                errorMessage: 'Failed to Register, oopsie'
            }
        default:
    }

    return state
}