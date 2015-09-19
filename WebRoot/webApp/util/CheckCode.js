/**
 * 自定义验证码类
 * 
 * @wzguo
 * 
 */
Ext.define('webApp.util.CheckCode', {
			extend : 'Ext.form.field.Text',
			alias : 'widget.checkcode',
			requires : ['Ext.form.field.Display', 'Ext.form.field.Text',
					'Ext.button.Button'],
			inputType : 'text',
			codeUrl : Ext.BLANK_IMAGE_URL,
			isLoader : true,
		    fieldLabel : null,

			onRender : function(ct, position) {
				this.callParent(arguments);
				this.codeEl = ct.createChild({
							tag : 'img',
							src : Ext.BLANK_IMAGE_URL
						});
				this.codeEl.addCls('x-form-code');
				this.codeEl.on('click', this.loadCodeImg, this);

				if (this.isLoader)
					this.loadCodeImg();
			},
			alignErrorIcon : function() {
				this.errorIcon.alignTo(this.codeEl, 'tl-tr', [2, 0]);
			},
			/* 如果浏览器发现url不变，就认为图片没有改变，就会使用缓存中的图片，而不是重新向服务器请求，所以需要加一个参数，改变URL */
			loadCodeImg : function() {
				this.codeEl.set({
							src : this.codeUrl
						});
			},

			initComponent : function(config) {
				this.callParent(config);
			}
		});
