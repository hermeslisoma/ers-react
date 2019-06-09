import React from 'react'
import { MainComponent } from '../main/main.component';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { expressApiClient } from '../../axios/express-api-client';
import axios from 'axios';


export class NewReimbComponent extends React.Component<any, any>{
    constructor(props){
        super(props);
        this.state = {
            // reimbursement: '',
            // reimbursementId:'',
            // userId:'',
            author: '',
            //password: '',
            amount: '',
            dateSubmitted: '',
            //dateResolved: '',
            description: '',
            //resolver: '',
            //status: '',
            type: '1'
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
    
        updateDescription = (event)=>{
            this.setState({
                description: event.target.value
            })
        }

        updateType = (event)=>{
            this.setState({
                type: event.target.value
            })
        }

        newReimbursementSubmit = async (event) =>{
            event.preventDefault()
            try{
                    
                let reimbursementInfo = {
                    //reimbursementId: this.state.reimbursementId,
                    author: this.state.author || this.props.currentUser.userId,
                    amount: this.state.amount,
                    dateSubmitted: this.state.dateSubmitted,
                    //dateResolved: this.state.dateResolved,
                    description: this.state.description,
                    //resolver: this.state.resolver,
                    //status: this.state.status,
                    type: this.state.type
                }
                //console.log(reimbursementInfo);
                
                const response = await expressApiClient.post('/reimbursement', reimbursementInfo, {
                    headers: {
                      "x-access-token": this.props.currentUser.token
                    }
                  })
            //console.log(response.status);
            

        if( response.status === 201){
            this.setState({
                reimbursement: response.data
              })
              console.log(this.state.reimbursement);
            
            this.props.history.push(`/reimbursements/users/${this.state.author || this.props.currentUser.userId}`)
            
        } else {
            this.setState({
                errorMsg: 'Something went wrong'
              })
              
        }  
            }catch(e){
                return e
            }
            // this.props.editUser(this.state.username, this.state.password, this.state.firstName, 
            //     this.state.lastName, this.state.email, this.state.role, this.props.history)
        }

render(){
    
    if(!this.props.currentUser) this.props.history.push('/login')
    console.log(this.props.currentUser);
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
                                    <h1 className="h4 text-gray-900 mb-4">New Reimbursement</h1>
                                </div>
                                <form className="user" onSubmit={this.newReimbursementSubmit}>

                                    {this.props.currentUser ? ['finance-manager','admin'].includes(this.props.currentUser.role.role) ? 
                                    <div className="form-group">
                                    <label htmlFor="inputAuthor">Author</label>
                                    <input type="number" className="form-control" id="inputAuthor" aria-describedby="authorHelp" value={this.state.author} onChange={this.updateAuthor}/>
                                    </div> :
                                    <div className="form-group">
                                    <label htmlFor="inputAuthor">Author</label>
                                    <input type="text" readOnly className="form-control" id="inputAuthor" aria-describedby="authorHelp" value={this.props.currentUser && this.props.currentUser.username} />
                                    </div> :
                                    <span></span>}

                                    <div className="form-group">
                                    <label htmlFor="inputAmount">Amount</label>
                                    <input type="text" className="form-control" id="inputAmount" aria-describedby="amountHelp" value={this.state.amount} onChange={this.updateAmount} />
                                    </div>
                                    <div className="form-group">
                                    <label htmlFor="inputDateSubmitted">Date Submitted</label>
                                    <input type="date" className="form-control" id="inputDateSubmitted" aria-describedby="dateSubmittedHelp" value={this.state.dateSubmitted} onChange={this.updateDateSubmitted} />
                                    </div>
                                    <div className="form-group">
                                    <label htmlFor="inputDescription">Description</label>
                                    <input type="text" className="form-control" id="inputDescription" aria-describedby="descriptionHelp" value={this.state.description} onChange={this.updateDescription} />
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
                                    <button className="btn btn-primary btn-user btn-block" type="submit">Create</button>
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
  export default connect(mapStateToProps)(NewReimbComponent)