import React, { Component, useEffect, useState } from 'react';
import { render } from 'react-dom';
import yaml from 'js-yaml';
import { OpenAPIObject } from 'openapi3-ts';

import './styles.css';

function App() {
	const [openApiDefinition, setOpenApiDefinition] = useState<OpenAPIObject | undefined>(undefined);

	const importDocument = async (event: React.FormEvent) => {
		event.preventDefault();
		const { value: url } = document.getElementById('documentUrl') as HTMLInputElement;

		const response = await fetch(url);
		const text = await response.text();

		setOpenApiDefinition(yaml.safeLoad(text));
	};

	return (
		<header className="App">
			<form onSubmit={importDocument}>
				<label>
					Import Document
					<input
						type="url"
						name="url"
						id="documentUrl"
						defaultValue="https://raw.githubusercontent.com/OAI/OpenAPI-Specification/OpenAPI.next/examples/v3.0/petstore.yaml"
					/>
					<input type="submit" value="Import" />
				</label>
			</form>
			{openApiDefinition && JSON.stringify(openApiDefinition, null, 2)}
		</header>
	);
}

const rootElement = document.getElementById('root');
render(<App />, rootElement);
