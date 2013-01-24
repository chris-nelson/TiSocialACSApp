function AddFriendView() {
	var self = Ti.UI.createView({
		backgroundColor : appConfig.backgroundColor,
	});
	
	var data = [];
	
	var search = Titanium.UI.createSearchBar({
		barColor:appConfig.secondaryColor,
		showCancel:false,
		top:0,
		hintText:'Search your Friends'
	});
	
	search.addEventListener('return', function(e)
	{
		loadFriendSearch(e.value);
		search.blur();
	});
	search.addEventListener('cancel', function(e)
	{
		search.blur();
	});	
	
	self.add(search);
	
	var addFriendTableView = Ti.UI.createTableView({
		top:40,
		height:Ti.UI.FILL,
		width:Ti.UI.FILL,
		backgroundColor:'transparent',
		minRowHeight:50,
		filterAtribute:'username'
	});
	
	self.add(addFriendTableView)
	
	function loadFriendSearch(searchData){
		
		Ti.API.info(searchData);
		
		data = [];
		
		addFriendTableView.setData(data);
		
		
		Cloud.Users.search({
		    q: searchData
		}, function (e) {
		    if (e.success) {
		        for (var i = 0; i < e.users.length; i++) {
		            var user = e.users[i];
		            
		            var row = Titanium.UI.createTableViewRow({
		            	height:Ti.UI.SIZE,
		            	userID:user.id,
		            	username:user.username
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
			     addFriendTableView.setData(data);
		    } 
		    else {
		        alert('Error:\\n' +
		            ((e.error && e.message) || JSON.stringify(e)));
		    }
		});
	};
	
	addFriendTableView.addEventListener('click', function(e){
		
		var userID = e.rowData.userID;
		
		var addFriendDialog = Ti.UI.createOptionDialog({
			title:'Do you want to add '+e.rowData.username+' as a friend?',
			options:['Add Friend', 'Cancel'],
			destructive:1
		});
		
		addFriendDialog.show();
		
		addFriendDialog.addEventListener('click', function(e){
			if (e.index == 0){
				
				Cloud.Friends.add({
				    user_ids: userID
				}, function (e) {
				    if (e.success) {
				        alert('Friend(s) added');
				    } else {
				        alert('Error:\\n' +
				            ((e.error && e.message) || JSON.stringify(e)));
				    }
				});
			}
		})
	})
	
	
	return self;
};

module.exports = AddFriendView;
