//bootstrap Dependencies
var Cloud = require('ti.cloud');
var moment = require('lib/moment');
var appConfig = require('config/appConfig');

//check if ACS session already stored, if Success load AppTabGroup - if Fail load LoginTabGroup
Cloud.Users.showMe(function (e) {
    if (e.success) {
        var user = e.users[0];
        Ti.App.Properties.setString('user_id',user.id);
        Ti.API.info('I am logged in');
        applicationTabGroup.open();
    } 
    else {
    	loginTabGroup.open();
    }
});

//declare module dependencies
var ApplicationTabGroup = require('ui/ApplicationTabGroup'),
	LoginTabGroup = require('ui/LoginTabGroup');
	
//construct tab groups	
var applicationTabGroup = new ApplicationTabGroup(),
	loginTabGroup = new LoginTabGroup();

//Global Listener to switch between Tab Groups
Ti.App.addEventListener('closeLogin', function(e){
	loginTabGroup.close();
	applicationTabGroup.open();
})
	
