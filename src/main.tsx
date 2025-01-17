import './main.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.js';
import { worker } from './server/worker';

export const initAPIMock = async () => {
	await worker.start({
		onUnhandledRequest: 'bypass',
	});
};

const initApplication = async () => {
	await initAPIMock();

	const rootElement = document.getElementById('root');

	if (!rootElement) {
		throw new Error("Elemento 'root' não encontrado no DOM.");
	}

	ReactDOM.createRoot(rootElement).render(
		<React.StrictMode>
			<App />
		</React.StrictMode>
	);
};

initApplication();
