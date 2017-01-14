'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Watch = exports.ScrollContainer = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _scrollmonitor = require('scrollmonitor');

var _scrollmonitor2 = _interopRequireDefault(_scrollmonitor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScrollContainer = exports.ScrollContainer = function ScrollContainer(Component) {
	return function (_React$Component) {
		_inherits(ScrollMonitorContainer, _React$Component);

		function ScrollMonitorContainer() {
			_classCallCheck(this, ScrollMonitorContainer);

			var _this = _possibleConstructorReturn(this, (ScrollMonitorContainer.__proto__ || Object.getPrototypeOf(ScrollMonitorContainer)).call(this));

			_this.state = {
				container: null
			};
			return _this;
		}

		_createClass(ScrollMonitorContainer, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				var el = _reactDom2.default.findDOMNode(this);
				var container = _scrollmonitor2.default.createContainer(el, this.props.offsets);
				this.setState({
					scrollContainer: container
				});
			}
		}, {
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					Component,
					_extends({
						scrollContainer: this.state.scrollContainer
					}, this.props),
					this.props.children
				);
			}
		}]);

		return ScrollMonitorContainer;
	}(_react2.default.Component);
};

var Watch = exports.Watch = function Watch(Component) {
	var lazy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	return function (_React$Component2) {
		_inherits(WatchedComponent, _React$Component2);

		function WatchedComponent() {
			_classCallCheck(this, WatchedComponent);

			var _this2 = _possibleConstructorReturn(this, (WatchedComponent.__proto__ || Object.getPrototypeOf(WatchedComponent)).call(this));

			_this2.lockWatcher = function () {
				_this2.watcher.lock();
			};

			_this2.unlockWatcher = function () {
				_this2.watcher.unlock();
			};

			_this2.initWatcher = function () {
				if (lazy && !_this2.watcher) {
					_this2.createWatcher(_this2.props);
				}
			};

			_this2.destroyWatcher = function () {
				if (lazy && _this2.watcher) {
					_this2.watcher.destroy();
				}
			};

			_this2.state = {
				isInViewport: false,
				isAboveViewport: false,
				isBelowViewport: false,
				isFullyInViewport: false
			};
			return _this2;
		}

		_createClass(WatchedComponent, [{
			key: 'createWatcher',
			value: function createWatcher(props) {
				var _this3 = this;

				var el = _reactDom2.default.findDOMNode(this);
				this.watcher = (props.scrollContainer || _scrollmonitor2.default).create(el, props.offsets);

				var updateState = function updateState() {
					_this3.setState({
						isInViewport: _this3.watcher.isInViewport,
						isAboveViewport: _this3.watcher.isAboveViewport,
						isBelowViewport: _this3.watcher.isBelowViewport,
						isFullyInViewport: _this3.watcher.isFullyInViewport
					});
				};

				this.watcher.on('stateChange', updateState);

				this.listeners = {};

				_scrollmonitor2.default.eventTypes.forEach(function (type) {
					if (props[type]) {
						_this3.listeners[type] = function () {
							return _this3.props[type](_this3.watcher);
						};
						_this3.watcher.on(type, _this3.listeners[type]);
					}
				});

				updateState();
			}
		}, {
			key: 'componentDidMount',
			value: function componentDidMount() {
				if (!lazy) {
					this.createWatcher(this.props);
				}
			}
		}, {
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(nextProps) {
				var _this4 = this;

				if (this.props.scrollContainer !== nextProps.scrollContainer) {
					this.watcher.destroy();
					this.createWatcher(nextProps);
				}

				_scrollmonitor2.default.eventTypes.forEach(function (type) {
					if (nextProps[type] && !_this4.props[type]) {
						_this4.listeners[type] = function () {
							return _this4.props[type](_this4.watcher);
						};
						_this4.watcher.on(type, _this4.listeners[type]);
					} else if (!nextProps[type] && _this4.props[type]) {
						_this4.watcher.off(type, _this4.listeners[type]);
					}
				});
			}
		}, {
			key: 'componentWillUnmount',
			value: function componentWillUnmount() {
				this.watcher.destroy();
			}
		}, {
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					Component,
					_extends({}, this.props, {
						isInViewport: this.state.isInViewport,
						isAboveViewport: this.state.isAboveViewport,
						isBelowViewport: this.state.isBelowViewport,
						isFullyInViewport: this.state.isFullyInViewport,
						lockWatcher: this.lockWatcher,
						unlockWatcher: this.unlockWatcher,
						initWatcher: this.initWatcher,
						destroyWatcher: this.destroyWatcher
					}),
					this.props.children
				);
			}
		}]);

		return WatchedComponent;
	}(_react2.default.Component);
};
//# sourceMappingURL=index.js.map