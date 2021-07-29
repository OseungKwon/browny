package com.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.model.QnaDto;

@Mapper
public interface QnaMapper{
	
	public int insert(QnaDto data);
	public QnaDto select(QnaDto data);
	public int update(QnaDto data);
	public int delete(QnaDto data);
	public List<QnaDto> getList(QnaDto data);
	public int getCount(QnaDto data);
	public int confirmCreate(String email, Integer qnaId);
	public int getMaxId();
	public Integer answer(QnaDto data);
	
}