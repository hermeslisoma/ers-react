import React from 'react'
import { MainComponent } from '../main/main.component';
import { expressApiClient } from '../../axios/express-api-client';
import { IState } from '../../reducers';
import { connect } from 'react-redux';
import { User } from '../../models/user';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';

interface IOneUserProps extends RouteComponentProps{
    currentUser: User
    errorMessage: string
  }

export class OneUserComponent extends React.Component<any, any>{
    constructor(props){
        super(props);
        this.state = {
            user: '',
            errorMsg: ''
        }
        }



async componentDidMount(){
    console.log(this.props.match);
    
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
            this.setState({
              user: response.data
            })
            //console.log(this.state.user);
            
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
    //console.log(this.state.user);
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
                            { this.state.user ? <div className="p-5">
                                 
                                <div className="text-center">
                                    <h1 className="h4 text-gray-900 mb-4">User Info</h1>
                                { this.props.currentUser && !['finance-manager'].includes(this.props.currentUser.role.role) ?
                                    <Link to={`/users/edit/${this.state.user.userId}`} className="btn btn-primary">
                  <i className="fas fa-edit" title="edit user">Edit User</i>
                                    </Link>: <span></span>}
                                    <span> </span>
                                    <Link to={`/reimbursements/users/${this.state.user.userId}`} className="btn btn-primary">
                      <i className="fas fa-dollar-sign" title="Reimbursement Infos"> Reimbursements Info</i>
                  </Link>
                  
                                </div>
                                <hr/>
                                    <div className="form-group">
                                    <label htmlFor="inputUsername">Username</label>
                                    <input type="text" readOnly className="form-control form-control-user" id="inputUsername" aria-describedby="usernameHelp" value={this.state.user.username} />
                                    </div>
                                    <div className="form-group">
                                    <label htmlFor="inputFirstName">First name</label>
                                    <input type="text" readOnly className="form-control form-control-user" id="inputFirstName" aria-describedby="firstNameHelp" value={this.state.user.firstName} />
                                    </div>
                                    <div className="form-group">
                                    <label htmlFor="inputLastName">Last name</label>
                                    <input type="text" readOnly className="form-control form-control-user" id="inputLastName" aria-describedby="lastNameHelp" value={this.state.user.lastName} />
                                    </div>
                                    <div className="form-group">
                                    <label htmlFor="inputEmail">Email</label>
                                    <input type="email" readOnly className="form-control form-control-user" id="inputEmail" aria-describedby="emailHelp" value={this.state.user.email} />
                                    </div>
                                    <div className="form-group">
                                    <label htmlFor="inputRole">Role</label>
                                    <input type="text" readOnly className="form-control form-control-user" id="inputRole" aria-describedby="roleHelp" value={this.state.user.role.role} />
                                    </div>
                                    <hr/>
                                </div> :<p>User not found</p>}
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
  export default connect(mapStateToProps)(OneUserComponent)