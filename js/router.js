import { Layout } from './Layout/Layout.js';
import { Login } from './Login/Login.js';
import { Signup } from './Signup/Signup.js';
import { Stuff } from './Stuff/Stuff.js';
import { replaceNode, stripTrailingSlashes } from './utils.js';

const navigateTo = (url) => {
	if (url.includes(window.location.origin)) {
		url = url.replace(window.location.origin, '');
	}
	history.pushState(null, null, url);
	router();
};

const router = async () => {
	const routes = [
		{
			path: '/',
			view: () =>
				Layout({
					children: Login(),
				}),
		},
		{
			path: '/login',
			view: () =>
				Layout({
					children: Login(),
				}),
		},
		{
			path: '/signup',
			view: () =>
				Layout({
					children: Signup(),
				}),
		},
		{
			path: '/stuff',
			view: () =>
				Layout({
					children: Stuff(),
				}),
		},
	];
	const currentPath = stripTrailingSlashes(location.pathname);
	const matchingRoute = routes.find((route) => {
		return currentPath === route.path;
	});
	if (!matchingRoute) {
		replaceNode('body', Login());
	} else {
		replaceNode('body', matchingRoute.view());
	}
};

window.addEventListener('popstate', router);

document.addEventListener('DOMContentLoaded', () => {
	document.body.addEventListener('click', (e) => {
		if (e.target.matches('a')) {
			e.preventDefault();
			navigateTo(e.target.href);
		}
	});
	router();
});
