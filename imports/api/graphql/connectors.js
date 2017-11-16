import Sequelize from 'sequelize';
import {Meteor} from 'meteor/meteor';

/*const DBSQLITE=new Sequelize('nsiafinanceLOCAL','','',{
  host:'localhost',
  dialect:'sqlite',
  storage:'./NFINDB.sqlite'
});*/

const DBSQLSERVER= new Sequelize(Meteor.settings.DBSQLSERVER_DATABASE,Meteor.settings.DBSQLSERVER_USER, Meteor.settings.DBSQLSERVER_PASSWORD, {
    host:Meteor.settings.DBSQLSERVER_HOST,
    port:Meteor.settings.DBSQLSERVER_PORT,
    dialect: 'mssql',
    dialectOptions:{
      requestTimeout:1625000
    },
    //storage: './DB/moduleRGT.db',
});

//-----------------DBMODELS DE LA BASE SQL SERVER------------


export {DBSQLSERVER};