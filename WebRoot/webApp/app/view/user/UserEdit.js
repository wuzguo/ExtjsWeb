Ext.define('WebExtApp.view.user.UserEdit', {
	extend : 'WebExtApp.base.BaseWindow',
	alias : 'widget.userEdit',
	requires : ['WebExtApp.base.BaseForm'],
	title : '新建用户',
	autoHeight : true,
	width : 560,
	bodyPadding : 5,

	/*
	 * 初始化Store
	 */
	initStore : function() {
		this.sexStore = Ext.create('Ext.data.Store', {
					fields : ['id', 'name'],
					data : [{
								"id" : "0",
								"name" : "男"
							}, {
								"id" : "1",
								"name" : "女"
							}]
				});
		this.statusStore = Ext.create('Ext.data.Store', {
					fields : ['id', 'name'],
					data : [{
								"id" : "0",
								"name" : "可用"
							}, {
								"id" : "1",
								"name" : "不可用"
							}]
				});
	},

	/** 防止用户按后退键导致页面后退 */
	initUserKey : function() {
		this.addUserKey = {
			scope : this,
			specialkey : function(f, e) {
				if (e.getKey() == e.ENTER) {
					e.stopEvent();
				}
			}
		};
	},

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
							listeners : this.addUserKey
						}
					},
					fieldDefaults : {
						labelAlign : 'right',
						labelWidth : 90
					},
					items : [{
								xtype : 'fieldset',
								title : '账号信息',
								border : true,
								collapsible : false,
								columnWidth : .5,
								items : [{
											xtype : 'hidden',
											name : 'id'
										}, {
											fieldLabel : '用户名',
											name : 'name',
											afterLabelTextTpl : this.redTpl,
											allowBlank : false
										}, {
											fieldLabel : '邮箱',
											vtype : 'email',
											name : 'useremail',
											afterLabelTextTpl : this.redTpl,
											allowBlank : false
										}, {
											fieldLabel : '密码',
											inputType : 'password',
											afterLabelTextTpl : this.redTpl,
											name : 'password',
											allowBlank : false
										}, {
											fieldLabel : '状态',
											name : 'status',
											afterLabelTextTpl : this.redTpl,
											allowBlank : false,
											store : this.statusStore,
											queryMode : 'local',
											value : "0",
											editable : false,
											xtype : 'combo',
											displayField : 'name',
											valueField : 'id',
											listeners : this.addUserKey
										}]
							}, {
								width : 10,
								html : '&nbsp;&nbsp;&nbsp; '
							}, {
								xtype : 'fieldset',
								title : '联系人信息',
								border : true,
								collapsible : false,
								columnWidth : .5,
								items : [{
											fieldLabel : '姓名',
											name : 'username'
										}, {
											fieldLabel : '电话',
											name : 'userphone'
										}, {
											fieldLabel : '性别',
											name : 'sex',
											// afterLabelTextTpl : this.redTpl,
											allowBlank : false,
											store : this.sexStore,
											queryMode : 'local',
											value : "0",
											editable : false,
											xtype : 'combo',
											displayField : 'name',
											valueField : 'id',
											listeners : this.addUserKey
										}, {
											fieldLabel : '备注',
											name : 'description'
										}]
							}]
				});
	},
	initComponent : function() {
		var self = this;

		self.initStore();

		self.redTpl = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';

		self.initUserKey();

		self.initUserPanel();

		Ext.apply(self, {
					layout : 'fit',
					items : [self.userPanel]
				});

		self.callParent(arguments);
	}
});