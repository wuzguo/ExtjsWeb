Ext.define('WebExtApp.controller.menu.MenuController', {
	extend : Ext.app.Controller,
	requires : ['factory.Model', 'webApp.util.selector.ImageSelectorWindow'],
	contrl : {},
	isload : false,
	views : ['menu.MenuGrid', 'menu.MenuPanel'],
	stores : ['menu.MenuStore'],
	models : ['menu.Menu'],

	initStore : function() {
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
	},

	initMethods : function() {
		var self = this;
		var msgApp = WebExtApp.getApplication();

		self.addMenu = function(btn) {
			Ext.require('WebExtApp.view.menu.MenuEdit', function() {
				var menuGrid = btn.up('menuGrid').down('treepanel');/* 向上查找grid */
				var baseForm = Ext.create('WebExtApp.view.menu.MenuEdit', {})
						.show();/* 创建添加显示窗口 */
				var form = baseForm.items.get(0).getForm();/* 获取表单对象 */
				// var form = menuForm.items.get(0).getForm();

				var records = menuGrid.getSelectionModel().getSelection();
				if (records.length == 1) {
					var parantMenuID = form.findField('parantMenuID');
					parantMenuID.setValue(records[0].get('id'));
				} else {
					self.firstNode(baseForm);
				}

				var saveButton = baseForm.down('button[ref="formSave"]');/* 保存按钮 */
				var baseStore = menuGrid.store;/* 拿到数据集 */
				var clickQuick = false;
				saveButton.on('click', function() {
					if (!clickQuick) {/* 判断用户是否点击过快 */
						clickQuick = true;
						baseForm.hide();

						form.doAction('submit', {
									url : './basic/MenuController/add.sdo',/* 添加用户请求地址 */
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

			/* 提交数据方法二，通过Ext.Ajax提交 */

			/*var form = btn.up('menupanel').getForm();
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
								// do something
							},
							failure : function(response, opts) {
								// do something
							}
						});
			}*/
		};

		self.editMenu = function(btn) {
			Ext.require('WebExtApp.view.menu.MenuEdit', function() {
				var menuGrid = btn.up('menuGrid').down('treepanel');/* 向上查找grid */
				var records = menuGrid.getSelectionModel().getSelection();
				if (records.length == 1) {
					var baseForm = Ext.create( /* 创建添加显示窗口 */
							'WebExtApp.view.menu.MenuEdit', {
								title : '修改菜单'
							});

					var form = baseForm.items.get(0).getForm();
					var type = records[0].get('type');
					// alert(type);
					if (type == 'firstMenu') {
						self.firstNode(baseForm);
						alert('xxxx');
					} else {
						self.secondNode(baseForm, records);
					}

					var imageValue = '<image class="app_medinu_show" src="./'
							+ records[0].get('openIcon') + '" ></image>';

					form.loadRecord(records[0]); /* 将展示的数据加载到编辑窗体 */

					form.findField('openIcon').setValue(records[0]
							.get('openIcon').replace(/[\\ =]/g, "/").replace(
									"images/menu/32/", ""));
					form.findField('icon').setValue(records[0].get('icon')
							.replace(/[\\ =]/g, "/")
							.replace("images/menu/", ""));

					baseForm.show(); /* 要先Show窗体否则图片不能显示 */
					form.findField('imageDisplay').update(imageValue);

					var saveButton = baseForm.down('button[ref="formSave"]');/* 保存按钮 */
					saveButton.setText('修改');
					saveButton.on('click', function() {
								baseForm.hide();
								form.doAction('submit', {
											url : './basic/MenuController/add.sdo',
											/* 添加用户请求地址 */
											method : 'post',
											waitTitle : "请稍候",
											waitMsg : '正在保存数据...',
											success : function(response, result) {
												baseForm.close();
												menuGrid.store.reload();/* 重新加载亲折数据记录 */
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

		self.firstNode = function(menuForm) {
			var form = menuForm.items.get(0).getForm();

			var jctlFile = form.findField('jsCtrlClassFile');
			var jpnlFile = form.findField('jsPanelClassFile');
			var acPath = form.findField('actionPath');
			var type = form.findField('type');

			jctlFile.reset();
			jpnlFile.reset();
			acPath.reset();

			jctlFile.hide();
			jpnlFile.hide();
			acPath.hide();

			self.typeStore.add({
						"id" : "firstMenu",
						"name" : "一级菜单"
					});
			type.setValue('firstMenu');
			type.setReadOnly(true);
		};

		self.secondNode = function(menuForm, records) {
			var form = menuForm.items.get(0).getForm();
			var r = records[0];
			var jctlFile = form.findField('jsCtrlClassFile');
			var jpnlFile = form.findField('jsPanelClassFile');
			var acPath = form.findField('actionPath');

			var parantMenuID = form.findField('parantMenuID');
			var type = form.findField('type');

			jctlFile.reset();
			jpnlFile.reset();
			acPath.reset();

			jctlFile.show();
			jpnlFile.show();
			acPath.hide();

			self.typeStore.removeAt(2);
			type.setValue('jsClassFile');
			type.setReadOnly(false);
			parantMenuID.setValue(r.get('id'));
		};

		self.deleteMenu = function(btn) {
			// var r = this.treePanel.getSelectionModel().getSelection()[0];
			var menuGrid = btn.up('menuGrid').down('treepanel');/* 向上查找grid */
			var records = menuGrid.getSelectionModel().getSelection();

			if (records.length != 1) {
				msgApp.msg('提示', '请选择一条数据进行操作');
			} else {
				var userStr = '删除菜单[ <font color="blue" >'
						+ records[0].get('menuName') + '</font> ]';
				Ext.MessageBox.confirm('提示', '确定' + userStr + ' ？', function(
								btn) {
							if (btn != 'yes') {
								return;
							}
							Ext.Ajax.request({
										method : 'post',
										url : './basic/MenuController/delete.sdo',
										params : {
											id : records[0].get('id')
										},
										waitTitle : '请稍等片刻',
										waitMsg : '正在删除...',
										scope : self,
										success : function(resp) {
											var obj = Ext.util.JSON
													.decode(resp.responseText);
											if (obj.result == 'success') {
												msgApp.msg('提示', userStr
																+ '成功!');
											} else {
												Ext.Msg.alert("提示", "信息:"
																+ obj.info);
											}
											menuGrid.store.reload();
										},
										failure : function(response, opts) {
											msgApp.msg('出错', '后端未正确返回数据', 2000);
										}
									});
						});

			}

		};
	},

	menuButton : function() {
		var self = this;

		var menuControl = {
			'menupanel button[ref=add]' : {
				click : function(btn) {
					self.addMenu(btn);
				}
			},
			'menupanel button[ref=edit]' : {
				click : function(btn) {
					self.editMenu(btn);
				}
			},
			'menupanel button[ref=destory]' : {
				click : function(btn) {
					self.deleteMenu(btn);
				}
			}
		};
		Ext.apply(self.contrl, menuControl);
	},

	init : function() {
		var self = this;

		self.initMethods();
		self.initStore();
		self.menuButton();

		self.control(self.contrl);
	}
});