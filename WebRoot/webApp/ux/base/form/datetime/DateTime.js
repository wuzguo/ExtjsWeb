/**
 * 日期控件
 * @version ExtJS 4.1
 */
Ext.define('baseUx.form.datetime.DateTime', {
    extend:'Ext.form.field.Date',
    alias: 'widget.datetimefield',
    requires: ['baseUx.form.datetime.DateTimePicker'],
    trigger1Cls: Ext.baseCSSPrefix + 'form-clear-trigger',
    trigger2Cls: Ext.baseCSSPrefix + 'form-date-trigger',
    editable : false,
    dateType : 'datetime',//默认时分秒控件, datetime | month | date
    /**
     * 添加清除按钮
     */
    initComponent: function() {  	
    	var me = this;
		me.onTrigger2Click = Ext.clone(me.onTrigger1Click);
		me.onTrigger1Click = function(){
			me.reset();
		}
		
		if(me.dateType == 'date'){
			me.submitFormat  = 'Y-m-d';
		}else if(me.dateType == 'month'){
			me.submitFormat  = 'Y-m';
		}else{
			me.submitFormat  = 'Y-m-d H:i:s';
		}
//		me.format = Ext.value(me.format,me.submitFormat);
		me.callParent(arguments);
    },
    /**
     * 创建时间选择器
     * @return {}
     */
    createPicker: function() {
        var me = this;
        if(me.dateType == 'date'){
			return me.callParent(arguments);
        }else if(me.dateType == 'month'){
        	return me.createMonthPicker();
        }else{
        	return me.createTimePicker();
        }
    },
    /**
     * 创建时分秒控件
     * @return {}
     */
    createTimePicker : function(){
    	var me = this,
            format = Ext.String.format;
        return new baseUx.form.datetime.DateTimePicker({
            pickerField: me,
            ownerCt: me.ownerCt,
            renderTo: document.body,
            floating: true,
            hidden: true,
            focusOnShow: true,
            minDate: me.minValue,
            maxDate: me.maxValue,
            disabledDatesRE: me.disabledDatesRE,
            disabledDatesText: me.disabledDatesText,
            disabledDays: me.disabledDays,
            disabledDaysText: me.disabledDaysText,
            format: me.submitFormat,
            showToday: me.showToday,
            startDay: me.startDay,
            minText: format(me.minText, me.formatDate(me.minValue)),
            maxText: format(me.maxText, me.formatDate(me.maxValue)),
            listeners: {
                scope: me,
                select: me.onSelect
            },
            keyNavConfig: {
                esc: function() {
                    me.collapse();
                }
            }
        });
    },
    /**
     * 创建月份选择器
     */
    createMonthPicker : function(){
        var me = this;
        return new Ext.picker.Month({
                renderTo: document.body,
                floating: true,
                shadow: true,
                listeners: {
                    scope: me,
                    cancelclick: me.onCancelClick,
                    okclick: me.onOkClick,
                    yeardblclick: me.onOkClick,
                    monthdblclick: me.onOkClick
                }
            });
    },
    
    /**
     * 月份选择器的确定按钮
     * @private
     */
    onOkClick: function(picker, value){
        var me = this,
            month = value[0],
            year = value[1],
            date = new Date(year, month, 1);
		me.setValue(date);
        me.onCancelClick();
    },

    /**
     * 月份选择器的取消按钮
     * @private
     */
    onCancelClick: function(){
    	var me = this;
		me.picker.hide();
		me.isExpanded = false;
    },
    /**
     * 控制按钮的显隐
     */
    afterRender: function(){
        this.callParent();
        if(this.hideTrigger1){//隐藏清除按钮
        	this.triggerCell.item(0).setDisplayed(false);
        }
        if(this.hideTrigger2){//隐藏选择按钮
        	this.triggerCell.item(1).setDisplayed(false);
        }
    },

    /**
     * @private
     * 设置选择器的值
     */
    onExpand: function() {
        var me = this,
            value = me.getValue() instanceof Date ? me.getValue() : (Ext.isEmpty(me.getValue())?  new Date() : Ext.Date.parse(me.getValue(),me.submitFormat));
        me.picker.setValue(value);
        if(me.dateType == 'datetime'){
	        me.picker.hour.setValue(value.getHours());
	        me.picker.minute.setValue(value.getMinutes());
	        me.picker.second.setValue(value.getSeconds());
        }
    },
	getValue : function(){
		var me = this;
		var value = Ext.isEmpty(me.defValue) ? '' : Ext.Date.format(me.defValue,me.submitFormat);
		return value;
	},
	setValue : function(value){
		var me = this;
		value = Ext.isDate(value) ? value : (Ext.isEmpty(value) ? value : Ext.Date.parse(value,me.submitFormat));
		me.defValue = value;
		me.callParent(arguments);
	},
	getSubmitValue : function(){
		var me = this;
		return me.getValue();
	},
    beforeBlur : function(){
        var me = this,
            v = me.defValue,
            focusTask = me.focusTask;
        if (focusTask) {
            focusTask.cancel();
        }
        if (v) {
            me.setValue(v);
        }
    }
});
