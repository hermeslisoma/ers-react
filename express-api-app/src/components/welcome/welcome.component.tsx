import React from 'react'
import { MainComponent } from '../main/main.component';
import { connect } from 'react-redux';
import { IState } from '../../reducers';


export class WelcomeComponent extends React.Component<any, any>{
    constructor(props){
        super(props);
        }

render(){
    console.log(this.props);

    if(!this.props.currentUser) this.props.history.push('login')
    
    return(
    <MainComponent>  
        <div className="container-fluid">
        {/*<!-- Begin Page Content -->*/}
          {/*<!-- Page Heading -->*/}
          <h1 className="h3 mb-2 text-gray-800">Welcome to the ERS portal</h1>
          <p className="mb-4">The Expense Reimbursement System.</p>

          {/*<!-- DataTales -->*/}
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">ERS</h6>
            </div>
            <div className="card-body">
              <div className="table-responsive">

              The Expense Reimbursement System (ERS) will manage the process of reimbursing employees 
              for expenses incurred while on company time. 
              All employees in the company can login and submit requests for reimbursement and view
              their past tickets and pending requests. 
              Finance managers can log in and view all reimbursement requests and past history for all 
              employees in the company. Finance managers are authorized to approve and deny requests 
              for expense reimbursement.

              </div>
            </div>
          </div>
        {/*<!-- /.container-fluid -->*/}
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
  export default connect(mapStateToProps)(WelcomeComponent)