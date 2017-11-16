import React,{PropTypes,Component} from 'react';
import AppBar from 'material-ui/AppBar';
import GetIdentiform from '../components/GetIdentiform.jsx';

export default class Identiform extends Component{
    constructor(){
        super();
    }
    
    render(){
        return(
           <div className="centeredContent">
                <div className="loginDiv zoomIn animated">
                    <AppBar
                        title="Recherche des accès et identifiants de Nsia Ch@p Ch@p"
                        style={{backgroundColor: '#212f68'}}
                        iconClassNameLeft="none"
                        titleStyle={{
                            textAlign:'center'
                        }}
                    />
                    <GetIdentiform/>
                </div>
           </div>
        )
    }
}