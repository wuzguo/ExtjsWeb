Ext.define('WebExtApp.controller.MainController', {
			extend : Ext.app.Controller,
			requires : ['Ext.state.CookieProvider', 'Ext.util.KeyNav'],
			views : ['Viewport'],
			contrl : {},

			initMainEvent : function() {
				Ext.state.Manager.setProvider(Ext
						.create('Ext.state.CookieProvider'));

				Ext.create('Ext.util.KeyNav', Ext.getBody(), { /* 防止按backspace回退 */
					ignoreInputFields : true,/* 忽略里面的filed的 事件响应 不阻止 */
					'backspace' : {
						fn : function(e) {
							e.stopEvent();
						}
					}
				});
			},

			initSetMenu : function() {
				var self = this;

				self.onSetRegion = function(bPanel) { /* 显示模式 */
					var ownPl = bPanel.toolOwner;
					var rmenu = ownPl.regionMenu
							|| (ownPl.regionMenu = Ext.widget({
										xtype : 'menu',
										items : [{
											text : '阵列模式',
											checked : ownPl.region === '阵列模式',
											group : 'mianRegion',
											handler : function() {
												WebExtApp.getApplication
														.setMenu();
											}

										}, {
											text : '树形模式',
											checked : ownPl.region === '树形模式',
											group : 'mianRegion',
											handler : function() {
												WebExtApp.getApplication
														.setTreeMenu();
											}

										}]

									}));
					rmenu.showBy(bPanel.el);
				};
			},

			regionButton : function() {
				var self = this;
				var regionControl = {
					'tool[regionTool]' : {
						click : function(bPanel) {
							self.onSetRegion(bPanel);
						}
					}
				};

				Ext.apply(self.contrl, regionControl);
			},

			init : function() {
				var self = this;

				self.initMainEvent();
				self.initSetMenu();

				self.regionButton();
				self.control(self.contrl);

			}
		}

);