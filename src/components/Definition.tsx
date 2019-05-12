import React, { Component, useEffect, useState } from 'react';
import { OpenAPIObject } from 'openapi3-ts';

// import './styles.css';

interface Props {
	openApiDefinition: OpenAPIObject;
}

export function Definition({ openApiDefinition }: Props) {
	return <div>{JSON.stringify(openApiDefinition.info, null, 2)}</div>;
}
