import React from 'react'



export class ScrollToTopComponent extends React.Component<any, any>{


render(){

    return(   
            <a className="scroll-to-top rounded" href="#page-top">
            {/*<!-- Scroll to Top Button-->*/}
            <i className="fas fa-angle-up"></i>
            </a>
        )
    }
}