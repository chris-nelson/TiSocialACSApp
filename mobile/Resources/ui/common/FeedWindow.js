function FeedWindow(title) {
	
	var self = Ti.UI.createWindow({
		title:'Feed',
		backgroundColor:appConfig.backgroundColor,
		barColor:appConfig.primaryColor,
	});
	
	var composeButton = Ti.UI.createButton({
		image:'images/nav/post.png'
	});
	
	self.rightNavButton = composeButton;
	
	var data = [];
	var friendData = [];
	
	var search = Titanium.UI.createSearchBar({
		barColor:appConfig.secondaryColor,
		showCancel:false,
		top:0,
		hintText:'Search your Friends'
	});
	
	search.addEventListener('return', function(e)
	{
		//loadFeedSearch(e.value);
		// search statuses - is this possible?
		search.blur();
	});
	search.addEventListener('cancel', function(e)
	{
		search.blur();
	});	
	
	self.add(search);
	
	var feedTableView = Ti.UI.createTableView({
		top:45,
		bottom:40,
		height:Ti.UI.FILL,
		width:Ti.UI.FILL,
		backgroundColor:'transparent',
		minRowHeight:50,
	});
	
	self.add(feedTableView);
	
	var feedSwitch = Titanium.UI.iOS.createTabbedBar({
		labels:['Friends', 'Public'],
		backgroundColor:appConfig.primaryColor,
		index:0
	});
	
	var flexSpace = Titanium.UI.createButton({
		systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});
	
	var feedToolBar = Ti.UI.iOS.createToolbar({
		barColor:appConfig.secondaryColor,
		bottom:0,
		items:[flexSpace,feedSwitch,flexSpace]
	});
	
	self.add(feedToolBar)
	
	var composeView = Ti.UI.createView({
		top:100,
		height:250,
		width:300,
		backgroundColor:appConfig.primaryColor,
		backgroundImage:'images/composeBG.png',
		borderColor:appConfig.secondaryColor,
		borderWidth:1,
		borderRadius:3,
		zIndex:10,
		opacity:0
	});
	
	var composeText = Ti.UI.createTextArea({
		height:240,
		width:290,
		top:5,
		left:5,
		right:5,
		bottom:5,
		hintText:'Share your thoughts here',
		backgroundColor:'transparent',
		font: {fontSize:20, fontFamily:appConfig.primaryFontFamily},
	});
	
	var footerView = Ti.UI.createView({
		bottom:0,
		height:50,
		width:Ti.UI.FILL,
		backgroundColor:appConfig.secondaryColor
	});
	
	var cancelButton = Ti.UI.createButton({
		top:5,
		left:5,
		height:40,
		width:70,
		backgroundImage:'none',
		backgroundColor:appConfig.primaryColor,
		color:'black',
		title:'Cancel'
	});
	
	var submitButton = Ti.UI.createButton({
		top:5,
		right:5,
		height:40,
		width:70,
		backgroundImage:'none',
		backgroundColor:appConfig.primaryColor,
		color:'black',
		title:'Submit'
	});
	
	footerView.add(submitButton);
	footerView.add(cancelButton);
	composeView.add(composeText);
	composeView.add(footerView);
	
	
	self.add(composeView);
	
	composeButton.addEventListener('click', function(e){
		Ti.API.info('compose');
		composeView.animate({opacity:1, duration:500})
	});
	
	cancelButton.addEventListener('click', function(e){
		Ti.API.info('cancel');
		composeText.value = '';
		composeText.blur();
		composeView.animate({opacity:0, duration:500})
	})
	
	submitButton.addEventListener('click', function(e){
		Ti.API.info('submit');
		Cloud.Statuses.create({
		    message: composeText.value ,
		}, function (e) {
		    if (e.success) {
		        var status = e.statuses[0];
		        composeView.animate({opacity:0, duration:750});
		        composeText.value = '';
		        loadFriendFeed();
		    } else {
		        alert('Error:\\n' +
		            ((e.error && e.message) || JSON.stringify(e)));
		    }
		});
		
	})
	
	function loadFriendFeed(){
		
		//// Not working - friend ID's arent being pushed to data array properly, so the query of statuses returns empty
		//// *todo*
		
		Ti.API.info('loading feed');
		
		data = [];
		var friendShitData = [];
		
		feedTableView.setData(data);
		
		Cloud.Friends.search({
		    user_id: Ti.App.Properties.getString('user_id')
		}, function (e) {
		    if (e.success) {
		        Ti.API.info('Success:\\n' +
		            'Count: ' + e.users.length);
		        for (var i = 0; i < e.users.length; i++) {
		            var user = e.users[i];
		          	friendShitData.push(user.id);
		          	Ti.API.info(user.id);		          	
		        }		        
		        Ti.API.info(friendShitData);		  
		        //////second api call start
		        Cloud.Statuses.query({
				    page: 1,
				    per_page: 20,
				    order : '-created_at',
				    where: { user_id:
				    			{'$in':friendShitData}
				    		}	
				}, function (e) {
					Ti.API.info('query callback')
				    if (e.success) {
				        for (var j = 0; j < e.statuses.length; j++) {
				            Ti.API.info('Query Loop')
				            var status = e.statuses[j];
				            var now = new Date();
				            var nowWrapper = moment(now);
				            
				            var formattedDate = moment(status.updated_at);
				            var displayDate = formattedDate.from(nowWrapper);
				            
				            var row = Titanium.UI.createTableViewRow({
				            	height:Ti.UI.SIZE,
				            	className:'feedRow'
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
				    	
				    	feedTableView.setData(data);     
				    } 
				    
				    else {
				        alert('Error:\\n' +
				            ((e.error && e.message) || JSON.stringify(e)));
				    }
				});
		        
		        
		        ////second api call end
		    } else {
		        alert('Error:\\n' +
		            ((e.error && e.message) || JSON.stringify(e)));
		    }
		});		
		
	}
	
	function loadPublicFeed(){
		
		Ti.API.info('loading public feed');
		
		data = [];
		
		feedTableView.setData(data);
		
		Cloud.Statuses.query({
		    page: 1,
		    per_page: 20,
		    order: '-updated_at'
		}, function (e) {
		    if (e.success) {
		        for (var i = 0; i < e.statuses.length; i++) {
		            
		            var status = e.statuses[i];
		            var now = new Date();
		            var nowWrapper = moment(now);
		            
		            var formattedDate = moment(status.updated_at);
		            var displayDate = formattedDate.from(nowWrapper);
		            
		            var row = Titanium.UI.createTableViewRow({
		            	height:Ti.UI.SIZE,
		            	className:'feedRow'
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
		    	
		    	feedTableView.setData(data);     
		    } 
		    
		    else {
		        alert('Error:\\n' +
		            ((e.error && e.message) || JSON.stringify(e)));
		    }
		});
	}
	
	self.addEventListener('open', function(e){
		loadFriendFeed();
	});
	
	feedSwitch.addEventListener('click', function(e){
		if (e.index == 0){
			loadFriendFeed();
		}
		else {
			loadPublicFeed();
		}		
	});
	
	return self;
};

module.exports = FeedWindow;
