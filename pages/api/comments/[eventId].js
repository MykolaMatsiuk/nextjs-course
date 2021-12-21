function handler(req, res) {
	const { eventId } = req.query;

	if (req.method === 'POST') {
		const { email, name, text } = req.body;

		if (
			!email.includes('@') ||
			!name ||
			name.trim() === '' ||
			!text ||
			text.trim() === ''
		) {
			return res.status(422).json({ message: 'Invalid input!' });
		}

		const newComment = {
			id: new Date().getTime(),
			email,
			name,
			text
		};

		console.log(newComment);
		res.status(201).json({
			message: 'Comment Added!',
			comment: newComment
		});
	}

	if (req.method === 'GET') {
		const dummyComments = [
			{ id: 'c1', name: 'Jay', text: 'First comment' },
			{ id: 'c2', name: 'Jimmy', text: 'Second comment' }
		];

		res.status(200).json({ comments: dummyComments });
	}
}

export default handler;
