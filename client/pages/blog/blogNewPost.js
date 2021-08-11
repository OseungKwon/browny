// material
import { Container } from '@material-ui/core';
import { experimentalStyled as styled } from '@material-ui/core/styles';
// routes
import { PATH_BLOG } from 'src/routes/paths';
// components
import Page from 'src/components/Page';
import { BlogNewPostForm } from 'src/components/blog';
import React from 'react';

// layouts
import MainLayout from 'src/layouts/main';
// ----------------------------------------------------------------------

export default function blogNewPost() {
  const ContentStyle = styled('div')(({ theme }) => ({
    overflow: 'hidden',
    position: 'flex',
    paddingTop: 100,
    backgroundColor: theme.palette.background.default,
  }));
  return (
    <MainLayout>
      <ContentStyle>
        <Page title="Blog: New Post | Minimal-UI">
          <Container>
          

            <BlogNewPostForm />
          </Container>
        </Page>
        </ContentStyle>
    </MainLayout>
  );
}
