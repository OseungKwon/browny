package com.model;

import java.sql.Clob;

public class CommentDto {
	private Integer commentId;
	private Integer commentParentId;
	private Integer postId;
	private Integer blogId;
	private Integer writerUserId;
	
	public Integer getCommentId() {
		return commentId;
	}
	public void setCommentId(Integer commentId) {
		this.commentId = commentId;
	}
	public Integer getCommentParentId() {
		return commentParentId;
	}
	public void setCommentParentId(Integer commentParentId) {
		this.commentParentId = commentParentId;
	}
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
	public Integer getWriterUserId() {
		return writerUserId;
	}
	public void setWriterUserId(Integer writerUserId) {
		this.writerUserId = writerUserId;
	}
	public Clob getCommentContent() {
		return commentContent;
	}
	public void setCommentContent(Clob commentContent) {
		this.commentContent = commentContent;
	}
	public String getOpenYn() {
		return openYn;
	}
	public void setOpenYn(String openYn) {
		this.openYn = openYn;
	}
	public Integer getUserId() {
		return userId;
	}
	public void setUserId(Integer userId) {
		this.userId = userId;
	}
	public String getFixYn() {
		return fixYn;
	}
	public void setFixYn(String fixYn) {
		this.fixYn = fixYn;
	}
	public Integer getLikeCount() {
		return likeCount;
	}
	public void setLikeCount(Integer likeCount) {
		this.likeCount = likeCount;
	}
	public Integer getQnaId() {
		return qnaId;
	}
	public void setQnaId(Integer qnaId) {
		this.qnaId = qnaId;
	}
	private Clob commentContent;
	private String openYn;
	private Integer userId;
	private String fixYn;
	private Integer likeCount;
	private Integer qnaId;
}
