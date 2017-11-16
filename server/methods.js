import {Meteor} from 'meteor/meteor';
import Sequelize from 'sequelize';
import {DBSQLSERVER} from '../imports/api/graphql/connectors.js';
import {moment} from 'meteor/momentjs:moment';
import {check} from 'meteor/check';
const R= require('ramda');
import Future from 'fibers/future';
import {ValidatedMethod} from 'meteor/mdg:validated-method';




export default ()=>{
    let existInDB=new ValidatedMethod({
        name:'existInDB',
        validate:new SimpleSchema({
            nom:{type:String},
            prenom:{type:String},
            datenaissance:{type:String},
            numpolice:{type:String},
        }).validator(),
        mixins:[RestMethodMixin],
        restOptions:{
            url:'/passwordForgotten',
        },
        run({nom,prenom,datenaissance,numpolice}){
            let fut=new Future();
            //corps de la methode
            if(nom===""||!nom){
                throw new Meteor.Error("error","Nom du souscripteur vide");
                fut['return']({error:"Nom du souscripteur vide"});
            }else if(prenom===""||!prenom){
                //throw new Meteor.Error("error","Prénom(s) du souscripteur vide");
                fut['return']({error:"Prénom(s) du souscripteur vide"});
            }else if(!datenaissance||!Number.isInteger(parseInt(datenaissance,10))||datenaissance.length<8||datenaissance.length>8){
                //throw new Meteor.Error("error","Mauvaise date de naissance fournie");
                fut['return']({error:"Mauvaise date de naissance fournie"});
            }else if(!numpolice||!Number.isInteger(parseInt(numpolice,10))||numpolice.length<8||numpolice.length>8){
               // throw new Meteor.Error("error","Mauvais numéro de police fourni");
                fut['return']({error:"Mauvais numéro de police fourni"});
            }else{
                let NOM = nom.toUpperCase();
                let PRENOM= prenom.toUpperCase();
                let DATE_NAISSANCE=parseInt(datenaissance,10);
                let NUMERO_POLICE=parseInt(numpolice,10);
                let query=`select u.LOGIN,u.MOT_DE_PASSE,c.NOM_CLIENT+' '+c.PRENOMS_CLIENT as NOM_COMPLET,n.NUMERO_POLICE,c.TELEPHONE from utilisateur u 
                           JOIN CLIENT_UNIQUE c on u.IDE_CLIENT_UNIQUE = c.IDE_CLIENT_UNIQUE 
                           JOIN CONTRATS n on u.IDE_CLIENT_UNIQUE = n.IDE_CLIENT_UNIQUE 
                           WHERE c.NOM_CLIENT like :nc and c.PRENOMS_CLIENT like :pc and n.NUMERO_POLICE=:np and c.DATE_NAISSANCE=:dn`;
                let res=DBSQLSERVER.query(query,{
                    replacements:{
                        nc:NOM,
                        pc:PRENOM,
                        np:NUMERO_POLICE,
                        dn:DATE_NAISSANCE
                    },
                    type:DBSQLSERVER.QueryTypes.SELECT
                }).then(user=>{
                    if(user.length){
                        console.dir(user);
                        fut['return'](user);
                        //return user;
                    }else{
                        throw new Meteor.Error("error","Cet utilisateur est inexistant dans la base de données.Veuillez vous diriger vers le service clientèle.");  
                    }
                    
                }).catch((err)=>{
                    //console.log(err);
                    fut['return']({error:err.reason});
                   // return err.reason;
                });
               
            }
            
            return fut.wait(); 
        }
    });
};
