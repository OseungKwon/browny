// material
import { Container } from '@material-ui/core';
import { experimentalStyled as styled } from '@material-ui/core/styles';
// routes
import { PATH_BLOG } from 'src/routes/paths';
// components
import Page from 'src/components/Page';
import { BlogNewPostForm } from 'src/components/blog';
import React from 'react';
import { useSelector } from 'src/redux/store';
// layouts
import MainLayout from 'src/layouts/main';
// ----------------------------------------------------------------------

export default function blogNewPost() {
    const { post, error, recentPosts } = useSelector((state) => state.blog);
    const ContentStyle = styled('div')(({ theme }) => ({
        overflow: 'hidden',
        position: 'flex',
        paddingTop: 100,
        backgroundColor: theme.palette.background.default,
    }));
    return (
        <MainLayout>
            <ContentStyle>
                <Page title="Blog: Edit Post | Minimal-UI">
                    <Container>
                        <BlogNewPostForm post={post} />
                    </Container>
                </Page>
            </ContentStyle>
        </MainLayout>
    );
}
