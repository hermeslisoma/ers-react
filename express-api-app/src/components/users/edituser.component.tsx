import React from 'react'
import { MainComponent } from '../main/main.component';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { expressApiClient } from '../../axios/express-api-client';
import axios from 'axios';


export class EditUserComponent extends React.Component<any, any>{
    constructor(props){
        super(props);
        this.state = {
            user: '',
            userId:'',
            username: '',
            //password: '',
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

        editSubmit = async (event) =>{
            event.preventDefault()
            try{
                let userInfo = {
                    userId: this.state.userId,
                    username: this.state.username,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    email: this.state.email,
                    role: this.state.role
                }
                //console.log(userInfo);
                
                const response = await expressApiClient.patch('/users', userInfo, {
                    headers: {
                      "x-access-token": this.props.currentUser.token
                    }
                  })
            //console.log(response.status);
            

        if( response.status === 200){
            this.setState({
                user: response.data
              })
              //console.log(this.state.users);
            
            this.props.history.push(`/users/${this.state.user.userId}`)
            
        } else {
            this.setState({
                errorMsg: 'Something went wrong'
              })
              
        }  
            }catch(e){
                return e
            }
        }

async componentDidMount(){
    //console.log(this.props.match);

    try{
        let id = this.props.match.params && this.props.match.params.id
        //console.log(this.props.currentUser.token);
        if(this.props.currentUser){
        const response = await expressApiClient.get(`/users/${id}`, {
          headers: {
            "x-access-token": this.props.currentUser.token
          }
        })
        // console.log(response.data);
        // console.log(response.status);
        
        
        if(response.status === 200){
            let user = response.data
            this.setState({
              userId: user.userId,
              username: user.username,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              role: user.role.role
            })
            
        } else {
              this.setState({
                errorMsg: 'Something went wrong'
              })
        }
      }
    } catch(e){
      return e
    }
    
}

render(){
    if(!this.props.currentUser) this.props.history.push('/login')
    return(
        <MainComponent>
            <div className="container">
                    <div className="row justify-content-center">
                    <div className="col-xl-10 col-lg-12 col-md-9">
                        <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            <div className="row">
                            <div className="col-lg-6" style={{marginLeft:'230px'}}>
                                <div className="p-5">
                                <div className="text-center">
                                    <h1 className="h4 text-gray-900 mb-4">Edit User</h1>
                                </div>
                                <form className="user" onSubmit={this.editSubmit}>
                                    <div className="form-group">
                                    <label htmlFor="inputUsername">Username</label>
                                    <input type="text" className="form-control form-control-user" id="inputUsername" aria-describedby="usernameHelp" value={this.state.username} onChange={this.updateUsername} />
                                    </div>
                                    <div className="form-group">
                                    <label htmlFor="inputFirstName">First name</label>
                                    <input type="text" className="form-control form-control-user" id="inputFirstName" aria-describedby="firstNameHelp" value={this.state.firstName} onChange={this.updateFirstName} />
                                    </div>
                                    <div className="form-group">
                                    <label htmlFor="inputLastName">Last name</label>
                                    <input type="text" className="form-control form-control-user" id="inputLastName" aria-describedby="lastNameHelp" value={this.state.lastName} onChange={this.updateLastName} />
                                    </div>
                                    <div className="form-group">
                                    <label htmlFor="inputEmail">Email</label>
                                    <input type="email" className="form-control form-control-user" id="inputEmail" aria-describedby="emailHelp" value={this.state.email} onChange={this.updateEmail} />
                                    </div>

                                    {this.props.currentUser && ['finance-manager','admin'].includes(this.props.currentUser.role.role) ? 
                                    <div className="form-group">
                                    <label htmlFor="inputRole">Role</label>
                                    <input type="text" className="form-control form-control-user" id="inputRole" aria-describedby="roleHelp" value={this.state.role} onChange={this.updateRole} />
                                    </div> :
                                    <span></span>}
                                    <p>{this.props.errorMessage}</p>
                                    <button className="btn btn-primary btn-user btn-block" type="submit">Update</button>
                                </form>
                                <hr/>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </MainComponent>
        )
    }
}

const mapStateToProps = (state:IState) =>{
    console.log(state);
    
    return {
        currentUser: state.login.currentUser,
        errorMessage: state.login.errorMessage
    }
  }
  //this is the actions that will be availible to the component
  // const mapDispatchToProps = {
  //   login : login
  // }
  
  
  //this will make a higher order component
  //this is what we will use whenver we want to make a new signin component
  export default connect(mapStateToProps)(EditUserComponent)