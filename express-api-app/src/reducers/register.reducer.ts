import { IRegisterState } from ".";
import { registerTypes } from "../actions/register.action";
import { loginTypes } from "../actions/login.action";


const initialState: IRegisterState = {
    currentUser: undefined,
    errorMessage: undefined
}


export const registerReducer = (state = initialState, action) => {
    switch (action.type) {
        case registerTypes.FAILED_TO_REGISTER:
            return {
                ...state,
                errorMessage: 'Failed to register, oopsie'
            }
        case loginTypes.SUCCESSFUL_LOGIN:
            return {
                ...state,
                //currentUser: action.payload.user,
                errorMessage:undefined
            }
        default:
    }

    return state
}