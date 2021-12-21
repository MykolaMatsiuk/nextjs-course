import { Fragment } from 'react';
import Head from 'next/head';

import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import { getFeaturedEvents, getEventById } from '../../api-helpers';
import Comments from '../../components/input/comments';

function EventDetailPage({ event }) {
	if (!event)
		return (
			<div className="center">
				<p>Loading...</p>
			</div>
		);

	return (
		<Fragment>
			<Head>
				<title>{event.title}</title>
				<meta name="description" content={event.description} />
			</Head>
			<EventSummary title={event.title} />
			<EventLogistics
				date={event.date}
				address={event.location}
				image={event.image}
				imageAlt={event.title}
			/>
			<EventContent>
				<p>{event.description}</p>
			</EventContent>
			<Comments eventId={event.id} />
		</Fragment>
	);
}

export async function getStaticPaths() {
	const featuredEvents = await getFeaturedEvents();
	const paths = featuredEvents.map((event) => ({
		params: { eventId: event.id }
	}));

	return {
		paths,
		fallback: 'blocking'
	};
}

export async function getStaticProps(context) {
	const { eventId } = context.params;
	const event = await getEventById(eventId);

	if (!event) {
		return {
			notFound: true
		};
	}

	return {
		props: { event },
		revalidate: 10
	};
}

export default EventDetailPage;
