import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
	useLazyLogin,
	useLazyLoginProxy,
	useLazyLogout,
	useAuthenticated,
	useLazyAPI,
} from 'drupal-react-oauth-provider';
function App() {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<Login />
				<ViewNode />
			</header>
		</div>
	);
}

const ProxyLogin = () => {
	const [login, { loading, error }] = useLazyLoginProxy();

	const isAuthenticated = useAuthenticated();

	return (
		<div>
			{!isAuthenticated && (
				<button
					onClick={() =>
						login({
							username: 'user1',
							password: '123456',
							proxyURL: 'https://drop-proxy.niallmurphy.dev/oauth',
						})
					}
				>
					Proxy Login
				</button>
			)}
		</div>
	);
};

const Login = () => {
	const [login, { loading, error }] = useLazyLogin();
	const [logout] = useLazyLogout();
	const isAuthenticated = useAuthenticated();
	return (
		<div>
			<ProxyLogin />
			{!isAuthenticated && (
				<div>
					<button
						onClick={() =>
							login({
								username: 'user1',
								password: '123456',
								client_id:
									'5e6c8415-9a1f-4d8b-9249-72b9dc6f7494',
								client_secret: 'client_secret_simple_oauth',
								grant_type: 'password',
								scope: 'consumer',
							})
						}
					>
						Correct Login
					</button>
					<button
						onClick={() =>
							login({
								username: 'user1',
								password: '123456789',
								client_id:
									'5e6c8415-9a1f-4d8b-9249-72b9dc6f7494',
								client_secret: 'client_secret_simple_oauth',
								grant_type: 'password',
								scope: 'consumer',
							})
						}
					>
						Incorrect Login
					</button>
				</div>
			)}
			{loading && <p>Loading...</p>}
			{error && <p>Error: {error.message}</p>}
			{isAuthenticated && (
				<button
					onClick={() => {
						logout();
					}}
				>
					Logout
				</button>
			)}
		</div>
	);
};

const ViewNode = () => {
	const [lazyAPI, { loading, error, data }] = useLazyAPI();
	const [nodeTitle, setNodeTitle] = React.useState('');

	React.useEffect(() => {
		if (data) {
			setNodeTitle(data.title[0].value);
		}
	}, [data]);

	return (
		<div>
			<button
				onClick={() => {
					lazyAPI({
						endpoint: 'node/35',
						method: 'GET',
					});
				}}
			>
				View Node
			</button>
			{loading && <p>Loading...</p>}
			{error && <p>Error: {error.message}</p>}
			{data && <p>{nodeTitle}</p>}
		</div>
	);
};

export default App;
