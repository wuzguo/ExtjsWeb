/*
 * Viewport @wuzguo 2014.10.12
 */
Ext.define('WebExtApp.view.Viewport', {
			extend : Ext.container.Viewport,
			layout : 'border',
			requires : ['WebExtApp.view.Viewer',
					'WebExtApp.view.index.navigationPanel',
					'WebExtApp.view.index.mainTab',
					'WebExtApp.view.index.topPanel',
					'WebExtApp.view.index.botPanel'],

			items : [{
						region : 'north',
						xtype : 'topPanel'
					}, {
						region : 'center',
						xtype : 'mainTab'

					}, {
						region : 'west',
						xtype : 'navigationPanel'
					}, {
						region : 'east',
						width : 2,
						bodyStyle : 'border:2px solid #9cf;'
					}, {
						region : 'south',
						xtype : 'botPanel'
					}]
		});