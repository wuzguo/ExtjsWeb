Ext.define('WebExtApp.view.role.RoleGrid', {
			// extend : Ext.grid.Panel,
			extend : 'WebExtApp.base.BaseGrid',
			requires : ['Ext.ux.form.SearchField', 'Ext.ux.ProgressBarPager'],
			alias : 'widget.roleGrid',/* 别名为roleGrid */
			store : 'role.RolesStore',
			id : 'rolegrid',

			tbar : [{ /* 工具栏 */
				xtype : 'button',
				ref : 'add',
				text : '新建',
				scope : this,
				iconCls : 'add'
			}, '-', {
				xtype : 'button',
				ref : 'edit',
				text : '修改',
				scope : this,
				iconCls : 'edit'
			}, {
				xtype : 'button',
				ref : 'destory',
				text : '删除',
				scope : this,
				iconCls : 'delete'
			}, '-', {
				text : '配置菜单',
				scope : this,
				ref : 'configmenu',
				iconCls : 'show'
			}, '->', {
				xtype : 'combobox',
				fieldLabel : '筛选',
				labelWidth : 40,
				queryMode : 'local',
				displayField : 'name',
				valueField : 'id',
				width : 140,
				editable : false,
				value : 'roleName',
				store : Ext.create(Ext.data.ArrayStore, {
							autoLoad : true,
							fields : ['id', 'name'],
							proxy : {
								type : 'memory',
								data : [['roleName', '角色名称']],
								reader : {
									type : 'array'
								}
							}
						})

			}, {
				xtype : 'searchfield',
				store : 'role.RolesStore',
				paramName : 'roleName'
			}],

			bbar : {/* 分页 */
				xtype : 'pagingtoolbar',
				store : 'role.RolesStore',
				dock : 'bottom',
				displayInfo : true,/* 是否显示分页信息 */
				plugins : [Ext.create('Ext.ux.ProgressBarPager', {})],
				emptyMsg : '没有记录',
				listeners : {
					change : function() {/* 当grid重刷新的时候把选中的去掉、为的是防止有选中数据记录撒手不手 */
						var roleGrid = this.up('roleGrid');
						var records = roleGrid.getSelectionModel();/* 获取选中的record */
						records.deselectAll();
						// baseGrid.store.reload;
					}
				}
			},
			columns : [new Ext.grid.RowNumberer, { /* 列模式 */
				header : '角色名称',
				dataIndex : 'roleName',
				width : '28%',
				field : {
					xtype : "textfield",
					allowBlank : false
				}
			},/* 前台编辑模式 */
					{
						header : '角色描叙',
						dataIndex : 'describle',
						width : '68%',
						field : {
							xtype : "textfield",
							allowBlank : false
						}
					}],
			/*
			 * 查看 删除等按钮的状态安置 当未选择数据按钮置灰
			 */
			setButton : function(sm) {
				var btns = this.down('toolbar');
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

			initComponent : function(config) {
				this.callParent(config);
			},

			initEvents : function() {
				var self = this;
				self.items.on('afterrender', self.setButton(0), self);
				self.getSelectionModel().on('selectionchange', function(sm) {
							self.setButton(sm.getCount());
						}, self);
			}
		});