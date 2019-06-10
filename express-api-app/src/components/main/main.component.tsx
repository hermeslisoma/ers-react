import React from 'react'
import  SidebarComponent  from '../sidebar/sidebar.component';
import  TopbarComponent  from '../topbar/topbar.component';
import { FooterComponent } from '../footer/footer.component';
import { ScrollToTopComponent } from '../scrolltotop/scrolltotop.component';
import { ProfileComponent } from '../profile/profile.component';



export class MainComponent extends React.Component<any, any>{
    constructor(props){
        super(props);
        }


    render(){

    return(       
    <div id="page-top">
    <div id="wrapper">
    <SidebarComponent />
    <div id="content-wrapper" className="d-flex flex-column">
    <div id="content">  
    <TopbarComponent/>
    {this.props.children}
      </div>
    <FooterComponent/>
      </div>
      </div>
    <ScrollToTopComponent/>
    <ProfileComponent/>
      </div>        
        )
    }
}