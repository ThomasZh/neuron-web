package com.redoct.neuron.stp.web.test;

import java.util.List;

import org.springframework.stereotype.Component;

import com.redoct.neuron.sup.account.domain.AccountBasic;
import com.redoct.neuron.sup.account.domain.AccountDetail;
import com.redoct.neuron.sup.account.domain.AccountMaster;
import com.redoct.neuron.sup.account.domain.FriendInvitation;
import com.redoct.neuron.sup.account.domain.LostPwdEkey;
import com.redoct.neuron.sup.account.domain.ProfileBasic;
import com.redoct.neuron.sup.account.domain.ProfileDetail;
import com.redoct.neuron.sup.account.domain.VerificationCode;
import com.redoct.neuron.sup.account.service.SupAccountService;
import com.redoct.neuron.sup.exception.SupServiceException;

@Component
public class MockSupAccountServiceImpl implements SupAccountService {

	@Override
	public boolean verifyExist(short loginType, String loginName) throws SupServiceException {

		return false;
	}

	@Override
	public String verifyLogin(short loginType, String loginName, String md5pwd) throws SupServiceException {

		return null;
	}

	@Override
	public void resetPwd(short loginType, String loginName, String md5pwd, long timestamp) throws SupServiceException {

	}

	@Override
	public String createAccount(String nickname, String avatarUrl, String desc, long timestamp)
			throws SupServiceException {

		return null;
	}

	@Override
	public void modifyAccountBasicInfo(AccountBasic account, long timestamp) throws SupServiceException {

	}

	@Override
	public void createLogin(String accountId, short loginType, String loginName, long timestamp)
			throws SupServiceException {

	}

	@Override
	public void modifyAccountId4Login(String accountId, short loginType, String loginName, long timestamp)
			throws SupServiceException {

	}

	@Override
	public String createEkey(short loginType, String loginName, long timestamp) throws SupServiceException {

		return null;
	}

	@Override
	public LostPwdEkey queryEkey(String ekey) throws SupServiceException {

		return null;
	}

	@Override
	public AccountBasic queryAccount(String accountId) throws SupServiceException {

		return null;
	}

	@Override
	public AccountBasic queryAccount(short loginType, String loginName) throws SupServiceException {

		return null;
	}

	@Override
	public AccountMaster queryAccountMaster(String accountId) throws SupServiceException {

		return null;
	}

	@Override
	public List<AccountDetail> queryAccountDetails(List<String> ids) throws SupServiceException {

		return null;
	}

	@Override
	public String queryLoginName(String accountId, short loginType) throws SupServiceException {

		return null;
	}

	@Override
	public String applyVerificationCode(short verificationType, String deviceId, String phone, long timestamp)
			throws SupServiceException {

		return null;
	}

	@Override
	public VerificationCode queryVerificationCode(short verificationType, String deviceId) throws SupServiceException {

		return null;
	}

	@Override
	public void follow(String accountId, String fanAccountId) {

	}

	@Override
	public void unfollow(String accountId, String fanAccountId) {

	}

	@Override
	public List<AccountBasic> queryFans(String accountId, int pageNum, int pageSize) {

		return null;
	}

	@Override
	public List<String> queryAllFanIds(String accountId) {

		return null;
	}

	@Override
	public List<String> queryAllFriendIds(String accountId) {

		return null;
	}

	@Override
	public List<AccountBasic> queryFollowing(String fanAccountId, int pageNum, int pageSize) {

		return null;
	}

	@Override
	public void addFriend(String accountId, String friendAccountId) {

	}

	@Override
	public void removeFriend(String accountId, String friendAccountId) {

	}

	@Override
	public List<AccountBasic> queryFriend(String accountId, int pageNum, int pageSize) {

		return null;
	}

	@Override
	public ProfileDetail queryProfileDetail(String talentAccountId, String accountId) {

		return null;
	}

	@Override
	public void updateFavoriteNum(String accountId, int num) {

	}

	@Override
	public void updateMomentImageNum(String accountId, int num) {

	}

	@Override
	public void updateCreateActivityNum(String accountId, int num) {

	}

	@Override
	public void updateJoinedActivityNum(String accountId, int num) {

	}

	@Override
	public void updateUnpublishActivityNum(String accountId, int num) {

	}

	@Override
	public void updateProfileBasic(ProfileBasic profile, long timestamp) {

	}

	@Override
	public FriendInvitation applyFriendInvitiation(String fromAccountId, String toAccountId, long timestamp) {

		return null;
	}

	@Override
	public FriendInvitation queryFriendInvitiation(String code) {

		return null;
	}

}
