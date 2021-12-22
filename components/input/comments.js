import { useState, useEffect, useContext } from 'react';

import NotificationContext from '../../store/notification-context';
import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';

function Comments(props) {
	const { eventId } = props;

	const [showComments, setShowComments] = useState(false);
	const [comments, setComments] = useState([]);
	const [isFetchingComments, setIsFetchingComments] = useState(false);

	const notificationCtx = useContext(NotificationContext);

	useEffect(() => {
		if (showComments) {
			setIsFetchingComments(true);

			fetch(`/api/comments/${eventId}`)
				.then((res) => res.json())
				.then((data) => setComments(data.comments))
				.finally(() => setIsFetchingComments(false));
		}
	}, [showComments]);

	function toggleCommentsHandler() {
		setShowComments((prevStatus) => !prevStatus);
	}

	function addCommentHandler(commentData) {
		notificationCtx.showNotification({
			title: 'Pending...',
			message: 'saving comment in progress',
			status: 'pending'
		});

		fetch(`/api/comments/${eventId}`, {
			method: 'POST',
			body: JSON.stringify(commentData),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((res) => {
				if (res.ok) {
					return res.json();
				}

				return res.json().then((data) => {
					throw new Error(data.message || 'Something went wrong!');
				});
			})
			.then(() => {
				notificationCtx.showNotification({
					title: 'Success!',
					message: 'Comment was added successfully!',
					status: 'success'
				});
			})
			.catch((error) => {
				notificationCtx.showNotification({
					title: 'Error!',
					message:
						error.message || 'Error occured while saving comment!',
					status: 'error'
				});
			});
	}

	return (
		<section className={classes.comments}>
			<button onClick={toggleCommentsHandler}>
				{showComments ? 'Hide' : 'Show'} Comments
			</button>
			{showComments && <NewComment onAddComment={addCommentHandler} />}
			{showComments && !isFetchingComments && (
				<CommentList items={comments} />
			)}
			{showComments && isFetchingComments && <p>Loading...</p>}
		</section>
	);
}

export default Comments;
