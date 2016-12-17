# ScrollMonitor-React

This is a React component that provides an API to the [scrollMonitor](https://github.com/stutrek/scrollMonitor). It lets you create both watchers and scroll containers.

It adds all the boolean properties from a watcher to `this.props` and takes all the method properties as properties.

Scrollmonitor-react is two higher order components. They're functions that your pass an original component and receive a new component that adds functionality to the original.

## Basic Usage

### Knowing when you're in the viewport
```javascript
import React from 'react';
import { Watch } from 'scrollmonitor-react';

export default Watch(class MyComponent extends React.Component {

	render () {
		var text;
		if (this.props.isInViewport) {
			text = 'I AM in the viewport!';
		} else {
			text = 'You will never see this because it gets replaced when it enters the viewport.'
		}

		return (<span>
			{text}
			{this.props.children}
		</span>);
	}
});
```
### Doing something when it enters or exits the viewport

Provide methods with the scrollMonitor event names as props to your component.

```javascript
import React from 'react';

import MyWatchedComponent from './the/example/above';

export default MyParentComponent extends React.Component {
	
	receiveStateChange (watcher) {
		console.log('state changed!', watcher)
	}

	render () {
		return (<MyWatchedComponent stateChange={this.receiveStateChange} />)
	}
}
```

## API

### `this.props` provided to your component

* `this.props.isInViewport` - true if any part of the element is visible, false if not.
* `this.props.isFullyInViewport` - true if the entire element is visible [1].
* `this.props.isAboveViewport` - true if any part of the element is above the viewport
* `this.props.isBelowViewport` - true if any part of the element is below the viewport.

_1. If the element is larger than the viewport `isFullyInViewport` is true when the element spans the entire viewport._

### Propeties you provide to the component

```javascript
<MyWatchedComponent
	stateChange={() => {}} // Called when any part of the state changes.
	visibilityChange={() => {}} // when the element partially enters or fully exits the viewport.
	enterViewport={() => {}} // when the element enters the viewport.
	fullyEnterViewport={() => {}} // when the element is completely in the viewport [1].
	exitViewport={() => {}} // when the element completely leaves the viewport.
	partiallyExitViewport={() => {}} // when the element goes from being fully in the viewport to only partially [2]
>
	<h1>Child components are fine too.</h1>
</MyWatchedComponent>
```

_1. If the element is larger than the viewport `fullyEnterViewport` will be triggered when the element spans the entire viewport._  
_2. If the element is larger than the viewport `partiallyExitViewport` will be triggered when the element no longer spans the entire viewport._

## Scroll Containers

The `ScrollContainer` HOC lets you create scrollMonitor Scroll Containers. It provides a scroll container on `this.props` that it must pass to its children.

```javascript
import React from 'react';
import { render } from 'react-dom';
import { ScrollContainer } from 'scrollmonitor-react';

import MyWatchedContainer from 'the/example/above';

// Your container gets this.props.scrollContainer, which it must pass to the child components.
var Container = ScrollContainer(ContainerComponent extends React.Component {
	render () {
		i = 1;
		return (<div className="container-scroll">
			<MyWatchedContainer scrollContainer={this.props.scrollContainer}>{i++}</MyWatchedContainer>
			{...times a million}
		</div>);
	}
}
```


