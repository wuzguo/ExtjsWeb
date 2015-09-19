package com.extweb.shiro;

import java.util.Properties;

import org.jasypt.util.text.BasicTextEncryptor;
import org.springframework.beans.factory.FactoryBean;

import com.extweb.util.PropUtil;

/**
 * 数据库密文加密与解密
 * @author huanghuanlai
 *
 */

@SuppressWarnings("all")
public class Encrypt implements FactoryBean<Object>{
	
	private String user = "user";
	private String password = "password";
	private static String setPassword="http://yunguanshi.com";
	private Properties properties;  
     
    public Object getObject() throws Exception {  
        return getProperties();  
    }  
  
    public Class getObjectType() {  
        return java.util.Properties.class;  
    }  
  
    public boolean isSingleton() {  
        return true;  
    }  
  
    public Properties getProperties() {  
        return properties;  
    }  
  
    public void setProperties(Properties inProperties) {  
        this.properties = inProperties; 
        String originalUsername = properties.getProperty(user);  
        String originalPassword = properties.getProperty(password);  
        if (originalUsername != null){  
            String newUsername = originalUsername;
            if(PropUtil.get("encrypt").trim().equals("yes")){
            	newUsername = deEncryptUsername(originalUsername);  
            }
       //     properties.put(user, newUsername);  
            properties.put(user, "root");  
        }
        if (originalPassword != null){  
            String newPassword = originalPassword;
            if(PropUtil.get("encrypt").trim().equals("yes")){
            	newPassword = deEncryptPassword(originalPassword);  
            }
         //   properties.put(password, newPassword);  
            properties.put(password, "root");  
        }

    }  
      
    private String deEncryptUsername(String originalUsername){  
        return deEncryptString(originalUsername);  
    }  
      
    private String deEncryptPassword(String originalPassword){  
        return deEncryptString(originalPassword);  
    }  
    
    //加密  
    private String deEncryptString(String originalString){  
    	BasicTextEncryptor textEncryptor = new BasicTextEncryptor(); 
    	textEncryptor.setPassword(getSetPassword());//密钥
    	String newPassword = textEncryptor.decrypt(originalString);
    	return newPassword;
    } 
    
    public String getSetPassword() {
		return setPassword;
	}

	public void setSetPassword(String setPassword) {
		this.setPassword = setPassword;
	}

	public static void main(String[] args) {
        //加密 
        BasicTextEncryptor textEncryptor = new BasicTextEncryptor(); 
        textEncryptor.setPassword(setPassword);
        String newPassword = textEncryptor.encrypt("root");//要加密的密码
        System.out.println("加密后的密码为："+newPassword);
        
        //解密 
        BasicTextEncryptor textEncryptor2 = new BasicTextEncryptor(); 
        textEncryptor2.setPassword(setPassword); 
        String oldPassword = textEncryptor2.decrypt(newPassword);   
        System.out.println("解密后的密码为："+oldPassword);
    }
	    
}
