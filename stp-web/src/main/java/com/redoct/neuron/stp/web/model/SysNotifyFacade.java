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
		msgOriginal.setId(msgId);
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

		List<String> iosOfflineDeviceTokens = new ArrayList<String>();
		List<String> androidOnlineDeviceTokens = new ArrayList<String>();
		List<String> androidOfflineDeviceTokens = new ArrayList<String>();

		int expiry = (int) System.currentTimeMillis() / 1000 + 1209600;
		for (String toAccountId : toAccountIds) {
			msgExt.setToAccountId(toAccountId);
			if (toAccountId.equals(msgExt.getFromAccountId())) {
				msgExt.setSyncStatus(MsgGlobalArgs.SYNC_STATE_READ);

				supMsgService.store(msgExt, msgOriginal.getTimestamp());
				LOGGER.debug("Store system notify ext, [ toAccountId = {} ]", toAccountId);
			} else {
				supMsgService.store(msgExt, msgOriginal.getTimestamp());
				LOGGER.debug("Store system notify ext, [ toAccountId = {} ]", toAccountId);

				StpSession toStpSession = supSessionService.findStpSessionByAccountId(toAccountId);
				String os = toStpSession.getDeviceOsVersion().toLowerCase();
				LOGGER.debug("Multcast system notify, [ msgId = {}, os = {}, notifyToken = {} ]", msgExt.getId(), os,
						toStpSession.getNotifyToken());

				if (os.contains("android")) {
					if (toStpSession.getNotifyToken() != null && toStpSession.getNotifyToken().length() > 0) {
						if (toStpSession.isActive()) { // online
							if (expiry - toStpSession.getExpiryTime() > 300) { // offline
								androidOfflineDeviceTokens.add(toStpSession.getNotifyToken());
							} else {
								androidOnlineDeviceTokens.add(toStpSession.getNotifyToken());
							}
						} else {
							androidOfflineDeviceTokens.add(toStpSession.getNotifyToken());
						}
					}
				} else if (os.contains("ios")) {
					if (!toStpSession.isActive()) { // offline
						if (toStpSession.getNotifyToken() != null && toStpSession.getNotifyToken().length() > 0) {
							iosOfflineDeviceTokens.add(toStpSession.getNotifyToken());
						}
					}
				}
			} // toStpSession != null
		} // for

		if (iosOfflineDeviceTokens.size() > 0) {
			supMsgService.multcast(false, "ios", iosOfflineDeviceTokens, msgExt);
			for (String deviceToken : iosOfflineDeviceTokens) {
				LOGGER.debug("ios offline deviceToken: ", deviceToken);
			}
		}
		if (androidOnlineDeviceTokens.size() > 0) {
			supMsgService.multcast(true, "android", androidOnlineDeviceTokens, msgExt);
			for (String deviceToken : androidOnlineDeviceTokens) {
				LOGGER.debug("android online deviceToken: ", deviceToken);
			}
		}
		if (androidOfflineDeviceTokens.size() > 0) {
			supMsgService.multcast(false, "android", androidOfflineDeviceTokens, msgExt);
			for (String deviceToken : androidOfflineDeviceTokens) {
				LOGGER.debug("android offline deviceToken: ", deviceToken);
			}
		}

		return msgId;
	}

	public void modifyStatus(String msgId, String toAccountId, short status, long timestamp) {
		supMsgService.modifySysNotifyStatus(msgId, toAccountId, status, timestamp);
	}

}
