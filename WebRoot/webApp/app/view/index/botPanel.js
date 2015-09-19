/*
 * 定义底部面板  @wuzguo 2014.10.12
 */
Ext.define('WebExtApp.view.index.botPanel', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.botPanel',
	border : true,
	layout : 'column',
	id : 'bPanel',
	height : 25,
	scope : this,
	defaults : {
		border : false,
		anchor : '100%',
		xtype : 'panel'
	},
	items : [{
		style : 'float:right;',
		width : 82,
		items : [{
					xtype : 'toolbar',
					style : 'margin-top:-6px;margin-left:-8px;',
					items : [{
								text : '全屏操作',
								xtype : 'button',
								width : 82,
								iconCls : 'fullscreen',
								handler : function(btn) {
									if (WebExtApp.getApplication().nv.collapsed) {
										WebExtApp.getApplication().expand();
										btn.setText('全屏操作');
										btn.setIconCls('fullscreen');
									} else {
										WebExtApp.getApplication().collapse();
										btn.setText('退出全屏');
										btn.setIconCls('fullscreen_exit');
									}
								}
							}]
				}]
	}]
});