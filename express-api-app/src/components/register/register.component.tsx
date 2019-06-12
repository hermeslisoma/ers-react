import React from 'react'
import { RouteComponentProps } from "react-router";
import { User } from "../../models/user";
import { IState } from '../../reducers';
import { connect } from 'react-redux';
import { register } from '../../actions/register.action';
import { Link } from 'react-router-dom';

interface IRegisterState {
    username: string
    password: string
    firstName: string
    lastName: string
    email: string
    role:string
}

interface IRegisterProps extends RouteComponentProps{
    currentUser: User
    errorMessage: string
    register: (username:string, password:string, firstName: string, lastName: string, 
                email:string, role:string, history)=>void
}

export class RegisterComponent extends React.Component<IRegisterProps, any>{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            email: '',
            role: ''
        }
    }

    updateUsername = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    updatePassword = (event)=>{
        this.setState({
            password: event.target.value
        })
    }

    updateFirstName = (event) => {
        this.setState({
            firstName: event.target.value
        })
    }

    updateLastName = (event)=>{
        this.setState({
            lastName: event.target.value
        })
    }

    updateEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    updateRole = (event)=>{
        this.setState({
            role: event.target.value
        })
    }

    registerSubmit = (event) =>{
        event.preventDefault()
        this.props.register(this.state.username, this.state.password, this.state.firstName, 
            this.state.lastName, this.state.email, this.state.role, this.props.history)
    }

    render(){

        return(
                <div className="container">
                    <div className="row justify-content-center">
                    <div className="col-xl-10 col-lg-12 col-md-9">
                        <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            <div className="row">
                            <div className="col-lg-6" style={{marginLeft:'230px'}}>
                                <div className="p-5">
                                <div className="text-center">
                                    <h1 className="h4 text-gray-900 mb-4">Welcome!</h1>
                                </div>
                                <form className="user" onSubmit={this.registerSubmit}>
                                    <div className="form-group">
                                    <input type="text" className="form-control form-control-user" id="inputUsername" aria-describedby="usernameHelp" value={this.state.username} onChange={this.updateUsername} placeholder="Enter Username..."/>
                                    </div>
                                    <div className="form-group">
                                    <input type="password" className="form-control form-control-user" id="inputPassword" value={this.state.password} onChange={this.updatePassword} placeholder="Password"/>
                                    </div>
                                    <div className="form-group">
                                    <input type="text" className="form-control form-control-user" id="inputFirstName" aria-describedby="firstNameHelp" value={this.state.firstName} onChange={this.updateFirstName} placeholder="Enter First Name..."/>
                                    </div>
                                    <div className="form-group">
                                    <input type="text" className="form-control form-control-user" id="inputLastName" aria-describedby="lastNameHelp" value={this.state.lastName} onChange={this.updateLastName} placeholder="Enter Last Name..."/>
                                    </div>
                                    <div className="form-group">
                                    <input type="email" className="form-control form-control-user" id="inputEmail" aria-describedby="emailHelp" value={this.state.email} onChange={this.updateEmail} placeholder="Enter Email..."/>
                                    </div>
                                    <div className="form-group">
                                    <input type="text" className="form-control form-control-user" id="inputRole" aria-describedby="roleHelp" value={this.state.role} onChange={this.updateRole} placeholder="Enter Role..."/>
                                    </div>
                                    <div className="form-group">
                                    <div className="custom-control custom-checkbox small">
                                        <input type="checkbox" className="custom-control-input" id="customCheck"/>
                                        <label className="custom-control-label" htmlFor="customCheck">Remember Me</label>
                                    </div>
                                    </div>
                                    <p>{this.props.errorMessage}</p>
                                    <button className="btn btn-primary btn-user btn-block" type="submit">Register</button>
                                </form>
                                <hr/>
                                <div className="text-center">
                                    <Link className="small" to="/login">Login!</Link>
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
    register : register
}


//this will make a higher order component
//this is what we will use whenver we want to make a new signin component
export default connect(mapStateToProps, mapDispatchToProps)(RegisterComponent)