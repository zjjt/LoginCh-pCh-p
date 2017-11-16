import React,{PropTypes,Component} from 'react';
import Divider from 'material-ui/Divider';
import CircularProgress from 'material-ui/CircularProgress';
import LinearProgress from 'material-ui/LinearProgress';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {Field,reduxForm,formValueSelector} from 'redux-form';
import {TextField,DatePicker,SelectField} from 'redux-form-material-ui';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {Meteor} from 'meteor/meteor';
import areIntlLocalesSupported from 'intl-locales-supported';
import {validateEmail} from '../../utils/utils';
import TableauClient from './TableauClient.jsx';


//import {decoupagedone,releverOk} from '../../redux/actions/relever-actions';
import {$} from 'meteor/jquery';

let DateTimeFormat;
if(areIntlLocalesSupported(['fr'])){
    DateTimeFormat=global.Intl.DateTimeFormat;
}

const styles={
    uploadInput:{
        cursor:'pointer',
        position:'absolute',
        top:0,
        bottom:0,
        right:0,
        left:0,
        width:'0%',
        opacity:0,
        zIndex:-100000
    }
}
 class GetIdentiform extends Component{
    constructor(){
        super();
        this.state={
            dialogIsOpen:false,
            dialogTIsOpen:false,
            errorMsg:'',
            IsTable:false,
            showLoader:false,
            showTable:false,
            error:false,
            alreadyOp:false,
            decoupage:[],
            currentFile:false,
            progress:null,

        }
    }

   _dialogOpen(){
       this.setState({dialogIsOpen: true});
   }
   _dialogClose(){
       this.setState({dialogIsOpen: false});
   }
    _dialogTOpen(){
        this.setState({dialogTIsOpen: true,alreadyOp:true});
    }

    _dialogTClose(){
        this.setState({dialogTIsOpen: false,alreadyOp:true});
    }
   componentWillUpdate(){
       const {dispatch}=this.props;
       /*if(this.state.decoupage.length>=1 && !this.state.alreadyOp){
            
            
       }  */    
   }
  
    render(){
         const {handleSubmit,pristine,submitting,dispatch,sendermail,message,nom,prenom,birthDate,numpolice}=this.props;
         
         const dialogActions = [
        <FlatButton
            label="OK"
            primary={true}
            onTouchTap={this._dialogClose.bind(this)}
        />,
        ];
       

     
      
      
      
        console.log(this.props);
        return(
            <div className="loginformCont">
              <Dialog
                actions={dialogActions}
                modal={false}
                open={this.state.dialogIsOpen}
                onRequestClose={this._dialogClose}
                style={{color:this.state.error?'red':'green'}}
                autoDetectWindowHeight={true}
                >
                <span style={{color:this.state.error?'red':'green'}}>{this.state.errorMsg}</span>
                </Dialog>

                <form >
                    
                    <div className="cDiv">
                                <div style={{paddingLeft:'5px',paddingRight:'5px',width:'90%'}}>
                                    <Field
                                        name="nom" 
                                        component={TextField}
                                        hintText="Entrer le nom du souscripteur"
                                        floatingLabelText="Nom "
                                        onChange={()=>{
                                                if(!this.state.IsTable){
                                                    this.setState({showLoader:true,showTable:false});
                                                }else{
                                                    this.setState({showLoader:false,showTable:true});
                                                }
                                            }}
                                        fullWidth={true}
                                        required
                                        floatingLabelFixed={true}
                                    />
                                </div>
                                <div style={{paddingLeft:'5px',paddingRight:'5px',width:'90%'}}>
                                    <Field
                                        name="prenom" 
                                        component={TextField}
                                        hintText="Entrer le(s) prénom(s) du souscripteur"
                                        floatingLabelText="prénom(s) "
                                        fullWidth={true}
                                        onChange={()=>{
                                                if(!this.state.IsTable){
                                                    this.setState({showLoader:true,showTable:false});
                                                }else{
                                                    this.setState({showLoader:false,showTable:true});
                                                }
                                            }}
                                        required
                                        floatingLabelFixed={true}
                                    />
                                </div>
                                <div style={{paddingLeft:'5px',paddingRight:'5px',width:'90%'}}>
                                <Field
                                        name="birthDate" 
                                        DateTimeFormat={DateTimeFormat}
                                        className="datepicker"
                                        style={{flexGrow:'1'}}
                                        component={DatePicker}
                                        hintText="Entrez la date de naissance du souscripteur"
                                        floatingLabelText="Date de naissance du souscripteur"
                                        fullWidth={true}
                                        okLabel="OK"
                                        cancelLabel="Annuler"
                                        locale="fr"
                                        format={(value,name)=>{
                                            console.log('value being passed ',value);
                                            console.log('is of type',typeof value);
                                            return value===''?null:value;
                                        }}
                                        floatingLabelFixed={true}
                                    />
                                </div>
                                <div style={{paddingLeft:'5px',paddingRight:'5px',width:'90%'}}>
                                    <Field
                                        name="numpolice" 
                                        component={TextField}
                                        required
                                        hintText="Entrer le numéro de police du souscripteur"
                                        floatingLabelText="Numéro de police"
                                        type="number"
                                        onChange={()=>{
                                                if(!this.state.IsTable){
                                                    this.setState({showLoader:true,showTable:false});
                                                }else{
                                                    this.setState({showLoader:false,showTable:true});
                                                }
                                            }}
                                        fullWidth={true}
                                        floatingLabelFixed={true}
                                    />
                                </div>
                              
                                 <Divider/>
                        <div style={{height:'10px'}}></div>
                           
                            <div style={{height:'10px'}}></div>
                            <div style={{height:'10px'}}></div>
                            <div className="justLoader">
                                {
                                    
                                    <TableauClient nom={nom?'%'+nom+'%':''} prenom={prenom?'%'+prenom+'%':''} birthDate={moment(birthDate).format("YYYYMMDD")==moment(Date.now()).format("YYYYMMDD")?0:parseInt(moment(birthDate).format("YYYYMMDD"),10)} numpolice={parseInt(numpolice,10)} ref={(t)=>{this.tableauClient=t;}}/>        
                                        
                                }
                               
                            </div>
                        
                    </div>
                </form>
            </div>
        );
    }

}

GetIdentiform=reduxForm({
    form:'getInfoClientform',
})(GetIdentiform);

const selector = formValueSelector('getInfoClientform');
const mapDispatchToProps=(state,dispatch)=>{
    const { nom, prenom,birthDate,numpolice } = selector(state, 'nom', 'prenom','birthDate','numpolice');
    return{
        dispatch,
        nom,
        prenom,
        birthDate,
        numpolice,
    };
}
GetIdentiform=connect(mapDispatchToProps)(GetIdentiform);
//decorate with connect to read form values
export default GetIdentiform;



