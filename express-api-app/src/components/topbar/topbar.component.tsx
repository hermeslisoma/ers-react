import React from 'react'
import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { Link, RouteComponentProps  } from 'react-router-dom';
import { User } from '../../models/user';
import { login } from '../../actions/login.action';
import { logout } from '../../actions/logout.action';


interface ILoginProps extends RouteComponentProps{
    currentUser: User
    errorMessage: string
    login: (username:string, password:string, history)=>void
}

export class TopbarComponent extends React.Component<any, any>{
    constructor(props){
        super(props);

        }

    // logout = () =>{
    //         //event.preventDefault()
    //         console.log('logout');
            
    //         this.props.history.push('/')
    //         //this.props.logout(this.props.history)
    //     }

    login = (event) =>{
        //event.preventDefault()
        this.props.login('', '', '')
    }

    logout = (event) =>{
        //event.preventDefault()
        this.props.logout()
    }

render(){
    console.log(this.props.currentUser);
    
    return(
            
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            {/*<!-- Topbar -->*/}
            {/*<!-- Sidebar Toggle (Topbar) -->*/}
            <button className="btn btn-link d-md-none rounded-circle mr-3" id="sidebarToggleTop" >
                <i className="fa fa-bars"></i>
            </button>

            {/*<!-- Topbar Navbar -->*/}
            <ul className="navbar-nav ml-auto">

                    <div className="topbar-divider d-none d-sm-block"></div>

                    {/*<!-- Nav Item - User Information -->*/}
                    <li className="nav-item dropdown no-arrow">
                    <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span className="mr-2 d-none d-lg-inline text-gray-600 small">{this.props.currentUser && this.props.currentUser.username}</span>
                        <img className="img-profile rounded-circle" src="https://source.unsplash.com/QAB-WJcbgJk/60x60"/>
                    </a>
                    {/*<!-- Dropdown - User Information -->*/}
                    <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                    <Link to={`/users/${this.props.currentUser && this.props.currentUser.userId}`} className="dropdown-item">
                        <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                        Profile
                        </Link>

                        <div className="dropdown-divider"></div>
                        <button className="dropdown-item" onClick={this.login}>
                        <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                        Logout
                        </button>
                    </div>
                    </li>

            </ul>
            {/*<!-- End of Topbar -->*/}
            </nav>           
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
  const mapDispatchToProps = {
    login : login,
    logout: logout
  }
  
  
  //this will make a higher order component
  //this is what we will use whenver we want to make a new signin component
  export default connect(mapStateToProps, mapDispatchToProps)(TopbarComponent)