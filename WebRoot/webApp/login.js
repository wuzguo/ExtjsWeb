/**
 * 用户登陆
 * 
 * @user
 */
Ext.onReady(function() {
	var checkcode = Ext.create('webApp.util.CheckCode', {
				fieldLabel : '验证码',
				labelWidth : 43,
				name : 'checkCode',
				id : 'checkCode',
				// allowBlank : false,
				isLoader : true,
				// blankText : '验证码不能为空',
				codeUrl : './basic/CaptchaController/captcha.sdo',
				anchor : '65%'
			});

	var loginForm = new Ext.form.FormPanel({
				frame : false,
				height : 140,
				bodyStyle : 'padding-top:8px',
				defaults : {
					labelWidth : 72,
					labelAlign : 'right'
				},
				labelPad : 0,
				border : false,
				items : [{
							xtype : 'textfield',
							name : 'name',
							value : 'admin',
							fieldCls : 'text-user',
							allowBlank : false,
							fieldLabel : '用户名',
							allowBlank : false,
							anchor : '91%'
						}, {
							xtype : 'textfield',
							name : 'password',
							value : '123',
							inputType : 'password',
							fieldCls : 'text-lock',
							allowBlank : false,
							fieldLabel : '密&nbsp;&nbsp;&nbsp;码',
							allowBlank : false,
							anchor : '91%'
						}, checkcode],
				buttonAlign : 'right',
				buttons : [{
							text : '登录',
							id : 'loginBtn',
							iconCls : 'login',
							width : 70,
							handler : doLogin
						}, {
							text : '重置',
							iconCls : 'reset',
							handler : function() {
								loginForm.getForm().reset();
							}
						}]
			});

	function doLogin() {
		if (!loginForm.getForm().isValid())
			return;
		// Ext.getCmp('loginBtn').disable();
		win.hide();
		loginForm.form.doAction('submit', {
					url : './basic/LoginController/login.sdo',
					method : 'post',
					waitTitle : '稍等片刻',
					waitMsg : '正在登录中...',
					success : function(form, action) {
						if (action.result.result == 'success') {
							window.location.href = 'main.jsp';
						} else if (action.result.result == 'fail') {
							alert(action.result.info);
							win.show();
							// Ext.getCmp('loginBtn').disable();
						} else {
							Ext.MessageBox.show({
										title : '错误!',
										msg : '用户名或者密码错误',
										buttons : Ext.Msg.OK,
										icon : Ext.MessageBox.ERROR,
										fn : function() {
											window.location.href = 'loginError.html';
										}
									});
							win.show();
						}
					},
					failure : function(response, opts) {
						alert("连接超时..., 请重新登陆！");
						win.show();
					}
				});
	}

	win = new Ext.Window({
		title : '用户登录',
		applyTo : 'center-div',
		layout : 'fit',
		width : 350,
		height : 220,
		bodyStyle : 'background-color: white',
		border : true,
		closable : false,
		resizable : false,
		constrain : true,
		closeAction : 'hide',
		plain : true,
		layout : {
			type : 'vbox',
			align : 'stretch'
		},
		items : [{
			xtype : 'panel',
			border : false,
			bodyStyle : 'padding-left:18px',
			html : '<div style="width:340px;" ><img height="34px" width="101px" style="margin-top:5px;float:left;" src="images/weblogo_.png" />&nbsp;<font class="logo_font" >ExtWeb信息管理平台</font></div>',
			height : 37
		}, loginForm]
	});
	win.show();
	Ext.create('Ext.util.KeyNav', Ext.getBody(), {
				'enter' : {
					fn : doLogin
				}
			});
});