import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import hoistStatics from 'hoist-non-react-statics';

import scrollMonitor from 'scrollmonitor';

export const ScrollContainer = (Component) => {
	class ScrollMonitorContainer extends React.Component {
		constructor () {
			super();

			this.state = {
				container: null
			};
		}

		componentDidMount () {
			var el = ReactDOM.findDOMNode(this);
			var container = scrollMonitor.createContainer(el, this.props.offsets);
			this.setState({
				scrollContainer: container
			});
		}

		render () {
			return (<Component
				scrollContainer={this.state.scrollContainer}
				{...this.props}
			>
				{this.props.children}
			</Component>);
		}
	}
	return hoistStatics(ScrollMonitorContainer, Component);
};

export const Watch = (Component) => {
	return class WatchedComponent extends React.Component {
		static propTypes = {
			autoStart: PropTypes.bool,
			initialRender: PropTypes.shape({
				isInViewport: PropTypes.bool,
				isAboveViewport: PropTypes.bool,
				isBelowViewport: PropTypes.bool,
				isFullyInViewport: PropTypes.bool
			})
		};

		static defaultProps = {
			autoStart: true,
			initialRender: {
				isInViewport: false,
				isAboveViewport: false,
				isBelowViewport: false,
				isFullyInViewport: false
			}
		};

		constructor (props) {
			super(props);
			this.state = {
				isInViewport: this.props.initialRender.isInViewport,
				isAboveViewport: this.props.initialRender.isAboveViewport,
				isBelowViewport: this.props.initialRender.isBelowViewport,
				isFullyInViewport: this.props.initialRender.isFullyInViewport
			};
		}

		createWatcher (props) {
			var el = ReactDOM.findDOMNode(this);
			this.watcher = (props.scrollContainer || scrollMonitor).create(el, props.offsets);

			const updateState = () => {
				this.setState({
					isInViewport: this.watcher.isInViewport,
					isAboveViewport: this.watcher.isAboveViewport,
					isBelowViewport: this.watcher.isBelowViewport,
					isFullyInViewport: this.watcher.isFullyInViewport
				});
			};

			this.watcher.on('stateChange', updateState);

			this.listeners = {};

			scrollMonitor.eventTypes.forEach(type => {
				if (props[type]) {
					this.listeners[type] = () => this.props[type](this.watcher, this.props);
					this.watcher.on(type, this.listeners[type]);
				}
			});

			updateState();
		}

		componentDidMount () {
			if (this.props.autoStart) {
				this.startWatcher();
			}

			if (this.props.innerRef) {
				this.props.innerRef(this.watcher.watchItem, this.watcher, this.props);
			}
		}

		componentWillReceiveProps (nextProps) {
			if (this.props.scrollContainer !== nextProps.scrollContainer) {
				this.stopWatcher();
				this.startWatcher(nextProps);
			}

			if (this.props.offsets !== nextProps.offsets) {
				Object.assign(this.watcher.offsets, nextProps.offsets);
				this.watcher.update();
				this.watcher.triggerCallbacks();
			}

			scrollMonitor.eventTypes.forEach(type => {
				if (nextProps[type] && !this.props[type]) {
					this.listeners[type] = () => this.props[type](this.watcher);
					this.watcher.on(type, this.listeners[type]);
				} else if (!nextProps[type] && this.props[type]) {
					this.watcher.off(type, this.listeners[type]);
				}
			});
		}

		componentWillUnmount () {
			this.stopWatcher();
		}

		lockWatcher = () => {
			if (this.watcher) {
				this.watcher.lock();
			}
		};

		unlockWatcher = () => {
			if (this.watcher) {
				this.watcher.unlock();
			}
		};

		startWatcher = (props = this.props) => {
			if (!this.watcher) {
				this.createWatcher(props);
			}
		};

		stopWatcher = () => {
			if (this.watcher) {
				this.watcher.destroy();
				this.watcher = null;
			}
		};

		render () {
			return (<Component
				isInViewport={this.state.isInViewport}
				isAboveViewport={this.state.isAboveViewport}
				isBelowViewport={this.state.isBelowViewport}
				isFullyInViewport={this.state.isFullyInViewport}
				lockWatcher={this.lockWatcher}
				unlockWatcher={this.unlockWatcher}
				startWatcher={this.startWatcher}
				stopWatcher={this.stopWatcher}
				{...this.props}
			>
				{this.props.children}
			</Component>);
		}
	}
	return hoistStatics(WatchedComponent, Component);
};
