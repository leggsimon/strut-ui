/* eslint-disable no-undef */

describe('The Home Page', () => {
	let polyfill;
	const undefineFetch = win => {
		delete win.fetch;
		win.eval(polyfill);
		win.fetch = win.unfetch;
	};

	before(() => {
		const polyfillUrl = 'https://unpkg.com/unfetch/dist/unfetch.umd.js';
		cy.request(polyfillUrl).then(response => {
			polyfill = response.body;
		});
	});

	it('loads with no data by default', () => {
		cy.visit('/')
			.get('h1')
			.contains('Welcome to strut-ui'); // change URL to match your dev URL
	});

	it('should load the document from the url passed as a query parameter', () => {
		const documentUrl = 'https://example.com/petstore.yaml';

		cy.server();
		cy.route('GET', documentUrl, 'fixture:petstore.yml').as('request');

		cy.visit(`/?url=${documentUrl}`, {
			onBeforeLoad: undefineFetch,
		})
			.get('h1')
			.contains('Swagger Petstore');
	});

	describe('import document form', () => {
		it('should load the document from the url submitted in the form', () => {
			const documentUrl = 'https://example.com/petstore.yaml';

			cy.server();
			cy.route('GET', documentUrl, 'fixture:petstore.yml').as('request');

			cy.visit('/', {
				onBeforeLoad: undefineFetch,
			})
				.get('#documentUrl')
				.clear()
				.type(documentUrl)
				.get('[type="submit"]')
				.click()
				.get('h1')
				.contains('Swagger Petstore');
		});

		it('should persist after a page refresh', () => {
			const documentUrl = 'https://example.com/petstore.yaml';

			cy.server();
			cy.route('GET', documentUrl, 'fixture:petstore.yml');

			cy.visit('/', {
				onBeforeLoad: undefineFetch,
			})
				.get('#documentUrl')
				.clear()
				.type(documentUrl)
				.get('[type="submit"]')
				.click()
				.get('h1')
				.contains('Swagger Petstore')
				.reload({
					onBeforeLoad: undefineFetch,
				})
				.get('h1')
				.contains('Swagger Petstore');
		});

		it.skip('should persist in history allowing forward/back navigation', () => {
			const petstoreDocumentUrl = 'https://example.com/petstore.yaml';
			const usptoDocumentUrl = 'https://example.com/uspto.yaml';
			const petstoreTitle = 'Swagger Petstore';
			const usptoTitle = 'USPTO Data Set API';

			cy.server();
			cy.route('GET', petstoreDocumentUrl, 'fixture:petstore.yml');
			cy.route('GET', usptoDocumentUrl, 'fixture:uspto.yml');

			cy.visit(`/?url=${usptoDocumentUrl}`, {
				onBeforeLoad: undefineFetch,
			})
				.get('h1')
				.contains(usptoTitle)
				.get('#documentUrl')
				.clear()
				.type(petstoreDocumentUrl)
				.get('[type="submit"]')
				.click()
				.get('h1')
				.contains(petstoreTitle)
				.go('back', {
					onBeforeLoad: undefineFetch,
				})
				.get('h1')
				.contains(usptoTitle)
				.go('forward', {
					onBeforeLoad: undefineFetch,
				})
				.get('h1')
				.contains(usptoTitle);
		});
	});
});
