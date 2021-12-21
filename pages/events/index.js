import { Fragment } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import EventList from '../../components/events/event-list';
import EventSearch from '../../components/events/event-search';
import { getAllEvents } from '../../helpers/api-utils';

function EventsPage({ events }) {
	const router = useRouter();

	function searchEventsHandler(year, month) {
		const fullPath = `/events/${year}/${month}`;

		router.push(fullPath);
	}

	return (
		<Fragment>
			<Head>
				<title>All Events</title>
				<meta
					name="description"
					content="Find a lot of great events for your life"
				/>
			</Head>
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
