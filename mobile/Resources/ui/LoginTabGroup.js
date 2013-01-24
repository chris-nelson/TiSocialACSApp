function LoginTabGroup() {
	
	var LoginWindow = require('ui/common/Login/LoginWindow'),
		RegisterWindow = require('ui/common/Login/RegisterWindow');
	
	var loginWindow = new LoginWindow(L('Login')),
		registerWindow = new RegisterWindow(L('Register'));
		
	//create module instance
	var self = Ti.UI.createTabGroup();
	
	var tab1 = Ti.UI.createTab({
		title: L('Login'),
		icon: '/images/tab/icon-check.png',
		window: loginWindow
	});
	loginWindow.containingTab = tab1;
	
	var tab2 = Ti.UI.createTab({
		title: L('Register'),
		icon: '/images/tab/register.png',
		window: registerWindow
	});
	registerWindow.containingTab = tab2;
	
	
	self.addTab(tab1),
	self.addTab(tab2);
	
	registerWindow.addEventListener('returnToLogin', function(e){
		self.setActiveTab(0);
	})
	
	return self;
};

module.exports = LoginTabGroup;
