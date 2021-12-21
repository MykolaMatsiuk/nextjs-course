import { Fragment, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import useSWR from 'swr';

import EventsList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';
// import { getFilteredEvents } from '../../helpers/api-utils';
import { URL } from '../../consts';

function FilteredEventsPage() {
	// const [loadedEvents, setLoadedEvents] = useState();
	const router = useRouter();
	const { slug } = router.query;

	const fetcher = (...args) =>
		fetch(...args)
			.then((res) => res.json())
			.then((data) => {
				const events = [];

				for (const key in data) {
					events.push({ ...data[key], id: key });
				}

				return events;
			});

	const { data: loadedEvents, error } = useSWR(URL, fetcher);

	let pageHeadData = (
		<Head>
			<title>Filtered events</title>
			<meta name="description" content="A list of filtered events." />
		</Head>
	);

	// useEffect(() => {
	// 	if (data) {
	// 		const events = [];

	// 		for (const key in data) {
	// 			events.push({ ...data[key], id: key });
	// 		}

	// 		setLoadedEvents(events);
	// 	}
	// }, [data]);

	if (!loadedEvents)
		return (
			<Fragment>
				{pageHeadData}
				<p className="center">Loading</p>
			</Fragment>
		);

	const [year, month] = slug;
	const numYear = +year;
	const numMonth = +month;

	pageHeadData = (
		<Head>
			<title>Filtered events</title>
			<meta
				name="description"
				content={`All events for ${numMonth}/${numYear}.`}
			/>
		</Head>
	);

	if (
		isNaN(numYear) ||
		isNaN(numMonth) ||
		numYear > 2030 ||
		numYear < 2021 ||
		numMonth > 12 ||
		numMonth < 1 ||
		error
	) {
		return (
			<Fragment>
				{pageHeadData}
				<ErrorAlert>
					<p>Invalid filter. Please adjust your values</p>
				</ErrorAlert>
				<div className="center">
					<Button link="/events">Show All Events</Button>
				</div>
			</Fragment>
		);
	}

	const filteredEvents = loadedEvents.filter((event) => {
		const eventDate = new Date(event.date);
		return (
			eventDate.getFullYear() === numYear &&
			eventDate.getMonth() === numMonth - 1
		);
	});

	if (!filteredEvents || !filteredEvents.length)
		return (
			<Fragment>
				{pageHeadData}
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
			{pageHeadData}
			<ResultsTitle date={date} />
			<EventsList items={filteredEvents} />
		</Fragment>
	);
}

// export async function getServerSideProps(context) {
// 	const { slug } = context.params;
// 	const [year, month] = slug;
// 	const numYear = +year;
// 	const numMonth = +month;

// 	if (
// 		isNaN(numYear) ||
// 		isNaN(numMonth) ||
// 		numYear > 2030 ||
// 		numYear < 2021 ||
// 		numMonth > 12 ||
// 		numMonth < 1
// 	) {
// 		return {
// 			props: { hasError: true }
// 			// notFound: true
// 		};
// 	}

// 	const filteredEvents = await getFilteredEvents({
// 		year: numYear,
// 		month: numMonth
// 	});

// 	return {
// 		props: { filteredEvents, date: { numYear, numMonth } }
// 	};
// }

export default FilteredEventsPage;
