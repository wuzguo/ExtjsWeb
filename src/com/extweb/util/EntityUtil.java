package com.extweb.util;

public class EntityUtil {

	/**
	 * 根据实体名称获取Class对象
	 * 
	 * @param className
	 * @return
	 * @throws ClassNotFoundException
	 */
	public static Class<?> getClassByName(String className) throws ClassNotFoundException {
		Class<?> clazz = null;
		try {
			clazz = Class.forName("com.extweb.model." + className);
		} catch (ClassNotFoundException e) {
			throw new ClassNotFoundException("对不起[ " + className + " ]模型不存在!!");
		}
		return clazz;
	}
}
