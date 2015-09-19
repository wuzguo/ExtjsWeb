package com.extweb.util;

import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.Locale;

/**
 * 统计中常用公共函数
 * 
 * @author pushichao
 * 
 */
public class Utils {
	/**
	 * 格式化输出金额，按格式" ###,###" 进行展示
	 * 
	 * @param money
	 * @return
	 */
	public static String formatMoney(Double money) {
		String result = "0";
		NumberFormat numberformat = NumberFormat.getCurrencyInstance(Locale.CHINA);
		DecimalFormat decimalformat = (DecimalFormat) numberformat;
		decimalformat.setMinimumFractionDigits(2);
		decimalformat.setMaximumFractionDigits(2);
		decimalformat.setDecimalSeparatorAlwaysShown(true);
		String s = "###,###"; // "$###,###.00 ";
		decimalformat.applyPattern(s);

		result = decimalformat.format(money);
		return result;
	}

	/** 得到今天的日期，格式yyyyMMdd */
	public static int getThisday() {
		java.util.Date date = new java.util.Date();
		long msel = date.getTime();
		date = new java.util.Date(msel);
		SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd");
		return Integer.parseInt(formatter.format(date));
	}

	/**
	 * 得到上1个星期六的日期【YYYYMMDD】
	 * 
	 * @return
	 */
	public static String getLastSaturday() {
		int mydate = Calendar.getInstance().get(Calendar.DAY_OF_WEEK); // 1-7，表示从星期日到星期六
		return addCurrentDate(-mydate);
	}

	/**
	 * 转化日期【YYYYMMDD-->YYYY-MM-DD】
	 * 
	 * @param date
	 *            日期 【YYYYMMDD】
	 * @return 日期 【YYYY-MM-DD】
	 */
	public static String formatDate(int date) {
		String result = "";
		String str = Integer.toString(date);
		if (str.length() != 8) {
			return str;
		} else {
			result = str.substring(0, 4) + "-" + str.substring(4, 6) + "-" + str.substring(6, 8);
		}
		return result;
	}

	/**
	 * 得到当前日期，加减天数后的 日期 如果今天是20061026，day=15的话，返回的将是20061110 day=-11 ,
	 * 返回的将是20061015
	 * 
	 * @param day
	 *            推移的天数
	 * @return 以当前时间加减天数的日期
	 */
	public static String addCurrentDate(int day) {
		GregorianCalendar calendar = new GregorianCalendar();
		calendar.setTime(new java.util.Date());
		calendar.add(GregorianCalendar.DAY_OF_MONTH, day);

		SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");
		return format.format(calendar.getTime());
	}

	/**
	 * 保留小数
	 * 
	 * @param m
	 *            原小数
	 * @param b
	 *            保留几位小数
	 * @return
	 */
	public static double round(double m, int b) {
		return Math.round(m * Math.pow(10, b)) * 1d / Math.pow(10, b);
	}

	/**
	 * 判断系统时间，和给定的月份或者季度，是否一致； 一直则返回true【表示需要现实的当前周】，否则返回false
	 * 
	 * @param month
	 * @param quarter
	 * @return
	 */
	public static boolean isWeek(int month, int quarter) {
		boolean isWeek = false;
		int thisDay = Utils.getThisday();
		int thisM = (thisDay / 100) % 100;
		if (month == thisM) {
			isWeek = true;
		} else {
			int thisQ = 1;
			if (1 <= thisM && thisM < 4) {
				thisQ = 1;

			} else if (4 <= thisM && thisM < 7) {
				thisQ = 2;

			} else if (7 <= thisM && thisM < 10) {
				thisQ = 3;

			} else if (10 <= thisM && thisM <= 12) {
				thisQ = 4;
			}

			if (thisQ == quarter) {
				isWeek = true;
			}
		}
		return isWeek;
	}

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}

}
