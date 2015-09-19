/*
 * 定义顶部面板 @wuzguo 2014.10.12
 */
Ext.define('WebExtApp.view.index.topPanel', {
	extend : 'Ext.toolbar.Toolbar',
	alias : 'widget.topPanel',
	border : false,
	id : 'tPanel',
	style : 'margin-top:-8px;margin-bottom:-4px;',
	height : 56,
	items : [{
	    xtype : 'box',
		border : false,
	   // html : '<div><img class="app_logo" src="images/weblogo_title.png"/>&nbsp;&nbsp;&nbsp;<font class="add_logo_name">ExtWeb信息管理平台</font></div>'
	    html : '<div style="height:56px;width:100%;background:url(images/headbg.png) repeat-x;"><div style="background:url(images/adminlogo.png) no-repeat;width:175px;height:50px;"></div><a id="logout"></a></div>' 
	
	}, '->', {
		xtype : 'box',
		html : ''
	}, {
		iconAlign : 'left',
		iconCls : 'app_logout',
		xtype : 'button',
		text : '退出',
		scope : this,
		handler : function() {
			Ext.MessageBox.confirm('提示', "确定退出登录？？", function(btn) {
						if (btn != 'yes') {
							return;
						}
						Ext.Ajax.request({
									url : './basic/LoginController/logout.sdo',
									scope : this,
									success : function(response) {
										window.location.href = 'login.html';
									}
								});
					});
		}
	}]
});