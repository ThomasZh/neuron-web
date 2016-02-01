package com.redoct.neuron.stp.web.controller;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.redoct.neuron.sup.account.domain.AccountBasic;
import com.redoct.neuron.sup.account.service.SupAccountService;
import com.redoct.neuron.sup.session.domain.StpSession;
import com.redoct.neuron.sup.session.service.SupSessionService;

@Controller
@RequestMapping(path = "/admin")
public class SessionController {

	private static final Logger LOGGER = LoggerFactory.getLogger(SessionController.class);
	@Autowired
	private SupAccountService accountService;
	@Autowired
	private SupSessionService supSessionService;

	@RequestMapping(path = "/session", method = RequestMethod.GET)
	public String initRecentlySessionForm(@RequestParam("ticket") String ticket, Map<String, Object> model) {
		LOGGER.debug("ticket = {}", ticket);
		StpSession session = supSessionService.findStpSessionByTicket(ticket);
		AccountBasic account = accountService.findAccountBasicById(session.getAccountId());

		model.put("ticket", ticket);
		model.put("account", account);
		model.put("session", session);
		return "admin/session";
	}

	@RequestMapping(path = "/removeSession", method = RequestMethod.GET)
	public String initRemoveSessionForm(@RequestParam("ticket") String ticket, Map<String, Object> model) {
		LOGGER.debug("ticket = {}", ticket);
		if (ticket != null)
			supSessionService.removeStpSessionByTicket(ticket);

		return "admin/removeSessionSuccess";
	}

	@RequestMapping(path = "/removeAccount", method = RequestMethod.GET)
	public String initRemoveAccountForm(@RequestParam("id") String id, Map<String, Object> model) {
		LOGGER.debug("id = {}", id);
		if (id != null)
			supSessionService.removeStpSessionByTicket(id);

		return "admin/removeSessionSuccess";
	}

	@RequestMapping(path = "/account", method = RequestMethod.GET)
	public String initRecentlyAccountForm(@RequestParam("id") String id, Map<String, Object> model) {
		LOGGER.debug("id = {}", id);
		AccountBasic account = accountService.findAccountBasicById(id);
		StpSession session = supSessionService.findStpSessionByAccountId(id);

		model.put("account", account);
		model.put("session", session);
		return "admin/account";
	}

}
