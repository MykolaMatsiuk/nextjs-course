function handler(req, res) {
	// if (req.method === 'POST') {
	// 	console.log('res', res);
	// 	const email = res.body.email;
	// 	if (!email || !email.includes('@')) {
	// res.status(422).json({ message: 'Invalid email!' });
	// }
	// // console.log(email);
	res.status(200).json({ message: 'Success', email });
	// }
}

export default handler;
