import { Fragment } from 'react';
import { useRouter } from 'next/router';

import EventsList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';
import { getFilteredEvents } from '../../dummy-data';

function FilteredEventsPage() {
	const router = useRouter();

	const filterData = router.query.slug;

	if (!filterData) return <p className="center">Loading...</p>;

	const [year, month] = filterData;

	const numYear = +year;
	const numMonth = +month;

	if (
		isNaN(numYear) ||
		isNaN(numMonth) ||
		numYear > 2030 ||
		numYear < 2021 ||
		numMonth > 12 ||
		numMonth < 1
	) {
		return (
			<Fragment>
				<ErrorAlert>
					<p>Invalid filter. Please adjust your values</p>
				</ErrorAlert>
				<div className="center">
					<Button link="/events">Show All Events</Button>
				</div>
			</Fragment>
		);
	}

	const filteredEvents = getFilteredEvents({
		year: numYear,
		month: numMonth
	});

	if (!filteredEvents || !filteredEvents.length)
		return (
			<Fragment>
				<ErrorAlert>
					<p>No events on this date</p>
				</ErrorAlert>
				<div className="center">
					<Button link="/events">Show All Events</Button>
				</div>
			</Fragment>
		);

	const date = new Date(numYear, numMonth - 1);

	return (
		<Fragment>
			<ResultsTitle date={date} />
			<EventsList items={filteredEvents} />
		</Fragment>
	);
}

export default FilteredEventsPage;
