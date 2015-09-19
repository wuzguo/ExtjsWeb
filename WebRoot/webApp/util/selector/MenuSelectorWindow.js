/*
 * 菜单配置selector Window
 */
Ext.define('webApp.util.selector.MenuSelectorWindow', {
			extend : 'Ext.window.Window',
			parentPanel : null,
			requires : ['Ext.tree.*', 'Ext.data.*', 'Ext.data.TreeStore'],
			value : null,// 用于selector 的 getvalue
			nameValue : null,// 用户selector 的getName
			constrain : true,
			resizable : false,
			initComponent : function(config) {
				this.menuStore = Ext.create('Ext.data.TreeStore', {
							proxy : {
								type : 'ajax',
								url : './basic/MenuController/list.sdo?id=0'
							}
						});
				// 菜单树
				this.menuTree = Ext.create('Ext.tree.TreePanel', {
							store : this.menuStore,
							region : 'center',
							rootVisible : false,
							border : false,
							unStyled : true,
							reserveScrollbar : true,
							useArrows : true,
							frame : false,
							scope : this,
							listeners : {
								scope : this,
								checkchange : function(node, checked) {
									if (checked) {
										node.eachChild(function(child) {
													this.chd(child, true);
												}, this);
									} else {
										node.eachChild(function(child) {
													this.chd(child, false);
												}, this);
									}
									this.parentnode(node);
								},
								load : function() {
									var node = this.menuTree.getRootNode();
									this.chd(node, false);
								}
							}
						});
				Ext.apply(this, {
							title : '配置菜单',
							width : 280,
							height : 400,
							layout : 'border',
							border : false,
							modal : true,
							frame : true,
							closeAction : 'hide',
							buttonAlign : 'right',
							buttons : [{
										text : '确定',
										scope : this,
										iconCls : 'confirm',
										handler : this.configerMenu
									}, {
										text : '取消',
										iconCls : 'cancel',
										scope : this,
										handler : this.cancel
									}],
							items : [this.menuTree]
						});
				this.callParent();
			},
			/*
			 * 菜单selector界面全局事件初始化
			 */
			initEvents : function() {
				this.items.on('afterrender', this.initMethod(), this);
			},
			/*
			 * 菜单selectorinit 方法
			 */
			initMethod : function() {
				// this.menuTree.expandAll();
			},
			// private for menuTree checkchange event
			nodep : function(node) {
				var bnode = true;
				Ext.Array.each(node.childNodes, function(v) {
							if (!v.data.checked) {
								bnode = false;
								return;
							}
						});
				return bnode;
			},
			// private for menuTree checkchange event
			parentnode : function(node) {
				if (node.parentNode != null) {
					if (this.nodep(node.parentNode)) {
						node.parentNode.set('checked', true);
					} else {
						node.parentNode.set('checked', false);
					}
					this.parentnode(node.parentNode);
				}
			},
			// private for menuTree checkchange event
			chd : function(node, check) {
				node.set('text', node.get('menuName'));
				if (node.get('checked') == null) {
					node.set('checked', false);
				} else {
					node.set('checked', check);
				}
				if (node.isNode) {
					node.eachChild(function(child) {
								this.chd(child, check);
							}, this);
				}
			},
			// 调用界面的方法返回选择的值
			configerMenu : function() {
				if (this.parentPanel == null) {
					Ext.Msg.alert("提示", "请将调用类的域传进来！");
				} else if (this.parentPanel.configerMenu == undefined) {
					Ext.Msg.alert("提示", "请实现调用类的configerMenu()方法！");
				} else {
					this.parentPanel.configerMenu(this.getValue());
				}
				this.hide();
				this.reset();
			},
			getValue : function() {
				this.value = new Array();
				var node = this.menuTree.getRootNode();
				this.featchNode(node);
				return this.value.join(',');
			},
			getNames : function() {
				this.nameValue = new Array();
				var node = this.menuTree.getRootNode();
				this.featchNodeName(node);
				return this.nameValue.join(',');
			},
			setValue : function(value) {
				this.reset();
				var ids = value.toString().split(",");
				var node = this.menuTree.getRootNode();
				for (var i = 0; i < ids.length; i++) {
					this.insetNode(node, ids[i]);
				}
			},
			// private for setvalue
			insetNode : function(node, id) {
				if (node.get('id') == id) {
					node.set('checked', true);
					this.menuTree.fireEvent('checkchange', node, true);
					this.parentnode(node);
					node.parentNode.expand();
				}
				if (node.isNode) {
					node.eachChild(function(child) {
								this.insetNode(child, id);
							}, this);
				}
			},
			// private for getvalue
			featchNode : function(node) {
				if (node.get('checked') == true && node.get('id') != 'root') {
					this.value.push(node.get('id'));
				}
				if (node.isNode) {
					node.eachChild(function(child) {
								this.featchNode(child);
							}, this);
				}
			},
			// private for getname
			featchNodeName : function(node) {
				if (node.get('checked') == true) {
					this.nameValue.push(node.get('menuName'));
				}
				if (node.isNode) {
					node.eachChild(function(child) {
								this.featchNodeName(child);
							}, this);
				}
			},
			/*
			 * 清空
			 */
			reset : function() {
				var node = this.menuTree.getRootNode();
				this.menuTree.collapseAll();
				this.chd(node, false);
			},
			/*
			 * 关闭本页
			 */
			cancel : function() {
				this.reset();
				this.hide();
			}
		});