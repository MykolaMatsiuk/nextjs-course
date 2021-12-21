import { useState, Fragment } from 'react';
import { buildFeedbackPath, extractFeedback } from '../api/feedback';

function FeedbackPage({ feedbacks }) {
	const [feedbackData, setFeedbackData] = useState();

	function loadFeedbackHandler(id) {
		fetch(`/api/feedback/${id}`)
			.then((res) => res.json())
			.then((data) => {
				setFeedbackData(data.feedback);
			});
	}

	return (
		<Fragment>
			{feedbackData && <p>{feedbackData.email}</p>}
			<ul>
				{feedbacks.map((feedback) => (
					<li key={feedback.id}>
						<span>{feedback.feedbackText}</span>
						<button
							onClick={() => loadFeedbackHandler(feedback.id)}
						>
							Show Details
						</button>
					</li>
				))}
			</ul>
		</Fragment>
	);
}

export async function getStaticProps() {
	const filePath = buildFeedbackPath();
	const data = extractFeedback(filePath);

	return {
		props: {
			feedbacks: data
		}
	};
}

export default FeedbackPage;
