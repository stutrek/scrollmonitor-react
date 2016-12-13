# ScrollMonitor-React

This is a React component that provides an API to the [scrollMonitor](https://github.com/stutrek/scrollMonitor).

It can call methods when a watched element enters or exits the viewport and adds `isInViewport`, `isAboveViewport`, `isBelowViewport`, and `isFullyInViewport` to `this.props`.

## Usage

Include it in your project

```
npm install scrollmonitor-react
```

Then use it to wrap your own component.

```javascript
import React from 'react';
import { Watch, ScrollContainer } from 'scrollmonitor-react';

export default Watch(class MyComponent extends React.Component {

	// This part is optional, see Locking on the scrollMonitor's readme.
	componentWillReceiveProps (props) {
		if (props.watcherShouldLock) {
			this.props.lockWatcher();
		} else {
			this.props.unlockWatcher();
		}
	}

	render () {
		var text;
		if (this.props.isInViewport) {
			text = 'I AM in the viewport!';
		} else {
			text = 'You will never see this because it gets replaced when it enters the viewport.'
		}

		return (<span>{text}</span>);
	}
});
```

You can also pass methods with the scrollMonitor event names as props to your component.

```javascript
import React from 'react';

import MyComponent from './the/example/above';

export default MyParentComponent extends React.Component {
	
	receiveStateChange (watcher) {
		console.log('state changed!', watcher)
	}

	render () {
		return (<MyComponent stateChange={this.receiveStateChange} />)
	}
}
```

If you have a scroll container, use the scroll container component.

```javascript
import React from 'react';
import { render } from 'react-dom';
import { ScrollContainer, Watch } from 'scrollmonitor-react/index';

// Your component works just like it does above
class Box extends React.Component {
	render () {
		var style = {}
		if (this.props.isAboveViewport) {
			style.backgroundColor = '#ffc';
		} else if (this.props.isBelowViewport) {
			style.backgroundColor = '#ccf';
		}

		return (<span className="box" style={style}>{this.props.children}</span>);
	}
}

var WatchedBox = Watch(Box);

// Your container gets this.props.scrollContainer, which it must pass to the child components.
var Container = ScrollContainer(ContainerComponent extends React.Component {
	render () {
		i = 1;
		return (<div className="container-scroll">
			<WatchedBox scrollContainer={this.props.scrollContainer}>{i++}</WatchedBox>
			<WatchedBox scrollContainer={this.props.scrollContainer}>{i++}</WatchedBox>
			<WatchedBox scrollContainer={this.props.scrollContainer}>{i++}</WatchedBox>
			<WatchedBox scrollContainer={this.props.scrollContainer}>{i++}</WatchedBox>
			<WatchedBox scrollContainer={this.props.scrollContainer}>{i++}</WatchedBox>
			<WatchedBox scrollContainer={this.props.scrollContainer}>{i++}</WatchedBox>
			<WatchedBox scrollContainer={this.props.scrollContainer}>{i++}</WatchedBox>
			<WatchedBox scrollContainer={this.props.scrollContainer}>{i++}</WatchedBox>
			<WatchedBox scrollContainer={this.props.scrollContainer}>{i++}</WatchedBox>
			<WatchedBox scrollContainer={this.props.scrollContainer}>{i++}</WatchedBox>
			<WatchedBox scrollContainer={this.props.scrollContainer}>{i++}</WatchedBox>
			<WatchedBox scrollContainer={this.props.scrollContainer}>{i++}</WatchedBox>
			<WatchedBox scrollContainer={this.props.scrollContainer}>{i++}</WatchedBox>
			<WatchedBox scrollContainer={this.props.scrollContainer}>{i++}</WatchedBox>
			<WatchedBox scrollContainer={this.props.scrollContainer}>{i++}</WatchedBox>
			<WatchedBox scrollContainer={this.props.scrollContainer}>{i++}</WatchedBox>
			<WatchedBox scrollContainer={this.props.scrollContainer}>{i++}</WatchedBox>
			<WatchedBox scrollContainer={this.props.scrollContainer}>{i++}</WatchedBox>
			<WatchedBox scrollContainer={this.props.scrollContainer}>{i++}</WatchedBox>
			<WatchedBox scrollContainer={this.props.scrollContainer}>{i++}</WatchedBox>
			<WatchedBox scrollContainer={this.props.scrollContainer}>{i++}</WatchedBox>
			<WatchedBox scrollContainer={this.props.scrollContainer}>{i++}</WatchedBox>
		</div>);
	}
}
```


