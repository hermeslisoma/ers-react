import { combineReducers } from "redux";
import { User } from "../models/user";
import { loginReducer } from "./login.reducer";


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
    login:ILoginState
    //register:IRegisterState
    //logout:any
}

export const state = combineReducers<IState>({
    login: loginReducer
    //register: registerReducer,
    //logout: logoutReducer
})