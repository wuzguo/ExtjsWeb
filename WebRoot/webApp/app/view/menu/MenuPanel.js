Ext.define('WebExtApp.view.menu.MenuPanel', {
			extend : 'WebExtApp.base.BasePanel',
			alias : 'widget.menupanel',
			bodyStyle : 'background:#fff;',
			closeAction : 'hide',
			// closable: true,
			layout : 'fit',
			items : [{
						region : 'center',
						xtype : 'menuGrid',
						border : true
					}, {
						region : 'east',
						width : 2,
						bodyStyle : 'border:2px solid #9cf;'
					}],

			initComponent : function(config) {
				this.callParent(config);
			}
		});
