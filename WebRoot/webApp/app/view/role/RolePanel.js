Ext.define('WebExtApp.view.role.RolePanel', {
			extend : 'WebExtApp.base.BasePanel',
			alias : 'widget.rolepanel',
			bodyStyle : 'background:#fff;',
			closeAction : 'hide',
			// closable: true,
			layout : 'fit',
			items : [{
						region : 'center',
						xtype : 'roleGrid',
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
