import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import React,{PropTypes,Component} from 'react';
import {englishToFrenchDate} from '../../utils/utils.js';


class TableauClient extends Component{
    constructor(){
        super();
        this.state={
            dialogIsOpen:false,
            dialogTIsOpen:false,
            errorMsg:'',
            showLoader:false,
            error:false,
            alreadyOp:false,
            decoupage:[],
            currentFile:false,
            progress:null,
            table:{
                fixedHeader:true,
                fixedFooter:true,
                stripedRows:false,
                showRowHover:false,
                selectable:false,
                multiSelectable: false,
                enableSelectAll:false,
                deselectOnClickaway:true,
                showCheckboxes:false,
                height:'450px'
            }

        }
    }

    _onRowSelection(rowsarr){
            let regarray=[];
            if(rowsarr){
                rowsarr.map((r)=>{
                regarray.push(this.props.listeDispo[r]);
                //console.dir(this.props.data.userSQL[r])
             });
            }
            switch(regarray[0].domaine){
                case "I":
                regarray[0].domainefull="INDIVIDUEL";
                break;
                 case "G":
                regarray[0].domainefull="GROUPE";
                break;
                 case "R":
                regarray[0].domainefull="RENTE";
                break;
                
            }
            this.setState({
                selectedRows:rowsarr,
                regSelected:regarray,
                //dialogTIsOpen:true
            });
            console.dir(regarray);
            
        }
    render(){
        let {client}=this.props.data;
        console.log(this.props);
        return(
            <Table
                height={this.state.table.height}
                fixedHeader={this.state.table.fixedHeader}
                fixedFooter={this.state.table.fixedFooter}
                selectable={this.state.table.selectable}
                multiSelectable={this.state.table.multiSelectable}
                onRowSelection={this._onRowSelection.bind(this)}
                className="tableau"
                
            >
                <TableHeader
                    displaySelectAll={this.state.table.showCheckboxes}
                    adjustForCheckbox={this.state.table.showCheckboxes}
                    enableSelectAll={this.state.table.enableSelectAll}
                >
                    <TableRow>
                        <TableHeaderColumn tooltip="Ligne numero">N°</TableHeaderColumn>
                        <TableHeaderColumn tooltip="Login">Login</TableHeaderColumn>
                        <TableHeaderColumn tooltip="Mot de passe">Mot de passe</TableHeaderColumn>  
                        <TableHeaderColumn tooltip="Nom complet du client">Client</TableHeaderColumn>
                        <TableHeaderColumn tooltip="Numéro de police">No. Police</TableHeaderColumn>
                        <TableHeaderColumn tooltip="Date de naissance">Date de naissance</TableHeaderColumn>
                        <TableHeaderColumn tooltip="Téléphone">Téléphone</TableHeaderColumn>
                        
                                    
                    </TableRow>
                </TableHeader>
                    <TableBody
                        displayRowCheckbox={this.state.table.showCheckboxes}
                        deselectOnClickaway={this.state.table.deselectOnClickaway}
                        showRowHover={this.state.table.showRowHover}
                        stripedRows={this.state.table.stripedRows}
                    >
                    {
                            typeof client!= "undefined" && client.length ?client.map((row,index)=>{
                                    return(<TableRow key={index} className="animated bounceInLeft"  ref={`user${index}`}>
                                            <TableRowColumn title="">{index+1}</TableRowColumn>
                                            <TableRowColumn title={row.LOGIN}>{row.LOGIN}</TableRowColumn>
                                            <TableRowColumn title={row.MOT_DE_PASSE}>{row.MOT_DE_PASSE}</TableRowColumn>
                                            <TableRowColumn title={row.NOM_COMPLET}>{row.NOM_COMPLET}</TableRowColumn>
                                            <TableRowColumn title={row.NUMERO_POLICE}>{row.NUMERO_POLICE}</TableRowColumn>
                                            <TableRowColumn title={englishToFrenchDate(row.DATE_NAISSANCE.toString())}>{englishToFrenchDate(row.DATE_NAISSANCE.toString())}</TableRowColumn>
                                            <TableRowColumn title={row.TELEPHONE}>{row.TELEPHONE}</TableRowColumn>
                                                
                                    </TableRow>);
                                }):<TableRow>
                                    <TableRowColumn colSpan="8">
                                        <div style={{textAlign:'center'}}>
                                        Si votre recherche est infructueuse cela signifie que ce souscripteur n'est pas disponible dans la base<br/>Remontez l'information à la DSI.    
                                        </div>
                                    </TableRowColumn>
                                </TableRow>
                    }
                    
                    </TableBody>
                </Table>
        );
    }
}

const getClient=gql`
query getClient($nom:String,$prenom:String,$birthDate:Int,$numpolice:Int){
    client(nom:$nom,prenom:$prenom,birthDate:$birthDate,numpolice:$numpolice){
        LOGIN
        MOT_DE_PASSE
        NOM_COMPLET
        DATE_NAISSANCE
        NUMERO_POLICE
        TELEPHONE
    },
    
}`;


export default graphql(getClient,{
options:({nom,prenom,birthDate,numpolice}) => ({  
    variables: {
        nom,
        prenom,
        birthDate,
        numpolice        
} })
})(TableauClient);