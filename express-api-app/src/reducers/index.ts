import { combineReducers } from "redux";
import { User } from "../models/user";
import { loginReducer } from "./login.reducer";
import { registerReducer } from "./register.reducer";
import { logoutReducer } from "./logout.reducer";


export interface ILoginState{
    currentUser:User
    errorMessage:string
}

export interface ILogoutState{
    currentUser:User
    errorMessage:string
}

export interface IRegisterState{
    currentUser:User
    errorMessage:string
}

export interface IState{
    login:any
    //register:IRegisterState
    //logout:any
}

export const state = combineReducers<IState>({
    login: loginReducer
    //register: registerReducer,
    //logout: logoutReducer
})