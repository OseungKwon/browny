package com.model;

public class PostDto{
	
	private Integer postId=0;
	private Integer blogId;
	private String category="";
	private String title="";
	private String content="";
	private String openYn="Y";
	private String deleteYn="Y";
	private Integer views=0;
	private Integer likeCount=0;
	private String email;
	private String createdDate;
	private Integer commentCnt;
	
	public Integer getPostId() {
		return postId;
	}
	public void setPostId(Integer postId) {
		this.postId = postId;
	}
	public Integer getBlogId() {
		return blogId;
	}
	public void setBlogId(Integer blogId) {
		this.blogId = blogId;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String postTitle) {
		this.title = postTitle;
	}
	public void setPostTitle(String postTitle) {
		this.title = postTitle;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String postContent) {
		this.content = postContent;
	}
	public void setPostContent(String postContent) {
		this.content = postContent;
	}
	public Integer getLikeCount() {
		return likeCount;
	}
	public void setLikeCount(Integer likeCount) {
		this.likeCount = likeCount;
	}
	public String getOpenYn() {
		return openYn;
	}
	public void setOpenYn(String openYn) {
		this.openYn = openYn;
	}
	public Integer getViews() {
		return views;
	}
	public void setViews(Integer views) {
		this.views = views;
	}
	public String getEmail() {
		return email;
	}
	public void setCreatedEmail(String email) {
		this.email = email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getCreatedDate() {
		return createdDate;
	}
	public void setCreatedDate(String createdDate) {
		this.createdDate = createdDate;
	}
	public String getDeleteYn() {
		return deleteYn;
	}
	public void setDeleteYn(String deleteYn) {
		this.deleteYn = deleteYn;
	}
	
}