Ext.define('WebExtApp.view.user.UserGrid', {
	extend : 'WebExtApp.base.BaseGrid',
	requires : ['Ext.ux.form.SearchField', 'Ext.ux.ProgressBarPager',
			'Ext.selection.CheckboxModel'],
	alias : 'widget.userGrid',/* 别名为usergrid */
	store : 'user.UsersStore', /* WebExtApp.store.user.UsersStore */
	id : 'usergrid',
	closeAction : 'hide',

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
		text : '配置角色',
		scope : this,
		ref : 'configRole',
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
		value : 'username',
		store : Ext.create(Ext.data.ArrayStore, {
					autoLoad : true,
					fields : ['id', 'name'],
					proxy : {
						type : 'memory',
						data : [['username', '用户名'], ['birthday', '注册时间'],
								['birthday', '邮箱'], ['birthday', '锁定']],
						reader : {
							type : 'array'
						}
					}
				})

	}, {
		xtype : 'searchfield',
		store : 'user.UsersStore',
		paramName : 'username'
	}],
	bbar : {/* 分页 */
		xtype : 'pagingtoolbar',
		store : 'user.UsersStore',
		dock : 'bottom',
		displayInfo : true,/* 是否显示分页信息 */
		plugins : Ext.create('Ext.ux.ProgressBarPager', {

		}),
		emptyMsg : '没有记录',
		listeners : {
			change : function() {/* 当grid重刷新的时候把选中的去掉、为的是防止有选中数据记录撒手不手 */
				var baseGrid = this.up('basegrid');
				var records = baseGrid.getSelectionModel();/* 获取选中的record */
				records.deselectAll();
				// baseGrid.store.reload;
			}
		}
	},
	columns : [
			new Ext.grid.RowNumberer, /* 列模式 */
			{
				header : '用户ID',
				dataIndex : 'id',
				width : '8%',
				hidden : false
			}, {
				header : '用户名',
				dataIndex : 'name',
				width : '9%',
				field : { /* 前台编辑模式 */
					xtype : "textfield",
					allowBlank : false
				}
			}, {
				text : '真实姓名',
				dataIndex : 'username',
				width : '11%',
				field : {
					xtype : "textfield",
					allowBlank : false
				}
			}, {
				header : '邮箱',
				dataIndex : 'useremail',
				width : '16%',
				field : {
					xtype : "textfield",
					allowBlank : false
				}
			}, {
				header : '电话',
				dataIndex : 'userphone',
				width : '12%',
				field : {
					xtype : "textfield",
					allowBlank : false
				}
			}, {
				header : '性别',
				dataIndex : 'sex',
				width : '6%',
				align : 'center',
				field : {
					xtype : "textfield",
					allowBlank : false
				},
				renderer : function(v) {
					if (v == 0)
						return '<font style="color: #379337;font-weight: bold;">男</font>';
					else if (v == 1)
						return '<font style="color: #c9c5dd;font-weight: bold;">女</font>';
				}
			}, {
				header : '状态',
				dataIndex : 'status',
				width : '7%',
				align : 'center',
				field : {
					xtype : "textfield",
					allowBlank : false
				},
				renderer : function(v) {
					if (v == 0)
						return '<font style="color: #379337;font-weight: bold;">可用</font>';
					else if (v == 1)
						return '<font style="color: #c9c5dd;font-weight: bold;">不可用</font>';
				}
			}, {
				header : '描叙',
				dataIndex : 'description',
				width : '28%',
				field : {
					xtype : "textfield",
					allowBlank : false
				}
			}],
	/*
	 * 查看 删除等按钮的状态安置 当未选择数据按钮置灰
	 */
	setButton : function(sm) {
		var self = this;
		var btns = self.down('toolbar');
		var items = Ext.ComponentQuery.query('button', btns);
		if (sm < 1) {
			items[1].setDisabled(true);
			items[2].setDisabled(true);
			items[3].setDisabled(true);
		} else {
			items[1].setDisabled(false);
			items[2].setDisabled(false);
			items[3].setDisabled(false);
			var status = self.getSelectionModel().getSelection()[0]
					.get('status');
			if (status == "1") {
				items[3].setDisabled(true);
			}
		}
	},
	initComponent : function(config) {
		this.callParent(config);
	},
	/*
	 * 用户管理界面全局事件初始化
	 */
	initEvents : function() {
		var self = this;
		self.items.on('afterrender', self.setButton(0), self);
		self.getSelectionModel().on('selectionchange', function(sm) {
					self.setButton(sm.getCount());
				}, self);
	}
});