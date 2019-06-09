import React from 'react'
import { MainComponent } from '../main/main.component';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { expressApiClient } from '../../axios/express-api-client';
import axios from 'axios';


export class EditReimbComponent extends React.Component<any, any>{
    constructor(props){
        super(props);
        this.state = {
            reimbursement: '',
            reimbursementId:'',
            userId:'',
            author: '',
            //password: '',
            amount: '',
            dateSubmitted: '',
            dateResolved: '',
            description: '',
            resolver: '',
            status: '',
            type: ''
        }
    }
        updateAuthor = (event) => {
            this.setState({
                author: event.target.value
            })
        }

        updateAmount = (event) => {
            this.setState({
                amount: event.target.value
            })
        }
    
        updateDateSubmitted = (event)=>{
            this.setState({
                dateSubmitted: event.target.value
            })
        }
    
        updateDateResolved = (event) => {
            this.setState({
                dateResolved: event.target.value
            })
        }
    
        updateDescription = (event)=>{
            this.setState({
                description: event.target.value
            })
        }
    
        updateResolver = (event) => {
            this.setState({
                resolver: event.target.value
            })
        }

        updateStatusH = (event) => {
            event.preventDefault()
            this.setState({
                status: event.target.value,
                optionStatus: event.target.value
            })
        }
    
        updateStatus = (event)=>{
            this.setState({
                status: event.target.value
            })
            console.log(event.target.value);
            
        }

        updateType = (event)=>{
            this.setState({
                type: event.target.value
            })
        }

        editReimbursementSubmit = async (event) =>{
            event.preventDefault()
            try{
                let reimbursementInfo = {
                    reimbursementId: this.state.reimbursementId,
                    //author: this.state.author,
                    amount: this.state.amount,
                    //dateSubmitted: this.state.dateSubmitted,
                    dateResolved: this.state.dateResolved,
                    description: this.state.description,
                    resolver: this.props.currentUser.userId,
                    status: this.state.status,
                    type: this.state.type
                }
                //console.log(reimbursementInfo);
                
                const response = await expressApiClient.patch('/reimbursement', reimbursementInfo, {
                    headers: {
                      "x-access-token": this.props.currentUser.token
                    }
                  })
            //console.log(response.status);
            

        if( response.status === 200){
            this.setState({
                reimbursement: response.data
              })
            //   console.log(this.state.reimbursement);
            // console.log(this.props);
            
            this.props.history.push(`/reimbursements/users/${this.state.userId}`)
            
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
    console.log(this.props.match);
    console.log(this.state.status);

    try{
        let id = this.props.match.params && this.props.match.params.id
        console.log(this.props.currentUser.token);
        if(this.props.currentUser){
        const response = await expressApiClient.get(`/reimbursement/${id}`, {
          headers: {
            "x-access-token": this.props.currentUser.token
          }
        })
        // console.log(response.data);
        // console.log(response.status);
        
        
        if(response.status === 200){
            let reimbursement = response.data
            //console.log(reimbursement);
            
            this.setState({
              reimbursementId: reimbursement.reimbursementId,
              userId: reimbursement.author.userId,
              author: reimbursement.author.username,
              amount: reimbursement.amount,
              dateSubmitted: reimbursement.dateSubmitted,
              dateResolved: reimbursement.dateResolved,
              description: reimbursement.description,
              resolver: reimbursement.resolver.username,
              status: reimbursement.status.statusId,
              type: reimbursement.type.typeId,
            })
            console.log(this.state.status);
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
    console.log(this.state.status);
    console.log(this.props);
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
                                    <h1 className="h4 text-gray-900 mb-4">Edit Reimbursement</h1>
                                </div>
                                <form className="user" onSubmit={this.editReimbursementSubmit}>
                                <div className="form-group">
                                    <label htmlFor="inputAuthor">Author</label>
                                    <input type="text" readOnly className="form-control" id="inputAuthor" aria-describedby="authorHelp" value={this.state.author} />
                                    </div>
                                    <div className="form-group">
                                    <label htmlFor="inputDateSubmitted">Date Submitted</label>
                                    <input type="text" readOnly className="form-control" id="inputDateSubmitted" aria-describedby="dateSubmittedHelp" value={this.state.dateSubmitted} />
                                    </div>
                                    <div className="form-group">
                                    <label htmlFor="inputResolver">Resolver</label>
                                    <input type="text" readOnly className="form-control" id="inputResolver" aria-describedby="resolverHelp" value={this.state.resolver} />
                                    </div>
                                    <div className="form-group">
                                    <label htmlFor="inputAmount">Amount</label>
                                    <input type="text" className="form-control" id="inputAmount" aria-describedby="amountHelp" value={this.state.amount} onChange={this.updateAmount} />
                                    </div>
                                    <div className="form-group">
                                    <label htmlFor="inputDateResolved">Date Resolved</label>
                                    <input type="date" className="form-control" id="inputDateResolved" aria-describedby="dateResolvedHelp" value={this.state.dateResolved} onChange={this.updateDateResolved} />
                                    </div>
                                    <div className="form-group">
                                    <label htmlFor="inputDescription">Description</label>
                                    <input type="text" className="form-control" id="inputDescription" aria-describedby="descriptionHelp" value={this.state.description} onChange={this.updateDescription} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="selectStatus">Select status:</label>
                                        <select className="form-control" id="selectStatus" aria-describedby="statusHelp" value={this.state.status} onChange={this.updateStatus}>
                                            <option value="1">Pending</option>
                                            <option value="2">Approved</option>
                                            <option value="3">Denied</option>
                                        </select>
                                        </div>
                                        <div className="form-group">
                                        <label htmlFor="selectType">Select type:</label>
                                        <select className="form-control" id="selectType" aria-describedby="typeHelp" value={this.state.type} onChange={this.updateType}>
                                            <option value="1">Lodging</option>
                                            <option value="2">Travel</option>
                                            <option value="3">Food</option>
                                            <option value="4">Other</option>
                                        </select>
                                        </div>
                                    <hr/>
                                    <p>{this.props.errorMessage}</p>
                                    <button className="btn btn-primary btn-user btn-block" type="submit">Update</button>
                                </form>
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
  export default connect(mapStateToProps)(EditReimbComponent)