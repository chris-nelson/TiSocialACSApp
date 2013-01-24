function ApplicationTabGroup() {
	
	var FeedWindow = require('ui/common/FeedWindow'),
		FriendsWindow = require('ui/common/FriendsWindow'), 
		ProfileWindow = require('ui/common/ProfileWindow'), 
		SettingsWindow = require('ui/common/SettingsWindow') ;
	
	var feedWindow = new FeedWindow(L('Feed')),
		friendsWindow = new FriendsWindow(L('Friends')),
		profileWindow = new ProfileWindow(L('Profile')),
		settingsWindow = new SettingsWindow(L('Settings'));
		
	//create module instance
	var self = Ti.UI.createTabGroup();
	
	var tab1 = Ti.UI.createTab({
		title: L('Feed'),
		icon: '/images/tab/icon-globe.png',
		window: feedWindow
	});
	feedWindow.containingTab = tab1;
	
	var tab2 = Ti.UI.createTab({
		title: L('Friends'),
		icon: '/images/tab/icon-community.png',
		window: friendsWindow
	});
	friendsWindow.containingTab = tab2;
	
	var tab3 = Ti.UI.createTab({
		title: L('Profile'),
		icon: '/images/tab/icon-profile.png',
		window: profileWindow
	});
	profileWindow.containingTab = tab3;
	
	var tab4 = Ti.UI.createTab({
		title: L('Settings'),
		icon: '/images/tab/icon-settings2.png',
		window: settingsWindow
	});
	settingsWindow.containingTab = tab4;
	
	self.addTab(tab1),
	self.addTab(tab2),
	self.addTab(tab3),
	self.addTab(tab4);

	
	return self;
};

module.exports = ApplicationTabGroup;
