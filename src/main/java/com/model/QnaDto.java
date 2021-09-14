package com.model;

public class QnaDto{
	
	private Integer qnaId=0;
	private Integer likeId;
	private Integer blogId;
	private String category="";
	private String title="";
	private String content="";
	private String answerTitle="";
	private String answerContent="";
	private String openYn="Y";
	private String deleteYn="Y";
	private Integer views=0;
	private Integer likeCount=0;
	private String email;
	private String createdDate;
	private String answerDate;
	private String name;
	private String avartarUrl;
	private Integer commentCnt;
	
	public Integer getCommentCnt() {
		return commentCnt;
	}
	public void setCommentCnt(Integer commentCnt) {
		this.commentCnt = commentCnt;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getAvartarUrl() {
		return avartarUrl;
	}
	public void setAvartarUrl(String avartarUrl) {
		this.avartarUrl = avartarUrl;
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
	public void setTitle(String qnaTitle) {
		this.title = qnaTitle;
	}
	public void setQuestionTitle(String qnaTitle) {
		this.title = qnaTitle;
	}
	public String getContent() {
		return content;
	}
	public void setQuestionContent(String qnaContent) {
		this.content = qnaContent;
	}
	public void setContent(String qnaContent) {
		this.content = qnaContent;
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
	public Integer getQnaId() {
		return qnaId;
	}
	public void setQnaId(Integer qnaId) {
		this.qnaId = qnaId;
	}
	public String getAnswerTitle() {
		return answerTitle;
	}
	public void setAnswerTitle(String answerTitle) {
		this.answerTitle = answerTitle;
	}
	public String getAnswerContent() {
		return answerContent;
	}
	public void setAnswerContent(String answerContent) {
		this.answerContent = answerContent;
	}
	public String getAnswerDate() {
		return answerDate;
	}
	public void setAnswerDate(String answerDate) {
		this.answerDate = answerDate;
	}
	public Integer getLikeId() {
		return likeId;
	}
	public void setLikeId(Integer likeId) {
		this.likeId = likeId;
	}
	
}