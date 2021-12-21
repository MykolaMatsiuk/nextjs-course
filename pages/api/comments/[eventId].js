import {
	connectDatabase,
	insertDocument,
	getAllDocuments
} from '../../../helpers/db-utils';

async function handler(req, res) {
	const { eventId } = req.query;

	let client;

	try {
		client = await connectDatabase();
	} catch (err) {
		return res
			.status(500)
			.json({ message: 'Connection to database failed!' });
	}

	if (req.method === 'POST') {
		const { email, name, text } = req.body;

		if (
			!email.includes('@') ||
			!name ||
			name.trim() === '' ||
			!text ||
			text.trim() === ''
		) {
			client.close();

			return res.status(422).json({ message: 'Invalid input!' });
		}

		const newComment = {
			email,
			name,
			text,
			eventId
		};

		try {
			const result = await insertDocument(client, 'comments', newComment);

			newComment._id = result.insertedId;

			res.status(201).json({
				message: 'Comment Added!',
				comment: newComment
			});
		} catch (err) {
			res.status(500).json({ message: 'Inserting comment failed!' });
		}
	}

	if (req.method === 'GET') {
		try {
			const documents = await getAllDocuments(
				client,
				'comments',
				{ _id: -1 },
				{ eventId }
			);

			res.status(200).json({ comments: documents });
		} catch (error) {
			res.status(500).json({ message: 'Getting comments failed!' });
		}
	}

	client.close();
}

export default handler;
