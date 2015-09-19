package com.extweb.annotation;

import java.lang.annotation.Retention;
import java.lang.annotation.Target;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.ElementType;

/**
 * 描述实体字段的注解
 * @author huanghuanlai
 *
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)  
public @interface FieldInfo {
	public String name() default ""; //字段名称
	public String type() default ""; //字段类型
}
