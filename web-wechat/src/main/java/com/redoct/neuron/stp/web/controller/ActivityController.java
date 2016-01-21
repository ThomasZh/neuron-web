package com.redoct.neuron.stp.web.controller;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.google.gson.Gson;
import com.redoct.neuron.stp.web.model.ApplicationTemplateFieldResponse;
import com.redoct.neuron.stp.web.model.DatetimeUtil;
import com.redoct.neuron.stp.web.model.ItineraryResponse;
import com.redoct.neuron.stp.web.model.SysNotifyFacade;
import com.redoct.neuron.stp.web.model.Utils;
import com.redoct.neuron.stp.web.model.WechatUserSession;
import com.redoct.neuron.sup.account.comm.AccountGlobalArgs;
import com.redoct.neuron.sup.account.domain.AccountBasic;
import com.redoct.neuron.sup.account.service.SupAccountService;
import com.redoct.neuron.sup.activity.domain.Activity;
import com.redoct.neuron.sup.activity.domain.ActivityApplicationField;
import com.redoct.neuron.sup.activity.domain.ActivityConstants;
import com.redoct.neuron.sup.activity.domain.ActivityMember;
import com.redoct.neuron.sup.activity.domain.ActivitySignup;
import com.redoct.neuron.sup.activity.domain.ApplicationTemplateField;
import com.redoct.neuron.sup.activity.domain.Itinerary;
import com.redoct.neuron.sup.activity.domain.PlainItinerary;
import com.redoct.neuron.sup.activity.service.ActivityApplicationFieldService;
import com.redoct.neuron.sup.activity.service.ActivityMemberService;
import com.redoct.neuron.sup.activity.service.ActivityService;
import com.redoct.neuron.sup.activity.service.ActivitySignupService;
import com.redoct.neuron.sup.activity.service.ApplicationTemplateFieldService;
import com.redoct.neuron.sup.activity.service.ItineraryService;
import com.redoct.neuron.sup.msg.comm.MsgGlobalArgs;
import com.redoct.neuron.sup.msg.domain.SysNotifyOriginal;

import net.sf.json.JSONObject;

@Controller
@RequestMapping(path = "/activity")
public class ActivityController {

	private static final Logger LOGGER = LoggerFactory.getLogger(ActivityController.class);
	@Autowired
	private SupAccountService accountService;
	@Autowired
	private ActivityService activityService;
	@Autowired
	private ItineraryService itineraryService;
	@Autowired
	private ApplicationTemplateFieldService applicationTemplateFieldService;
	@Autowired
	private ActivitySignupService activitySignupService;
	@Autowired
	private ActivityMemberService activityMemberService;
	@Autowired
	private ActivityApplicationFieldService activityApplicationFieldService;
	private static final String APP_ID = "wxaa328c83d3132bfb";
	private static final String APP_SECRET = "32bbf99a46d80b24bae81e8c8558c42f";
	private static final String DOMAIN = "planc2c.com";
	@Autowired
	private SysNotifyFacade sysNotifyFacade;

	@RequestMapping(path = "/info", method = RequestMethod.GET)
	public String initInfoForm(@RequestParam("ekey") String activityId, Map<String, Object> model) {
		model.put("ekey", activityId);
		LOGGER.info("Input, [ ekey = {} ]", activityId);

		Activity activity = activityService.read(activityId);
		model.put("info", activity);

		String datetime = DatetimeUtil.time2Str(activity.getBeginTime()) + " - "
				+ DatetimeUtil.time2Str(activity.getEndTime());
		model.put("datetime", datetime);

		String leaderId = activity.getLeader().getAccountId();
		AccountBasic leader = accountService.queryAccount(leaderId);
		model.put("leader", leader);

		List<Itinerary> itineraries = itineraryService.findPosterByActivityId(activityId);
		LOGGER.debug("Query itineraries, [ size = {} ]", itineraries.size());
		List<ItineraryResponse> itineraryResponses = new ArrayList<>(itineraries.size());
		for (Itinerary itinerary : itineraries) {
			LOGGER.debug("itinerary, [ type = {} ]", itinerary.getType());
			ItineraryResponse itineraryResponse = new ItineraryResponse();
			Utils.copyProperties(itinerary, itineraryResponse, "items", "richContents");
			if (itinerary instanceof PlainItinerary) {
				PlainItinerary plainItinerary = (PlainItinerary) itinerary;
				itineraryResponse.setRichContents(new ArrayList<ItineraryResponse.RichContent>());
				Utils.copyProperties(plainItinerary.getRichContents(), ItineraryResponse.RichContent.class,
						itineraryResponse.getRichContents());
				itineraryResponses.add(itineraryResponse);
			}
		}
		model.put("descs", itineraryResponses);

		return "activity";
	}

	@RequestMapping(path = "/apply", method = RequestMethod.GET)
	public String initApplyForm(HttpServletRequest request, HttpServletResponse response,
			@RequestParam("id") String activityId, Map<String, Object> model) throws IOException {
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");

		model.put("id", activityId);
		LOGGER.info("Input, [ id = {} ]", activityId);

		Activity activity = activityService.read(activityId);
		if (activity == null) {
			LOGGER.error("Can not find activity, id: {}", activityId);
			return null;
		}
		model.put("info", activity);

		String datetime = DatetimeUtil.time2Str(activity.getBeginTime()) + " - "
				+ DatetimeUtil.time2Str(activity.getEndTime());
		model.put("datetime", datetime);

		List<ApplicationTemplateFieldResponse> applicationTemplateResponses = new ArrayList<>();
		List<ApplicationTemplateField> applicationTemplateFields = applicationTemplateFieldService
				.findByActivityId(activityId);
		int i = 1;
		for (ApplicationTemplateField applicationTemplateField : applicationTemplateFields) {
			ApplicationTemplateFieldResponse applicationTemplateFieldResponse = new ApplicationTemplateFieldResponse();
			applicationTemplateFieldResponse.setType(applicationTemplateField.getType());
			applicationTemplateFieldResponse.setFieldName(applicationTemplateField.getFieldName());
			applicationTemplateFieldResponse.setRequired(applicationTemplateField.isRequired());
			applicationTemplateFieldResponse.setSeq(i);
			i++;
			applicationTemplateResponses.add(applicationTemplateFieldResponse);
		}

		model.put("templateResponses", applicationTemplateResponses);
		model.put("participationColumnNum", applicationTemplateResponses.size());

		WechatUserSession user = null;
		// integration with wechat
		{
			String code = request.getParameter("code");
			LOGGER.info("Wechat, [ code = {} ]", code);

			HttpSession session = request.getSession();
			boolean isValidCode = true;
			String serviceUrl = URLEncoder.encode("http://" + DOMAIN + request.getRequestURI(), "utf-8");

			if (code == null || code.equals("authdeny")) {
				isValidCode = false;
			}

			if ((!isValidCode) && session.getAttribute("unionid") == null) {
				StringBuilder oauth_url = new StringBuilder();
				oauth_url.append("https://open.weixin.qq.com/connect/oauth2/authorize?");
				oauth_url.append("appid=").append(APP_ID);
				oauth_url.append("&redirect_uri=").append(serviceUrl);
				oauth_url.append("&response_type=code");
				oauth_url.append("&scope=snsapi_userinfo");
				oauth_url.append("&state=1#wechat_redirect");
				response.sendRedirect(oauth_url.toString());

				return null;
			}

			if (isValidCode && session.getAttribute("user") == null) {
				String str = getAccessToken(APP_ID, APP_SECRET, code);
				String utf8str = new String(str.getBytes("iso8859-1"), "utf-8");

				Gson gson = new Gson();
				JSONObject obj = gson.fromJson(utf8str, JSONObject.class);
				String token = obj.getString("access_token");
				String openid = obj.getString("openid");
				String unionid = obj.getString("unionid");
				LOGGER.debug("unionid: " + unionid);

				String str2 = this.getUserInfo(token, openid);
				String utf8str2 = new String(str2.getBytes("iso8859-1"), "utf-8");
				JSONObject obj2 = gson.fromJson(utf8str2, JSONObject.class);
				String nickname = obj2.getString("nickname");
				String headimgurl = obj2.getString("headimgurl");
				LOGGER.debug("nickname: " + nickname);
				LOGGER.debug("headimgurl: " + headimgurl);

				String myAccountId = null;
				long timestamp = System.currentTimeMillis();
				if (accountService.verifyExist(AccountGlobalArgs.ACCOUNT_LOGIN_BY_WECHAT, unionid)) {
					LOGGER.warn("sessionId=[" + session.getId() + "]|This unionid(" + unionid + ") already exist!");
					AccountBasic account = accountService.queryAccount(AccountGlobalArgs.ACCOUNT_LOGIN_BY_WECHAT,
							unionid);
					myAccountId = account.getAccountId();
					LOGGER.info("sessionId=[" + session.getId() + "]|accountId=[" + myAccountId + "]|nickname=["
							+ nickname + "]| login success)");
				} else {
					myAccountId = accountService.createAccount(nickname, headimgurl, "", timestamp);
					accountService.createLogin(myAccountId, AccountGlobalArgs.ACCOUNT_LOGIN_BY_WECHAT, unionid,
							timestamp);
					LOGGER.info("sessionId=[" + session.getId() + "]|accountId=[" + myAccountId + "]|nickname=["
							+ nickname + "]| register success)");
				}

				user = new WechatUserSession();
				user.setUnionid(unionid);
				user.setNickname(nickname);
				user.setHeadimgurl(headimgurl);
				user.setAccountId(myAccountId);
				session.setAttribute("user", user);

			} else {
				user = (WechatUserSession) session.getAttribute("user");
			}
		}

		String unionid = user.getUnionid();
		String nickname = user.getNickname();
		String avatarUrl = user.getHeadimgurl();
		String myAccountId = user.getAccountId();
		LOGGER.debug("unionid: " + unionid);
		LOGGER.debug("nickname: " + nickname);
		LOGGER.debug("avatarUrl: " + avatarUrl);
		LOGGER.debug("myAccountId: " + myAccountId);
		long timestamp = System.currentTimeMillis();

		if (!activity.isApplyInfoRequire() || applicationTemplateFields == null
				|| applicationTemplateFields.size() == 0) {
			ActivityMember activityMember = activityMemberService.read(activityId, myAccountId);
			if (activityMember != null) {
				LOGGER.error("Account is already a member, skip creating application, accountId: {}", myAccountId);
				return "applySuccess";
			}
			ActivitySignup activitySignup = activitySignupService.read(activityId, myAccountId);
			if (activitySignup != null
					&& activitySignup.getStatus() == ActivityConstants.ACTIVITY_SIGNUP_STATUS_PENDING) {

				LOGGER.error(
						"Can not create a new application when application status is pending, activityId: {}, accountId: {}",
						activityId, myAccountId);
				return "applySuccess";
			}

			activitySignup = new ActivitySignup();
			activitySignup.setAccountId(myAccountId);
			activitySignup.setActivityId(activityId);
			activitySignup.setSignupTime(timestamp);
			activitySignup.setStatus(ActivityConstants.ACTIVITY_SIGNUP_STATUS_PENDING);
			activitySignupService.createOrUpdate(activitySignup);

			ActivityMember leader = activity.getLeader();
			if (leader == null) {
				LOGGER.error("Can not find leader, activityId: {}", activityId);
				return null;
			}

			SysNotifyOriginal msgOriginal = new SysNotifyOriginal();
			msgOriginal.setFromAccountId(myAccountId);
			msgOriginal.setFromNickname(nickname);
			msgOriginal.setFromAvatarUrl(avatarUrl);
			msgOriginal.setType(MsgGlobalArgs.SYSNOTIFY_TYPE_ACTIVITY_APPLY);
			msgOriginal.setChannelType(MsgGlobalArgs.CHANNEL_TYPE_ACTIVITY);
			msgOriginal.setChannelId(activityId);
			msgOriginal.setChannelName(activity.getName());
			msgOriginal.setResId(activityId);
			msgOriginal.setContent("Apply to join activity.");
			sysNotifyFacade.multcast(msgOriginal, new String[] { leader.getAccountId() }, timestamp);

			msgOriginal = new SysNotifyOriginal();
			msgOriginal.setFromAccountId(myAccountId);
			msgOriginal.setFromNickname(nickname);
			msgOriginal.setFromAvatarUrl(avatarUrl);
			msgOriginal.setType(MsgGlobalArgs.SYSNOTIFY_TYPE_ACTIVITY_SEND_APPLY);
			msgOriginal.setChannelType(MsgGlobalArgs.CHANNEL_TYPE_ACTIVITY);
			msgOriginal.setChannelId(activityId);
			msgOriginal.setChannelName(activity.getName());
			msgOriginal.setResId(activityId);
			msgOriginal.setContent("Send an application to join activity.");
			sysNotifyFacade.multcast(msgOriginal, new String[] { myAccountId }, timestamp);

			accountService.follow(leader.getAccountId(), myAccountId);

			return "applySuccess";
		}

		return "apply";
	}

	@RequestMapping(path = "/applyAction", method = RequestMethod.GET)
	public String initApplyActionForm(HttpServletRequest request, @RequestParam("hidden_id") String activityId,
			@RequestParam("hidden_participationColumnNum") Integer columnNum,
			@RequestParam(value = "inputParticipation_1") String[] items, Map<String, Object> model)
					throws UnsupportedEncodingException {
		request.setCharacterEncoding("UTF-8");

		LOGGER.info("Input, [ id = {} ]", activityId);
		LOGGER.info("Input, [ columnNum = {} ]", columnNum);
		String[] participations = new String[columnNum];
		int i = 0;
		for (String participation : items) {
			LOGGER.info("Input, [ participation = {} ]", participation);
			String utf8str = new String(participation.getBytes("iso8859-1"), "utf-8");
			LOGGER.info("Input, [ utf8str = {} ]", utf8str);
			participations[i++] = utf8str;
		}

		HttpSession session = request.getSession();
		WechatUserSession user = (WechatUserSession) session.getAttribute("user");
		if (user != null) {
			String unionid = user.getUnionid();
			String nickname = user.getNickname();
			String avatarUrl = user.getHeadimgurl();
			String myAccountId = user.getAccountId();
			LOGGER.debug("unionid: " + unionid);
			LOGGER.debug("nickname: " + nickname);
			LOGGER.debug("avatarUrl: " + avatarUrl);
			LOGGER.debug("myAccountId: " + myAccountId);
			long timestamp = System.currentTimeMillis();

			ActivityMember activityMember = activityMemberService.read(activityId, myAccountId);
			if (activityMember != null) {
				LOGGER.error("Account is already a member, skip creating application, accountId: {}", myAccountId);
				return "applySuccess";
			}
			ActivitySignup activitySignup = activitySignupService.read(activityId, myAccountId);
			if (activitySignup != null
					&& activitySignup.getStatus() == ActivityConstants.ACTIVITY_SIGNUP_STATUS_PENDING) {

				LOGGER.error(
						"Can not create a new application when application status is pending, activityId: {}, accountId: {}",
						activityId, myAccountId);
				return "applySuccess";
			}

			List<ApplicationTemplateFieldResponse> applicationTemplateResponses = new ArrayList<>();
			List<ApplicationTemplateField> applicationTemplateFields = applicationTemplateFieldService
					.findByActivityId(activityId);

			if (applicationTemplateFields != null && applicationTemplateFields.size() > 0) {
				i = 1;
				for (ApplicationTemplateField applicationTemplateField : applicationTemplateFields) {
					ApplicationTemplateFieldResponse applicationTemplateFieldResponse = new ApplicationTemplateFieldResponse();
					applicationTemplateFieldResponse.setType(applicationTemplateField.getType());
					applicationTemplateFieldResponse.setFieldName(applicationTemplateField.getFieldName());
					applicationTemplateFieldResponse.setRequired(applicationTemplateField.isRequired());
					applicationTemplateFieldResponse.setSeq(i);
					i++;
					applicationTemplateResponses.add(applicationTemplateFieldResponse);
				}

				i = 0;
				List<ActivityApplicationField> activityApplicationFields = new ArrayList<>(columnNum);
				for (ApplicationTemplateFieldResponse applicationTemplateResponse : applicationTemplateResponses) {
					ActivityApplicationField activityApplicationField = new ActivityApplicationField();
					activityApplicationField.setActivityId(activityId);
					activityApplicationField.setAccountId(myAccountId);
					activityApplicationField.setFieldName(applicationTemplateResponse.getFieldName());
					activityApplicationField.setFieldValue(participations[i++]);
					activityApplicationField.setType(ActivityConstants.APPLICATION_FIELD_TYPE_PARTICIPANT);
					activityApplicationFields.add(activityApplicationField);
				}

				activityApplicationFieldService.overwrite(activityId, myAccountId, activityApplicationFields);
				activitySignup = new ActivitySignup();
				activitySignup.setAccountId(myAccountId);
				activitySignup.setActivityId(activityId);
				activitySignup.setSignupTime(timestamp);
				activitySignup.setStatus(ActivityConstants.ACTIVITY_SIGNUP_STATUS_PENDING);
				activitySignupService.createOrUpdate(activitySignup);
			} else {
				activitySignup = new ActivitySignup();
				activitySignup.setAccountId(myAccountId);
				activitySignup.setActivityId(activityId);
				activitySignup.setSignupTime(timestamp);
				activitySignup.setStatus(ActivityConstants.ACTIVITY_SIGNUP_STATUS_PENDING);
				activitySignupService.createOrUpdate(activitySignup);
			}

			Activity activity = activityService.read(activityId);
			if (activity == null) {
				LOGGER.error("Can not find activity, id: {}", activityId);
				return null;
			}
			ActivityMember leader = activity.getLeader();
			if (leader == null) {
				LOGGER.error("Can not find leader, activityId: {}", activityId);
				return null;
			}
			SysNotifyOriginal msgOriginal = new SysNotifyOriginal();
			msgOriginal.setFromAccountId(myAccountId);
			msgOriginal.setFromNickname(nickname);
			msgOriginal.setFromAvatarUrl(avatarUrl);
			msgOriginal.setType(MsgGlobalArgs.SYSNOTIFY_TYPE_ACTIVITY_APPLY);
			msgOriginal.setChannelType(MsgGlobalArgs.CHANNEL_TYPE_ACTIVITY);
			msgOriginal.setChannelId(activityId);
			msgOriginal.setChannelName(activity.getName());
			msgOriginal.setResId(activityId);
			msgOriginal.setContent("Apply to join activity.");
			sysNotifyFacade.multcast(msgOriginal, new String[] { leader.getAccountId() }, timestamp);

			msgOriginal = new SysNotifyOriginal();
			msgOriginal.setFromAccountId(myAccountId);
			msgOriginal.setFromNickname(nickname);
			msgOriginal.setFromAvatarUrl(avatarUrl);
			msgOriginal.setType(MsgGlobalArgs.SYSNOTIFY_TYPE_ACTIVITY_SEND_APPLY);
			msgOriginal.setChannelType(MsgGlobalArgs.CHANNEL_TYPE_ACTIVITY);
			msgOriginal.setChannelId(activityId);
			msgOriginal.setChannelName(activity.getName());
			msgOriginal.setResId(activityId);
			msgOriginal.setContent("Send an application to join activity.");
			sysNotifyFacade.multcast(msgOriginal, new String[] { myAccountId }, timestamp);

			accountService.follow(leader.getAccountId(), myAccountId);

		} // if (user != null)

		return "applySuccess";
	}

	private String getAccessToken(String appid, String secret, String code) throws IOException {
		StringBuilder url = new StringBuilder();
		url.append("https://api.weixin.qq.com/sns/oauth2/access_token?");
		url.append("appid=" + appid);
		url.append("&secret=").append(secret);
		url.append("&code=").append(code);
		url.append("&grant_type=authorization_code");

		CloseableHttpClient httpclient = HttpClients.createDefault();
		HttpGet httpget = new HttpGet(url.toString());
		// Create a custom response handler
		ResponseHandler<String> responseHandler = new ResponseHandler<String>() {
			public String handleResponse(final HttpResponse response) throws ClientProtocolException, IOException {
				int status = response.getStatusLine().getStatusCode();
				if (status >= 200 && status < 300) {
					HttpEntity entity = response.getEntity();
					return entity != null ? EntityUtils.toString(entity) : null;
				} else {
					throw new ClientProtocolException("Unexpected response status: " + status);
				}
			}

		};
		String responseBody = httpclient.execute(httpget, responseHandler);

		return responseBody;
	}

	private String getUserInfo(String token, String openid) throws IOException {
		StringBuilder url = new StringBuilder();
		url.append("https://api.weixin.qq.com/sns/userinfo?");
		url.append("access_token=" + token);
		url.append("&openid=").append(openid);
		url.append("&lang=zh_CN");

		CloseableHttpClient httpclient = HttpClients.createDefault();
		HttpGet httpget = new HttpGet(url.toString());
		// Create a custom response handler
		ResponseHandler<String> responseHandler = new ResponseHandler<String>() {
			public String handleResponse(final HttpResponse response) throws ClientProtocolException, IOException {
				int status = response.getStatusLine().getStatusCode();
				if (status >= 200 && status < 300) {
					HttpEntity entity = response.getEntity();
					return entity != null ? EntityUtils.toString(entity) : null;
				} else {
					throw new ClientProtocolException("Unexpected response status: " + status);
				}
			}

		};
		String responseBody = httpclient.execute(httpget, responseHandler);

		return responseBody;
	}
}
