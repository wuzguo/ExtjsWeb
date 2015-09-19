Ext.define('WebExtApp.controller.user.Controller', {
	extend : Ext.app.Controller,
	requires : ['factory.Model', 'webApp.util.selector.RoleSelectorWindow'],
	contrl : {},
	isload : false,
	mixins : { /* 多继承 */
		searchField : 'Ext.ux.form.SearchField'
	},
	views : ['user.UserGrid', 'user.UserPanel'], /* WebExtApp.view.user.grid会报错 */
	stores : ['user.UsersStore'],
	models : ['user.User'],

	initMethods : function() {
		var self = this;
		var msgApp = WebExtApp.getApplication(); /* 应用消息 */

		self.userAdd = function(btn) {
			Ext.require('WebExtApp.view.user.UserEdit', function() {
				var userGrid = btn.up('userGrid');/* 向上查找grid */
				var baseForm = Ext.create('WebExtApp.view.user.UserEdit', {})
						.show();/* 创建添加显示窗口 */
				var form = baseForm.items.get(0).getForm();/* 获取表单对象 */
				var saveButton = baseForm.down('button[ref="formSave"]');/* 保存按钮 */
				var baseStore = userGrid.store;/* 拿到数据集 */
				var clickQuick = false;/* 测试用户是否点击过快 */
				saveButton.on('click', function() {
					if (!clickQuick) {/* 判断用户是否点击过快 */
						clickQuick = true;
						baseForm.hide();
						form.doAction('submit', {
									url : './basic/UserController/add.sdo',/* 添加用户请求地址 */
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

		self.userEdit = function(btn) {
			Ext.require('WebExtApp.view.user.UserEdit', function() {
						var userGrid = btn.up('userGrid').down('gridview');
						var records = userGrid.getSelectionModel()
								.getSelection();/* 获取选中的record */
						if (records.length == 1) {
							var baseForm = Ext.create(
									'WebExtApp.view.user.UserEdit', {
										title : '修改用户'
									}).show();/* 创建添加显示窗口 */
							var form = baseForm.items.get(0);/* 获取表单对象 */
							form.loadRecord(records[0]);/* 将reocrd填充到表单中 */
							var saveButton = baseForm
									.down('button[ref="formSave"]');/* 保存按钮 */
							saveButton.setText('修改');
							saveButton.on('click', function() {
										baseForm.hide();
										form.getForm().doAction('submit', {
											url : './basic/UserController/add.sdo',
											/* 添加用户请求地址 */
											method : 'post',
											waitTitle : "请稍候",
											waitMsg : '正在保存数据...',
											success : function(response, result) {
												baseForm.close();
												userGrid.store.reload();/* 重新加载亲折数据记录 */
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

		self.userDelete = function(btn) {
			var grid = btn.up('userGrid');/* 获取到grid */
			var records = grid.getSelectionModel().getSelection();/* 获取选中的数据集 */
			if (records.length != 1) {
				msgApp.msg('提示', '请选择一条数据进行操作');
			} else {
				var userStr = '删除用户[ <font color="blue" >'
						+ records[0].get('name') + '</font> ]';

				Ext.Msg.confirm('提示', '确定' + userStr + ' ？', function(info) {
							if (info == 'yes') {
								Ext.Ajax.request({
											method : 'post',
											url : './basic/UserController/delete.sdo',
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

													msgApp.msg('提示', userStr
																	+ '成功!');
												} else {
													Ext.Msg.alert("提示", "错误信息:"
																	+ obj.info);
												}
												grid.store.reload();
											},
											failure : function(response, opts) {
												webApp.msg('出错', '后端未正确返回数据',
														2000);
											}
										});

							}
						});
			}

		};

		self.configRole = function(btn) {
			var userGrid = btn.up('userGrid');
			var records = userGrid.getSelectionModel().getSelection();
			if (records.length == 0) {
				msgApp.msg('提示', '请选择一条数据进行操作');
			} else {
				self.roleWin.setValue(records[0].get('roleids'));
				self.roleWin.show();
			}
		};

		/**
		 * 配置角色 usingBy roleSelectorWindow
		 */
		self.configureRoles = function(roleValue) {
			// console.info(this.userGrid);
			var webApp = WebExtApp.getApplication();
			var userGrid = Ext.getCmp('usergrid');
			var r = userGrid.getSelectionModel().getSelection()[0];

			Ext.MessageBox.confirm('提示', "确定给[<font color=red >"
							+ r.get('name')
							+ "</font>]配置如下角色:</br><font color=red>"
							+ this.roleWin.getNames() + "</font>?", function(
							btn) {
						if (btn != 'yes') {
							return;
						}
						Ext.Ajax.request({
									method : 'post',
									url : './basic/UserController/setRole.sdo',
									params : {
										userid : r.get('id'),
										roleid : roleValue == ""
												? ""
												: roleValue
									},
									waitTitle : '请稍等片刻',
									waitMsg : '正在提交...',
									scope : this,
									success : function(resp) {
										var obj = Ext.util.JSON
												.decode(resp.responseText);
										if (obj.result == 'success') {
											webApp.msg('提示', '配置角色成功');
										} else {
											Ext.Msg.alert("提示", "错误信息:"
															+ obj.info);
										}
										userGrid.store.reload();
									},
									failure : function(response, opts) {
										webApp.msg('出错', '后端未正确返回数据', 2000);
									}
								});
					});

		};
	},

	userBtn : function() {
		var self = this;

		var userControl = {
			'userGrid button[ref=add]' : {
				click : function(btn) {
					self.userAdd(btn);
				}
			},
			'userGrid button[ref=edit]' : {
				click : function(btn) {
					self.userEdit(btn);
				}
			},
			'userGrid button[ref=destory]' : {
				click : function(btn) {
					self.userDelete(btn);
				}
			},

			'userGrid button[ref=configRole]' : {
				click : function(btn) {
					self.configRole(btn);
				}
			}
		};
		Ext.apply(self.contrl, userControl);
	},

	init : function() {
		var self = this;

		self.initMethods();

		self.roleWin = Ext.create('webApp.util.selector.RoleSelectorWindow', {
					parentPanel : self
				});

		self.userBtn();
		self.control(self.contrl);
	}
});