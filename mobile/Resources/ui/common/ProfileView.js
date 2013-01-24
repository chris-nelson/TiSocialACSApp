function ProfileView() {
	var self = Ti.UI.createView({
		backgroundColor : 'white',
	});
	
	var data = [];
	
	var profileImage = Ti.UI.createImageView({
		top : 10,
		left : 15,
		height : 75,
		width : 75,
		hires : true,
		borderWidth : 0,
		borderRadius : 3
	});

	self.add(profileImage);

	var userName = Ti.UI.createLabel({
		top : 10,
		left : 105,
		height : 20,
		width : Ti.UI.SIZE,
		font : {
			fontFamily : appConfig.primaryFontFamily,
			fontSize : 19,
			fontWeight : 'bold'
		},
	});

	self.add(userName);

	var fullName = Ti.UI.createLabel({
		top : 32,
		left : 105,
		height : 15,
		width : Ti.UI.SIZE,
		color : 'black',
		font : {
			fontFamily : appConfig.primaryFontFamily,
			fontSize : 15
		},
	});

	self.add(fullName);

	var tagLine = Ti.UI.createLabel({
		top : 50,
		left : 105,
		height : Ti.UI.SIZE,
		width : 205,
		color : 'black',
		font : {
			fontFamily : appConfig.primaryFontFamily,
			fontSize : 12
		},
		text : 'I like to eat Ice Cream and play Violin. Kidding, I hate Ice Cream'
	});

	self.add(tagLine);

	var containerView = Ti.UI.createView({
		top : 105,
		height : 45,
		width : '90%',
		layout : 'horizontal',
		borderColor : '#818081',
		backgroundColor : 'white',
		borderWidth : .5,
		borderRadius : 5
	});

	self.add(containerView);

	var view1 = Ti.UI.createView({
		top : 0,
		left : 0,
		width : '33.33%',
		borderColor : '#818081',
		borderWidth : .5,
	});

	var statusAmount = Ti.UI.createLabel({
		top : 5,
		height : 15,
		width : Ti.UI.SIZE,
		color : 'black',
		textAlign : 'center',
		font : {
			fontFamily : appConfig.primaryFontFamily,
			fontSize : 14
		},
		text : 'Updates:'
	});

	var statusAmountNumber = Ti.UI.createLabel({
		bottom : 5,
		height : 18,
		width : Ti.UI.SIZE,
		color : 'black',
		textAlign : 'center',
		font : {
			fontFamily : appConfig.primaryFontFamily,
			fontSize : 17
		}
	});

	view1.add(statusAmount);
	view1.add(statusAmountNumber);
	containerView.add(view1);

	var view2 = Ti.UI.createView({
		top : 0,
		left : 0,
		width : '33.33%',
		borderColor : '#818081',
		borderWidth : .5,
	});

	var friendAmount = Ti.UI.createLabel({
		top : 5,
		height : 15,
		width : Ti.UI.SIZE,
		color : 'black',
		textAlign : 'center',
		font : {
			fontFamily : appConfig.primaryFontFamily,
			fontSize : 14
		},
		text : 'Friends:'
	});

	var friendAmountNumber = Ti.UI.createLabel({
		bottom : 5,
		height : 18,
		width : Ti.UI.SIZE,
		color : 'black',
		textAlign : 'center',
		font : {
			fontFamily : appConfig.primaryFontFamily,
			fontSize : 17
		},
		text : '25'
	});

	view2.add(friendAmount);
	view2.add(friendAmountNumber);
	containerView.add(view2);

	var view3 = Ti.UI.createView({
		top : 0,
		left : 0,
		width : '33.33%',
		borderColor : '#818081',
		borderWidth : .5,
	});

	var photoAmount = Ti.UI.createLabel({
		top : 5,
		height : 15,
		width : Ti.UI.SIZE,
		color : 'black',
		textAlign : 'center',
		font : {
			fontFamily : appConfig.primaryFontFamily,
			fontSize : 14
		},
		text : 'Photos:'
	});

	var photoAmountNumber = Ti.UI.createLabel({
		bottom : 5,
		height : 18,
		width : Ti.UI.SIZE,
		color : 'black',
		textAlign : 'center',
		font : {
			fontFamily : appConfig.primaryFontFamily,
			fontSize : 17
		},
		text : 'NA'
	});

	view3.add(photoAmount);
	view3.add(photoAmountNumber);
	containerView.add(view3);

	var profileTableView = Ti.UI.createTableView({
		top : 165,
		bottom : 10,
		width : '90%',
		borderWidth : .5,
		borderRadius : 5,
		height : Ti.UI.FILL
	});

	self.add(profileTableView);

	function loadProfile(friendID) {

		Cloud.Users.show({
    		user_id: friendID
		}, function(e) {
			if (e.success) {
				var user = e.users[0];
				profileImage.image = user.photo.urls.original;
				userName.text = user.username;
				fullName.text = user.first_name + ' ' + user.last_name;
				loadStatuses(friendID);
			} else {
				//...
			}
		});
	};

	function loadStatuses(friendID) {
		
		data = [];
		profileTableView.setData(data);
		
		Cloud.Statuses.search({
			user_id : friendID
		}, function(e) {
			if (e.success) {
				statusAmountNumber.text = e.statuses.length;
				for (var i = 0; i < e.statuses.length; i++) {
					var status = e.statuses[i];
					var now = new Date();
					var nowWrapper = moment(now);

					var formattedDate = moment(status.updated_at);
					var displayDate = formattedDate.from(nowWrapper);

					var row = Titanium.UI.createTableViewRow({
						height : Ti.UI.SIZE,
						className : 'profileRow'
					});

					var container = Ti.UI.createView({
		            	top:5,
		            	bottom:5,
		            	left:5,
		            	right:5,
		            	width:Ti.UI.SIZE,
		            	height:Ti.UI.SIZE
		            });
		            
		            var userName = Ti.UI.createLabel({
						top : 5,
						left : 80,
						height : Ti.UI.SIZE,
						width : Ti.UI.SIZE,
						color : 'black',
						font : { fontSize:20, fontFamily:appConfig.primaryFontFamily}, 
						text : status.user.username
					})
		            
							
					var profilePic = Ti.UI.createImageView({
						top:5,
						left:5,
						height:50,
						width:50,
						hires:true,
						image:status.user.photo.urls.thumb_100
					});
						
		            
		            var statusUpdate = Ti.UI.createLabel({   	
						top:30,
						left:80,
						bottom:25,
						height:Ti.UI.SIZE,
						width:Ti.UI.FILL,
						font: { fontSize:15, fontFamily:appConfig.secondaryFontFamily}, 		
						text:status.message
					});

					var dateLabel = Ti.UI.createLabel({
						bottom :0,
						right : 5,
						height : Ti.UI.SIZE,
						width : Ti.UI.SIZE,
						color : appConfig.secondaryColor,
						font : { fontSize:15, fontFamily:appConfig.primaryFontFamily}, 
						text : displayDate
					});
					
					container.add(profilePic),
					container.add(userName),
		            container.add(statusUpdate),
		          	container.add(dateLabel);
		          	row.add(container);
		         	data.push(row);  
				}

				profileTableView.setData(data);
				loadFriends(friendID);
			} else {
				alert('Error:\\n' + ((e.error && e.message) || JSON.stringify(e)));
			}
		});

	};
	
	function loadFriends(friendID){
		
		Cloud.Friends.search({
		    user_id: friendID
		}, function (e) {
		    if (e.success) {
		        friendAmountNumber.text = e.users.length
		    } else {
		        alert('Error:\\n' +
		            ((e.error && e.message) || JSON.stringify(e)));
		    }
		});
	};


	self.addEventListener('open', function(e) {
		loadProfile();
	})
	
	self.addEventListener('sendFriendID', function(e){
		loadProfile(e.id);
	})	
	
	return self;
};

module.exports = ProfileView;
