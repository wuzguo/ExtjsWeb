Ext.define('WebExtApp.view.menu.MenuEdit', {
	extend : 'WebExtApp.base.BaseWindow',
	alias : 'widget.menuEdit',
	requires : ['WebExtApp.base.BaseForm',
			'webApp.util.selector.ImageSelectorWindow'],
	autoHeight : true,
	width : 400,
	title : '新建菜单',
	bodyPadding : 5,

	initStore : function() {
		var self = this;
		self.typeStore = Ext.create('Ext.data.Store', {
					fields : ['id', 'name'],
					data : [{
								"id" : "jsClassFile",
								"name" : "JS类名"
							}, {
								"id" : "actionPath",
								"name" : "HTML页面"
							}]
				});
		self.isValiDateStore = Ext.create('Ext.data.Store', {
					fields : ['id', 'name'],
					data : [{
								"id" : 0,
								"name" : "可用"
							}, {
								"id" : 1,
								"name" : "不可用"
							}]
				});
	},

	initImageWindow : function() {
		var self = this;
		self.imageWindow = Ext.create(
				'webApp.util.selector.ImageSelectorWindow', {
					parentPanel : self
				});
	},

	initMenuPanel : function() {
		var self = this;
		self.menuPanel = Ext.create('Ext.form.Panel', {
					frame : false,
					border : false,
					layout : 'column',
					defaults : {
						xtype : 'panel',
						layout : 'form',
						border : false,
						defaults : {
							margin : 2,
							anchor : '100%',
							xtype : 'textfield'
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
									name : 'id',
									value : 0
								}, {
									xtype : 'hidden',
									name : 'parantMenuID',
									value : 0
								}, {
									xtype : 'hidden',
									name : 'openIcon',
									value : 0
								}, {
									fieldLabel : '菜单名称',
									name : 'menuName',
									afterLabelTextTpl : self.redTpl,
									allowBlank : false
								}, {
									xtype : 'fieldcontainer',
									fieldLabel : '菜单图片',
									layout : {
										type : 'hbox',
										defaultMargins : {
											top : 0,
											right : 5,
											bottom : 0,
											left : 0
										}
									},
									defaults : {
										hideLabel : true
									},
									items : [{
												xtype : 'textfield',
												readOnly : true,
												name : 'icon'
											}, {
												xtype : 'displayfield',
												width : 60,
												name : 'imageDisplay'
											}, {
												xtype : 'button',
												text : '选择',
												scope : self,
												handler : function() {
													self.imageWindow.show();
													var v = self.menuPanel
															.getForm()
															.findField('openIcon')
															.getValue();
													self.imageWindow
															.setSelectimage(v);
												}
											}]
								}, {
									fieldLabel : '页面类型',
									name : 'type',
									afterLabelTextTpl : self.redTpl,
									allowBlank : false,
									store : self.typeStore,
									queryMode : 'local',
									value : "jsClassFile",
									editable : false,
									scope : self,
									xtype : 'combo',
									displayField : 'name',
									valueField : 'id',
									listeners : {
										scope : self,
										specialkey : function(field, e) {
											/* 防止用户按后退键导致页面后退 */
											if (e.getKey() == e.BACKSPACE) {
												e.stopEvent();
											}
										},
										change : function(combo) {
											self.nodeChange(combo);
										}
									}
								}, {
									fieldLabel : '控制器名称',
									name : 'jsCtrlClassFile'
								}, {
									fieldLabel : '容器名称',
									name : 'jsPanelClassFile'
								}, {
									fieldLabel : 'URL地址',
									hidden : true,
									name : 'actionPath'
								}, {
									fieldLabel : '是否可用',
									name : 'isValiDate',
									allowBlank : false,
									store : self.isValiDateStore,
									queryMode : 'local',
									value : 0,
									editable : false,
									xtype : 'combo',
									displayField : 'name',
									valueField : 'id',
									listeners : {
										specialkey : function(field, e) {
											/* 防止用户按后退键导致页面后退 */
											if (e.getKey() == e.BACKSPACE) {
												e.stopEvent();
											}
										}
									}
								}, {
									fieldLabel : '菜单描述',
									xtype : 'textarea',
									height : 40,
									name : 'description'
								}]
					}]
				});
	},

	selectImage : function(url) { /* 自定义类的方法可以不用在 initComponent() 中初始化 */
		var form = this.menuPanel.getForm();
		var imageValue = '<image class="app_medinu_show" src="./' +url+ '" ></image>';
		var url = url.replace(/[\\ =]/g, "/").replace("images/menu/32/", "");
		//alert(url);
		form.findField('icon').setValue(url);
		form.findField('openIcon').setValue(url);
		form.findField('imageDisplay').update(imageValue);
	},

	nodeChange : function(combo) {
		var form = this.menuPanel.getForm();
		var jctlFile = form.findField('jsCtrlClassFile');
		var jpnlFile = form.findField('jsPanelClassFile');
		var acPath = form.findField('actionPath');
		jctlFile.reset();
		jpnlFile.reset();
		// acPath.reset();
		if (combo.getValue() == 'jsClassFile') {
			jctlFile.show();
			jpnlFile.show();
			acPath.hide();
		} else if (combo.getValue() == 'actionPath') {
			jctlFile.hide();
			jpnlFile.hide();
			acPath.show();
		} else {
			jctlFile.hide();
			jpnlFile.hide();
			acPath.hide();
		}
	},

	initComponent : function(config) {
		var self = this;

		self.initStore();
		self.initImageWindow();
		self.redTpl = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
		self.initMenuPanel();

		Ext.apply(self, {
					layout : 'fit',
					items : [self.menuPanel]
				});

		self.callParent(config);
	}
});