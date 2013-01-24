function RegisterWindow(title) {
	var self = Ti.UI.createWindow({
		title : 'Register',
		backgroundColor : appConfig.backgroundColor,
		barColor : appConfig.primaryColor
	});

	var scrollView = Titanium.UI.createScrollView({
		contentHeight : 'auto'
	});
	self.add(scrollView);

	var flexSpace = Titanium.UI.createButton({
		systemButton : Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});

	var data = [];

	var section = Ti.UI.createTableViewSection();
	data.push(section);

	var emailRow = Ti.UI.createTableViewRow();
	emailRow.backgroundColor = '#ffffff';
	emailRow.height = 40;

	var emailLabel = Ti.UI.createLabel({
		color : appConfig.secondaryColor,
		text : 'Email',
		font : {
			fontSize : 14,
			fontWeight : 'bold'
		},
		top : 0,
		left : 6,
		height : 40,
		width : 70
	});
	emailRow.add(emailLabel);

	var emailField = Titanium.UI.createTextField({
		color : '#333',
		alight : 'right',
		height : 40,
		top : 0,
		left : 84,
		width : 218,
		hintText : 'you@email.com',
		borderStyle : Titanium.UI.INPUT_BORDERSTYLE_NONE
	});

	emailRow.add(emailField);

	section.add(emailRow);

	var firstNameRow = Ti.UI.createTableViewRow();
	firstNameRow.backgroundColor = '#ffffff';
	firstNameRow.height = 40;

	var firstNameLabel = Ti.UI.createLabel({
		color : appConfig.secondaryColor,
		text : 'First Name',
		font:{fontFamily : appConfig.primaryFontFamily, fontSize:12, fontWeight:'bold'},
		top : 0,
		left : 6,
		height : 40,
		width : 70
	});
	firstNameRow.add(firstNameLabel);

	var firstNameField = Titanium.UI.createTextField({
		color : '#333',
		height : 40,
		top : 0,
		left : 84,
		width : 218,
		hintText : 'First Name Only',
		borderStyle : Titanium.UI.INPUT_BORDERSTYLE_NONE
	});

	firstNameRow.add(firstNameField);

	section.add(firstNameRow);

	var lastNameRow= Ti.UI.createTableViewRow();
	lastNameRow.backgroundColor = '#ffffff';
	lastNameRow.height = 40;

	var lastNameField = Ti.UI.createLabel({

		color : appConfig.secondaryColor,
		text : 'Last Name',
		font:{fontFamily : appConfig.primaryFontFamily, fontSize:12, fontWeight:'bold'},
		top : 0,
		left : 6,
		height : 40,
		width : 70
	});
	lastNameRow.add(lastNameField);

	var lastNameField = Titanium.UI.createTextField({
		color : '#333',
		height : 40,
		top : 0,
		left : 84,
		width : 218,
		hintText : 'Last Name Only',
		borderStyle : Titanium.UI.INPUT_BORDERSTYLE_NONE
	});

	lastNameRow.add(lastNameField);

	section.add(lastNameRow);

	var userNameRow = Ti.UI.createTableViewRow();
	userNameRow.backgroundColor = '#ffffff';
	userNameRow.height = 40;

	var userNameLabel = Ti.UI.createLabel({
		color : appConfig.secondaryColor,
		text : 'Username',
		font:{fontFamily : appConfig.primaryFontFamily, fontSize:12, fontWeight:'bold'},
		top : 0,
		left : 6,
		height : 40,
		width : 70
	});
	userNameRow.add(userNameLabel);

	var userNameField = Titanium.UI.createTextField({
		color : '#333',
		height : 40,
		top : 0,
		left : 84,
		width : 218,
		hintText : '4-18 Character Limit',
		autocapitalization : Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
		borderStyle : Titanium.UI.INPUT_BORDERSTYLE_NONE
	});

	userNameRow.add(userNameField);

	section.add(userNameRow);
	
	var passwordRow = Ti.UI.createTableViewRow();
	passwordRow.backgroundColor = '#ffffff';
	passwordRow.height = 40;

	var passwordLabel = Ti.UI.createLabel({
		color : appConfig.secondaryColor,
		text : 'Password',
		font:{fontFamily : appConfig.primaryFontFamily, fontSize:12, fontWeight:'bold'},
		top : 0,
		left : 6,
		height : 40,
		width : 70
	});
	passwordRow.add(passwordLabel);

	var passwordField = Titanium.UI.createTextField({
		backgroundColor : 'transparent',
		color : '#333',
		height : 40,
		top : 0,
		left : 84,
		width : 200,
		textAlign : 'left',
		hintText : 'Password',
		passwordMask : true,
		borderStyle : Titanium.UI.INPUT_BORDERSTYLE_NONE
	});

	passwordRow.add(passwordField);

	section.add(passwordRow);

	var passwordValidateRow = Ti.UI.createTableViewRow();
	passwordValidateRow.backgroundColor = '#ffffff';
	passwordValidateRow.height = 40;

	var passwordValidateLabel = Ti.UI.createLabel({
		color : appConfig.secondaryColor,
		text : 'Password',
		font:{fontFamily : appConfig.primaryFontFamily, fontSize:12, fontWeight:'bold'},
		top : 0,
		left : 6,
		height : 40,
		width : 70
	});
	passwordValidateRow.add(passwordValidateLabel);

	var passwordValidateField = Titanium.UI.createTextField({
		backgroundColor : 'transparent',
		color : '#333',
		height : 40,
		top : 0,
		left : 84,
		width : 200,
		textAlign : 'left',
		hintText : 'Repeat Password',
		passwordMask : true,
		borderStyle : Titanium.UI.INPUT_BORDERSTYLE_NONE
	});

	passwordValidateRow.add(passwordValidateField);

	section.add(passwordValidateRow);

	var tableview = Titanium.UI.createTableView({
		data : data,
		scrollable : false,
		top : 5,
		style : Titanium.UI.iPhone.TableViewStyle.GROUPED,
		backgroundColor : 'transparent',

	});

	scrollView.add(tableview);


	var submit = Ti.UI.createButton({
		title : 'Submit',
		height : 35,
		width : 130,
		bottom : 20,
		color: 'black',
		backgroundColor:'white',
		backgroundImage:'none',
		borderRadius:3,
		font : {
			fontFamily : 'Verdana',
			fontSize : 15,
		},
	});

	scrollView.add(submit);

	submit.addEventListener('click', function(e){
		////validate fields
		////*todo*
		Cloud.Users.create({
		    email: emailField.value,
		    first_name: firstNameField.value,
		    last_name: lastNameField.value,
		    password: passwordField.value,
		    password_confirmation: passwordValidateField.value
		}, function (e) {
		    if (e.success) {
		        var user = e.users[0];
		        alert('Success:\\n' +
		            'id: ' + user.id + '\\n' +
		            'first name: ' + user.first_name + '\\n' +
		            'last name: ' + user.last_name);
		            ////clear fields
		            clearFields();
		            ////fire even to tabGroup Container and switch windows
		            self.fireEvent('returnToLogin');
		    } else {
		        alert('Error:\\n' +
		            ((e.error && e.message) || JSON.stringify(e)));
		    }
		});
	});
	
	function clearFields(){
		emailField.value = '',
		firstNameField.value = '',
		lastNameField.value = '',
		userNameField.value = '',
		passwordField.value = '',
		passwordValidateField.value = '';
	}


	return self;
};

module.exports = RegisterWindow;
