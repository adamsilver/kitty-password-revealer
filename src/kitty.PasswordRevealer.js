kitty.PasswordRevealer = function(el) {
	this.el = el;
	this.passwordControl = $(el);
	this.showingPassword = false;
	this.createButton();
};

kitty.PasswordRevealer.prototype.createButton = function() {
	this.button = $('<button>Show password</button>');
	this.passwordControl.parent().append(this.button);
	this.button.on('click', $.proxy(this, 'onButtonClicked'));
};

kitty.PasswordRevealer.prototype.onButtonClicked = function(e) {
	if(this.showingPassword) {
		this.hidePassword();
	} else {
		this.revealPassword();
	}
};

kitty.PasswordRevealer.prototype.revealPassword = function() {
	this.el.type = "text";
	this.showingPassword = true;
};

kitty.PasswordRevealer.prototype.hidePassword = function() {
	this.el.type = "password";
	this.showingPassword = false;
};