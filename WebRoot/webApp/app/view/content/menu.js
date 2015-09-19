Ext.define('WebExtApp.view.content.menu', {
	extend:Ext.tree.Panel,
	alias : 'widget.contentmenu',// 别名为contenttree
    width: 200,
    rootVisible: false,
    border:false,
    bodyStyle:'border:none;',
    lines:false,
    
	fields : ['functionId','functionMappingName','functionController','functionPanel','text'],
		
	
	root: {
        expanded: true,
        children: [
            { 
            	text: '用户管理',
            	functionId:1,
            	functionController:'user.Controller',
            	functionPanel:'CC.view.user.panel',
            	iconCls:'User',
            	leaf: true 
            },
            { 
            	text: "分组管理",
            	functionId:2,
            	functionController:'department.Controller',
            	functionPanel:'CC.view.department.panel',
            	iconCls:'Group',
            	leaf: true 
           	},
            { 
            	text: "角色管理", 
            	functionId:3,
            	functionController:'role.Controller',
            	functionPanel:'CC.view.role.panel',
            	iconCls:'Userearth',
            	leaf: true 
            },
            { 
            	text: "权限管理",
            	functionId:4,
            	functionController:'permission.Controller',
            	functionPanel:'CC.view.permission.panel',
            	iconCls:'Userbrown',
            	leaf: true 
            }
        ]
	}
});