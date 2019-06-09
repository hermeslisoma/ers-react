import React from 'react';
import logo from './logo.svg';
import './include/bootstrap'
import './include/css/ers.css'
import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { store } from './store';
import LoginComponent from './components/login/login.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ScrollToTopComponent } from './components/scrolltotop/scrolltotop.component';
import { ProfileComponent } from './components/profile/profile.component';
import  RegisterComponent  from './components/register/register.component';
import { MainComponent } from './components/main/main.component';
import  AllUsersComponent  from './components/users/allusers.component';
import  OneUserComponent  from './components/users/oneuser.component';
import  EditUserComponent  from './components/users/edituser.component';
import  WelcomeComponent  from './components/welcome/welcome.component';
import reimbuserComponent from './components/reimbursement/reimbuser.component';
import  EditReimbComponent  from './components/reimbursement/editreimb.component';
import allreimbComponent from './components/reimbursement/allreimb.component';
import  NewReimbComponent  from './components/reimbursement/newreimb.component';


const App: React.FC = () => {
  return (
    <Provider store={store}>
    <BrowserRouter>
    <Switch>
         <Route exact path='/' component={WelcomeComponent}/>
         <Route path='/login' component={LoginComponent}/>
         <Route path='/register' component={RegisterComponent}/>
         <Route exact path='/users' component={AllUsersComponent}/>
         <Route exact path='/users/:id' component={OneUserComponent}/>
         <Route exact path='/users/edit/:id' component={EditUserComponent}/>
         <Route exact path='/reimbursements' component={allreimbComponent}/>
         <Route exact path='/reimbursements/create' component={NewReimbComponent}/>
         <Route exact path='/reimbursements/users/:id' component={reimbuserComponent}/>
         <Route exact path='/reimbursements/:id' component={EditReimbComponent}/>
    </Switch>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
