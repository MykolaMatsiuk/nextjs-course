import { Fragment } from 'react';
import { useRouter } from 'next/router';

import EventList from '../../components/events/event-list';
import EventSearch from '../../components/events/event-search';
import { getAllEvents } from '../../api-helpers';

function EventsPage({ events }) {
	const router = useRouter();

	function searchEventsHandler(year, month) {
		const fullPath = `/events/${year}/${month}`;

		router.push(fullPath);
	}

	return (
		<Fragment>
			<EventSearch onSearch={searchEventsHandler} />
			<EventList items={events} />
		</Fragment>
	);
}

export async function getStaticProps() {
	const events = await getAllEvents();

	return {
		props: { events },
		revalidate: 60
	};
}

export default EventsPage;
