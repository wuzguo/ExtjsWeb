/*
 * 定义首页 @wuzguo 2014.10.12
 */
Ext.define('WebExtApp.view.index.mainTab', {
			extend : Ext.tab.Panel,
			alias : 'widget.mainTab',
			requires : ['Ext.ux.TabReorderer', 'Ext.ux.TabReorderer',
					'Ext.ux.TabCloseMenu', 'WebExtApp.view.index.panel'],
			border : false,
			plugins : [Ext.create('Ext.ux.TabReorderer', {}),
					Ext.create('Ext.ux.TabCloseMenu', {
								closeTabText : '关闭当前页',
								closeOthersTabsText : '关闭其他页',
								closeAllTabsText : '关闭所有页'
							})],
			layout : 'hbox',
			id : 'mainTab',
			defaults : {
				bodyPadding : 2,
				autoScroll : true,
				closable : false,
				border : false
			},
			items : [{
						xtype : 'indexpanel'
					}]
		});