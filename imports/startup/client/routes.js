import {FlowRouter} from 'meteor/kadira:flow-router';
import {Meteor} from 'meteor/meteor';
import {mount} from 'react-mounter';
import React from 'react';
import MainLayout from '../../ui/layouts/MainLayout/MainLayout.jsx';
import Identiform from '../../ui/containers/Identiform.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {Session} from 'meteor/session';

injectTapEventPlugin();
FlowRouter.route('/',{
	name:'home',
	triggersEnter:[(context,redirect)=>{
	}],
	action(){
		mount(MainLayout,
			{content:()=><Identiform/>})
	}
});