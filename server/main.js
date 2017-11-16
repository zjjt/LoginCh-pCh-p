import { Meteor } from 'meteor/meteor';
import '../imports/startup/server/index';
import methods from './methods';

Meteor.startup(() => {
  // code to run on server at startup
  methods();
});
