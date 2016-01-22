package com.redoct.neuron.stp.web.controller;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.redoct.neuron.stp.web.model.ResetPwdForm;
import com.redoct.neuron.sup.account.comm.EcryptUtil;
import com.redoct.neuron.sup.account.domain.LostPwdEkey;
import com.redoct.neuron.sup.account.service.SupAccountService;

@Controller
@RequestMapping(path = "/accounts")
public class ResetPwdController {

	private static final Logger LOGGER = LoggerFactory.getLogger(ResetPwdController.class);
	@Autowired
	private SupAccountService accountService;

	@RequestMapping(path = "/reset-pwd", method = RequestMethod.GET)
	public String initResetPwdForm(@RequestParam("ekey") String ekey, Map<String, Object> model) {
		model.put("ekey", ekey);
		return "resetpwd";
	}

	@RequestMapping(path = "/reset-pwd", method = RequestMethod.POST)
	public String processResetPwdForm(@ModelAttribute ResetPwdForm resetPwdForm, Map<String, Object> model) {
		LOGGER.debug("Request received, {}", resetPwdForm);
		if (!resetPwdForm.getInputPassword().equals(resetPwdForm.getInputPassword2())) {
			model.put("ekey", resetPwdForm.getEkey());
			model.put("message", "Input passwords don't match");
			return "resetpwd";
		}
		LostPwdEkey lostPwdEkey = accountService.queryEkey(resetPwdForm.getEkey());
		LOGGER.debug("Retrived account with ekey, accountId: {}",
				lostPwdEkey != null ? lostPwdEkey.getAccountId() : null);

		String md5pwd = EcryptUtil.md5(resetPwdForm.getInputPassword());
		accountService.resetPwd(lostPwdEkey.getLoginType(), lostPwdEkey.getLoginName(), md5pwd,
				System.currentTimeMillis());

		return "resetpwdSuccess";
	}

}
