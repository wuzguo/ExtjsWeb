Ext.define('WebExtApp.store.user.UsersStore', {
			extend : Ext.data.Store,
			model : 'WebExtApp.model.user.User',
			sorters : 'id', /* 排序 */
			pageSize : 25,/* 每页显示条数 */
			proxy : {
				type : 'ajax',
				url : './basic/UserController/list.sdo',
				// url : './webApp/app/store/user/user.json',
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
