export const logoutTypes = {
    SUCCESSFUL_LOGOUT: 'LOGOUT_SUCCESSFUL_LOGOUT'
}

//this action is an example of a thunk
//a thunk is a two part function, the first part takes in your params
//the second part takes the param dispatch which we can use to send data to the reducer
export const logout = () => (dispatch, getState) =>{
    const nowState = getState()
    console.log(nowState);
    
    try{
            dispatch({
                type: logoutTypes.SUCCESSFUL_LOGOUT
            })
            //history.push('/')
    
    } catch(err){
        console.log(err);        
    }
}