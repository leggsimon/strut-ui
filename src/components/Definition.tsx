import React, { Component, useEffect, useState } from 'react';
import { OpenAPIObject } from 'openapi3-ts';

// import './styles.css';

interface Props {
	openApiDefinition: OpenAPIObject;
}

export function Definition({ openApiDefinition }: Props) {
	return (
		<div>
			<div className="metadata">
				<h1>{openApiDefinition.info.title}</h1>
				<p>{openApiDefinition.info.description}</p>
				<details>
					<summary>Addtional Information</summary>
					<dl>
						{
							<>
								<dt>Open Api Version</dt>
								<dd>{openApiDefinition.openapi}</dd>
							</>
						}
						{
							<>
								<dt>Api Version</dt>
								<dd>{openApiDefinition.info.version}</dd>
							</>
						}
						{openApiDefinition.info.termsOfService && (
							<>
								<dt>Terms Of Service</dt>
								<dd>{openApiDefinition.info.termsOfService}</dd>
							</>
						)}
						{openApiDefinition.info.contact && (
							<>
								<dt>Contact</dt>

								<dd>
									<dl>
										<dt>Name</dt>
										<dd>{openApiDefinition.info.contact.name}</dd>
										<dt>Email</dt>
										<dd>{openApiDefinition.info.contact.email}</dd>
										<dt>URL</dt>
										<dd>{openApiDefinition.info.contact.url}</dd>
									</dl>
								</dd>
							</>
						)}
						{openApiDefinition.info.license && (
							<>
								<dt>Licence</dt>
								<dd>{openApiDefinition.info.license}</dd>
							</>
						)}
					</dl>
				</details>
			</div>
			{JSON.stringify(openApiDefinition)}
		</div>
	);
}
