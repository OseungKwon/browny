import { Container, Typography, Box, Tabs } from "@material-ui/core"
import { experimentalStyled as styled } from '@material-ui/core/styles';
import Page from 'src/components/Page';

import QnaComment from '../../src/components/qnaComponents/QnaComment'
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
  ...theme.typography.h3,
  color: theme.palette.text.secondary,
  fontWeight: 1000,
  marginBottom: theme.spacing(1),
}));

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
};
function QnaPost() {
  return (
    <Container>
      <Box>
        <LabelStyle>{sampleQnaInfo.title}</LabelStyle>
        <div>{sampleQnaInfo.Tags.map(tag => (<ContentStyle key={tag.key}>{tag.key}</ContentStyle>))}
        </div>
        <ContentStyle>{sampleQnaInfo.content}</ContentStyle>
        <hr />
        <div>답변</div>
        <QnaComment />
      </Box>
    </Container>);
}

export default QnaPost;
