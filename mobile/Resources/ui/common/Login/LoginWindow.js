function LoginWindow(title) {
	var self = Ti.UI.createWindow({
		title:'Login',
		backgroundColor:appConfig.backgroundColor,
		barColor:appConfig.primaryColor
	});
	
	var data =[];

	var section = Ti.UI.createTableViewSection();
	data.push(section);
	
	var row1 = Ti.UI.createTableViewRow();
	row1.backgroundColor = '#ffffff';
	row1.height = 40;
	
	var item1 = Ti.UI.createLabel({
		color:appConfig.secondaryColor,
		text:'Login',
		font:{fontFamily : appConfig.primaryFontFamily, fontSize:12, fontWeight:'bold'},
		top:0,
		left:6,
		height:40,
		width:70
	});
	row1.add(item1);
	
	var username = Titanium.UI.createTextField({	
		color:appConfig.secondaryColor,
		align:'left',
		height:40,
		top:0,
		left:84,
		width:218,
		hintText:'Username',
		autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_NONE
	});
	
	row1.add(username);
	
	
	section.add(row1);
	
	
	var row2 = Ti.UI.createTableViewRow();
	row2.backgroundColor = '#ffffff';
	row2.height = 40;
	
	var item2 = Ti.UI.createLabel({
		color:appConfig.secondaryColor,
		text:'Password',
		font:{fontFamily : appConfig.primaryFontFamily, fontSize:12, fontWeight:'bold'},
		top:0,
		left:6,
		height:40,
		width:70
	});
	row2.add(item2);
	
	var password = Titanium.UI.createTextField({		
		color:appConfig.secondaryColor,
		height:40,
		top:0,
		left:84,
		width:218,
		hintText:'Password',
		passwordMask:true,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_NONE
		});
		
	row2.add(password);
	
	section.add(row2);

	var tableview = Titanium.UI.createTableView({
		data:data,
		style:Titanium.UI.iPhone.TableViewStyle.GROUPED,
		backgroundColor:'transparent',
	});
	
	self.add(tableview);
	
	
	var button = Titanium.UI.createButton({
		title:'Submit',
		color: 'black',
		backgroundColor:'white',
		backgroundImage:'none',
		borderRadius:3,
		font : {
			fontFamily : appConfig.primaryFontFamily,
			fontSize : 15,
		},
		top: 115,
		width:90,
		height:35
	});
	self.add(button);
	
	var forgot = Titanium.UI.createLabel({
		text:"Forgot password?",
		top:140,
		width:200,
		height:60,
		color:appConfig.secondaryColor,
		textAlign:'center',
		font:{fontFamily : appConfig.primaryFontFamily, fontSize:14,fontFamily:'Palatino'},
	});
	
	self.add(forgot);
	
	function login(){
		Cloud.Users.login({
		    login: username.value,
		    password: password.value
		}, function (e) {
		    if (e.success) {
		        var user = e.users[0];
		        Ti.App.Properties.setString('user_id',user.id);
		        alert('Welcome '+user.first_name+' '+user.last_name)
		        Ti.App.fireEvent('closeLogin'); 
		            
		    } else {
		        alert('Error:\\n' +
		            ((e.error && e.message) || JSON.stringify(e)));
		    }
		});
	}
	
	
	forgot.addEventListener('click', function()
	{
		///	
	});
	
	password.addEventListener('return', function(){
		login();
	});
	
	button.addEventListener('click', function()
	{
		login();
	});

	
	return self;
};

module.exports = LoginWindow;
