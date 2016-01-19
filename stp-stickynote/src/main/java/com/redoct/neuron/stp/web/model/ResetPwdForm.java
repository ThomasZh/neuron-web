package com.redoct.neuron.stp.web.model;

public class ResetPwdForm {
	private String ekey;
	private String inputPassword;
	private String inputPassword2;

	public String getEkey() {
		return ekey;
	}

	public void setEkey(String ekey) {
		this.ekey = ekey;
	}

	public String getInputPassword() {
		return inputPassword;
	}

	public void setInputPassword(String inputPassword) {
		this.inputPassword = inputPassword;
	}

	public String getInputPassword2() {
		return inputPassword2;
	}

	public void setInputPassword2(String inputPassword2) {
		this.inputPassword2 = inputPassword2;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("ResetPwdForm [ekey=").append(ekey).append(", inputPassword=").append(inputPassword)
				.append(", inputPassword2=").append(inputPassword2).append("]");
		return builder.toString();
	}

}
