import { expressApiClient } from "../axios/express-api-client";
import { loginTypes } from "./login.action";

export const registerTypes = {
    FAILED_TO_REGISTER: 'REGISTER_FAILED_TO_REGISTER',
    SUCCESSFUL_REGISTER: 'REGISTER_SUCCESSFUL_REGISTER'

}

//this action is an example of a thunk
//a thunk is a two part function, the first part takes in your params
//the second part takes the param dispatch which we can use to send data to the reducer
export const register = (username:string, password:string, firstName: string, lastName: string, 
                            email:string, role:string, history:any) => async(dispatch) =>{
    const registerInfo = {
        username,
        password,
        firstName,
        lastName,
        email,
        role
    }

    try{
        const response = await expressApiClient.post('/register', registerInfo)

        if( response.status === 200){
            const newUser = response.data
            dispatch({
                payload:{
                    user: newUser
                },
                type:registerTypes.SUCCESSFUL_REGISTER
            })
            
            history.push('/')
            
        } else {
            dispatch({
                //with a type of INVALID CREDENTIALS
                type: registerTypes.FAILED_TO_REGISTER
            })
        }        
    } catch(err){
        console.log(err);        
    }
}