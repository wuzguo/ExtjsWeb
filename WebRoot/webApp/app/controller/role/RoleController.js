Ext.define('WebExtApp.controller.role.RoleController', {
	extend : Ext.app.Controller,
	requires : ['factory.Model', 'webApp.util.selector.MenuSelectorWindow'],
	contrl : {},
	isload : false,
	views : ['role.RoleGrid', 'role.RolePanel'],
	stores : ['role.RolesStore'],
	models : ['role.Role'],

	initMethods : function() {
		var self = this;

		var msgApp = WebExtApp.getApplication(); /* 应用消息 */

		self.addRole = function(btn) {
			Ext.require('WebExtApp.view.role.RoleEdit', function() {
				var roleGrid = btn.up('roleGrid');/* 向上查找grid */
				var baseForm = Ext.create('WebExtApp.view.role.RoleEdit', {})
						.show();/* 创建添加显示窗口 */
				var form = baseForm.items.get(0).getForm();/* 获取表单对象 */
				var saveButton = baseForm.down('button[ref="formSave"]');/* 保存按钮 */
				var baseStore = roleGrid.store;/* 拿到数据集 */
				var clickQuick = false;/* 测试用户是否点击过快 */
				saveButton.on('click', function() {
					if (!clickQuick) {/* 判断用户是否点击过快 */
						clickQuick = true;
						baseForm.hide();
						form.doAction('submit', {
									url : './basic/RoleController/add.sdo',/* 添加用户请求地址 */
									method : 'post',
									waitTitle : "请稍候",
									waitMsg : '正在添加数据...',
									success : function(response, result) {
										baseStore
												.insert(0, result.result.model);
										baseStore.removeAt(2, 1);
										baseForm.close();
										baseStore.reload();
										Ext.example.msg('提示',
												result.result.info, function() {
													clickQuick = false;
												});
									},
									failure : function(response, result) {
										Ext.Msg.alert('提示', result.result.info,
												function() {
													baseForm.show();
													clickQuick = false;
												});
									}
								});
					} else {
						msgApp.msg('提示', '请勿重复点击提交按钮');
					}
				});
			});
		};

		self.editRole = function(btn) {
			Ext.require('WebExtApp.view.role.RoleEdit', function() {
						var roleGrid = btn.up('roleGrid').down('gridview');
						var records = roleGrid.getSelectionModel()
								.getSelection();/* 获取选中的record */
						if (records.length == 1) {
							var baseForm = Ext.create(
									'WebExtApp.view.role.RoleEdit', {
										title : '修改角色'
									}).show();/* 创建添加显示窗口 */
							var form = baseForm.items.get(0);/* 获取表单对象 */
							form.loadRecord(records[0]);/* 将reocrd填充到表单中 */
							var saveButton = baseForm
									.down('button[ref="formSave"]');/* 保存按钮 */
							saveButton.setText('修改');
							saveButton.on('click', function() {
										baseForm.hide();
										form.getForm().doAction('submit', {
											url : './basic/RoleController/add.sdo',
											/* 添加用户请求地址 */
											method : 'post',
											waitTitle : "请稍候",
											waitMsg : '正在保存数据...',
											success : function(response, result) {
												baseForm.close();
												roleGrid.store.reload();/* 重新加载亲折数据记录 */
												Ext.example.msg('提示',
														result.result.info);
											},
											failure : function(response, result) {
												Ext.Msg.alert('提示',
														result.result.info,
														function() {
															baseForm.show();
														});
											}
										});
									});
						} else {
							msgApp.msg('提示', '请选择一条数据进行操作');
						}
					});

		};
		self.deleteRole = function(btn) {
			var grid = btn.up('roleGrid');/* 获取到grid */
			var records = grid.getSelectionModel().getSelection();/* 获取选中的数据集 */

			if (records.length != 1) {
				msgApp.msg('提示', '请选择一条数据进行操作');
			} else {
				var roleStr = '删除用户[ <font color="blue" >'
						+ records[0].get('roleName') + '</font> ]';

				Ext.Msg.confirm('提示', '确定' + roleStr + ' ？', function(info) {
							if (info == 'yes') {
								Ext.Ajax.request({
											method : 'post',
											url : './basic/RoleController/delete.sdo',
											params : {
												id : records[0].get('id')
											},
											waitTitle : '请稍等片刻',
											waitMsg : '正在删除...',
											scope : this,
											success : function(resp) {
												var obj = Ext.util.JSON
														.decode(resp.responseText);
												if (obj.result == 'success') {

													msgApp.msg('提示', roleStr
																	+ '成功!');
												} else {
													Ext.Msg.alert("提示", "错误信息:"
																	+ obj.info);
												}
												grid.store.reload();
											},
											failure : function(response, opts) {
												msgApp.msg('出错', '后端未正确返回数据',
														2000);
											}
										});

							}
						});
			}

		};

		self.configerMenu = function(value) {
			var rolegrid = Ext.getCmp('rolegrid');
			var r = rolegrid.getSelectionModel().getSelection()[0];

			Ext.MessageBox.confirm('提示', "确定给角色[<font color=red >"
							+ r.get('roleName')
							+ "</font>]配置如下菜单:</br><font color=red>"
							+ this.menuWin.getNames() + "</font>?", function(
							btn) {
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
									scope : self,
									success : function(resp) {
										var obj = Ext.util.JSON
												.decode(resp.responseText);
										if (obj.result == 'success') {
											msgApp.msg('提示', '配置菜单成功');
										} else {
											Ext.Msg.alert("提示", "错误信息:"
															+ obj.info);
										}
										rolegrid.store.reload();
									},
									failure : function(response, opts) {
										msgApp.msg('出错', '后端未正确返回数据', 2000);
									}
								});
					});
		};

		self.configRole = function(btn) {
			var roleGrid = btn.up('roleGrid');
			var records = roleGrid.getSelectionModel().getSelection();
			if (records.length == 0) {
				msgApp.msg('提示', '请选择一条数据进行操作');
			} else {
				self.menuWin.setValue(records[0].get('menuId'));
				self.menuWin.show();
			}
		};
	},

	roleButton : function() {
		var self = this;
		
		var roleContrl = {
			'rolepanel button[ref=add]' : {
				click : function(btn) {
					self.addRole(btn);
				}
			},

			'rolepanel button[ref=edit]' : {
				click : function(btn) {
					self.editRole(btn);
				}
			},
			'rolepanel button[ref=destory]' : {
				click : function(btn) {
					self.deleteRole(btn);
				}
			},
			'rolepanel button[ref=configmenu]' : {
				click : function(btn) {
					self.configRole(btn);
				}
			}
		};
		Ext.apply(self.contrl, roleContrl);
	},

	initMenuWin : function() {
		this.menuWin = Ext.create('webApp.util.selector.MenuSelectorWindow', {
					parentPanel : this
				});

	},

	init : function() {
		var self = this;
		
		self.initMethods();

		self.initMenuWin();

		self.roleButton();

		self.control(self.contrl);
	}
});