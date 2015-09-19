Ext.define('WebExtApp.base.BaseWindow', {
			extend : Ext.window.Window,
			alias : 'widget.basewindow',
			title : '窗口',
			constrain : true,
			resizable : false,
			modal : true,
			frame : true,
			closeAction : 'hide',
			buttonAlign : 'right',
			buttons : [{
						text : '确定',
						scope : this,
						iconCls : 'confirm',
						ref : 'formSave'
					}, '-', {
						text : '取消',
						iconCls : 'cancel',
						scope : this,
						handler : function(btn) {
							var baseWindow = btn.up('basewindow');/*获取包含按钮的窗口组件*/
							baseWindow.close();/*关闭窗口*/
						}

					}]
		});
