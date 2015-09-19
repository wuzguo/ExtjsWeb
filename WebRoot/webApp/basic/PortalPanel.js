Ext.define('webApp.basic.PortalPanel', {
	extend : 'Ext.panel.Panel',
	title : '首页',
	border : false,
	closable : false,
	autoScroll : false,
	layout : 'fit',
	html : '<iframe scrolling="no" frameborder="0" width="100%" height="100%" src="portal.html"></iframe>'
});