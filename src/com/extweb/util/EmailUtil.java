package com.extweb.util;

import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;

/**
 * 邮箱工具类.
 * @author huanghuanlai
 *
 */
public class EmailUtil {
	private MailSender mailSender;
	private SimpleMailMessage mailMessage;

	public EmailUtil() {
	}
	
	public void sendMail(String adressTo, String string) {
		
		SimpleMailMessage message = new SimpleMailMessage(mailMessage);// 设置email内容,
		message.setTo(adressTo);
		message.setText(string);
		
		mailSender.send(message);

	}

	public MailSender getMailSender() {
		return mailSender;
	}

	public void setMailSender(MailSender mailSender) {
		this.mailSender = mailSender;
	}

	public SimpleMailMessage getMailMessage() {
		return mailMessage;
	}

	public void setMailMessage(SimpleMailMessage mailMessage) {
		this.mailMessage = mailMessage;
	}
}
