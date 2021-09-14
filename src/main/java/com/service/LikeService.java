package com.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mapper.LikeMapper;
import com.mapper.PostMapper;
import com.mapper.QnaMapper;
import com.model.PostDto;
import com.model.QnaDto;
import com.util.CommonUtils;

@Service
@Transactional
public class LikeService {
	@Autowired
	private PostMapper postMapper;
	@Autowired
	private QnaMapper qnaMapper;
	@Autowired
	private LikeMapper likeMapper;
	
	public Integer editLikes(String contentType,Map<String, Object> paramMap) {
		Integer returnVal = 0;
		Integer contentId = (Integer) paramMap.get("contentId");
		Integer likeCount = (Integer) paramMap.get("likeCount");
		Integer likeId = (Integer) paramMap.get("likeId");
		if(contentType.equals("blog")){
			PostDto postDto = new PostDto();
			postDto.setPostId(contentId);
			postDto.setLikeCount(likeCount);
			returnVal = postMapper.updateLikeCount(postDto);
		}else if(contentType.equals("qna")) {
			QnaDto qnaDto = new QnaDto();
			qnaDto.setQnaId(contentId);
			qnaDto.setLikeCount(likeCount);
			returnVal = qnaMapper.updateLikeCount(qnaDto);
		}
		
		paramMap.put("deleteYn", likeCount == 1 ? "N" : "Y");
		if(likeId == null) {
			likeMapper.insertUserLike(paramMap);
		}else {
			likeMapper.updateUserLike(paramMap);
		}
		
		//likeMapper.updateUserLike(paramMap);
		return returnVal;
	}

}
