/**
 * 菜单图片选择selector
 */
Ext.define('webApp.util.selector.ImageSelectorWindow', {
			extend : 'Ext.window.Window',
			title : '选择图片',
			border : false,
			width : 640,
			height : 400,
			layout : 'fit',
			parentPanel : null,
			modal : true,
			frame : true,
			closeAction : 'hide',
			buttonAlign : 'center',

			initDataStore : function() {
				Ext.define('image', {
							extend : 'Ext.data.Model',
							idProperty : 'id'
						});

				this.imageStore = new Ext.data.TreeStore({
							model : 'image',
							autoLoad : true,
							proxy : {
								type : 'ajax',
								url : './basic/MenuController/searchPic.sdo',
								reader : {
									type : 'json',
									totalProperty : 'total',
									rootProperty : 'invdata'
								}
							},
							folderSort : true
						});
			},

			initImageView : function() {
				var self = this;
				self.xtpl = new Ext.XTemplate('<tpl for=".">',
						'<div class="thumb-wrap app_thumb" >',
						'<div class="thumb">',
						'<img alt="{name}"  src="./{url}" />', '</div>',
						'<span>{name}</span>', '</div>', '</tpl>');

				self.imageView = Ext.create('Ext.view.View', {
							uses : 'Ext.data.Store',
							singleSelect : true,
							autoScroll : true,
							store : self.imageStore,
							cls : 'img-chooser-view',
							listeners : {
								scope : self,
								itemdblclick : self.selectImage
							},
							overItemCls : 'x-view-over',
							itemSelector : 'div.thumb-wrap',
							tpl : self.xtpl
						});
			},
			selectImage : function() {
				var self = this;
				var sImage = self.imageView.selModel.getSelection()[0];
				if (sImage) {
					if (self.parentPanel == null) {
						Ext.Msg.alert("提示", "请将调用类的域传进来！");
					} else if (self.parentPanel.selectImage == undefined) {
						Ext.Msg.alert("提示", "请实现调用类的selectImage()方法！");
					} else {
						var url = sImage.get('url').replace(/[\\ =]/g, "/");	
						self.parentPanel.selectImage(url); /* 需要将URL地址转换，否则不能显示 */
					}
					self.hide();
					self.reset();
				}
			},
			/**
			 * 根据传进来的值选择相应的图片
			 * 
			 */
			setSelectimage : function(imgurl) {
				var self = this;
				var imgurl = imgurl.indexOf("32") == -1 ? 'images/menu/32/'
						+ imgurl : imgurl;
				self.imageView.getStore().each(function(r) {
							if (r.get('url') == imgurl) {
								self.imageView.getSelectionModel().select(r);
								return;
							}
						}, self);
			},
			reset : function() {
				this.imageView.getSelectionModel().deselectAll();
			},

			initComponent : function() {
				var self = this;
				Ext.util.CSS.swapStyleSheet('imagechoser',
						'css/imageChooser.css');

				self.initDataStore();
				self.initImageView();
				Ext.apply(self, {
							items : [self.imageView]
						});
				self.callParent(arguments);
			}
		});