'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

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

exports.default = function (Component) {
	return function (_React$Component) {
		_inherits(WatchedComponent, _React$Component);

		function WatchedComponent() {
			_classCallCheck(this, WatchedComponent);

			var _this = _possibleConstructorReturn(this, (WatchedComponent.__proto__ || Object.getPrototypeOf(WatchedComponent)).call(this));

			_this.state = {
				isInViewport: false,
				isAboveViewport: false,
				isBelowViewport: false,
				isFullyInViewport: false
			};
			return _this;
		}

		_createClass(WatchedComponent, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				var _this2 = this;

				var el = _reactDom2.default.findDOMNode(this);
				this.watcher = (this.props.scrollMonitor || _scrollmonitor2.default).create(el, this.props.offsets);

				this.watcher.on('stateChange', function () {
					_this2.setState({
						isInViewport: _this2.watcher.isInViewport,
						isAboveViewport: _this2.watcher.isAboveViewport,
						isBelowViewport: _this2.watcher.isBelowViewport,
						isFullyInViewport: _this2.watcher.isFullyInViewport
					});
				});

				this.listeners = {};

				_scrollmonitor2.default.eventTypes.forEach(function (type) {
					if (_this2.props[type]) {
						_this2.listeners[type] = function () {
							return _this2.props[type](_this2.watcher);
						};
						_this2.watcher.on(type, _this2.listeners[type]);
					}
				});
			}
		}, {
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(props) {
				var _this3 = this;

				_scrollmonitor2.default.eventTypes.forEach(function (type) {
					if (props[type] && !_this3.props[type]) {
						_this3.listeners[type] = function () {
							return _this3.props[type](_this3.watcher);
						};
						_this3.watcher.on(type, _this3.listeners[type]);
					} else if (!props[type] && _this3.props[type]) {
						_this3.watcher.off(type, _this3.listeners[type]);
					}
				});
			}
		}, {
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					Component,
					_extends({
						isInViewport: this.state.isInViewport,
						isAboveViewport: this.state.isAboveViewport,
						isBelowViewport: this.state.isBelowViewport,
						isFullyInViewport: this.state.isFullyInViewport
					}, this.props),
					this.props.children
				);
			}
		}]);

		return WatchedComponent;
	}(_react2.default.Component);
};