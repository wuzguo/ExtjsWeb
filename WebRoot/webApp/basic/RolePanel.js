/*
 * 权限管理 - 角色管理
 */
Ext.define('webApp.basic.RolePanel', {
	extend : 'Ext.panel.Panel',
	border : false,
	layout : 'fit',
	requires : ['Ext.ux.ProgressBarPager', 'Ext.grid.*', 'Ext.window.Window',
			'Ext.toolbar.Toolbar', 'Ext.selection.CheckboxModel',
			'webApp.util.selector.MenuSelectorWindow'],
	initComponent : function() {
		this.initStore();// 初始化数据
		this.initColumn();// 初始化columns
		// 按钮toolbar
		this.toolBar = Ext.create('Ext.toolbar.Toolbar', {
					items : [{
								text : '新建',
								iconCls : 'add',
								scope : this,
								handler : function() {
									this.roleWindow.setTitle('新建角色');
									this.roleWindow.show();
								}
							}, '-', {
								text : '修改',
								scope : this,
								iconCls : 'edit',
								handler : this.editRole
							}, {
								text : '删除',
								iconCls : 'delete',
								scope : this,
								handler : this.deleteRole
							}, {
								text : '配置菜单',
								scope : this,
								iconCls : 'show',
								handler : function() {
									var r = this.gridPanel.getSelectionModel()
											.getSelection()[0];
									this.menuWin.setValue(r.get('menuId'));
									this.menuWin.show();
								}
							}]
				});
		// 主面板 数据面板
		this.gridPanel = Ext.create('Ext.grid.Panel', {
					mask : true,
					region : 'center',
					border : false,
					columnLines : true,
					reserveScrollbar : true,// 防止滚动条溢出
					forceFit : true,
					selModel : new Ext.selection.CheckboxModel({
								mode : 'single',
								allowDeselect : true
							}),// 单选可反选
					viewConfig : {
						stripeRows : true
					},
					store : this.roleStore,
					columns : this.columns,
					tbar : this.toolBar,
					bbar : {
						xtype : 'pagingtoolbar',
						pageSize : 25,
						store : this.roleStore,
						displayInfo : true,
						plugins : new Ext.ux.ProgressBarPager()
					}
				});
		// 角色 新建 修改 查看 Panel
		this.rolePanel = Ext.create('Ext.form.Panel', {
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
		// 角色 新建 修改 查看 Window
		this.roleWindow = Ext.create('Ext.window.Window', {
					autoHeight : true,
					width : 350,
					title : '新建角色',
					bodyPadding : 5,
					modal : true,
					frame : true,
					closeAction : 'hide',
					items : [this.rolePanel],
					buttonAlign : 'center',
					buttons : [{
								text : '确定',
								scope : this,
								iconCls : 'confirm',
								handler : this.addRole
							}, {
								text : '取消',
								iconCls : 'cancel',
								scope : this,
								handler : function() {
									this.rolePanel.reset();
									this.roleWindow.close();
								}
							}]
				});

		// 配置角色 window
		this.menuWin = Ext.create('webApp.util.selector.MenuSelectorWindow', {
					parentPanel : this
				});

		Ext.apply(this, {
					layout : 'border',
					items : [this.gridPanel]
				});
		this.callParent();
	},
	/*
	 * 用户管理界面全局事件初始化
	 */
	initEvents : function() {
		this.items.on('afterrender', this.initMethod(), this);
		this.gridPanel.getSelectionModel().on('selectionchange', function(sm) {
					this.setBtn(sm.getCount())
				}, this);
	},
	/*
	 * 用户管理init 方法
	 */
	initMethod : function() {
		this.gridPanelLoadData()
		this.setBtn(0);
	},
	/*
	 * 初始化Store
	 */
	initStore : function() {
		Ext.define('role', {
					extend : 'Ext.data.Model',
					idProperty : 'id'
				});
		// 数据列表 Store
		this.roleStore = Ext.create('Ext.data.JsonStore', {
					model : 'role',
					sorters : 'id',
					pageSize : 25,
					proxy : {
						type : 'ajax',
						url : './basic/RoleController/list.sdo',
						reader : {
							type : 'json',
							totalProperty : 'total',
							rootProperty : 'invdata'
						}
					}
				});
	},
	/*
	 * 初始化column
	 */
	initColumn : function() {
		this.columns = [{
					text : 'id',
					hidden : true,
					dataIndex : 'id'
				}, {
					text : '角色名称',
					flex : 1,
					dataIndex : 'roleName'
				}, {
					text : '角色描述',
					flex : 3,
					dataIndex : 'describle'
				}]
	},
	/*
	 * 添加角色
	 */
	addRole : function() {
		var form = this.rolePanel.getForm();
		var baseParams = form.getFieldValues();
		var id = form.findField('id').getValue();
		var roleName = form.findField('roleName').getValue();
		if (form.isValid()) {
			Ext.Ajax.request({
				method : 'post',
				url : './basic/RoleController/add.sdo',
				params : baseParams,
				waitTitle : '请稍等片刻',
				waitMsg : '正在提交...',
				scope : this,
				success : function(resp) {
					var obj = Ext.util.JSON.decode(resp.responseText);
					if (obj.result == 'success') {
						var msg = id == "" ? '新建' : '修改';
						WebExtApp.getApplication().msg('提示',
								msg + '角色[ <font>' + roleName + '</font> ]成功！');
						this.rolePanel.reset();
						this.roleWindow.close();
					} else {
						Ext.Msg.alert("提示", "错误信息:" + obj.info);
					}
					this.gridPanelLoadData();
				},
				failure : function(response, opts) {
					this.exception();
				}
			});
		}

	},
	/*
	 * 删除角色
	 */
	deleteRole : function() {
		var r = this.gridPanel.getSelectionModel().getSelection()[0];
		var s = this;
		var roleStr = '删除角色[ <font color="blue" >' + r.get('roleName')
				+ '</font> ]';
		Ext.MessageBox.confirm('提示', '确定' + roleStr + ' ？', function(btn) {
					if (btn != 'yes') {
						return;
					}
					Ext.Ajax.request({
								method : 'post',
								url : './basic/RoleController/delete.sdo',
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
												roleStr + '成功!');
									} else {
										Ext.Msg.alert("提示", "提示信息:" + obj.info);
									}
									s.gridPanelLoadData();
								},
								failure : function(response, opts) {
									this.exception();
								}
							});
				});

	},
	/*
	 * 编辑角色
	 */
	editRole : function(p, td, cellIndex, r, tr, rowIndex, e, eOpts) {
		if (r == undefined) {
			r = this.gridPanel.getSelectionModel().getSelection()[0];
		}
		this.roleWindow.setTitle('修改角色');
		this.roleWindow.show();
		this.rolePanel.getForm().loadRecord(r);
	},
	/*
	 * 配置菜单
	 */
	configerMenu : function(value) {
		var r = this.gridPanel.getSelectionModel().getSelection()[0];
		var s = this;
		Ext.MessageBox.confirm('提示', "确定给角色[<font color=red >"
						+ r.get('roleName')
						+ "</font>]配置如下菜单:</br><font color=red>"
						+ this.menuWin.getNames() + "</font>?", function(btn) {
					if (btn != 'yes') {
						return;
					}
					Ext.Ajax.request({
								method : 'post',
								url : './basic/RoleController/setMenu.sdo',
								params : {
									roleId : r.get('id'),
									menuId : value == "" ? "" : value
								},
								waitTitle : '请稍等片刻',
								waitMsg : '正在提交...',
								scope : this,
								success : function(resp) {
									var obj = Ext.util.JSON
											.decode(resp.responseText);
									if (obj.result == 'success') {
										WebExtApp.getApplication().msg('提示',
												'配置菜单成功');
									} else {
										Ext.Msg.alert("提示", "错误信息:" + obj.info);
									}
									s.gridPanelLoadData();
								},
								failure : function(response, opts) {
									this.exception();
								}
							});
				});
	},
	/*
	 * 列表加载数据
	 */
	gridPanelLoadData : function() {
		this.roleStore.load({
					params : {
						"start" : 0,
						"limit" : 25
					}
				});
	},
	/*
	 * 刷新表格
	 */
	reloadGrid : function() {
		this.gridPanel.getView().refresh();
		this.gridPanel.getSelectionModel().deselectAll();
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
			items[3].setDisabled(true);
		} else {
			items[1].setDisabled(false);
			items[2].setDisabled(false);
			items[3].setDisabled(false);
		}
	},
	/*
	 * 错误处理
	 */
	exception : function() {
		WebExtApp.getApplication().msg('出错', '后端未正确返回数据', 2000);
	}
});