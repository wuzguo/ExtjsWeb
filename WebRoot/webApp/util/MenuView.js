Ext.define('webApp.util.MenuView', {
	extend: 'Ext.panel.Panel',
	border: false ,
	store:null,
	autoScroll:true,
	parentPanel : null,
	initComponent: function(config) {
		Ext.util.CSS.swapStyleSheet('imager','css/imageChooser.css');
		this.menuView = Ext.create('Ext.view.View',{
			singleSelect: true,
			autoScroll: true,
			store:this.store,
            cls: 'img-chooser-view',
            listeners: {
                scope: this,
                itemclick: this.selectMenu
            },
		    overItemCls: 'x-view-over',
		    itemSelector: 'div.thumb-wrap',
		    tpl: [
            '<tpl for=".">',
                '<div class="thumb-wrap app_thumb" >',
                    '<div class="thumb">',
                        '<img alt="{name}" src="./{openIcon}" />',
                    '</div>',
                    '<span style="margin-top:5px;" >{menuName}</span>',
                '</div>',
            '</tpl>'
   			 ]
		});
		/** ./{openIcon} 注意路径 */
		Ext.apply(this, {
			items:[this.menuView]
		});
		
		this.callParent();
	},
	/*
	 * 调用传进来的 this 
	 * */
	selectMenu: function(tree, record, item, index, e,eOpts) {
		 this.parentPanel.onTreeClick(record);
		},
	/*
	 * 根据传进来的值选择相应的菜单
	 * 
	 * */
	setSelectMenu:function(id){
		this.menuView.getStore().each(function(r){
			if(r.get('id') == id){
				this.menuView.getSelectionModel().select(r);
				return;
			}
		},this);
	},
	reset:function(){
		this.menuView.getSelectionModel().deselectAll();
	}
});