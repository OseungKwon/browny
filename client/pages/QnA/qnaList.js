import { Container, Typography } from '@material-ui/core';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
// layouts
import MainLayout from 'src/layouts/main';
// components
import Page from 'src/components/Page';

const RootStyle = styled(Page)({
  height: '100%',
});

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default,
}));

export default function QnaList() {
  return (
    <MainLayout>
      <RootStyle title="QnaList" id="move_top">
        <ContentStyle>
          <h1>not implemented yet</h1>
        </ContentStyle>
      </RootStyle>
    </MainLayout>
  );
}
