function SettingsWindow(title) {
	var self = Ti.UI.createWindow({
		title:'Settings',
		backgroundColor:appConfig.backgroundColor,
		barColor:appConfig.primaryColor,
	});
	
	var data = [
		{title:'Change Email Address', header:'User Settings'},
		{title:'Request Password Reset'},
		{title:'Notifications', header:'App Settings'},
		{title:'Rate/Review'},
		{title:'Feedback'},
		{title:'Sharing'},
		{title:'Delete Account'},
	
	]
	
	var table = Ti.UI.createTableView({
		style:Titanium.UI.iPhone.TableViewStyle.GROUPED,
		data:data
	});
	self.add(table);


	table.addEventListener('click', function(e){
		switch(e.rowData.title)
		{
			case 'Change Email Address':
				Ti.API.info('Change Email Address');
				////create new view with change email addreses inputs
				//// *todo*
				break;
			case 'Request Password Reset':
				Ti.API.info('Request Password Reset')
				resetPasswordDialog.show();
				break;
			case 'Notifications':
				Ti.API.info('Notifications');
				////Create new view with notifications options
				//// *todo*
				break;
			case 'Rate/Review':
				Ti.API.info('Rate/Review')
				////Ti.Platform.openURL('LINK TO YOUR APP);
				//// or just use a module from the MarketPlace
				break;
			case 'Feedback':
				Ti.API.info('Feedback');
				////Open Email dialog to feedback@yourservice.com
				/// *todo*
				break;
			case 'Sharing':
				Ti.API.info('Sharing');
				////Create new View with facebook/twitter options and a link to share a general status about the service
				/// *todo*
				break;
			case 'Delete Account':
				Ti.API.info('Delete Account');
				deleteAccountDialog.show();
				break;						
		}
		
	});
	
	/// Reset Password Dialog and Listener
	
	var resetPasswordDialog = Ti.UI.createAlertDialog({			
		title: 'Enter Password',
		style: Ti.UI.iPhone.AlertDialogStyle.PLAIN_TEXT_INPUT,
		buttonNames: ['OK', 'Cancel']
		});

	resetPasswordDialog.addEventListener('click', function(e) {
		if (e.index == 0) {
			///smtp settings required in ACS console
			Cloud.Users.requestResetPassword({
				email : e.text
			}, function(e) {
				if (e.success) {
					alert('Success: Reset Request Sent');
				} else {
					alert('Error:\\n' + ((e.error && e.message) || JSON.stringify(e)));
				}
			});
		} else {
			return
		}
	}); 

	
	
	///// Delete Account Dialog and Listener
	var deleteAccountDialog = Ti.UI.createOptionDialog({
		cancel: 1,
  		options: ['Confirm', 'Cancel'],
  		title: 'Delete User?'
	});
				
				
	deleteAccountDialog.addEventListener('click', function(e) {
		if (e.index == 0) {
			Cloud.Users.remove(function(e) {
				if (e.success) {
					alert('Successfuly Deleted');
					//self.fireEvent('delete') - todo add listener in app.js to delete Properties ID and load LoginTab
				} else {
					alert('Error:\\n' + ((e.error && e.message) || JSON.stringify(e)));
				}
			});
		}
	});

	
	return self;
};

module.exports = SettingsWindow;
