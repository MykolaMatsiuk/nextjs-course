function UserDetailPage(props) {
	return <h1>{props.userId}</h1>;
}

export async function getServerSideProps(context) {
	const { params } = context;

	return {
		props: { userId: params.uid }
	};
}

export default UserDetailPage;
