describe("Password Revealer", function() {

	var passwordRevealer;
	var mockEl = {};
	var mockPasswordControl;
	var mockWrapper;
	var mockButton;
	var mockProxy = {};

	beforeEach(function () {
		mockPasswordControl = jasmine.createSpyObj("mockPasswordControl", [
			'parent',
		]);
		mockWrapper = jasmine.createSpyObj("mockWrapper", [
			'append'
		]);
		mockButton = jasmine.createSpyObj("mockButton", [
			'on',
			'text'
		]);
		mockPasswordControl.parent.and.returnValue(mockWrapper);
		spyOn(window, '$').and.callFake(function(arg) {
			if(arg === mockEl) {
				return mockPasswordControl;
			}
			if(arg === '<button class="revealPassword">Show password</button>') {
				return mockButton;
			}
		});
		spyOn($, 'proxy').and.returnValue(mockProxy);
		passwordRevealer = new kitty.PasswordRevealer(mockEl);
	});

	describe("Creating a new password revealer", function() {
		it("Stores the element as a property of the instance", function () {
			expect(passwordRevealer.el).toBe(mockEl);
		});
		it("Stores a jQuery wrapped object on the instance", function() {
			expect(passwordRevealer.passwordControl).toBe(mockPasswordControl);
		});
		it("Stores a showingPassword state as false", function() {
			expect(passwordRevealer.showingPassword).toBe(false);
		});
		it("Creates a button", function() {
			expect($).toHaveBeenCalledWith('<button class="revealPassword">Show password</button>');
			expect(mockButton.on).toHaveBeenCalledWith('click', mockProxy);
		});
	});

	describe("Clicking the show password button", function() {
		describe("The passowrd is hidden", function() {
			beforeEach(function() {
				passwordRevealer.onButtonClicked();
			});
			it("Reveals the password", function() {
				expect(mockEl.type).toBe("text");
			});
			it("Sets the state to showing", function() {
				expect(passwordRevealer.showingPassword).toBe(true);
			});
			it("Sets the text to 'Hide password'", function() {
				expect(mockButton.text).toHaveBeenCalledWith('Hide password');
			});
		});
		describe("The password is showing", function() {
			beforeEach(function() {
				passwordRevealer.showingPassword = true;
				passwordRevealer.onButtonClicked();
			});
			it("Hides the password", function() {
				expect(mockEl.type).toBe("password");
			});
			it("Sets the state to hiding", function() {
				expect(passwordRevealer.showingPassword).toBe(false);
			});
			it("Sets the text to 'Show password'", function() {
				expect(mockButton.text).toHaveBeenCalledWith('Show password');
			});
		});
	});

});