Ext.define('WebExtApp.base.BaseGrid', {
			extend : Ext.grid.Panel,
			alias : 'widget.basegrid',/* 别名为basegrid */
			requires : ['Ext.selection.CheckboxModel',
					'Ext.grid.plugin.RowEditing'],
			mask : true,
			// forceFit : true,/* 自动填充空白 ,导致数据列不能对齐*/
			region : 'center',
			closeAction : 'hide',
			// id : 'basegrid', /*导致各个模块显示混乱*/
			border : false,
			columnLines : true,
			columns : [],// *列模式*/

			reserveScrollerbar : true, /* 防止滚动条溢出 */

			plugins : [Ext.create('Ext.grid.plugin.RowEditing', { /* 页面编辑模式列插件 */
				clicksToEdit : 2,
				saveBtnText : '保存',
				cancelBtnText : '取消',
				autoCancel : false
			})],

			selMode : new Ext.selection.CheckboxModel({
					    injectCheckbox : 0,/* checkbox位于哪一列，默认值为0 */
						mode : 'SINGLE',
						allowDeselect : true,/* 如果值true，并且mode值为单选（single）时，可以通过点击checkbox取消对其的选择 */
						enableKeyNav : false
					}),					
			selType : 'checkboxmodel',
					
			initComponent : function(config) {
				this.callParent(config);
			}
		});