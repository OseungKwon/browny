import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';
import { useSelector } from 'src/redux/store';
export default function PostView() {
    const { post, error, recentPosts } = useSelector((state) => state.blog);
    const { content } = post;
	return (
        <Viewer
            initialValue={content}
        />
	);
}