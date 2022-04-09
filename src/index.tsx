import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { DrupalProvider } from 'drupal-react-oauth-provider';

const config = {
	url: 'https://d9-testing.niallmurphy.dev/',
};
ReactDOM.render(
	<React.StrictMode>
		<DrupalProvider config={config}>
			<App />
		</DrupalProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
