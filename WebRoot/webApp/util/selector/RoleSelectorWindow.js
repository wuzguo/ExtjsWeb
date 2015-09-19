/*
 * 角色选择 selector
 * 
 */
Ext.define('webApp.util.selector.RoleSelectorWindow', {
			extend : 'Ext.window.Window',
			parentPanel : null,
			closeAction : 'hide',
			constrain : true,
			resizable : false,
			buttonAlign : 'right',
			requires : ['Ext.ux.form.ItemSelector', 'Ext.ux.ajax.SimManager'],
			initComponent : function(config) {
				Ext.util.CSS.swapStyleSheet('ItemSelectorCss',
						'css/selector/selector.css');

				Ext.define('role', {
							extend : 'Ext.data.Model',
							idProperty : 'id'
						});

				this.roleStore = Ext.create('Ext.data.JsonStore', {
							model : 'role',
							autoLoad : true,
							// fields: ['id','roleName'],
							sorters : 'id',
							pageSize : 100,
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
				this.itemSelector = Ext.create('Ext.ux.form.ItemSelector', {
							name : 'itemselector',
							frame : false,
							border : false,
							anchor : '100%',
							store : this.roleStore,
							displayField : 'roleName',
							valueField : 'id',
							// allowBlank: false,
							// blankText:'请至少分配一个角色',
							msgTarget : 'under',// 提示在下面
							fromTitle : '可选角色',
							toTitle : '已有角色'
						});
				Ext.apply(this, {
							title : '配置角色',
							width : 600,
							bodyPadding : 7,
							height : 400,
							layout : 'fit',
							border : false,
							modal : true,
							frame : true,
							closeAction : 'hide',
							buttonAlign : 'right',
							buttons : [{
										text : '确定',
										scope : this,
										iconCls : 'confirm',
										handler : this.configerRole
									}, {
										text : '取消',
										iconCls : 'cancel',
										scope : this,
										handler : this.cancel
									}],
							items : [this.itemSelector]
						});
				this.callParent(arguments);
			},
			/*
			 * 调用 父类的
			 */
			configerRole : function() {
				if (this.itemSelector.validate()) {
				//	console.info( this.parentPanel);
					if (this.parentPanel == null) {
						Ext.Msg.alert("提示", "请将调用类的域传进来！");
					} else if (this.parentPanel.configureRoles == undefined) {
						Ext.Msg.alert("提示", "请实现调用类的configureRoles()方法！");
					} else {
						this.parentPanel.configureRoles(this.getValue());
					}
					this.hide();
				}
			},
			/*
			 * 获得选中的ID
			 */
			getValue : function() {
				return this.itemSelector.getValue();
			},

			/*
			 * 设置值
			 */
			setValue : function(v) {
				if (v == "") {
					this.reset();
				} else {
					this.itemSelector.setValue(v);
				}
			},
			/*
			 * 根据ID获得选中的name
			 */
			getNames : function() {
				var names = new Array();
				var vn = this.getValue().toString().split(',');
				for (var i = 0; i < vn.length; i++) {
					this.itemSelector.getStore().each(function(r) {
								if (r.get('id') == vn[i]) {
									names.push(r.get('roleName'));
								}
							});
				};
				return names.join(',');
			},
			/*
			 * 清空
			 */
			reset : function() {
				this.itemSelector.reset();
			},
			/*
			 * 关闭本页
			 */
			cancel : function() {
				this.reset();
				this.hide();
			}
		});