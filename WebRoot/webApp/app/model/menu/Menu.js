Ext.define('WebExtApp.model.menu.Menu', {
			extend : Ext.data.Model,
			// fields:factory.Model.getFields('extjs.JsonTreeNode','checked')//获取模型字段
			
			idProperty : 'id',
			fields : [{
						name : 'menuName',
						type : 'string'
					}, {
						name : 'type',
						type : 'string'
					}, {
						name : 'jsCtrlClassFile',
						type : 'string'
					}, {
						name : 'jsPanelClassFile',
						type : 'string'
					}, {
						name : 'actionPath',
						type : 'string'
					}, {
						name : 'description',
						type : 'string'
					}, {
						name : 'isValiDate',
						type : 'string'
					}, {
						name : 'menuIds',
						type : 'string'
					}, {
						name : 'leaf',
						type : 'boolean'
					}

			]
		});