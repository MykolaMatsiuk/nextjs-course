import EventItem from './event-item';

import classes from './event-list.module.css';

function EventList({ items }) {
	return (
		<ul className={classes.list}>
			{items.map((item) => (
				<EventItem
					key={item.id}
					title={item.title}
					id={item.id}
					image={item.image}
					location={item.location}
					date={item.date}
				/>
			))}
		</ul>
	);
}

export default EventList;
