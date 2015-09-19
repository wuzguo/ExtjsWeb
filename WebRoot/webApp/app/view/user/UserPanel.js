Ext.define('WebExtApp.view.user.UserPanel', {
			extend : 'WebExtApp.base.BasePanel',
			alias : 'widget.userPanel',
			bodyStyle : 'background:#fff;',
			closeAction : 'hide',
			// closable: true,
			layout : 'fit',
			items : [{
						region : 'center',
						xtype : 'userGrid',
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
