function UserProfile(props) {
	return <h1>{props.username}</h1>;
}

export async function getServerSideProps(context) {
	console.log('server side code');
	return {
		props: { username: 'Max' }
	};
}

export default UserProfile;
