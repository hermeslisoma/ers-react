import React from 'react'
import { MainComponent } from '../main/main.component';
import { expressApiClient } from '../../axios/express-api-client';
import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { User } from '../../models/user';
import { Link } from 'react-router-dom';

interface IAllUsersProps{
  currentUser: User
  errorMessage: string
}

class AllUsersComponent extends React.Component<any, any>{
  constructor(props){
    super(props);
    this.state = {
      users: [],
      errorMsg: '',
      total: '',
      per_page: '',
      current_page: '',
      user:''
  }
    }

    updateUser = (event)=>{
      this.setState({
          user: event.target.value
      })
  }

    findUserSubmit = async (event) => {
      event.preventDefault()

      console.log(this.state.user);

      this.props.history.push(`users/${this.state.user}`)
      

  }

    getUsersByPage = async pageNumber => {
      try{
      if(this.props.currentUser){
        let limit = 5
        let offset = (pageNumber-1)*limit
        
      let response = await expressApiClient.get(`/users?limit=${limit}&offset=${offset}`, {
        headers: {
          "x-access-token": this.props.currentUser.token
        }
      })
  
      // console.log(response.data);
      //   console.log(response.status);
        
        
        if(response.status === 200){
            this.setState({
              users: response.data[0],
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
    this.getUsersByPage(1)
    }

render(){ 
    //console.log(this.props);
    let test = 'test'
    
    if(!this.props.currentUser) this.props.history.push('/login')
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
        <span key={number} className={classes} onClick={() => this.getUsersByPage(number)}>{number}</span>
      );
    });

    renderPageNumbersFirstLast = pageNumbers.map(number => {
      let classes = this.state.current_page === number ? 'page-item active' : 'page-item';
    
      //if (number == 1 || number == this.state.total || (number >= this.state.current_page - 2 && number <= this.state.current_page + 2)) {
        if (number >= this.state.current_page - 2 && number <= this.state.current_page + 2) {
        return (
          <li key={number} className={classes} onClick={() => this.getUsersByPage(number)}><span className="page-link">{number}</span></li>
        );
      }
    });

    return(
    <MainComponent>  
        <div className="container-fluid">
        {/*<!-- Begin Page Content -->*/}
          {/*<!-- Page Heading -->*/}
          <h1 className="h3 mb-2 text-gray-800">Users</h1>

          {/*<!-- DataTales -->*/}
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Users list</h6>
            </div>
            <div className="card-body">
              <div className="table-responsive">
              { this.state.users.length ? 
              <span>
  
                <table className="table table-bordered" id="dataTable" style={{width:'100%'}} cellSpacing="0">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Username</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>                  
                  {this.state.users.map((user, i) => {
                    return(
                      <tr key={i}>
                      <td>{user.userId}</td>
                      <td>{user.username}</td>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.email}</td>
                      <td>{user.role.role}</td>
                      <td>
                        <Link to={`users/${user.userId}`} className="btn btn-primary btn-circle">
                      <i className="fas fa-info-circle" title="User info"></i>
                    </Link>
                    <span>  </span>

                  { this.props.currentUser && !['finance-manager'].includes(this.props.currentUser.role.role) ?
                                     <Link to={`users/edit/${user.userId}`} className="btn btn-primary btn-circle">
                                     <i className="fas fa-edit"></i>
                                   </Link>: <span></span>}
                                    <span> </span>
                                    <Link to={`reimbursements/users/${user.userId}`} className="btn btn-primary btn-circle">
                      <i className="fas fa-dollar-sign" title="Reimbursement Infos"></i>
                  </Link>



                      </td>
                    </tr>
                    )})}
                    
                  </tbody>
                </table> 
                <nav aria-label="Page navigation example">
                <ul className="pagination">
                {this.state.current_page != 1 ? <>
              <li className="page-item" onClick={() => this.getUsersByPage(1)}><span className="page-link">&laquo;</span></li>
              <li className="page-item" onClick={() => this.getUsersByPage(this.state.current_page == 1 ? this.state.current_page : this.state.current_page - 1)}><span className="page-link">&lt;</span></li></> : <></>}
              
              {renderPageNumbersFirstLast}
              {this.state.current_page != pageNumbers.length ? <>
                <li className="page-item" onClick={() => this.getUsersByPage(this.state.current_page == pageNumbers.length ? this.state.current_page : this.state.current_page + 1)}><span className="page-link">&gt;</span></li>
              <li className="page-item" onClick={() => this.getUsersByPage(pageNumbers.length)}><span className="page-link">&raquo;</span></li></> : <></>}
            </ul>
            </nav>
            <hr/>
            <form className="user" style={{padding: '0 500px'}} onSubmit={this.findUserSubmit}>
 <div className="form-group">
 <label htmlFor="inputUser">Search by User</label>
 <input type="text" className="form-control" id="inputUser" aria-describedby="userHelp" value={this.state.user} onChange={this.updateUser} />
 </div>

 <p>{this.props.errorMessage}</p>
 <button className="btn btn-primary btn-user btn-block" type="submit">Find User</button>
 </form> 
        </span>
                : <p>No Users</p> }
               
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
export default connect(mapStateToProps)(AllUsersComponent)