import React,{PropTypes,Component} from 'react';
import {FlowRouter} from 'meteor/kadira:flow-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import {connect} from 'react-redux';
import {ApolloProvider} from 'react-apollo';
import {blue900} from 'material-ui/styles/colors';
import {Meteor} from 'meteor/meteor';
import store from '../../../redux/store';
import {client} from '../../../redux/rootReducer.js';
import {Provider} from 'react-redux';
import Divider from 'material-ui/MenuItem';



//pour desactiver METEOR_OFFLINE_CATALOG=1 meteor
const muiTheme= getMuiTheme({
	appBar:{
		backgroundColor: blue900
	}
});

class Bienvenue extends Component{
	//static muiName='FlatButton';
	constructor(){
		super();
		
	}
	render(){
		return(
			<FlatButton {...this.props} 
				label="Bienvenue"  
				style={{
					color:'white',
					marginTop:'5%'
				}} />
		);
	}
}



//Logged.muiName='IconMenu';

export default class MainLayout extends Component{
	constructor(){
		super();
		this.state={
			loggedIn:false,
			drawerOpen:false
		};
	}
	componentWillMount() {
		

	}

	handleToggle(){
		this.setState({
			drawerOpen:!this.state.drawerOpen
		});
		
	}
	handleClose(){
		this.setState({drawerOpen:false});
	}

	componentDidUpdate(){
	
	}
	componentDidMount(){
		
		if(Meteor.user()){
			this.setState({
				loggedIn:false
			});
		}
	}
	render(){
		
		const {content}=this.props;
		//{content()}
			
			return(
			
				<ApolloProvider store={store} client={client}>
                    <MuiThemeProvider muiTheme={muiTheme} >
                        <div className="masterContainer">
                            <header>
                            <AppBar
                                title="LOGINS Nsia Ch@p Ch@p"
                                style={{backgroundColor:'#cd9a2e' }}
                                onTitleTouchTap={()=>{FlowRouter.go('home')}}
                                iconElementRight={<Bienvenue/>}
                            />
                            </header>
                            <section className="generalSection">
                            {content()}
                            </section>
                            <footer>
                                LOGINS Nsia CH@P CH@P v.0.1.0 &copy; Nsia Vie Assurances tous droits réservés. 
                            </footer>
                        </div>
				    </MuiThemeProvider>
                </ApolloProvider>	
			
		);
	}
	

}

MainLayout.propTypes={
	content:PropTypes.func.isRequired
};


