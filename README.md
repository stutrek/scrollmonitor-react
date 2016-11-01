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
import Watch from 'scrollmonitor-react';

export default Watch(class MyComponent extends React.Component {
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
