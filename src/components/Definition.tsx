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
				<span />
			</div>
			{JSON.stringify(openApiDefinition)}
		</div>
	);
}
