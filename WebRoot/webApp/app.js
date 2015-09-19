/*
 * 页面框架初始化 @wzguo 2014.10.12
 */
Ext.Loader.setConfig({
			enabled : true
		});

/* 创建application 初始化 */
Ext.application({
	name : 'WebExtApp',
	paths : {
		'Ext.ux' : 'extjs/ux',
		'baseUx' : 'webApp/ux/base',
		'factory' : 'webApp/util/factory'
	},
	appFolder : 'webApp/app',
	controllers : ['MainController'],

	autoCreateViewport : true,
	enableQuickTips : true,

	msgCt : null,/* 定义消息弹出窗 */
	topPanel : null,
	nv : null,
	// mainTab: null,

	initMainEvent : function() {
		var self = this;
		Ext.QuickTips.init();
		Ext.Ajax.timeout = 600000;/* 请求超时时间改为600秒 */

		self.cookies = Ext.create('Ext.state.CookieProvider', {
			expires : new Date(new Date().getTime()
					+ (1000 * 60 * 60 * 24 * 30))
				// 30 days
			});
		Ext.state.Manager.setProvider(this.cookies);
		self.themeCookie = this.cookies.get("themes");
		self.themeCookie = !this.themeCookie || this.themeCookie == ''
				? 'neptune'
				: this.themeCookie;/* 获取用户主题 */
	},

	initVariable : function() {
		var self = this;
		self.topPanel = Ext.getCmp('tPanel');
		self.nv = Ext.getCmp('nv');
		// this.mainTab = Ext.getCmp('mainTab');

		/*
		 * 信息弹出提示窗口
		 */
		self.msg = function(title, format, delay) {
			this.msgCt = Ext.DomHelper.insertFirst(document.body, {
						id : 'msg-div'
					}, true);
			var s = Ext.String.format.apply(String, Array.prototype.slice.call(
							arguments, 1));
			var m = Ext.DomHelper.append(self.msgCt, self.createBox(title, s),
					true);
			m.hide();
			m.slideIn('t', {
						duration : 200
					}).ghost("b", {
						delay : delay == undefined ? 2000 : delay,
						remove : true
					});
		};

	},

	initMethod : function() {
		var self = this;

		self.createBox = function(t, s) {
			return '<div class="msg ' + Ext.baseCSSPrefix + 'border-box"><h3>'
					+ t + '</h3><p>' + s + '</p></div>';
		};
		/*
		 * 添加 当前时间 时钟
		 */
		self.setTime = function() {
			var date = Ext.Date.format(new Date(), 'Y-m-d H:i:s l');
			document.getElementById('liveclock').innerHTML = date;
		};
		
		self.setActiveStyleSheet = function(title) {
			self.setDocumentTheme(document, title);
			/* 刷新iframe的主题 */
			var iframes = Ext.query('iframe');
			for (var i = 0; i < iframes.length; i++) {
				self.setDocumentTheme(iframes[i].contentWindow.document, title);
			}
		};
		/*
		 * 刷新documnet主题 @param {} doc documnet对象 @param {} themeTitle CSS的title
		 * 
		 */
		self.setDocumentTheme = function(doc, themeTitle) {
			var i, a, links = doc.getElementsByTagName("link"), len = links.length;
			for (i = 0; i < len; i++) {
				a = links[i];
				if (a.getAttribute("rel").indexOf("style") != -1
						&& a.getAttribute("title")) {
					a.disabled = true;
					if (a.getAttribute("title") == themeTitle)
						a.disabled = false;
				}
			}
		};

		self.collapse = function() { /* 关闭全屏 */
			self.topPanel.hide();
			self.nv.collapse();
		};

		self.expand = function() { /* 全屏操作 */
			self.topPanel.show();
			self.nv.expand();
		};

	},

	launch : function() { /* 界面加载完成后执行 */
		var self = this;

		self.initMainEvent();
		self.initMethod();
		self.initVariable();
	}

});