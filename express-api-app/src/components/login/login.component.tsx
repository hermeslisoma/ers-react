import React from 'react'
import { RouteComponentProps } from "react-router";
import { User } from "../../models/user";
import { IState } from '../../reducers';
import { connect } from 'react-redux';
import { login } from '../../actions/login.action';
import { Link } from 'react-router-dom';

interface ISignInState {
    username: string
    password: string
}

interface ILoginProps extends RouteComponentProps{
    currentUser: User
    errorMessage: string
    login: (username:string, password:string, history)=>void
}

export class LoginComponent extends React.Component<ILoginProps, any>{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    }

    updateUsername = (event) => {
        console.log(event)
        this.setState({
            username: event.target.value
        })
    }

    updatePassword = (event)=>{
        this.setState({
            password: event.target.value
        })
    }

    loginSubmit = (event) =>{
        event.preventDefault()
        this.props.login(this.state.username, this.state.password, this.props.history)
    }

    render(){

        return(
                <div className="container">
                    <div className="row justify-content-center">
                    <div className="col-xl-10 col-lg-12 col-md-9">
                        <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            <div className="row">
                            {/*<div className="col-lg-6 d-none d-lg-block bg-login-image"></div>*/}
                            <div className="col-lg-6" style={{marginLeft:'230px'}}>
                                <div className="p-5">
                                <div className="text-center">
                                    <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                </div>
                                <form className="user" onSubmit={this.loginSubmit}>
                                    <div className="form-group">
                                    <input type="text" className="form-control form-control-user" id="inputUsername" aria-describedby="usernameHelp" value={this.state.username} onChange={this.updateUsername} placeholder="Enter Username..."/>
                                    </div>
                                    <div className="form-group">
                                    <input type="password" className="form-control form-control-user" id="inputPassword" value={this.state.password} onChange={this.updatePassword} placeholder="Password"/>
                                    </div>
                                    <div className="form-group">
                                    <div className="custom-control custom-checkbox small">
                                        <input type="checkbox" className="custom-control-input" id="customCheck"/>
                                        <label className="custom-control-label" htmlFor="customCheck">Remember Me</label>
                                    </div>
                                    </div>
                                    <p>{this.props.errorMessage}</p>
                                    <button className="btn btn-primary btn-user btn-block" type="submit">Login</button>
                                </form>
                                <hr/>
                                <div className="text-center">
                                    <Link to="/register" className="small">Register!</Link>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
        )
    }
}

const mapStateToProps = (state:IState) =>{
    return {
        currentUser: state.login.currentUser,
        errorMessage: state.login.errorMessage
    }
}
//this is the actions that will be availible to the component
const mapDispatchToProps = {
    login : login
}


//this will make a higher order component
//this is what we will use whenver we want to make a new signin component
export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent)