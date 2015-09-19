$(function() {
			$(".username").focus(function() {
						usernameFocus($(this));
					});
			$(".username").blur(function() {
						usernameBlue();
					});
			$(".password").focus(function() {
						passwordFocus($(this));
					});
			$(".password").blur(function() {
						passwordBlue();
					});

			$(".captcha").focus(function() {
						captchaFocus($(this));
					});
			$(".captcha").blur(function() {
						captchaBlue();
					});
			if ($("#errormsg").text() != "") {
				$(".password").focus();
			}
		});

function usernameFocus($1) {
	passwordBlue();
	captchaBlue();
	$(".usernmae_label").attr("class", "usernmae_label_focus");
	$(".username").css({
				"border" : "1px solid #9cf"
			});
}

function usernameBlue() {
	$(".usernmae_label_focus").attr("class", "usernmae_label");
	$(".username").css({
				"border" : "1px solid #DDDDDD"
			});
}

function passwordFocus($1) {
	usernameBlue();
	captchaBlue();
	$(".password_label").attr("class", "password_label_focus");
	$(".password").css({
				"border" : "1px solid #9cf"
			});
}

function passwordBlue() {
	$(".password_label_focus").attr("class", "password_label");
	$(".password").css({
				"border" : "1px solid #DDDDDD"
			});
}

function captchaFocus($1) {
	usernameBlue();
	captchaBlue();
	$(".captcha").css({
				"border" : "1px solid #9cf"
			});
}
function captchaBlue() {
	$(".captcha").css({
				"border" : "1px solid #DDDDDD"
			});
}
function register() {// 换到注册页面
	var $register = $("#register");
	var $login = $("#login");
	$login.animate({
				opacity : 0
			}, 400, function() {
				$(this).css({
							"display" : "none"
						});
				$register.css({
							"display" : "block"
						}).animate({
							opacity : 1
						}, 400);
			});
}
function login() {// 换到登录页面
	var $register = $("#register");
	var $login = $("#login");
	$register.animate({
				opacity : 0
			}, 400, function() {
				$(this).css({
							"display" : "none"
						});
				$login.css({
							"display" : "block"
						}).animate({
							opacity : 1
						}, 400);
			});
}