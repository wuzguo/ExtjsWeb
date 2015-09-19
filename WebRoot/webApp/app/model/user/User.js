/*
 * User Model 获取模型字段 @wzguo
 */

Ext.define('WebExtApp.model.user.User', {
			extend : Ext.data.Model,
			// requires : ['factory.Model'],
			// fields : factory.Model.getFields('UserEty')
			fields : [{
						name : 'id',
						type : 'int'
					}, {
						name : 'name',
						type : 'string'
					}, {
						name : 'sex',
						type : 'string'
					}, {
						name : 'status',
						type : 'string'
					}, {
						name : 'useremail',
						type : 'string'
					}, {
						name : 'username',
						type : 'string'
					}, {
						name : 'userphone',
						type : 'string'
					}, {
						name : 'description',
						type : 'string'
					}]
		});