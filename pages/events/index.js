import { Fragment } from 'react';
import { useRouter } from 'next/router';

import EventList from '../../components/events/event-list';
import EventSearch from '../../components/events/event-search';
import { getAllEvents } from '../../dummy-data';

function EventsPage() {
	const router = useRouter();
	const events = getAllEvents();

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

export default EventsPage;
