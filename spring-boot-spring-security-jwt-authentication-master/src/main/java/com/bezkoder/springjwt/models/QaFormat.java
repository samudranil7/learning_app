package com.bezkoder.springjwt.models;

import java.util.List;

public class QaFormat 
{
	public String ques;
	public List<String> ans;
	public QaFormat() {
		super();
		// TODO Auto-generated constructor stub
	}
	public QaFormat(String ques, List<String> ans) {
		super();
		this.ques = ques;
		this.ans = ans;
	}
	public String getQues() {
		return ques;
	}
	public void setQues(String ques) {
		this.ques = ques;
	}
	public List<String> getAns() {
		return ans;
	}
	public void setAns(List<String> ans) {
		this.ans = ans;
	}
}
