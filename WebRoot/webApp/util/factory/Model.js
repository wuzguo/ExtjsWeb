Ext.define('factory.Model', {
	extend : 'Ext.Base',
	requires : ['Ext.util.MixedCollection', 'Ext.data.Model'],
	constructor : function(config) {
		this.callParent(arguments);
	},

	statics : {
		models : new Ext.util.MixedCollection(),

		fields : new Ext.util.MixedCollection(),

		getModelByName : function(modelName, excludes) {
			if (modelName == null) {
				throw new Error('模型类名称不能为空');
				return;
			}
			var params = {
				modelName : modelName
			};
			if (!Ext.isEmpty(excludes)) {
				params.excludes = excludes;
			}

			if (!Ext.isEmpty(modelName) && !this.models.containsKey(modelName)) {
				var fields = [];
				if (this.fields.containsKey(modelName)) {
					fields = this.fields.get(modelName);
				} else {
					Ext.Ajax.request({
								url : './model/ModelController/read.sdo',
								method : 'post',
								params : params,
								timeout : 4000,
								async : false,
								success : function(response, result) {
									fields = Ext.decode(response.responseText);
								}
							});
					this.fields.add(modelName, fields);
				}
				var newModel = Ext.define(modelName, {
							extend : "Ext.data.Model",
							fields : fields
						});
				this.models.add(modelName, newModel);
			}
			return {
				modelName : modelName,
				model : this.models.get(modelName)
			};
		},
		getFields : function(modelName, excludes) {
			if (modelName == null) {
				throw new Error('模型类名称不能为空');
				return;
			}
			var params = {
				modelName : modelName
			};
			if (excludes != null && excludes.trim() != "") {
				Ext.apply(params, {
							excludes : excludes
						});
			}
			var fields = [];
			if (this.fields.containsKey(modelName)) {
				fields = this.fields.get(modelName);
			} else {
				Ext.Ajax.request({
							url : './model/ModelController/read.sdo',
							method : 'POST',
							params : params,
							timeout : 4000,
							async : false,
							success : function(response, result) {
								fields = Ext.decode(response.responseText);

								// console.info(fields);
							}
						});
			}
			return fields;
		},
		getModel : function(modelName, excludes) {
			if (modelName == null) {
				throw new Error('模型类名称不能为空');
				return;
			}
			if (this.models, containsKey(modelName)) {
				var config = Ext.value(config, {});
				var fields = config.fields;
				if (Ext.isEmpty(fields)) {
					fields = getFields(config);
				}
				var newModel = Ext.define(modelName, {
							extend : Ext.data.Model,
							fields : fields
						});
				this.models.add(modelName, newModel);
			}
			return modelName;
		},
		getRootId : function(url) {
			var rootId = -1;
			Ext.Ajax.request({
						url : url,
						method : 'POST',
						timeout : 4000,
						async : false,
						success : function(response, result) {
							rootId = Ext.decode(response.responseText).model;
						}
					});
			return rootId;
		}
	}
});
