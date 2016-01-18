package com.redoct.neuron.stp.web.model;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.redoct.neuron.sup.msg.comm.MsgGlobalArgs;
import com.redoct.neuron.sup.msg.domain.SysNotifyExt;
import com.redoct.neuron.sup.msg.domain.SysNotifyOriginal;
import com.redoct.neuron.sup.msg.service.SupMsgService;
import com.redoct.neuron.sup.session.domain.StpSession;
import com.redoct.neuron.sup.session.service.SupSessionService;

@Component
public class SysNotifyFacade {

	private static final Logger LOGGER = LoggerFactory.getLogger(SysNotifyFacade.class);
	@Autowired
	private SupSessionService supSessionService;
	@Autowired
	private SupMsgService supMsgService;

	public String multcast(SysNotifyOriginal msgOriginal, String[] toAccountIds, long timestamp) {
		msgOriginal.setToAccountIds(toAccountIds);
		msgOriginal.setTimestamp(timestamp);
		String msgId = supMsgService.store(msgOriginal, timestamp);
		LOGGER.debug("Store system notify original, [ type = {}, resId = {} ]", msgOriginal.getType(),
				msgOriginal.getResId());
		
		SysNotifyExt msgExt = new SysNotifyExt();
		msgExt.setId(msgOriginal.getId());
		msgExt.setType(msgOriginal.getType());
		msgExt.setFromAccountId(msgOriginal.getFromAccountId());
		msgExt.setFromNickname(msgOriginal.getFromNickname());
		msgExt.setFromAvatarUrl(msgOriginal.getFromAvatarUrl());
		msgExt.setChannelId(msgOriginal.getChannelId());
		msgExt.setChannelType(msgOriginal.getChannelType());
		msgExt.setChannelName(msgOriginal.getChannelName());
		msgExt.setTimestamp(msgOriginal.getTimestamp());
		msgExt.setResId(msgOriginal.getResId());
		msgExt.setContent(msgOriginal.getContent());
		msgExt.setAction(msgOriginal.getAction());

		List<String> iosDeviceTokens = new ArrayList<String>();
		List<String> androidDeviceTokens = new ArrayList<String>();

		for (String toAccountId : toAccountIds) {
			msgExt.setToAccountId(toAccountId);
			if (toAccountId.equals(msgExt.getFromAccountId())) {
				msgExt.setSyncStatus(MsgGlobalArgs.SYNC_STATE_READ);

				supMsgService.store(msgExt, msgOriginal.getTimestamp());
				LOGGER.debug("Store system notify ext, [ toAccountId = {} ]", toAccountId);
			} else {
				supMsgService.store(msgExt, msgOriginal.getTimestamp());
				LOGGER.debug("Store system notify ext, [ toAccountId = {} ]", toAccountId);

				StpSession toStpSession = supSessionService.queryStpSession(toAccountId);
				if (toStpSession != null) {
					LOGGER.debug("Multcast system notify, [ msgId = {}, os = {}, notifyToken = {} ]", msgExt.getId(),
							toStpSession.getDeviceOsVersion(), toStpSession.getNotifyToken());

					if (toStpSession.getDeviceOsVersion().contains("android")
							|| toStpSession.getDeviceOsVersion().contains("Android")) {
						if (toStpSession.getNotifyToken() != null && toStpSession.getNotifyToken().length() > 0)
							androidDeviceTokens.add(toStpSession.getNotifyToken());
					} else if (toStpSession.getDeviceOsVersion().contains("iOS")
							|| toStpSession.getDeviceOsVersion().contains("ios")) {
						if (!toStpSession.isActive()) { // offline
							if (toStpSession.getNotifyToken() != null && toStpSession.getNotifyToken().length() > 0)
								iosDeviceTokens.add(toStpSession.getNotifyToken());
						}
					}
				} // toStpSession != null
			}
		} // for

		if (iosDeviceTokens.size() > 0) {
			supMsgService.multcast("ios", iosDeviceTokens, msgExt);
		}
		if (androidDeviceTokens.size() > 0) {
			supMsgService.multcast("android", androidDeviceTokens, msgExt);
		}
		
		return msgId;
	}

	public void modifyStatus(String msgId, String toAccountId, short status, long timestamp) {
		supMsgService.modifySysNotifyStatus(msgId, toAccountId, status, timestamp);
	}

}
