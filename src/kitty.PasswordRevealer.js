kitty.PasswordRevealer = function(el) {
	this.el = el;
	this.passwordControl = $(el);
	this.showingPassword = false;
	this.showText = "Show password";
	this.hideText = "Hide password";
	this.createButton();
};

kitty.PasswordRevealer.prototype.createButton = function() {
	this.button = $('<a class="revealPassword" href="#">'+this.showText+'</a>');
	this.passwordControl.parent().append(this.button);
	this.button.on('click', $.proxy(this, 'onButtonClicked'));
};

kitty.PasswordRevealer.prototype.onButtonClicked = function(e) {
	e.preventDefault();
	if(this.showingPassword) {
		this.hidePassword();
	} else {
		this.showPassword();
	}
};

kitty.PasswordRevealer.prototype.showPassword = function() {
	this.el.type = "text";
	this.showingPassword = true;
	this.button.text("Hide password");
};

kitty.PasswordRevealer.prototype.hidePassword = function() {
	this.el.type = "password";
	this.showingPassword = false;
	this.button.text("Show password");
};