package com.extweb.controller;

import java.lang.reflect.Field;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.extweb.util.EntityUtil;
import com.extweb.util.JsonBuilder;
import com.extweb.util.ModelUtil;

/**
 * @author wzguo
 */

@Controller
@RequestMapping("/model/ModelController/")
public class ModelController {

	private static final Logger logger = LoggerFactory.getLogger(ModelController.class);

	@RequestMapping(value = "read.sdo")
	@ResponseBody
	public String getModelJson(String modelName, String excludes) {
		logger.info("读取 [ " + modelName + " ] 模型");
		String strData = "";
		if (ModelUtil.modelFieldsJson.get(modelName) == null) {
			Class<?> clsModel = null;
			try {
				clsModel = EntityUtil.getClassByName(modelName);
			} catch (ClassNotFoundException e) {
				return JsonBuilder.returnFailureJson(e.getMessage(), null);
			}
			Field[] fields = ModelUtil.getClassFields(clsModel, false);
			strData = JsonBuilder.getModelFields(modelName, fields, excludes);
		} else {
			strData = ModelUtil.modelFieldsJson.get(modelName);
		}

		logger.info(modelName + "-------" + strData);
		return strData;
	}

}
