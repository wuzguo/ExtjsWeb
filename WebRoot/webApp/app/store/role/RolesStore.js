Ext.define('WebExtApp.store.role.RolesStore', {
			extend : Ext.data.TreeStore,

			/* defaultRootId : factory.Model.getRootId('role/root.html'), */

			// autoLoad : false,
			pageSize : 25,
			model : 'WebExtApp.model.role.Role',
			proxy : {
				type : 'ajax',
				url : './basic/RoleController/list.sdo',

				extraParams : {
					excludes : 'checked', /* 查询条件 */
					orderSql : " order by orderIndex"
				},
				actionMethods : {
					read : 'POST'
				},
				autoLoad : false, /* 是否主动加载数据 */
				reader : {
					type : 'json',
					root : 'invdata',
					successProperty : 'invdata'
				}
			}

		});
