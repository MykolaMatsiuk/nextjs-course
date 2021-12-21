import Head from 'next/head';

import EventList from '../components/events/event-list';
import NewsletterRegistration from '../components/input/newsletter-registration';
import { getFeaturedEvents } from '../helpers/api-utils';

function HomePage({ featuredEvents }) {
	return (
		<div>
			<Head>
				<title>NextJS Events</title>
				<meta
					name="description"
					content="Find a lot of great events for your life"
				/>
			</Head>
			<NewsletterRegistration />
			<EventList items={featuredEvents} />
		</div>
	);
}

export async function getStaticProps() {
	const featuredEvents = await getFeaturedEvents();

	return {
		props: { featuredEvents },
		revalidate: 10
	};
}

export default HomePage;
