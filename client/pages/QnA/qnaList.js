import QnaRefCard from '../../src/components/qnaComponents/QnaRefCard';
import QnaTable from '../../src/components/qnaComponents/QnaTable';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
// layouts
import MainLayout from 'src/layouts/main';
// components
import Page from 'src/components/Page';
import { Typography, Tabs, Tab } from '@material-ui/core';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { useEffect, useState } from 'react';
// redux
import { useSelector, useDispatch } from 'react-redux'

const RootStyle = styled(Page)({
  height: '100%',
  top: '80px',
  position: 'relative',
});

const ContentStyle = styled('div')(({ theme }) => ({
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '1280px',
  overflow: 'hidden',
  backgroundColor: theme.palette.background.default,
}));

const RefExpertContainer = styled('div')({
  marginLeft: 'auto',
  marginBottom: '5rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
});

const RefExpertItem = styled('div')({
  marginLeft: '0 15px 0 15px',
});

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  fontWeight: 1000,
  marginBottom: theme.spacing(1),
}));

const PrevItemButton = () => {
  return <ArrowLeftIcon style={{ width: '100px', height: '100px', fill: 'white', stroke: 'black', strokeWidth: 0.1 }} />;
};

const NextItemButton = () => {
  return <ArrowRightIcon style={{ width: '100px', height: '100px', fill: 'white', stroke: 'black', strokeWidth: 0.1 }} />;
};

export default function QnaList() {
  const [currentTab, setCurrentTab] = useState('1');
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const [numOfAllItems, setNumOfAllItems] = useState(0);
  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };
  const sampleQnaRefExpertInfo = {
    image: `/static/brand/logo_single.svg`,
    title: `JamesKoo`,
    content: `Back-end engineer @Google`,
    tags: [
      {
        key: '#JS',
        url: 'www.naver.com',
      },
      {
        key: '#HTML',
        url: 'www.daum.com',
      },
    ],
    action: {
      title: `질문하기`,
      action: `www.naver.com`,
    },
  }; // Todo 추후 api 요청으로 qna 추천 전문가 리스트 얻어오도록 변경
  const sampleQnaInfo = {
    id: 1,
    title: `안녕하세요 회사에서 웹서비스를 만드는데 javascript를 어떻게 활용해야 하는지 궁금합니다. 알려주세요!`,
    content: `내용쓰ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅁㅁㅁㅁㅁ`,
    image: `/static/brand/logo_single.svg`,
    Tags: [
      {
        key: '#JS',
        url: 'www.naver.com',
      },
      {
        key: '#HTML',
        url: 'www.daum.com',
      },
      {
        key: '#Javascript',
        url: 'www.samsung.com',
      },
    ],
    likes: 100,
    comments: 50,
  }; // Todo  추후 api 요청으로 Qna 리스트 얻어오도록 변경
  const qnaRefExpertList = [sampleQnaRefExpertInfo, sampleQnaRefExpertInfo, sampleQnaRefExpertInfo]; // Todo 추후 api 요청으로 qna 추천 전문가 리스트 얻어오도록 변경
  const qnaList = [
    sampleQnaInfo,
    sampleQnaInfo,
    sampleQnaInfo,
    sampleQnaInfo,
    sampleQnaInfo,
    sampleQnaInfo,
    sampleQnaInfo,
    sampleQnaInfo,
    sampleQnaInfo,
    sampleQnaInfo,
  ]; // Todo 추후 api 요청으로 Qna 리스트 얻어오도록 변경
  useEffect(() => {
    // Todo 추후 이곳에서 api 요청 하도록 코드 추가
    setNumOfAllItems(100); // Todo 추후 api 요청으로 Qna 리스트 갯수 얻어오도록 변경
    setCurrentPage(1);
  });
  return (
    <MainLayout>
      <RootStyle title="QnaList" id="move_top">
        <ContentStyle>
          <LabelStyle>추천 전문가</LabelStyle>
          
          <Tabs
            value={currentTab}
            scrollButtons="auto"
            variant="scrollable"
            allowScrollButtonsMobile
            onChange={handleChangeTab}
          >
            <Tab disableRipple key={"days"} label={"최신순"} value={"1"} />
            <Tab disableRipple key={"likes"} label={"인기순"} value={"2"} />
            <Tab disableRipple key={"favorites"} label={"즐겨찾기순"} value={"3"} />
            <Tab disableRipple key={"noCompletes"} label={"답변필요"}  value={"4"} />
          </Tabs>
          
          {/* <RefExpertContainer>
            <PrevItemButton />
            {qnaRefExpertList.map((item, index) => {
              return (
                <RefExpertItem key={index}>
                  <QnaRefCard
                    title={item.title}
                    image={item.image}
                    content={item.content}
                    tags={item.tags}
                    action={item.action}
                  ></QnaRefCard>
                </RefExpertItem>
              );
            })}
            <NextItemButton />
          </RefExpertContainer> */}
        </ContentStyle>
        <ContentStyle>
          <QnaTable list={qnaList}></QnaTable>
        </ContentStyle>
      </RootStyle>
    </MainLayout>
  );
}
