import { Navbar } from '../Navbar/Navbar.js';
import { isServer } from '../utils.js';

export const Layout = (props) => {
	const template = `${Navbar()} ${props.children}`;

	if (isServer()) {
		return html`<html lang="en">
			<meta charset="UTF-8" />
			<title>Test App</title>
			<meta name="viewport" content="width=device-width,initial-scale=1" />
			<link rel="stylesheet" href="/index.css?v=${APP_VERSION}" />
			<link rel="stylesheet" href="/navbar.css?v=${APP_VERSION}" />
			<script src="/utils.js" type="module" defer></script>
			<script src="/config.js" type="module" defer></script>
			<script src="/router.js" type="module" defer></script>
			<script src="/Stuff/Stuff.js" type="module" defer></script>
			<script>
				var html = (strings, ...values) => {
					return strings.reduce((result, string, i) => result + string + (values[i] !== undefined ? values[i] : ''), '');
				};
			</script>
			<body>
				${template}
			</body>
		</html>`;
	} else {
		return template;
	}
};
