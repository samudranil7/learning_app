package com.bezkoder.springjwt.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Resources 
{
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	private long courseId;
	private String header;
	private String content;
	private String proffId;
	public Resources() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Resources(long id, long courseId, String header, String content, String proffId) {
		super();
		this.id = id;
		this.courseId = courseId;
		this.header = header;
		this.content = content;
		this.proffId = proffId;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public long getCourseId() {
		return courseId;
	}
	public void setCourseId(long courseId) {
		this.courseId = courseId;
	}
	public String getHeader() {
		return header;
	}
	public void setHeader(String header) {
		this.header = header;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getProffId() {
		return proffId;
	}
	public void setProffId(String proffId) {
		this.proffId = proffId;
	}
}
