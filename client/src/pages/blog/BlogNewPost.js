// material
import { Container } from '@material-ui/core';
// routes
import { PATH_BLOG } from '../../routes/paths';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { BlogNewPostForm } from '../../components/blog';
import React from 'react';
// ----------------------------------------------------------------------

export default function BlogNewPost() {
  return (
    <Page title="Blog: New Post | Minimal-UI">
      <Container>
        <HeaderBreadcrumbs
          heading="Create a new post"
          links={[{ name: 'Dashboard', href: PATH_BLOG.root }, { name: 'Blog', href: PATH_BLOG.root }, { name: 'New Post' }]}
        />

        <BlogNewPostForm />
      </Container>
    </Page>
  );
}
