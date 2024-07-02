export const parseHTMLnode = (htmlString) => {
	const parser = new DOMParser();
	const doc = parser.parseFromString(htmlString, 'text/html');
	return doc.body.firstElementChild;
};

export const replaceNode = (selector, htmlString) => {
	const targetElement = document.querySelector(selector);
	if (targetElement) {
		const newContent = parseHTMLnode(htmlString);
		targetElement.replaceWith(newContent);
	}
};

export const stripTrailingSlashes = (str) => {
	return str.replace(/\/+$/, '');
};

export const isServer = () => {
	return (
		typeof global !== 'undefined' && typeof process !== 'undefined' && typeof process.versions !== 'undefined' && typeof process.versions.node !== 'undefined'
	);
};
