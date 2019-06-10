import React from 'react'



export class FooterComponent extends React.Component<any, any>{


render(){

    return(       
            <footer className="sticky-footer bg-white">
                {/*<!-- Footer -->*/}
            <div className="container my-auto">
            <div className="copyright text-center my-auto">
                <span>1905JavaReact @Hermes</span>
            </div>
            </div>
            {/*<!-- End of Footer -->*/}
            </footer>
        
        )
    }
}