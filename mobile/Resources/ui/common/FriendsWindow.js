function FriendsWindow(title) {
	
	var AddFriendView = require('ui/common/AddFriendView'), ProfileView = require('ui/common/ProfileView');
	var addFriendView = new AddFriendView(), profileView = new ProfileView();
	
	//create resource detail view container
	var addFriendContainerWindow = Ti.UI.createWindow({
		title:'Add Friends',
		backgroundColor : appConfig.backgroundColor,
		barColor:appConfig.primaryColor,
		tabBarHidden : true,
		navBarHidden:false,
		backButtonTitle:'Back'
	});
	addFriendContainerWindow.add(addFriendView);
	
	var profileContainerWindow = Ti.UI.createWindow({
		title:'Profile',
		backgroundColor : appConfig.backgroundColor,
		barColor:appConfig.primaryColor,
		tabBarHidden : true,
		navBarHidden:false,
		backButtonTitle:'Back'
	});
	profileContainerWindow.add(profileView);
	
	var self = Ti.UI.createWindow({
		title:'Friends',
		backgroundColor:appConfig.backgroundColor,
		barColor:appConfig.primaryColor
	});
	
	var data = [];
	
	var addFriendButton = Ti.UI.createButton({
		image:'images/nav/plus.png'
	});
	
	self.rightNavButton = addFriendButton;	
	
	var search = Titanium.UI.createSearchBar({
		barColor:appConfig.secondaryColor,
		showCancel:false,
		hintText:'Search your Friends'
	});
	
	search.addEventListener('change', function(e)
	{
		e.value; // search string as user types
	});
	search.addEventListener('return', function(e)
	{
		search.blur();
	});
	search.addEventListener('cancel', function(e)
	{
		search.blur();
	});	
	
	var friendsTableView = Ti.UI.createTableView({
		top:0,
		height:Ti.UI.FILL,
		width:Ti.UI.FILL,
		search:search,
		backgroundColor:'transparent',
		minRowHeight:50,
		filterAttribute:'username'
	});
	
	self.add(friendsTableView)
	
	var friendSwitch = Titanium.UI.iOS.createTabbedBar({
		labels:['Friends', 'Requests', 'Inbox'],
		backgroundColor:appConfig.primaryColor,
		index:0
	});
	
	var flexSpace = Titanium.UI.createButton({
		systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});
	
	var friendToolBar = Ti.UI.iOS.createToolbar({
		barColor:appConfig.secondaryColor,
		bottom:0,
		items:[flexSpace,friendSwitch,flexSpace]
	});
	
	self.add(friendToolBar)
	
	
	function loadFriends(){
		
		data = [];
		friendsTableView.setData(data);
		
		Cloud.Friends.search({
		    user_id: Ti.App.Properties.getString('user_id')
		}, function (e) {
		    if (e.success) {
		        Ti.API.info('Success:\\n' +
		            'Count: ' + e.users.length);
		        for (var i = 0; i < e.users.length; i++) {
		            var user = e.users[i];
		            
		            var row = Titanium.UI.createTableViewRow({
		            	height:Ti.UI.SIZE,
		            	userID:user.id,
		            	username:user.username,
		            	className:'friendRow'
		            });
		            
		            var container = Ti.UI.createView({
		            	top:5,
		            	bottom:5,
		            	left:5,
		            	right:5,
		            	width:Ti.UI.SIZE,
		            	height:Ti.UI.SIZE
		            });
		            
		            var profilePic = Ti.UI.createImageView({
						top:5,
						left:5,
						height:50,
						width:50,
						hires:true,
						image:user.photo.urls.thumb_100
					});
		            
		            var userLabel = Ti.UI.createLabel({
		            	top:5,
		            	left:80,
		            	height:Ti.UI.SIZE,
		            	width:Ti.UI.SIZE,
		            	font: {fontSize:20, fontFamily:appConfig.primaryFontFamily},
		            	text:user.username
		            });

		            container.add(profilePic);
		          	container.add(userLabel);
		          	row.add(container);
		         	data.push(row); 
		        }
		        friendsTableView.setData(data);
		    } else {
		        alert('Error:\\n' +
		            ((e.error && e.message) || JSON.stringify(e)));
		    }
		});
	}
	
	function loadFriendRequests(){
		
		data = [];
		friendsTableView.setData(data);
		
		
		Cloud.Friends.requests(function (e) {
		    if (e.success) {
		        for (var i = 0; i < e.friend_requests.length; i++) {
		            var user = e.friend_requests[i].user;
		            
		            var row = Titanium.UI.createTableViewRow({
		            	height:Ti.UI.SIZE,
		            	userID:user.id,
		            	username:user.username,
		            	className:'friendRow'
		            });
		            
		            var container = Ti.UI.createView({
		            	top:5,
		            	bottom:5,
		            	left:5,
		            	right:5,
		            	width:Ti.UI.SIZE,
		            	height:Ti.UI.SIZE,
		            	layout:'vertical'
		            });
		            
		            var userLabel = Ti.UI.createLabel({
		            	top:5,
		            	left:5,
		            	height:Ti.UI.SIZE,
		            	width:Ti.UI.SIZE,
		            	font: {fontSize:20, fontFamily:appConfig.primaryFontFamily},
		            	text:user.username
		            });

		            container.add(userLabel),
		          	row.add(container);
		         	data.push(row); 
		        }
		        friendsTableView.setData(data);
		    }
		    else {
		        alert('Error:\\n' +
		            ((e.error && e.message) || JSON.stringify(e)));
		    }
		});
	}
	
	function loadInbox(){
		
		data = [];
		friendsTableView.setData(data);
		
		Cloud.Messages.showInbox(function (e) {
		    if (e.success) {
		        for (var i = 0; i < e.messages.length; i++) {
		            var message = e.messages[i];
				    var now = new Date();
				    var nowWrapper = moment(now);        
				    var formattedDate = moment(message.updated_at);
				    var displayDate = formattedDate.from(nowWrapper);
		            
		            var row = Titanium.UI.createTableViewRow({
		            	height:Ti.UI.SIZE,
						messageID:message.id,
		            	className:'inboxRow'
		            });
		            
		            var container = Ti.UI.createView({
		            	top:5,
		            	bottom:5,
		            	left:5,
		            	right:5,
		            	width:Ti.UI.SIZE,
		            	height:Ti.UI.SIZE,
		            	layout:'vertical'
		            });
		            
		            var userLabel = Ti.UI.createLabel({
		            	top:5,
		            	left:5,
		            	height:Ti.UI.SIZE,
		            	width:Ti.UI.SIZE,
		            	font: {fontSize:20, fontFamily:appConfig.primaryFontFamily},
		            	text:message.from.username
		            });
		            
		             var subjectLabel = Ti.UI.createLabel({
		            	top:5,
		            	left:15,
		            	height:Ti.UI.SIZE,
		            	width:Ti.UI.SIZE,
		            	color:appConfig.primaryColor,
		            	font: {fontSize:18, fontFamily:appConfig.primaryFontFamily},
		            	text:message.subject
		            });
		            
		            var dateFrom = Ti.UI.createLabel({
		            	top:5,
		            	left:15,
		            	height:Ti.UI.SIZE,
		            	width:Ti.UI.SIZE,
		            	color:appConfig.secondaryColor,
		            	font: {fontSize:16, fontFamily:appConfig.primaryFontFamily},
		            	text:displayDate
		            })

		            container.add(userLabel),
		            container.add(subjectLabel),
		            container.add(dateFrom);
		          	row.add(container);
		         	data.push(row); 
		        }
		        friendsTableView.setData(data);
		    } else {
		        alert('Error:\\n' +
		            ((e.error && e.message) || JSON.stringify(e)));
		    }
		});
		
	}	
	
	self.addEventListener('focus', function(e){
		Ti.API.info('focused Friends Window - Refreshing Table');
		loadFriends();
	})
	
	addFriendButton.addEventListener('click', function(e){
		self.containingTab.open(addFriendContainerWindow)	
	});
	
	friendSwitch.addEventListener('click', function(e){
		if (e.index == 0){
			loadFriends();
		}
		else if (e.index == 1) {
			loadFriendRequests();
		}
		else if (e.index ==2){
			loadInbox();
		}
	});
	
	friendsTableView.addEventListener('click', function(e){
		
		if (friendSwitch.index == 0){
			profileView.fireEvent('sendFriendID', {id:e.rowData.userID})
			self.containingTab.open(profileContainerWindow)
		}
		else {
			var userID = e.rowData.userID;
			
			var addFriendDialog = Ti.UI.createOptionDialog({
				title:'Do you want to confirm '+e.rowData.username+' as a friend?',
				options:['Confirm Friend', 'Cancel'],
				destructive:1
			});
			
			addFriendDialog.show();
			
			addFriendDialog.addEventListener('click', function(e){
				if (e.index == 0){
					Cloud.Friends.approve({
					    user_ids: userID
					}, function (e) {
					    if (e.success) {
					        alert('Friend(s) approved');
					        friendSwitch.index = 0;
					        loadFriends();
					    } else {
					        alert('Error:\\n' +
					            ((e.error && e.message) || JSON.stringify(e)));
					    }
					});
				}
			});
		}
	})
	
	return self;
};

module.exports = FriendsWindow;
