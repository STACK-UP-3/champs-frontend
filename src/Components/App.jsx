import React, { Component } from 'react';

import './App.scss';
import Home from './Shared/Home/Home.jsx';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div>
				<header className="header">
					<h1>Barefoot Nomad</h1>
				</header>
				<Home />
			</div>
		);
	}
}
