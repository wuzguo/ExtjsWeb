Ext.define('WebExtApp.view.menu.MenuGrid', {
	// extend : 'WebExtApp.base.BaseGrid',
	extend : Ext.panel.Panel,
	requires : ['Ext.ux.form.SearchField', 'Ext.ux.ProgressBarPager'],
	alias : 'widget.menuGrid',/* 别名为menuGrid */
	border : false,
	layout : 'fit',
	id : 'menugrid',

	initColumn : function() {
		var self = this;

		self.tipRenders = function(v, m, r) { /* 获取鼠标焦点时的提示信息 */
			if (v != "") {
				m.tdAttr = 'data-qtip="' + v + '"';
			}
			return v;
		};

		self.typeRenderer = function(v) {
			if (v == 'jsClassFile') {
				return 'js类名';
			} else if (v == 'actionPath') {
				return 'HTML页面';
			} else if (v == 'firstMenu') {
				return '一级菜单';
			} else {
				return v;
			}
		};

		self.isValiDateRenderer = function(v) {
			if (v == 0)
				return '<font style="color: #379337;font-weight: bold;">可用</font>';
			else if (v == 1)
				return '<font style="color: #c9c5dd;font-weight: bold;">不可用</font>';
		};

		self.columns = [{
					xtype : 'treecolumn',
					text : '菜单名称',
					width : '18%',
					sortable : true,
					dataIndex : 'menuName',
					renderer : self.tipRenders
				}, {
					text : '类型',
					width : '10%',
					sortable : true,
					dataIndex : 'type',
					renderer : self.typeRenderer
				}, {
					text : '控制器名称',
					width : '15%',
					sortable : true,
					dataIndex : 'jsCtrlClassFile',
					renderer : self.tipRenders
				}, {
					text : '容器名称',
					width : '12%',
					sortable : true,
					dataIndex : 'jsPanelClassFile',
					renderer : self.tipRenders
				}, {
					text : 'URL地址',
					width : '16%',
					sortable : true,
					dataIndex : 'actionPath',
					renderer : self.tipRenders
				}, {
					text : '菜单描述',
					width : '21%',
					sortable : true,
					dataIndex : 'description',
					renderer : self.tipRenders
				}, {
					text : '是否可用',
					width : '8%',
					sortable : true,
					renderer : self.isValiDateRenderer,
					dataIndex : 'isValiDate'
				}];
	},

	initToolbar : function() {
		var self = this;

		self.toolBar = Ext.create('Ext.toolbar.Toolbar', {
					items : [{ /* 工具栏 */
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
					}, '->', {
						xtype : 'combobox',
						fieldLabel : '筛选',
						labelWidth : 40,
						queryMode : 'local',
						displayField : 'name',
						valueField : 'id',
						width : 140,
						editable : false,
						value : 'menuName',
						store : Ext.create(Ext.data.ArrayStore, {
									autoLoad : true,
									fields : ['id', 'name'],
									proxy : {
										type : 'memory',
										data : [['menuName', '菜单名称']],
										reader : {
											type : 'array'
										}
									}
								})

					}, {
						xtype : 'searchfield',
						store : 'menu.MenuStore',
						paramName : 'menuName'
					}]
				});

		self.butombar = Ext.create('Ext.toolbar.Paging', {
					store : 'menu.MenuStore',
					dock : 'bottom',
					displayInfo : true,/* 是否显示分页信息 */
					plugins : [Ext.create('Ext.ux.ProgressBarPager', {})],
					emptyMsg : '没有记录',
					listeners : {
						change : function() {/* 当grid重刷新的时候把选中的去掉 */
							var records = self.down('treepanel')
									.getSelectionModel();/* 获取选中的record */
							records.deselectAll();
						}
					}

				});
	},

	initTreePanel : function() {
		var self = this;
		self.treePanel = Ext.create('Ext.tree.Panel', {
					mask : true,
					region : 'center',
					reserveScrollbar : true,
					useArrows : true, /* 展开按钮图标是箭头还是加减号 */
					rootVisible : false,
					columnLines : true,
					collapseFirst : false,
					// forceFit : true, /*导致数据列不能与表头对齐*/
					viewConfig : {
						stripeRows : true
					},
					multiSelect : false,

					tbar : self.toolBar,
					// bbar : this.butombar, /*不配置bbar*/
					columns : self.columns,

					store : 'menu.MenuStore'
				});
	},
	/*
	 * 查看 删除等按钮的状态安置 当未选择数据按钮置灰
	 */
	setButton : function(sm) {
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
	setNewButton : function(rec) {
		var btns = this.toolBar;
		var items = Ext.ComponentQuery.query('button', btns);
		if (rec.get('parantMenuID') != '0') {
			items[0].setDisabled(true);
		} else {
			items[0].setDisabled(false);
		}
	},

	resetButton : function(tree) {
		var btns = this.toolBar;
		var items = Ext.ComponentQuery.query('button', btns);
		tree.getSelectionModel().deselectAll();
		items[0].setDisabled(false);
		items[1].setDisabled(true);
		items[2].setDisabled(true);
	},

	initComponent : function(config) {
		var self = this;

		self.initColumn();
		self.initToolbar();
		self.initTreePanel();

		Ext.apply(self, {
					layout : 'border',
					items : [this.treePanel]
				});
		self.callParent(config);
	},

	initEvents : function() {
		var self = this;
		self.items.on('afterrender', self.setButton(0), self);
		self.treePanel.on('select', function(tree, rec, index, opt) {
					self.setNewButton(rec);
				}, self);
		self.treePanel.on('itemdblclick', function(tree) {
					self.resetButton(tree);
				}, self);
		self.treePanel.getSelectionModel().on('selectionchange', function(sm) {
					self.setButton(sm.getCount());
				}, self);
	}
});