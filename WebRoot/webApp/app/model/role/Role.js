Ext.define('WebExtApp.model.role.Role', {
			extend : Ext.data.Model,
			// fields:factory.Model.getFields('extjs.JsonTreeNode','checked')//获取模型字段

			fields : [{
						name : 'roleName',
						type : 'string'
					}, {
						name : 'describle',
						type : 'string'
					}]
		});