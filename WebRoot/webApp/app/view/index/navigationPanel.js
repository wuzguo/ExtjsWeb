/*
 * 定义导航面板 @wuzguo 2014.10.12
 */
Ext.define('WebExtApp.view.index.navigationPanel', {
	extend : Ext.panel.Panel,
	alias : 'widget.navigationPanel',
	requires : ['webApp.util.MenuView'],
	border : false,
	width : '20%',
	layout : 'accordion',
	title : '菜单导航',
	id : 'nv',
	split : true,
	collapsible : false,
	tools : [{
				itemId : 'gear',
				type : 'gear',
				regionTool : true
			}],

	removeNV : function() {
		this.removeAll();
	},
	createNV : function(menuData) {
		if (menuData == null || menuData == "" || menuData == undefined) {
			return;
		}
		for (var i = 0; i < menuData.length; i++) {
			this.add(Ext.create('webApp.util.MenuView', {
						title : '<div class="app_small_img" ><img  src = "'
								+ menuData[i].openIcon + '"></img>'
								+ menuData[i].menuName + '</div>',
						parentPanel : this,
						store : Ext.create('Ext.data.TreeStore', {
									root : {
										expanded : true,
										children : menuData[i].children
									}
								})
					}));
		}
	},

	onTreeClick : function(record) {
		this.fireEvent('menuClick', record.data);
	},

	listeners : {
		scope : this,
		menuClick : function(d) {
			var webApp = WebExtApp.getApplication();
			var mainTab = Ext.getCmp('mainTab');
			// var mainTab = webApp.mainTab;
			var tabItem = mainTab.getComponent(d.id);
			// console.info(tabItem);
			if (tabItem) {
				mainTab.setActiveTab(tabItem);
			} else {
				if (d.jsCtrlClassFile != undefined && d.jsCtrlClassFile != "") {
					/* this.nv.mask('');//正在加载['+d.menuName+']模块信息... */
					var p = Ext.create('Ext.panel.Panel', {
								id : d.id,
								icon : d.icon,
								title : d.menuName,
								closable : true, /* 标题栏的关闭按钮 */
								// closeAction: 'hide',
								border : false,
								layout : 'fit', /**/
								itmes : []
							});
					mainTab.add(p).show();
					p.updateLayout();
					p.mask('正在加载[' + d.menuName + ']模块信息...');
					// alert(d.jsCtrlClassFile);
					// alert(d.jsPanelClassFile);
					Ext.require('WebExtApp.controller.' + d.jsCtrlClassFile,
							function() {
								// console.info('1');
								Ext.require('WebExtApp.view.'
												+ d.jsPanelClassFile,
										function() {
											// console.info('2');
											webApp
													.getController('WebExtApp.controller.'
															+ d.jsCtrlClassFile);
											/* userController.init(WebExtApp.getApplication()); *//* 重复创建 */
											// console.info('3');
											var tab = Ext
													.create('WebExtApp.view.'
															+ d.jsPanelClassFile);
											// console.info('4');
											p.add(tab);
											p.updateLayout();
											p.unmask();
										}, this);
							}, this);
					// console.info(mainTab);
				} else if (d.actionPath != undefined && d.actionPath != "") {
					// alert('3');
					var p = Ext.create('Ext.panel.Panel', {
						id : d.id,
						icon : d.icon,
						title : d.menuName,
						closable : true,
						html : '<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="'
								+ d.actionPath + '"></iframe>',
						border : false
					});
					mainTab.add(p).show();
					p.updateLayout();
				}
			}
		}
	},

	initComponent : function(config) {
		var self = this;

		Ext.Ajax.request({
					url : './basic/LoginController/getUserTree.sdo?userId=1717',
					scope : self,
					success : function(response) {
						Ext.getBody().unmask();
						setInterval(self.setTime, 1000);/* 开启时钟 */
						var menuData = Ext.JSON.decode(response.responseText);
						if (menuData.result == 'error') {
							window.location.href = 'login.html';
							return;
						}
						self.removeNV();
						self.createNV(menuData);
					}
				});

		self.callParent(config);

	}
});