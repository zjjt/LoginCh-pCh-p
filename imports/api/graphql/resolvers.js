import {Meteor} from 'meteor/meteor';
import {DBSQLSERVER} from './connectors.js';
import Sequelize from 'sequelize';
import Future from 'fibers/future';

DBSQLSERVER.sync();
DBSQLSERVER.authenticate().then(()=>{
    console.log('Connection MsSql etablie');
}).catch(()=>{
    console.log('Impossible de se connecter a MsSql,veuillez reverifier');
});

const resolvers={
    Query:{
        client(_,args,context){
            let res=[];
            if(args.nom && !args.prenom && !args.birthDate && !args.numpolice){
                let query=`select top 10 u.LOGIN,u.MOT_DE_PASSE,c.NOM_CLIENT+' '+c.PRENOMS_CLIENT as NOM_COMPLET,c.DATE_NAISSANCE,n.NUMERO_POLICE,c.TELEPHONE from utilisateur u 
                           JOIN CLIENT_UNIQUE c on u.IDE_CLIENT_UNIQUE = c.IDE_CLIENT_UNIQUE 
                           JOIN CONTRATS n on u.IDE_CLIENT_UNIQUE = n.IDE_CLIENT_UNIQUE 
                           WHERE c.NOM_CLIENT like :nc `;

                           return DBSQLSERVER.query(query,{
                                replacements:{
                                    nc:args.nom,
                                },
                                type:DBSQLSERVER.QueryTypes.SELECT
                            }).then(user=>{
                                if(user.length){
                                    console.dir(user);
                                    return user;
                                }else{
                                    throw new Meteor.Error("error","Cet utilisateur est inexistant dans la base de données.Veuillez vous diriger vers le service clientèle.");  
                                }
                                
                            }).catch((err)=>{
                                //console.log(err);
                               return err.reason;
                            });
                
            }else if(args.nom && args.prenom && !args.birthDate && !args.numpolice){
                let query=`select top 10 u.LOGIN,u.MOT_DE_PASSE,c.NOM_CLIENT+' '+c.PRENOMS_CLIENT as NOM_COMPLET,c.DATE_NAISSANCE,n.NUMERO_POLICE,c.TELEPHONE from utilisateur u 
                           JOIN CLIENT_UNIQUE c on u.IDE_CLIENT_UNIQUE = c.IDE_CLIENT_UNIQUE 
                           JOIN CONTRATS n on u.IDE_CLIENT_UNIQUE = n.IDE_CLIENT_UNIQUE 
                           WHERE c.NOM_CLIENT like :nc and c.PRENOMS_CLIENT like :pc`;
                          
                           return DBSQLSERVER.query(query,{
                                replacements:{
                                    nc:args.nom,
                                    pc:args.prenom
                                },
                                type:DBSQLSERVER.QueryTypes.SELECT
                            }).then(user=>{
                                if(user.length){
                                    console.dir(user);
                                    return user;
                                }else{
                                    throw new Meteor.Error("error","Cet utilisateur est inexistant dans la base de données.Veuillez vous diriger vers le service clientèle.");  
                                }
                                
                            }).catch((err)=>{
                                //console.log(err);
                             return err.reason;
                            });

            }else if(args.nom && args.prenom && args.birthDate && !args.numpolice){
                let query=`select top 10 u.LOGIN,u.MOT_DE_PASSE,c.NOM_CLIENT+' '+c.PRENOMS_CLIENT as NOM_COMPLET,c.DATE_NAISSANCE,n.NUMERO_POLICE,c.TELEPHONE from utilisateur u 
                            JOIN CLIENT_UNIQUE c on u.IDE_CLIENT_UNIQUE = c.IDE_CLIENT_UNIQUE 
                            JOIN CONTRATS n on u.IDE_CLIENT_UNIQUE = n.IDE_CLIENT_UNIQUE 
                            WHERE c.NOM_CLIENT like :nc and c.PRENOMS_CLIENT like :pc and c.DATE_NAISSANCE=:dn `;
                            
                            return DBSQLSERVER.query(query,{
                                replacements:{
                                    nc:args.nom,
                                    pc:args.prenom,
                                    dn:args.birthDate
                                },
                                type:DBSQLSERVER.QueryTypes.SELECT
                            }).then(user=>{
                                if(user.length){
                                    console.dir(user);
                                    return user;
                                }else{
                                    throw new Meteor.Error("error","Cet utilisateur est inexistant dans la base de données.Veuillez vous diriger vers le service clientèle.");  
                                }
                                
                            }).catch((err)=>{
                                //console.log(err);
                               return err.reason;
                            });

            }else if(args.nom && args.prenom && args.birthDate && args.numpolice){
                let query=`select top 10 u.LOGIN,u.MOT_DE_PASSE,c.NOM_CLIENT+' '+c.PRENOMS_CLIENT as NOM_COMPLET,c.DATE_NAISSANCE,n.NUMERO_POLICE,c.TELEPHONE from utilisateur u 
                            JOIN CLIENT_UNIQUE c on u.IDE_CLIENT_UNIQUE = c.IDE_CLIENT_UNIQUE 
                            JOIN CONTRATS n on u.IDE_CLIENT_UNIQUE = n.IDE_CLIENT_UNIQUE 
                            WHERE c.NOM_CLIENT like :nc and c.PRENOMS_CLIENT like :pc and c.DATE_NAISSANCE=:dn and n.NUMERO_POLICE=:np`;
                            
                            return DBSQLSERVER.query(query,{
                                replacements:{
                                    nc:args.nom,
                                    pc:args.prenom,
                                    dn:args.birthDate,
                                    np:args.numpolice
                                },
                                type:DBSQLSERVER.QueryTypes.SELECT
                            }).then(user=>{
                                if(user.length){
                                    console.dir(user);
                                    return user;
                                }else{
                                    throw new Meteor.Error("error","Cet utilisateur est inexistant dans la base de données.Veuillez vous diriger vers le service clientèle.");  
                                }
                                
                            }).catch((err)=>{
                                //console.log(err);
                              return err.reason;
                            });
            }else{
                return [];
            }
            
        }    
    },
    /*Mutation:{
        deleteUsers(_,args){
             const codeArr=args.usercodes;
            Meteor.users.remove({codeRedac:{
                $in:codeArr
            }});
            userSQL.destroy({where:{
                    Redac:codeArr
                }});
                return Meteor.users.find({}).fetch();
            // return userSQL.findAll({attributes:{exclude:['id']},order:[['Nom','DESC']]});
        }
    }
   */
};



export default resolvers;