import React from 'react'
import { MainComponent } from '../main/main.component';
import { expressApiClient } from '../../axios/express-api-client';
import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { User } from '../../models/user';
import { Link } from 'react-router-dom';

interface IReimbUserProps{
  currentUser: User
  errorMessage: string
}

class ReimbUserComponent extends React.Component<any, any>{
  constructor(props){
    super(props);
    this.state = {
      reimbursements: [],
      errorMsg: '',
      total: '',
      per_page: '',
      current_page: ''
  }
    }

    getUserReimbursementsByPage = async pageNumber => {
      try{
        if(this.props.currentUser){
          let id = this.props.match.params && this.props.match.params.id
          let limit = 5
          let offset = (pageNumber-1)*limit
          
        let response = await expressApiClient.get(`/reimbursement?limit=${limit}&offset=${offset}&user=${id}`, {
          headers: {
            "x-access-token": this.props.currentUser.token
          }
        })
    
        // console.log(response.data);
        //   console.log(response.status);
          
          
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
      this.getUserReimbursementsByPage(1)
    }

render(){ 
    //console.log(this.props);
    let test = 'test'
    if(!this.props.currentUser) this.props.history.push('/login')
    
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
        <span key={number} className={classes} onClick={() => this.getUserReimbursementsByPage(number)}>{number}</span>
      );
    });

    renderPageNumbersFirstLast = pageNumbers.map(number => {
      let classes = this.state.current_page === number ? 'page-item active' : 'page-item';
    
      //if (number == 1 || number == this.state.total || (number >= this.state.current_page - 2 && number <= this.state.current_page + 2)) {
        if (number >= this.state.current_page - 2 && number <= this.state.current_page + 2) {
        return (
          <li key={number} className={classes} onClick={() => this.getUserReimbursementsByPage(number)}><span className="page-link">{number}</span></li>
        );
      }
    });

    return(
    <MainComponent>  
        <div className="container-fluid">
        {/*<!-- Begin Page Content -->*/}
          {/*<!-- Page Heading -->*/}
          <h1 className="h3 mb-2 text-gray-800">User's Reimbursements</h1>

          {/*<!-- DataTales -->*/}
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Reimbursements list</h6>
            </div>
            <div className="card-body">
              <div className="table-responsive">
              { this.state.reimbursements.length ? 
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
                      <td>{reimbursement.author.username}</td>
                      <td>{reimbursement.amount}</td>
                      <td>{reimbursement.dateSubmitted}</td>
                      <td>{reimbursement.dateResolved}</td>
                      <td>{reimbursement.description}</td>
                      <td>{reimbursement.resolver.username}</td>
                      <td>{reimbursement.status.status}</td>
                      <td>{reimbursement.type.type}</td>
                      <td>
                      {this.props.currentUser && this.props.currentUser.role && ['finance-manager','admin'].includes(this.props.currentUser.role.role)?
                    <Link to={`/reimbursements/${reimbursement.reimbursementId}`} className="btn btn-primary btn-circle">
                      <i className="fas fa-edit" title="edit reimbursement"></i>
                  </Link>:<span></span>}
                      </td>
                    </tr>
                    )})}
                    
                  </tbody>
                </table> 
                <nav aria-label="Page navigation example">
                <ul className="pagination">
                {this.state.current_page != 1 ? <>
              <li className="page-item" onClick={() => this.getUserReimbursementsByPage(1)}><span className="page-link">&laquo;</span></li>
              <li className="page-item" onClick={() => this.getUserReimbursementsByPage(this.state.current_page == 1 ? this.state.current_page : this.state.current_page - 1)}><span className="page-link">&lt;</span></li></> : <></>}
              
              {renderPageNumbersFirstLast}
              {this.state.current_page != pageNumbers.length ? <>
                <li className="page-item" onClick={() => this.getUserReimbursementsByPage(this.state.current_page == pageNumbers.length ? this.state.current_page : this.state.current_page + 1)}><span className="page-link">&gt;</span></li>
              <li className="page-item" onClick={() => this.getUserReimbursementsByPage(pageNumbers.length)}><span className="page-link">&raquo;</span></li></> : <></>}
            </ul>
            </nav>
                </span>: <p>No Reimbursements</p> }
               
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
export default connect(mapStateToProps)(ReimbUserComponent)