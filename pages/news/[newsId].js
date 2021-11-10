import { useRouter } from 'next/dist/client/router';

// our-domain.com/news/something

function DetailPage() {
	const router = useRouter();
	const newsId = router.query.newsId;

	// fetch request with newsId for news

	return <h1>Detail Page!</h1>;
}

export default DetailPage;
