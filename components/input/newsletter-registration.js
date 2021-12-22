import { useRef, useContext } from 'react';

import NotificationContext from '../../store/notification-context';
import classes from './newsletter-registration.module.css';

function NewsletterRegistration() {
	const emailInputRef = useRef();
	const notificationCtx = useContext(NotificationContext);

	function registrationHandler(event) {
		event.preventDefault();

		const enteredEmail = emailInputRef.current.value;

		if (!enteredEmail) return;

		notificationCtx.showNotification({
			title: 'Signing up...',
			message: 'Registering for newsletter',
			status: 'pending'
		});

		const sendBody = { email: enteredEmail };

		fetch('/api/newsletter', {
			method: 'POST',
			body: JSON.stringify(sendBody),
			headers: { 'Content-Type': 'application/json' }
		})
			.then((res) => {
				if (res.ok) {
					return res.json();
				}

				return res.json().then((data) => {
					throw new Error(data.message || 'Something went wrong');
				});
			})
			.then(() =>
				notificationCtx.showNotification({
					title: 'Success',
					message: 'Successfully registered for newsletter',
					status: 'success'
				})
			)
			.catch((err) =>
				notificationCtx.showNotification({
					title: 'Error!',
					message:
						err.message ||
						'Error occured while registering for newsletter',
					status: 'error'
				})
			);
	}

	return (
		<section className={classes.newsletter}>
			<h2>Sign up to stay updated!</h2>
			<form onSubmit={registrationHandler}>
				<div className={classes.control}>
					<input
						ref={emailInputRef}
						type="email"
						id="email"
						placeholder="Your email"
						aria-label="Your email"
					/>
					<button>Register</button>
				</div>
			</form>
		</section>
	);
}

export default NewsletterRegistration;
