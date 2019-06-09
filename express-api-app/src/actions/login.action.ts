import { expressApiClient } from "../axios/express-api-client";

export const loginTypes = {
    INVALID_CREDENTIALS : 'LOGIN_INVALID_CREDENTIALS',
    FAILED_TO_LOGIN: 'LOGIN_FAILED_TO_LOGIN',
    SUCCESSFUL_LOGIN: 'LOGIN_SUCCESSFUL_LOGIN',
    SUCCESS_LOGOUT: 'LOGOUT_SUCCESS_LOGOUT',
    FAILED_TO_REGISTER: 'REGISTER_FAILED_TO_REGISTER',

}

//this action is an example of a thunk
//a thunk is a two part function, the first part takes in your params
//the second part takes the param dispatch which we can use to send data to the reducer
export const login = (username:string, password:string, history:any) => async(dispatch) =>{
    const credentials = {
        username,
        password
    }

    try{
        if(username == '' && password == ''){
            dispatch({
                type: loginTypes.SUCCESS_LOGOUT
            })
            //history.push('/')
        }

        const response = await expressApiClient.post('/login', credentials)

        if(response.status === 401){//if user pass is wrong
            //send info to the reducer
            dispatch({
                //with a type of INVALID CREDENTIALS
                type: loginTypes.INVALID_CREDENTIALS
            })
        } else if( response.status === 200){
            const user = response.data
            dispatch({
                payload:{
                    user: user
                },
                type:loginTypes.SUCCESSFUL_LOGIN
            })
            console.log(user);
            
            history.push('/')
            
        } else {
            dispatch({
                //with a type of INVALID CREDENTIALS
                type: loginTypes.FAILED_TO_LOGIN
            })
        }        
    } catch(err){
        console.log(err);        
    }
}