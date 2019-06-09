import React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { User } from '../../models/user';


export class SidebarComponent extends React.Component<any, any>{
    constructor(props){
        super(props);

        }

render(){
    console.log(this.props.currentUser);
    return(
        
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            {/*<!-- Sidebar -->*/}
        {/*<!-- Sidebar - Brand -->*/}
        <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
            <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink"></i>
            </div>
            <div className="sidebar-brand-text mx-3">ERS <sup></sup></div>
        </a>

        {/*<!-- Divider -->*/}
        <hr className="sidebar-divider my-0"/>

        {/*<!-- Nav Item - Dashboard -->*/}
        <li className="nav-item active">
            <Link to="/" className="nav-link">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span></Link>
        </li>

        {/*<!-- Divider -->*/}
        <hr className="sidebar-divider"/>

        {/*<!-- Nav Item - Pages Collapse Menu -->*/}
        <li className="nav-item">
            <a className="nav-link collapsed hermes" href="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
            <i className="fas fa-fw fa-folder"></i>
            <span>Users</span>
            </a>
            <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
            <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Actions:</h6>
                {this.props.currentUser ? ['finance-manager','admin'].includes(this.props.currentUser.role.role) ? 
                <Link to="/users" className="collapse-item">All Users</Link> :
                <Link to={`/users/${this.props.currentUser.userId}`} className="collapse-item">User Info</Link> :
                <span></span>}
            </div>
            </div>
        </li>

        <li className="nav-item">
            <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
            <i className="fas fa-fw fa-folder"></i>
            <span>Reimbursements</span>
            </a>
            <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
            <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Actions:</h6>
                {this.props.currentUser ? ['finance-manager','admin'].includes(this.props.currentUser.role.role) ? 
                <span><Link to="/reimbursements" className="collapse-item">All Reimbursements</Link> 
                <Link to="/reimbursements/create" className="collapse-item">New Reimbursement</Link></span> :
                <span><Link to={`/reimbursements/users/${this.props.currentUser.userId}`} className="collapse-item">User Reimbursements</Link>
                <Link to="/reimbursements/create" className="collapse-item">New Reimbursement</Link></span> :
                <span></span>}
            </div>
            </div>
        </li>

        {/*<!-- Divider -->*/}
        <hr className="sidebar-divider d-none d-md-block"/>
        </ul> 
        


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
  export default connect(mapStateToProps)(SidebarComponent)