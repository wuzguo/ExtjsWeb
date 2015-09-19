package com.extweb.listener;

import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

public class ContextInitListener implements ServletContextListener {

	public void contextDestroyed(ServletContextEvent event) {
		event.getServletContext().log("ExtWeb信息管理平台关闭");
	}

	public void contextInitialized(ServletContextEvent event) {
		ServletContext context = event.getServletContext();
		context.log("ExtWeb信息管理平台初始化...");
		String version = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());
		context.setAttribute("SysVersion", version);
		
		//设置quartz是否跳过检查更新
		System.setProperty("org.terracotta.quartz.skipUpdateCheck", "true");
		
		//设置mybatis使用Log4J做为日志记录
		org.apache.ibatis.logging.LogFactory.useLog4JLogging();
	}
}
