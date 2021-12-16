import EventList from '../components/events/event-list';
import { getFeaturedEvents } from '../api-helpers';

function HomePage({ featuredEvents }) {
	return (
		<div>
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
