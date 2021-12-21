import { useRef, useState } from 'react';

function HomePage() {
	const emailInputRef = useRef();
	const feedbackInputRef = useRef();
	const [feedbackItems, setFeedbackItems] = useState([]);

	const submitHandler = (event) => {
		event.preventDefault();

		const enteredEmail = emailInputRef.current.value;
		const enteredFeedback = feedbackInputRef.current.value;

		if (!enteredEmail || !enteredFeedback) return;

		const reqBody = { email: enteredEmail, text: enteredFeedback };

		fetch('/api/feedback', {
			method: 'POST',
			body: JSON.stringify(reqBody),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((res) => res.json())
			.then((data) => console.log(data));
	};

	const loadFeedbackHandler = () => {
		fetch('/api/feedback')
			.then((res) => res.json())
			.then((data) => {
				setFeedbackItems(data.feedback);
			});
	};

	return (
		<div>
			<h1>The Home Page</h1>
			<form onSubmit={submitHandler}>
				<div>
					<label htmlFor="email">Your Email Adress: </label>
					<input ref={emailInputRef} type="text" id="email" />
				</div>
				<div>
					<label htmlFor="feedback">Your Feedback: </label>
					<textarea ref={feedbackInputRef} id="feedback" rows="5" />
				</div>
				<button>Send Feedback</button>
			</form>
			<hr />
			<button onClick={loadFeedbackHandler}>Load Feedback</button>
			<ul>
				{feedbackItems.map((item) => (
					<li key={item.id}>{item.feedbackText}</li>
				))}
			</ul>
		</div>
	);
}

export default HomePage;
