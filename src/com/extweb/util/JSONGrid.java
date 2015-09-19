package com.extweb.util;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;

@SuppressWarnings("rawtypes")
public class JSONGrid {
	
	public static JSONObject toJSon(List displayDataList) throws Exception {
		int totalCount = displayDataList == null ? 0 : displayDataList.size();
		return toJSon(displayDataList, totalCount, "");
	}
	
	public static JSONObject toJSon(List displayDataList, String otherInfo) throws Exception {
		int totalCount = displayDataList == null ? 0 : displayDataList.size();
		return toJSon(displayDataList, totalCount, otherInfo);
	}
	
	public static JSONObject toJSon(List displayDataList, SimpleDateFormat df) throws Exception {
		int totalCount = displayDataList == null ? 0 : displayDataList.size();
		return toJSon(displayDataList, totalCount, df, "");
	}
	
	public static JSONObject toJSon(List displayDataList, SimpleDateFormat df, String otherInfo) throws Exception {
		int totalCount = displayDataList == null ? 0 : displayDataList.size();
		return toJSon(displayDataList, totalCount, df, otherInfo);
	}
	
	public static JSONObject toJSon(List displayDataList, int totalCount, SimpleDateFormat df, String otherInfo) throws Exception {
		JSONObject dataObj = new JSONObject();
		dataObj.put("total", totalCount);
		dataObj.put("otherInfo", otherInfo);
		JSONArray dataArray = new JSONArray();
		JsonConfig config = new JsonConfig();
		config.registerJsonValueProcessor(Date.class, new DateJsonValueProcessor(df));
		dataArray.addAll(displayDataList, config);
		dataObj.put("invdata", dataArray);
		return dataObj;
	}
	
	public static JSONObject toJSon(List displayDataList, int totalCount) throws Exception {
		JSONObject dataObj = new JSONObject();
		dataObj.put("total", totalCount);
		JSONArray dataArray = new JSONArray();
		dataArray.addAll(displayDataList);
		dataObj.put("invdata", dataArray);
		return dataObj;
	}
	
	public static JSONObject toJSon(List displayDataList, int totalCount, String otherInfo) throws Exception {
		JSONObject dataObj = new JSONObject();
		dataObj.put("total", totalCount);
		dataObj.put("otherInfo", otherInfo);
		JSONArray dataArray = new JSONArray();
		dataArray.addAll(displayDataList);
		dataObj.put("invdata", dataArray);
		return dataObj;
	}
	
	public static JSONObject toJSon(List displayDataList, int totalCount, SimpleDateFormat df) throws Exception {
		JSONObject dataObj = new JSONObject();
		dataObj.put("total", totalCount);
		JSONArray dataArray = new JSONArray();
		JsonConfig config = new JsonConfig();
		config.registerJsonValueProcessor(Date.class, new DateJsonValueProcessor(df));
		dataArray.addAll(displayDataList, config);
		dataObj.put("invdata", dataArray);
		return dataObj;
	}
	
	public static JSONObject toJSon(Object data, SimpleDateFormat df) throws Exception {
		JSONObject dataObj = new JSONObject();
		JsonConfig config = new JsonConfig();
		config.registerJsonValueProcessor(Date.class, new DateJsonValueProcessor(df));
		dataObj.put("data", JSONObject.fromObject(data, config));
		dataObj.put("success", true);
		return dataObj;
	}
	
}
