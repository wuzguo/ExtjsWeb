package com.extweb.util;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.extweb.annotation.NodeType;
import com.extweb.constant.TreeNodeType;
import com.extweb.model.extjs.JsonTreeNode;

public class ModelUtil {

	public static Map<String, Field[]> modelFields = new HashMap<String, Field[]>();
	public static Map<String, String> modelFieldsJson = new HashMap<String, String>();

	/**
	 * 得到类的属性集合
	 * 
	 * @param c
	 * @param itself
	 *            是否是自身的字段
	 * @return
	 */
	public static Field[] getClassFields(Class<?> c, boolean itself) {
		if (itself) {
			if (modelFields.get(c.getName()) != null) {
				return modelFields.get(c.getName());
			} else {
				Field[] fields = c.getDeclaredFields();
				modelFields.put(c.getName(), fields);
				return fields;
			}
		} else {
			if (modelFields.get(c.getName()) != null) {
				return modelFields.get(c.getName());
			} else {
				List<Field> fields = new ArrayList<Field>();
				getAllDeclaredFields(c, fields);
				Field[] fies = new Field[fields.size()];
				fields.toArray(fies);
				modelFields.put(c.getName(), fies);
				return fies;
			}
		}
	}

	/**
	 * 从c类中取得全部字段,包括父类
	 * 
	 * @param c
	 * @param fields
	 */
	public static void getAllDeclaredFields(Class<?> c, List<Field> fields) {
		Field[] fies = c.getDeclaredFields();
		Collections.addAll(fields, fies);
		Class<?> parent = c.getSuperclass();
		if (parent != Object.class) {
			getAllDeclaredFields(parent, fields);
		} else {
			return;
		}
	}

	public static JsonTreeNode getJSONTreeNodeTemplate(Class<?> c) {
		Field[] fields = getClassFields(c, false);
		JsonTreeNode template = new JsonTreeNode();
		for (Field field : fields) {
			String value = field.getName();
			NodeType nodeType = field.getAnnotation(NodeType.class);// 获取注解类
			if (nodeType == null) {
				continue;
			}
			TreeNodeType type = nodeType.type();// 获取所注解的类型
			if (TreeNodeType.ID.equalsType(type)) {
				template.setId(value);
			}
			if (TreeNodeType.TEXT.equalsType(type)) {
				template.setText(value);
			}
			if (TreeNodeType.CODE.equalsType(type)) {
				template.setCode(value);
			}
			if (TreeNodeType.ICON.equals(type)) {
				template.setIcon(value);
			}
			if (TreeNodeType.NODEINFO.equals(type)) {
				template.setNodeInfo(value);
			}
			if (TreeNodeType.NODEINFOTYPE.equals(type)) {
				template.setNodeInfoType(value);
			}
			if (TreeNodeType.CLS.equals(type)) {
				template.setCls(value);
			}
			if (TreeNodeType.LEAF.equals(type)) {
				template.setNodeType(value);
			}
			if (TreeNodeType.PARENT.equals(type)) {
				template.setParent(value);
			}
			if (TreeNodeType.DISABLED.equals(type)) {
				template.setHref(value);
			}
			if (TreeNodeType.BIGICON.equals(type)) {
				template.setBigIcon(value);
			}
			if (TreeNodeType.DESCRIPTION.equals(type)) {
				template.setDescription(value);
			}
			if (TreeNodeType.ORDERINDEX.equals(type)) {
				template.setOrderIndex(Integer.parseInt(value));
			}
		}
		return template;
	}
}
