package com.extweb.shiro;

import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authc.credential.SimpleCredentialsMatcher;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * shiro重写密码验证方式.
 * @author huanghuanlai
 *
 */
public class CustomCaptchaMatcher extends SimpleCredentialsMatcher {
	
	private static final Logger logger = LoggerFactory.getLogger(CustomCaptchaMatcher.class);
	 @Override  
     public boolean doCredentialsMatch(AuthenticationToken authcToken, AuthenticationInfo info) {  
       
         String inputPassword = getUserPassword(authcToken);//用户输入的密码
         Object accountCredentials = getCredentials(info);  
         
         //将密码加密与系统加密后的密码校验，内容一致就返回true,不一致就返回false  
         boolean result = false;
         try {
        	 if(inputPassword.equals(accountCredentials.toString())){
        		 logger.info("hash密码验证成功");
        		 result = true;
        	 }else{
        		 result = PasswordHash.validatePassword(inputPassword, accountCredentials.toString());
        		 logger.info("hash密码验证成功");
        	 }
		} catch (Exception e) {
			logger.info("密码对比异常");
		}
         return result;
     }  

     private String getUserPassword(AuthenticationToken authcToken) { 
    	 UsernamePasswordToken token = (UsernamePasswordToken) authcToken;
    	 return String.valueOf(token.getPassword());
     } 	
}
