Ext.define('WebExtApp.view.role.RoleEdit', {
	extend : 'WebExtApp.base.BaseWindow',
	alias : 'widget.roleEdit',
	requires : ['WebExtApp.base.BaseForm'],
	title : '新建角色',
	autoHeight : true,
	width : 350,
	bodyPadding : 5,

	initUserPanel : function() {
		this.userPanel = Ext.create('WebExtApp.base.BaseForm', {
					frame : false,
					border : false,
					layout : 'column',
					defaults : {
						xtype : 'baseform',
						layout : 'form',
						border : false,
						defaults : {
							margin : 2,
							anchor : '100%',
							xtype : 'textfield',
							listeners : this.addRoleKey
						}
					},
					fieldDefaults : {
						labelAlign : 'right',
						labelWidth : 90
					},
					items : [{
								columnWidth : 1,
								items : [{
											xtype : 'hidden',
											name : 'id'
										}, {
											fieldLabel : '角色名称',
											name : 'roleName',
											afterLabelTextTpl : this.redTpl,
											allowBlank : false
										}, {
											fieldLabel : '角色描述',
											xtype : 'textarea',
											height : 40,
											name : 'describle'
										}]
							}]
				});

	},

	/** 防止用户按后退键导致页面后退 */
	initRoleKey : function() {
		this.addRoleKey = {
			scope : this,
			specialkey : function(f, e) {
				if (e.getKey() == e.ENTER) {
					e.stopEvent();
				}
			}
		};
	},

	initComponent : function() {
		var self = this;

		self.redTpl = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';

		self.initRoleKey();

		self.initUserPanel();

		Ext.apply(self, {
					layout : 'fit',
					items : [self.userPanel]
				});

		self.callParent(arguments);
	}
});