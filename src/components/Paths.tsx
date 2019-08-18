import React, { Component, useEffect, useState } from 'react';
import { PathsObject } from 'openapi3-ts';

// import './styles.css';

interface Props {
	paths: PathsObject;
}

export function Paths({ paths }: Props) {
	const formattedPaths = Object.entries(paths).reduce((previous, [pathname, pathData]) => {
		for (const method of ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace']) {
			if (pathData.hasOwnProperty(method)) {
				const element = pathData[method];
			}
		}
		return previous;
	}, []);
	return <div>paths:</div>;
}
