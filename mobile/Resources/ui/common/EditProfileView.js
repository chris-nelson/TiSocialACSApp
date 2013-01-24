function EditProfileView() {
	var self = Ti.UI.createView({
		backgroundColor : 'white',
	});
	
	var data = [
		{title:'Change Username', header:'Profile Settings'},
		{title:'Change Tagline'},
		{title:'Change Name'},
		{title:'Change/Add Profile Picture'}
	]
	
	var table = Ti.UI.createTableView({
		style:Titanium.UI.iPhone.TableViewStyle.GROUPED,
		data:data
	});
	self.add(table);

	
	return self;
};

module.exports = EditProfileView;
