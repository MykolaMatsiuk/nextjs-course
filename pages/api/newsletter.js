import { connectDatabase, insertDocument } from '../../helpers/db-utils';

async function handler(req, res) {
	if (req.method === 'POST') {
		const { email } = req.body;

		if (!email || !email.includes('@')) {
			return res.status(422).json({ message: 'Invalid email!' });
		}

		let client;

		try {
			client = await connectDatabase();
		} catch (err) {
			return res
				.status(500)
				.json({ message: 'Connecting to database failed!' });
		}

		try {
			await insertDocument(client, 'newsletter', { email });
			client.close();
		} catch (err) {
			return res.status(500).json({ message: 'Inserting data failed!' });
		}

		res.status(201).json({ message: 'Success' });
	}
}

export default handler;
