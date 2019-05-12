import React, { Component, useEffect, useState } from 'react';
import { render } from 'react-dom';
import yaml from 'js-yaml';
import { OpenAPIObject } from 'openapi3-ts';
import { Definition } from './components/Definition';

import './styles.css';

interface Props {
	url: string | null;
}

const exampleUrl = 'https://raw.githubusercontent.com/OAI/OpenAPI-Specification/OpenAPI.next/examples/v3.0/petstore.yaml';

function App({ url }: Props) {
	const [definitionUrl, setDefinitionUrl] = useState<string | null>(url);
	const [openApiDefinition, setOpenApiDefinition] = useState<OpenAPIObject | undefined>(undefined);

	useEffect(() => {
		if (definitionUrl) {
			fetch(definitionUrl)
				.then(response => response.text())
				.then(yaml.safeLoad)
				.then(setOpenApiDefinition);
		}
	}, [definitionUrl]);

	const updateDocumentUrl = (event: React.FormEvent) => {
		event.preventDefault();
		const { value } = document.getElementById('documentUrl') as HTMLInputElement;
		setDefinitionUrl(value);
		window.history.pushState({}, '', `?url=${value}`);
	};

	return (
		<div className="App">
			<form onSubmit={updateDocumentUrl}>
				<label>
					Import Document
					<input type="url" name="url" id="documentUrl" defaultValue={url || exampleUrl} />
					<input type="submit" value="Import" />
				</label>
			</form>
			{!definitionUrl && <h1>Welcome to strut-ui</h1>}
			{openApiDefinition && <Definition openApiDefinition={openApiDefinition} />}
		</div>
	);
}

const rootElement = document.getElementById('root');
const { search } = document.location;
const params = new URLSearchParams(search);
const url = params.get('url');

render(<App url={url} />, rootElement);
