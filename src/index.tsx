import * as React from 'react';
import { render } from 'react-dom';
import yaml from 'js-yaml';
import { OpenAPIObject } from 'openapi3-ts';

import './styles.css';

interface AppProps {}

interface AppState {
	openApiDefinition: OpenAPIObject | undefined;
	loadingState: 'loaded' | 'loading' | 'n/a';
}

class App extends React.Component<AppProps, AppState> {
	constructor(props: AppProps) {
		super(props);

		this.state = {
			openApiDefinition: undefined,
			loadingState: 'n/a',
		};
	}

	async fetchDocument(url: string) {
		const response = await fetch(url);
		const text = await response.text();

		this.setState({
			loadingState: 'loaded',
			openApiDefinition: yaml.safeLoad(text),
		});
	}

	render() {
		return (
			<header className="App">
				<h1>Hello Blah</h1>
				<form
					onSubmit={async event => {
						event.preventDefault();
						const { value } = document.getElementById('documentUrl') as HTMLInputElement;

						await this.fetchDocument(value);

						console.log('submitted', value);
					}}
				>
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
				{JSON.stringify(this.state.openApiDefinition, null, 2)}
			</header>
		);
	}
}

const rootElement = document.getElementById('root');
render(<App />, rootElement);
