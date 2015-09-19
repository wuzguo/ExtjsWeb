Ext.define('WebExtApp.view.index.panel', {
	extend : Ext.panel.Panel,
	layout : 'fit',
	title : '首页',
	html : '<iframe scrolling="no", frameborder="0", width="100%", height="100%", src="home.html"></iframe>',
	bodyStyle : 'background:#fff;',
	alias : 'widget.indexpanel',
	iconCls : 'Applicationosxhome'
});
