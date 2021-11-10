import Link from 'next/link';

// our-domain.com/news

function NewsPage() {
	return (
		<>
			<h1>News Page!</h1>
			<ul>
				<li>
					<Link href="/news/ID1">Next JS is a great framework</Link>
				</li>
				<li>
					<Link href="/news/ID2">Something else</Link>
				</li>
			</ul>
		</>
	);
}

export default NewsPage;
