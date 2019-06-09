import { ILoginState, ILogoutState } from ".";
import { logoutTypes } from "../actions/logout.action";


const initialState: ILogoutState = {
    currentUser: undefined,
    errorMessage: undefined
}


export const logoutReducer = (state = initialState, action) => {
    console.log(state);
    
    switch (action.type) {
        case logoutTypes.SUCCESSFUL_LOGOUT:
            return {
                ...state
            }
        default:
    }

    return state
}