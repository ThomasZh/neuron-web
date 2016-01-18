package com.redoct.neuron.stp.web.model;

public class ApplicationTemplateFieldResponse {

	private int type;
	private String fieldName;
	private boolean required;
	private int seq;

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public String getFieldName() {
		return fieldName;
	}

	public void setFieldName(String fieldName) {
		this.fieldName = fieldName;
	}

	public boolean isRequired() {
		return required;
	}

	public void setRequired(boolean required) {
		this.required = required;
	}

	public int getSeq() {
		return seq;
	}

	public void setSeq(int seq) {
		this.seq = seq;
	}
}
