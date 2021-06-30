package com.bezkoder.springjwt.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
@Entity
public class Answer 
{
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	private long qid;
	private String answer;
	private long proffId;
	public Answer() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Answer(long id, long qid, String answer, long proffId) {
		super();
		this.id = id;
		this.qid = qid;
		this.answer = answer;
		this.proffId = proffId;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public long getQid() {
		return qid;
	}
	public void setQid(long qid) {
		this.qid = qid;
	}
	public String getAnswer() {
		return answer;
	}
	public void setAnswer(String answer) {
		this.answer = answer;
	}
	public long getProffId() {
		return proffId;
	}
	public void setProffId(long proffId) {
		this.proffId = proffId;
	}
}
