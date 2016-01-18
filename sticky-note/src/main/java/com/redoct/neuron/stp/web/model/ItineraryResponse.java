package com.redoct.neuron.stp.web.model;

import java.util.List;

public class ItineraryResponse {

	private int type;
	private String desc;
	private String title;
	private String originalLocation;
	private String originalGeoX;
	private String originalGeoY;
	private String destLocation;
	private String destGeoX;
	private String destGeoY;
	private Long beginTime;
	private Long endTime;
	private List<String> imageUrls;
	private List<EquipmentItem> items;
	private List<AccountBasic> managers;
	private List<RichContent> richContents;

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public String getDesc() {
		return desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getOriginalLocation() {
		return originalLocation;
	}

	public void setOriginalLocation(String originalLocation) {
		this.originalLocation = originalLocation;
	}

	public String getOriginalGeoX() {
		return originalGeoX;
	}

	public void setOriginalGeoX(String originalGeoX) {
		this.originalGeoX = originalGeoX;
	}

	public String getOriginalGeoY() {
		return originalGeoY;
	}

	public void setOriginalGeoY(String originalGeoY) {
		this.originalGeoY = originalGeoY;
	}

	public String getDestLocation() {
		return destLocation;
	}

	public void setDestLocation(String destLocation) {
		this.destLocation = destLocation;
	}

	public String getDestGeoX() {
		return destGeoX;
	}

	public void setDestGeoX(String destGeoX) {
		this.destGeoX = destGeoX;
	}

	public String getDestGeoY() {
		return destGeoY;
	}

	public void setDestGeoY(String destGeoY) {
		this.destGeoY = destGeoY;
	}

	public Long getBeginTime() {
		return beginTime;
	}

	public void setBeginTime(Long beginTime) {
		this.beginTime = beginTime;
	}

	public Long getEndTime() {
		return endTime;
	}

	public void setEndTime(Long endTime) {
		this.endTime = endTime;
	}

	public List<String> getImageUrls() {
		return imageUrls;
	}

	public void setImageUrls(List<String> imageUrls) {
		this.imageUrls = imageUrls;
	}

	public List<EquipmentItem> getItems() {
		return items;
	}

	public void setItems(List<EquipmentItem> items) {
		this.items = items;
	}

	public List<AccountBasic> getManagers() {
		return managers;
	}

	public void setManagers(List<AccountBasic> managers) {
		this.managers = managers;
	}

	public List<RichContent> getRichContents() {
		return richContents;
	}

	public void setRichContents(List<RichContent> richContents) {
		this.richContents = richContents;
	}

	public static class EquipmentItem {
		private String name;
		private int amount;

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

		public int getAmount() {
			return amount;
		}

		public void setAmount(int amount) {
			this.amount = amount;
		}

	}

	public static class RichContent {
		private int type;
		private String text;

		public int getType() {
			return type;
		}

		public void setType(int type) {
			this.type = type;
		}

		public String getText() {
			return text;
		}

		public void setText(String text) {
			this.text = text;
		}
	}

	public static class AccountBasic {
		private String accountId;
		private String nickName;
		private String avatarUrl;

		public String getAccountId() {
			return accountId;
		}

		public void setAccountId(String accountId) {
			this.accountId = accountId;
		}

		public String getNickName() {
			return nickName;
		}

		public void setNickName(String nickName) {
			this.nickName = nickName;
		}

		public String getAvatarUrl() {
			return avatarUrl;
		}

		public void setAvatarUrl(String avatarUrl) {
			this.avatarUrl = avatarUrl;
		}

	}
}
