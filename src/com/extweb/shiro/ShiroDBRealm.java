package com.extweb.shiro;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.extweb.model.UserEty;

/**
 * 自定义Realm读取数据库用户信息和授权信息
 * @author huanghuanlai
 *
 */
public class ShiroDBRealm extends AuthorizingRealm{

	private static final Logger logger = LoggerFactory.getLogger(ShiroDBRealm.class);
	
/*	private String hql="from "+User.class.getSimpleName()+" as u where u.username=?";
	
	@Resource
	public UserService userService;
	@Resource
	public MsgService msgService;
	@Resource
	public RoleService roleService;
	@Resource
	public PermissionService permissionService;
	@Resource
	public DepartmentService departmentService;
	@Resource
	public PcServiceTemplate pcServiceTemplate;
	*/
	
	/** 
     * 授权操作，决定那些角色可以使用那些资源 
     */
	protected AuthorizationInfo doGetAuthorizationInfo(
			PrincipalCollection principals) {
		logger.info("进行用户授操作");
		SimpleAuthorizationInfo simpleAuthorizationInfo = new SimpleAuthorizationInfo();
		String username = (String) super.getAvailablePrincipal(principals);//给当前用户设置角色
	//	simpleAuthorizationInfo.setRoles(userService.findRoles(username));//查找用户角色并设置
	//	simpleAuthorizationInfo.setStringPermissions(userService.findPermissions(username));//给当前用户设置权限
		return simpleAuthorizationInfo;
		
	}

	/** 
     * 认证操作，判断一个请求是否被允许进入系统 (回调用)
     */ 
	protected AuthenticationInfo doGetAuthenticationInfo(
			AuthenticationToken authcToken) throws AuthenticationException {
		logger.info("进行回登录调操作");
		UsernamePasswordToken token = (UsernamePasswordToken) authcToken;
		List<Object> perms = new ArrayList<Object>();
		perms.add(token.getUsername());
		UserEty user = null;
	//	User user = userService.findByHql(hql, perms); @wzguo
		SimpleAuthenticationInfo simpleAuthenticationInfo = null;
		if (user != null) {
			/*		simpleAuthenticationInfo = new SimpleAuthenticationInfo(user.getUsername(), user
						.getPassword(), user.getUsername()); */
			return simpleAuthenticationInfo;
		} else {
			throw new UnknownAccountException();
		}
	}
	
	@PostConstruct
    public void initCredentialsMatcher() {
    	logger.info("Shiro重写开始");
		//该句作用是重写shiro的密码验证，让shiro用我自己的验证  
        setCredentialsMatcher(new CustomCaptchaMatcher());  
    //    new Thread(new InitDatas(this)).start();  @wzguo
    }
}

