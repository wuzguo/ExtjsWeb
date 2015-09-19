Ext.define('WebExtApp.view.Viewer', {
			extend : 'Ext.tab.Panel',
			alias : 'widget.viewer',
			requires : ['WebExtApp.view.index.panel'],
			activeItem : 0,
			margins : '4',
			layout : 'anchor',
			id : 'tabs',

			initComponent : function(config) {
				var self = this;
				self.items = [{
							xtype : 'indexpanel'/* 默认加载的controller是哪一个 */
						}];
				self.callParent(config);
			}
		});