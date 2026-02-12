import {
	type RouteConfigEntry,
	index,
	route,
} from '@react-router/dev/routes';

// Use import.meta.glob to find all page.jsx files at build time
const pages = import.meta.glob('./**/page.jsx');

const dynamicRoutes: RouteConfigEntry[] = Object.keys(pages).map((pagePath) => {
	// pagePath is like './page.jsx' or './blog/[slug]/page.jsx'

	// Remove leading './' and trailing '/page.jsx'
	let relativePath = pagePath.startsWith('./') ? pagePath.slice(2) : pagePath;
	if (relativePath.endsWith('page.jsx')) {
		relativePath = relativePath.slice(0, -8);
	}
	if (relativePath.endsWith('/')) {
		relativePath = relativePath.slice(0, -1);
	}

	if (relativePath === '') {
		return index(pagePath);
	}

	// Transform [param] to :param
	const segments = relativePath.split('/');
	const processedSegments = segments.map((segment) => {
		if (segment.startsWith('[') && segment.endsWith(']')) {
			const paramName = segment.slice(1, -1);

			// Handle catch-all parameters (e.g., [...ids] becomes *)
			if (paramName.startsWith('...')) {
				return '*';
			}
			// Handle optional parameters (e.g., [[id]] becomes :id?)
			if (paramName.startsWith('[') && paramName.endsWith(']')) {
				return `:${paramName.slice(1, -1)}?`;
			}
			// Handle regular parameters (e.g., [id] becomes :id)
			return `:${paramName}`;
		}
		return segment;
	});

	const routePath = processedSegments.join('/');
	return route(routePath, pagePath);
});

if (import.meta.env.DEV) {
	if (import.meta.hot) {
		import.meta.hot.accept((newSelf) => {
			import.meta.hot?.invalidate();
		});
	}
}

const notFound = route('*?', './__create/not-found.tsx');
const routes = [...dynamicRoutes, notFound];

export default routes;

