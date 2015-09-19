Ext.define('webApp.basic.MenuPanel', {
	extend : 'Ext.panel.Panel',
	border : false,
	layout : 'fit',
	requires : ['Ext.data.*', 'Ext.grid.*', 'Ext.tree.*', 'Ext.ux.CheckColumn',
			'webApp.util.selector.ImageSelectorWindow'],
	initComponent : function() {

		Ext.QuickTips.init();
		this.initStore();// 初始化数据
		this.initColumn();// 初始化columns
		this.imageWindow = Ext.create(
				'webApp.util.selector.ImageSelectorWindow', {
					parentPanel : this
				});
		// 按钮toolbar
		this.toolBar = Ext.create('Ext.toolbar.Toolbar', {
					items : [{
						text : '新建',
						iconCls : 'add',
						scope : this,
						handler : function() {
							this.menuWindow.setTitle('新建菜单');
							var sm = this.treePanel.getSelectionModel();
							if (sm.getCount() < 1) {
								this.firstNode();
							} else {
								this.secondNode(sm);
							};
							this.menuPanel.getForm().findField('imageDisplay')
									.update('');
							this.menuWindow.show();
						}
					}, '-', {
						text : '修改',
						scope : this,
						iconCls : 'edit',
						handler : this.editMenu
					}, {
						text : '删除',
						iconCls : 'delete',
						scope : this,
						handler : this.deleteMenu
					}]
				});
		this.redTpl = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
		// 菜单 新建 修改 查看 Panel
		this.menuPanel = Ext.create('Ext.form.Panel', {
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
							name : 'id'
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
							afterLabelTextTpl : this.redTpl,
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
										width : 40,
										name : 'imageDisplay'
									}, {
										xtype : 'button',
										text : '选择',
										scope : this,
										handler : function() {
											this.imageWindow.show();
											var v = this.menuPanel.getForm()
													.findField('openIcon')
													.getValue();
											this.imageWindow.setSelectimage(v);
										}
									}]
						}, {
							fieldLabel : '页面类型',
							name : 'type',
							afterLabelTextTpl : this.redTpl,
							allowBlank : false,
							store : this.typeStore,
							queryMode : 'local',
							value : "jsClassFile",
							editable : false,
							scope : this,
							xtype : 'combo',
							displayField : 'name',
							valueField : 'id',
							listeners : {
								scope : this,
								specialkey : function(field, e) {
									// 防止用户按后退键导致页面后退
									if (e.getKey() == e.BACKSPACE) {
										e.stopEvent();
									}
								},
								change : function(combo) {
									var form = this.menuPanel.getForm();
									var jsc = form.findField('jsClassFile');
									var acp = form.findField('actionPath');
									jsc.reset();
									acp.reset();
									if (combo.getValue() == 'jsClassFile') {
										jsc.show();
										acp.hide();
									} else if (combo.getValue() == 'actionPath') {
										jsc.hide();
										acp.show();
									} else {
										jsc.hide();
										acp.hide();
									}
								}
							}
						}, {
							fieldLabel : 'js类名',
							name : 'jsClassFile'
						}, {
							fieldLabel : 'HTML页面',
							hidden : true,
							name : 'actionPath'
						}, {
							fieldLabel : '是否可用',
							name : 'isValiDate',
							allowBlank : false,
							store : this.isValiDateStore,
							queryMode : 'local',
							value : 0,
							editable : false,
							xtype : 'combo',
							displayField : 'name',
							valueField : 'id',
							listeners : {
								specialkey : function(field, e) {
									// 防止用户按后退键导致页面后退
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
		// 菜单 新建 修改 Window
		this.menuWindow = Ext.create('Ext.window.Window', {
					autoHeight : true,
					width : 350,
					title : '新建菜单',
					bodyPadding : 5,
					modal : true,
					frame : true,
					scope : this,
					closeAction : 'hide',
					items : [this.menuPanel],
					buttonAlign : 'center',
					buttons : [{
								text : '确定',
								scope : this,
								iconCls : 'confirm',
								handler : this.addMenu
							}, {
								text : '取消',
								iconCls : 'cancel',
								scope : this,
								handler : function() {
									this.menuPanel.reset();
									this.menuWindow.close();
								}
							}]
				});
		this.treePanel = Ext.create('Ext.tree.Panel', {
					mask : true,
					region : 'center',
					reserveScrollbar : true,
					useArrows : true,
					rootVisible : false,
					columnLines : true,
					collapseFirst : false,
					forceFit : true,
					viewConfig : {
						stripeRows : true
					},
					multiSelect : false,
					store : this.menuStore,
					columns : this.columns,
					tbar : this.toolBar
				});
		Ext.apply(this, {
					layout : 'border',
					items : [this.treePanel]
				});
		this.callParent();
	},
	/*
	 * 菜单管理界面全局事件初始化
	 */
	initEvents : function() {
		this.items.on('afterrender', this.initMethod(), this);
		this.treePanel.on('select', function(tree, rec, index, opt) {
					this.setAddBtn(rec);
				}, this);
		this.treePanel.on('itemdblclick', function(tree) {
					this.resetBtn(tree);
				}, this);
		this.treePanel.getSelectionModel().on('selectionchange', function(sm) {
					this.setBtn(sm.getCount());
				}, this);
	},
	/*
	 * 菜单管理init 方法
	 */
	initMethod : function() {
		this.setBtn(0);
		this.treePanel.expandAll();
	},
	/*
	 * 初始化Store
	 */
	initStore : function() {
		Ext.define('menu', {
					extend : 'Ext.data.Model',
					idProperty : 'id'
				});
		this.typeStore = Ext.create('Ext.data.Store', {
					fields : ['id', 'name'],
					data : [{
								"id" : "jsClassFile",
								"name" : "js类名"
							}, {
								"id" : "actionPath",
								"name" : "HTML页面"
							}]
				});
		this.isValiDateStore = Ext.create('Ext.data.Store', {
					fields : ['id', 'name'],
					data : [{
								"id" : 0,
								"name" : "可用"
							}, {
								"id" : 1,
								"name" : "不可用"
							}]
				});
		// 数据列表 Store
		this.menuStore = new Ext.data.TreeStore({
					model : 'menu',
					proxy : {
						type : 'ajax',
						url : './basic/MenuController/list.sdo?id=0'
					},
					folderSort : true
				});
	},
	/*
	 * 初始化column
	 */
	initColumn : function() {
		this.tipRenders = function(v, m, r) {
			if (v != "") {
				m.tdAttr = 'data-qtip=”' + v + '”';
			}
			return v;
		};
		this.typeRenderer = function(v) {
			if (v == 'jsClassFile')
				return 'js类名';
			else if (v == 'actionPath')
				return 'HTML页面';
			else if (v == 'firstMenu')
				return '一级菜单';
			else
				return v;
		};
		this.isValiDateRenderer = function(v) {
			if (v == 0)
				return '<font style="color: #379337;font-weight: bold;">可用</font>';
			else if (v == 1)
				return '<font style="color: #c9c5dd;font-weight: bold;">不可用</font>';
		};
		this.columns = [{
					xtype : 'treecolumn',
					text : '菜单名称',
					flex : 2,
					sortable : true,
					dataIndex : 'menuName',
					renderer : this.tipRenders
				}, {
					text : '类型',
					flex : 1.4,
					sortable : true,
					dataIndex : 'type',
					renderer : this.typeRenderer
				}, {
					text : 'js类名',
					flex : 2,
					sortable : true,
					dataIndex : 'jsClassFile',
					renderer : this.tipRenders
				}, {
					text : 'HTML页面',
					flex : 2,
					sortable : true,
					dataIndex : 'actionPath',
					renderer : this.tipRenders
				}, {
					text : '菜单描述',
					flex : 2.5,
					sortable : true,
					dataIndex : 'description',
					renderer : this.tipRenders
				}, {
					text : '是否可用',
					flex : 1.2,
					sortable : true,
					renderer : this.isValiDateRenderer,
					dataIndex : 'isValiDate'
				}];
	},
	addMenu : function() {
		var form = this.menuPanel.getForm();
		var baseParams = form.getFieldValues();
		var id = form.findField('id').getValue();
		var name = form.findField('menuName').getValue();
		if (form.isValid()) {
			Ext.Ajax.request({
						method : 'post',
						url : './basic/MenuController/add.sdo',
						params : baseParams,
						waitTitle : '请稍等片刻',
						waitMsg : '正在提交...',
						scope : this,
						success : function(resp) {
							var obj = Ext.util.JSON.decode(resp.responseText);
							if (obj.result == 'success') {
								var msg = id == "" ? '新建 ' : '修改';
								WebExtApp.getApplication().msg(
										'提示',
										msg + '菜单[ <font>' + name
												+ '</font> ]成功');
								this.menuPanel.reset();
								this.menuWindow.close();
							} else {
								Ext.Msg.alert("提示", "错误信息:" + obj.info);
							}
							this.treePanelLoadData(id);
							// WebExtApp.getApplication().setMenu();
						},
						failure : function(response, opts) {
							this.exception();
						}
					});
		}

	},
	editMenu : function() {
		var sm = this.treePanel.getSelectionModel();
		var r = sm.getSelection()[0];
		var form = this.menuPanel.getForm();
		var type = r.get('type');
		this.menuWindow.setTitle('修改菜单');
		this.menuWindow.show();
		if (type == 'firstMenu') {
			this.firstNode();
		} else {
			this.secondNode(sm);
		}
		var imageVlaue = '<image class="app_medinu_show" src="./'
				+ r.get('openIcon') + '" ></image>';
		form.findField('imageDisplay').update(imageVlaue);
		form.loadRecord(r);
		form.findField('openIcon').setValue(r.get('openIcon').replace(
				/[\\ =]/g, "/").replace("images/menu/32/", ""));
		form.findField('icon').setValue(r.get('icon').replace(/[\\ =]/g, "/")
				.replace("images/menu/", ""));
	},
	firstNode : function() {
		var form = this.menuPanel.getForm();
		var jsc = form.findField('jsClassFile');
		var acp = form.findField('actionPath');
		var type = form.findField('type');
		jsc.reset();
		acp.reset();
		jsc.hide();
		acp.hide();
		this.typeStore.add({
					"id" : "firstMenu",
					"name" : "一级菜单"
				});
		type.setValue('firstMenu');
		type.setReadOnly(true);
	},
	secondNode : function(sm) {
		var form = this.menuPanel.getForm();
		var r = sm.getSelection()[0];
		var jsc = form.findField('jsClassFile');
		var acp = form.findField('actionPath');
		var parantMenuID = form.findField('parantMenuID');
		var type = form.findField('type');
		jsc.reset();
		acp.reset();
		jsc.show();
		acp.hide();
		this.typeStore.removeAt(2);
		type.setValue('jsClassFile');
		type.setReadOnly(false);
		parantMenuID.setValue(r.get('id'));
	},
	deleteMenu : function() {
		var r = this.treePanel.getSelectionModel().getSelection()[0];
		var s = this;
		var userStr = '删除菜单[ <font color="blue" >' + r.get('menuName')
				+ '</font> ]';
		Ext.MessageBox.confirm('提示', '确定' + userStr + ' ？', function(btn) {
					if (btn != 'yes') {
						return;
					}
					Ext.Ajax.request({
								method : 'post',
								url : './basic/MenuController/delete.sdo',
								params : {
									id : r.get('id')
								},
								waitTitle : '请稍等片刻',
								waitMsg : '正在删除...',
								scope : this,
								success : function(resp) {
									var obj = Ext.util.JSON
											.decode(resp.responseText);
									if (obj.result == 'success') {
										WebExtApp.getApplication().msg('提示',
												userStr + '成功!');
									} else {
										Ext.Msg.alert("提示", "信息:" + obj.info);
									}
									s.treePanelLoadData(r.get('id'));
								},
								failure : function(response, opts) {
									this.exception();
								}
							});
				});

	},
	/*
	 * 获得照片selector 并 返回 照片信息
	 */
	selectImage : function(url) {
		var form = this.menuPanel.getForm();
		var imageVlaue = '<image class="app_medinu_show" src="./' + url
				+ '" ></image>';
		form.findField('icon').setValue(url.replace(/[\\ =]/g, "/").replace(
				"images/menu/32/", ""));
		form.findField('openIcon').setValue(url.replace(/[\\ =]/g, "/")
				.replace("images/menu/32/", ""));
		form.findField('imageDisplay').update(imageVlaue);
	},
	/*
	 * 查看 删除等按钮的状态安置 当未选择数据按钮置灰
	 */
	setBtn : function(sm) {
		var btns = this.toolBar;
		var items = Ext.ComponentQuery.query('button', btns);
		if (sm < 1) {
			items[1].setDisabled(true);
			items[2].setDisabled(true);
		} else {
			items[1].setDisabled(false);
			items[2].setDisabled(false);
		}
	},
	setAddBtn : function(rec) {
		var btns = this.toolBar;
		var items = Ext.ComponentQuery.query('button', btns);
		if (rec.get('parantMenuID') != '0') {
			items[0].setDisabled(true);
		} else {
			items[0].setDisabled(false);
		}
	},
	resetBtn : function(tree) {
		var btns = this.toolBar;
		var items = Ext.ComponentQuery.query('button', btns);
		tree.getSelectionModel().deselectAll();
		items[0].setDisabled(false);
		items[1].setDisabled(true);
		items[2].setDisabled(true);
	},
	treePanelLoadData : function(id) {
		this.menuStore.load();
		this.treePanel.expandAll();
		this.treePanel.getSelectionModel().deselectAll();
		this.treePanel.selectPath(id)
	},
	/*
	 * 错误处理
	 */
	exception : function() {
		WebExtApp.getApplication().msg('出错', '后端未正确返回数据', 2000);
	}
});