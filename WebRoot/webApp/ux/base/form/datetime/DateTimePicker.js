/**
 * 带时分秒的时间控件选择器
 * @version ExtJS 4.1
 */
Ext.define('baseUx.form.datetime.DateTimePicker', {
    extend: 'Ext.picker.Date',
    alias: 'widget.datetimepicker',
    alternateClassName: 'Ext.DateTimePicker',
    todayTip : '{0}',
    renderTpl: [
        '<div id="{id}-innerEl">',
            '<div role="presentation" class="{baseCls}-header">',
                '<div class="{baseCls}-prev"><a id="{id}-prevEl" href="#" role="button" title="{prevText}"></a></div>',
                '<div class="{baseCls}-month" id="{id}-middleBtnEl">{%this.renderMonthBtn(values, out)%}</div>',
                '<div class="{baseCls}-next"><a id="{id}-nextEl" href="#" role="button" title="{nextText}"></a></div>',
            '</div>',
            '<table id="{id}-eventEl" class="{baseCls}-inner" cellspacing="0" role="presentation">',
                '<thead role="presentation"><tr role="presentation">',
                    '<tpl for="dayNames">',
                        '<th role="columnheader" title="{.}"><span>{.:this.firstInitial}</span></th>',
                    '</tpl>',
                '</tr></thead>',
                '<tbody role="presentation"><tr role="presentation">',
                    '<tpl for="days">',
                        '{#:this.isEndOfWeek}',
                        '<td role="gridcell" id="{[Ext.id()]}">',
                            '<a role="presentation" href="#" hidefocus="on" class="{parent.baseCls}-date" tabIndex="1">',
                                '<em role="presentation"><span role="presentation"></span></em>',
                            '</a>',
                        '</td>',
                    '</tpl>',
                '</tr></tbody>',
            '</table>',
            '<tpl if="showToday">',
                '<div id="{id}-footerEl" role="presentation"   class="{baseCls}-footer">{%this.renderHour(values, out)%}{%this.renderMinute(values, out)%}{%this.renderSecond(values, out)%}{%this.renderTodayBtn(values, out)%}{%this.renderOkBtn(values, out)%}</div>',
            '</tpl>',
        '</div>',
        {
            firstInitial: function(value) {
                return value.substr(0,1);
            },
            isEndOfWeek: function(value) {
                // convert from 1 based index to 0 based
                // by decrementing value once.
                value--;
                var end = value % 7 === 0 && value !== 0;
                return end ? '</tr><tr role="row">' : '';
            },
            longDay: function(value){
                return Ext.Date.format(value, this.longDayFormat);
            },
            renderHour: function(values, out) {
                Ext.DomHelper.generateMarkup(values.$comp.hour.getRenderTree(), out);
            },
            renderMinute: function(values, out) {
            	out.push('<font  style="float : left;font-weight:bold;">&nbsp&nbsp:&nbsp&nbsp</font>');
                Ext.DomHelper.generateMarkup(values.$comp.minute.getRenderTree(), out);
            },
            renderSecond: function(values, out) {
            	out.push('<font style="float : left;font-weight:bold;">&nbsp&nbsp:&nbsp&nbsp</font>');
                Ext.DomHelper.generateMarkup(values.$comp.second.getRenderTree(), out);
            },
            renderTodayBtn: function(values, out) {
                Ext.DomHelper.generateMarkup(values.$comp.todayBtn.getRenderTree(), out);
            },
            renderOkBtn: function(values, out) {
                Ext.DomHelper.generateMarkup(values.$comp.okBtn.getRenderTree(), out);
            },
            renderMonthBtn: function(values, out) {
                Ext.DomHelper.generateMarkup(values.$comp.monthBtn.getRenderTree(), out);
            }
        }
    ],
    /**
     * 创建时分秒控件
     */
    beforeRender: function () {
        /**---------------------*/
        var me = this;
        me.hour = Ext.create('Ext.form.field.Number', {
            scope: me,
            ownerCt: me,
            editable : false,
            ownerLayout: me.getComponentLayout(),
           	minValue: 0,
           	maxValue: 23,
           	width: 45,
           	style : {float:"left"},
           	enableKeyEvents: true,
           	listeners: {
                 keyup: function(field, e){
                     if (field.getValue() > 23){
                         e.stopEvent();
                         field.setValue(23);
                     }
                 }
             }
        });
        
        me.minute = Ext.create('Ext.form.field.Number', {
            scope: me,
            ownerCt: me,
           	style : {float:"left"},
            ownerLayout: me.getComponentLayout(),
        	minValue: 0,
        	maxValue: 59,
            editable : false,
        	width: 45,
        	enableKeyEvents: true,
        	listeners: {
                keyup: function(field, e){
                    if (field.getValue() > 59){
                        e.stopEvent();
                        field.setValue(59);
                    }
                }
            }
        });
        
      me.second = Ext.create('Ext.form.field.Number', {
            scope: me,
            ownerCt: me,
            editable : false,
           	style : {float:"left"},
            ownerLayout: me.getComponentLayout(),
        	minValue: 0,
        	maxValue: 59,
        	width: 45,
        	enableKeyEvents: true,
        	listeners: {
                keyup: function(field, e){
                    if (field.getValue() > 59){
                        e.stopEvent();
                        field.setValue(59);
                    }
                }
            }
        });
        
        
        me.okBtn = new Ext.button.Button({
            ownerCt: me,
            ownerLayout: me.getComponentLayout(),
            text: '确定',
            handler: me.selectDay,
            scope: me
        });
        me.callParent();
    },
	selectDay : function(){
        var me = this,
            btn = me.okBtn,
            handler = me.handler;

        if(btn && !btn.disabled){
        	me.update(me.value);
            me.fireEvent('select', me, me.value);
            if (handler) {
                handler.call(me.scope || me, me, me.value);
            }
            me.onSelect();
        }
	},
    /**
     * 渲染时分秒控件
     */
    finishRenderChildren: function () {
        this.callParent();
        /**--------------------------------------*/
        this.hour.finishRender();
        this.minute.finishRender();
        this.second.finishRender();
        this.okBtn.finishRender();
        /**--------------------------------------*/
    },
    /**
     * Update the contents of the picker
     * @private
     * @param {Date} date The new date
     * @param {Boolean} forceRefresh True to force a full refresh
     */
    update : function(date, forceRefresh){
        var me = this;
		/**-----------设置时分秒----------------*/
        date.setHours(me.hour.getValue());
    	date.setMinutes(me.minute.getValue());
    	date.setSeconds(me.second.getValue());
		/**-----------设置时分秒----------------*/
        me.callParent(arguments);
    },
    selectedUpdate: function(date){
    	var me = this;
    	date = Ext.Date.parse(Ext.Date.format(date,'Y-m-d'),'Y-m-d');
        me.callParent(arguments);
    }
});