import React from 'react'
import { MainComponent } from '../main/main.component';
import { expressApiClient } from '../../axios/express-api-client';
import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { User } from '../../models/user';
import { Link } from 'react-router-dom';
import { ReimbursementStatus } from '../../models/reimbursement-status';

// interface IAllUsersState {
//   users: []
//   errorMsg: string
// }

interface IReimbUserProps{
  currentUser: User
  errorMessage: string
}

class AllReimbComponent extends React.Component<any, any>{
  constructor(props){
    super(props);
    this.state = {
      reimbursements: [],
      errorMsg: '',
      criteria: '4',
      total: '',
      per_page: '',
      current_page: ''
  }
    }

    updateCriteria = async(event) => {
        this.setState({
            criteria: event.target.value
        })  
        console.log(this.state.criteria);
        console.log(event.target.value);

        if(event.target.value)
            this.getReimbursementsByPage(1, event.target.value)
        else this.getReimbursementsByPage(1)
        
    }



    getReimbursementsByPage = async (pageNumber, val='') => {
      try{
      if(this.props.currentUser){
      // console.log(val);     
      // console.log(this.state.criteria)
        let response
        let limit = 5
        let offset = (pageNumber-1)*limit
        if(val){
          if(val != '4'){
        response = await expressApiClient.get(`/reimbursement?limit=${limit}&offset=${offset}&status=${+val}`, {
          headers: {
            "x-access-token": this.props.currentUser.token
          }
        })} else {
          response = await expressApiClient.get(`/reimbursement?limit=${limit}&offset=${offset}`, {
            headers: {
              "x-access-token": this.props.currentUser.token
            }
          })
        }
    } else {
      if(this.state.criteria != '4'){
        response = await expressApiClient.get(`/reimbursement?limit=${limit}&offset=${offset}&status=${+this.state.criteria}`, {
          headers: {
            "x-access-token": this.props.currentUser.token
          }
        })
      } else {
      response = await expressApiClient.get(`/reimbursement?limit=${limit}&offset=${offset}`, {
        headers: {
          "x-access-token": this.props.currentUser.token
        }
      })
    }
    }
    if(response.status === 200){
      this.setState({
        reimbursements: response.data[0],
        total: response.data[1],
        per_page: limit,
        current_page: pageNumber
      })   
  } else {
        this.setState({
          errorMsg: 'Something went wrong'
        })
  }
    }
    }catch(e){
      return e
    }

    }

    async componentDidMount(){
      this.getReimbursementsByPage(1)
      console.log('mounted');
    }

render(){ 
    //console.log(this.props);
    let test = 'test'
    if(!this.props.currentUser) this.props.history.push('/login')
    console.log(this.state.criteria); 
    let reimbList = this.state.reimbursements

    //console.log(reimbList) 

    let renderPageNumbers, renderPageNumbersFirstLast
    const pageNumbers = [];
    if (this.state.total) {
      for (let i = 1; i <= Math.ceil(this.state.total / this.state.per_page); i++) {
        pageNumbers.push(i);
      }
    }
    //console.log(pageNumbers.length);
    
    renderPageNumbers = pageNumbers.map(number => {
      let classes = this.state.current_page === number ? 'active' : '';
    
      return (
        <span key={number} className={classes} onClick={() => this.getReimbursementsByPage(number)}>{number}</span>
      );
    });

    renderPageNumbersFirstLast = pageNumbers.map(number => {
      let classes = this.state.current_page === number ? 'page-item active' : 'page-item';
    
      //if (number == 1 || number == this.state.total || (number >= this.state.current_page - 2 && number <= this.state.current_page + 2)) {
        if (number >= this.state.current_page - 2 && number <= this.state.current_page + 2) {
        return (
          <li key={number} className={classes} onClick={() => this.getReimbursementsByPage(number)}><span className="page-link">{number}</span></li>
        );
      }
    });
    
    
    return(
    <MainComponent>  
        <div className="container-fluid">
        {/*<!-- Begin Page Content -->*/}
          {/*<!-- Page Heading -->*/}
          <h1 className="h3 mb-2 text-gray-800">All Reimbursements</h1>

          {/*<!-- DataTales -->*/}
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <div className="form-group col-lg-3">
                                        <label htmlFor="selectStatus">Select reimbursements:</label>
                                        <select className="form-control" id="selectStatus" aria-describedby="statusHelp" value={this.state.criteria} onChange={this.updateCriteria}>
                                            <option value="1">By Pending</option>
                                            <option value="2">By Approved</option>
                                            <option value="3">By Denied</option>
                                            <option value="4">All</option>
                                        </select>
                                        </div>
            </div>
            
            <div className="card-body">
              <div className="table-responsive">
              { reimbList.length ?
              <span>
                <table className="table table-bordered" id="dataTable" style={{width:'100%'}} cellSpacing="0">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Author</th>
                      <th>Amount</th>
                      <th>Date submitted</th>
                      <th>Date Resolved</th>
                      <th>Description</th>
                      <th>Resolver</th>
                      <th>Status</th>
                      <th>Type</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>                  
                  {reimbList.map((reimbursement, i) => {
                    return(
                      <tr key={i}>
                      <td>{reimbursement.reimbursementId}</td>
                      <td>{reimbursement.author && reimbursement.author.username}</td>
                      <td>{reimbursement.amount}</td>
                      <td>{reimbursement.dateSubmitted}</td>
                      <td>{reimbursement.dateResolved}</td>
                      <td>{reimbursement.description}</td>
                      <td>{reimbursement.resolver && reimbursement.resolver.username}</td>
                      <td>{reimbursement.status && reimbursement.status.status}</td>
                      <td>{reimbursement.type && reimbursement.type.type}</td>
                      <td>
                    <Link to={`/reimbursements/${reimbursement.reimbursementId}`} className="btn btn-primary btn-circle">
                      <i className="fas fa-edit" title="edit reimbursement"></i>
                  </Link>
                      </td>
                    </tr>
                    )})}
                    
                  </tbody>
                </table> 
                <nav aria-label="Page navigation example">
                <ul className="pagination">
                {this.state.current_page != 1 ? <>
              <li className="page-item" onClick={() => this.getReimbursementsByPage(1)}><span className="page-link">&laquo;</span></li>
              <li className="page-item" onClick={() => this.getReimbursementsByPage(this.state.current_page == 1 ? this.state.current_page : this.state.current_page - 1)}><span className="page-link">&lt;</span></li></> : <></>}
              
              {renderPageNumbersFirstLast}
              {this.state.current_page != pageNumbers.length ? <>
                <li className="page-item" onClick={() => this.getReimbursementsByPage(this.state.current_page == pageNumbers.length ? this.state.current_page : this.state.current_page + 1)}><span className="page-link">&gt;</span></li>
              <li className="page-item" onClick={() => this.getReimbursementsByPage(pageNumbers.length)}><span className="page-link">&raquo;</span></li></> : <></>}
            </ul>
            </nav>
            </span> : <p>No Reimbursements</p> }
               
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
export default connect(mapStateToProps)(AllReimbComponent)