import React from 'react';
import ReactDOM from 'react-dom';

import scrollMonitor from 'scrollmonitor';

export default Component => class WatchedComponent extends React.Component {

	constructor () {
		super();

		this.state = {
			isInViewport: false,
			isAboveViewport: false,
			isBelowViewport: false,
			isFullyInViewport: false
		};
	}

	componentDidMount () {
		var el = ReactDOM.findDOMNode(this);
		this.watcher = (this.props.scrollMonitor || scrollMonitor).create(el, this.props.offsets);

		this.watcher.on('stateChange', () => {
			this.setState({
				isInViewport: this.watcher.isInViewport,
				isAboveViewport: this.watcher.isAboveViewport,
				isBelowViewport: this.watcher.isBelowViewport,
				isFullyInViewport: this.watcher.isFullyInViewport
			});
		});

		this.listeners = {};

		scrollMonitor.eventTypes.forEach(type => {
			if (this.props[type]) {
				this.listeners[type] = () => this.props[type](this.watcher);
				this.watcher.on(type, this.listeners[type]);
			}
		});
	}

	componentWillReceiveProps (props) {
		scrollMonitor.eventTypes.forEach(type => {
			if (props[type] && !this.props[type]) {
				this.listeners[type] = () => this.props[type](this.watcher);
				this.watcher.on(type, this.listeners[type]);
			} else if (!props[type] && this.props[type]) {
				this.watcher.off(type, this.listeners[type]);
			}
		});
	}

	render () {
		return (<Component
			isInViewport={this.state.isInViewport}
			isAboveViewport={this.state.isAboveViewport}
			isBelowViewport={this.state.isBelowViewport}
			isFullyInViewport={this.state.isFullyInViewport}
			{...this.props}
		>
			{this.props.children}
		</Component>);
	}
};
