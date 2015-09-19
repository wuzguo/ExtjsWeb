Ext.define('WebExtApp.store.menu.MenuStore', {
			extend : Ext.data.TreeStore,
			// nodeParam : 'parantMenuID', /*这个属性是异步加载主要特征，通过该节点去请求子节点*/

			defaultRootId : 0, /* 根节点的参数值是0 */
			// autoLoad : true, /*不能重复设置该参数会导致重复加载*/
			pageSize : 25,
			// model : 'WebExtApp.model.menu.Menu',
			folderSort : true,

			proxy : {
				type : 'ajax',
				url : './basic/MenuController/list.sdo?id=0',
				// url : './webApp/app/store/menu/menu.json',
				extraParams : {},
				actionMethods : {
					read : 'POST'
				},
				autoLoad : true, /* 是否主动加载数据 */
				reader : {
					type : 'json'
					// root : 'menus'
					// successProperty : 'invdata'
				}
			},

			root : {
				text : '根节点',
				expanded : true
			}

		});
