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

@Component
public class MockSupAccountServiceImpl implements SupAccountService {

	@Override
	public boolean verifyLoginExist(short loginType, String loginName) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public String verifyLoginPwd(short loginType, String loginName, String md5pwd) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void resetPwd(short loginType, String loginName, String md5pwd, long timestamp) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public String createAccountBasic(AccountBasic account, long timestamp) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void modifyAccountBasic(AccountBasic account, long timestamp) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void createLogin(String accountId, short loginType, String loginName, long timestamp) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void modifyAccountId4Login(String accountId, short loginType, String loginName, long timestamp) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public String createLostPwdEkey(short loginType, String loginName, long timestamp) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public LostPwdEkey findLostPwdEkey(String ekey) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public AccountBasic findAccountBasicById(String accountId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public AccountBasic findAccountBasicByLogin(short loginType, String loginName) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public AccountMaster findAccountMasterById(String accountId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<AccountDetail> findAccountDetails(List<String> ids) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String findLoginNameById(String accountId, short loginType) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String applyResetPwdVerificationCode(short verificationType, String deviceId, String phone, long timestamp) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public VerificationCode findResetPwdVerificationCode(short verificationType, String deviceId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void follow(String accountId, String friendingId) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void unfollow(String accountId, String friendingId) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<AccountBasic> findFansPagination(String accountId, int pageNum, int pageSize) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<String> findAllFanIds(String accountId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<String> findAllFriendIds(String accountId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<AccountBasic> findFollowingsPagination(String accountId, int pageNum, int pageSize) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void addFriend(String accountId, String friendingId) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void removeFriend(String accountId, String friendingId) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<AccountBasic> findFriendsPagination(String accountId, int pageNum, int pageSize) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ProfileDetail findProfileDetail(String talentAccountId, String accountId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void modifyProfileFavoriteNum(String accountId, int num) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void modifyProfileMomentNum(String accountId, int num) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void modifyProfileCreateActivityNum(String accountId, int num) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void modifyProfileJoinedActivityNum(String accountId, int num) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void modifyProfileUnpublishActivityNum(String accountId, int num) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void modifyProfileBasic(ProfileBasic profile, long timestamp) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public FriendInvitation applyFriendInvitation(String fromAccountId, String toAccountId, long timestamp) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public FriendInvitation findFriendInvitation(String code) {
		// TODO Auto-generated method stub
		return null;
	}


	
}
