import { createContext, useState, useEffect } from 'react';

const NotificationContext = createContext({
	notification: null,
	showNotification: (notificationData) => {},
	hideNotification: () => {}
});

export const NotificationContextProvider = (props) => {
	const [activeNotification, setActiveNotification] = useState(null);

	useEffect(() => {
		if (
			activeNotification &&
			(activeNotification.status === 'success' ||
				activeNotification.status === 'error')
		) {
			const timerId = setTimeout(() => setActiveNotification(null), 5000);

			return () => clearTimeout(timerId);
		}
	}, [activeNotification]);

	const showNotificationHandler = (notificationData) => {
		setActiveNotification(notificationData);
	};

	const hideNotificationHandler = () => {
		setActiveNotification(null);
	};

	const context = {
		notification: activeNotification,
		showNotification: showNotificationHandler,
		hideNotification: hideNotificationHandler
	};

	return (
		<NotificationContext.Provider value={context}>
			{props.children}
		</NotificationContext.Provider>
	);
};

export default NotificationContext;
