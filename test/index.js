import React from 'react';
import { render } from 'react-dom';
import { ScrollContainer, Watch } from 'scrollmonitor-react/index';

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

class ContainerComponent extends React.Component {
	render () {
		console.log('in here', this);
		var boxes = (new Array(500)).join().split(',').map((a, i) => (<WatchedBox key={i} scrollContainer={this.props.scrollContainer}>{i}</WatchedBox>));
		return (<div className="container-scroll">{boxes}</div>);
	}
}

var WatchedBox = Watch(Box);
var Container = ScrollContainer(ContainerComponent);


var boxes = (new Array(500)).join().split(',').map((a, i) => (<WatchedBox key={i}>{i}</WatchedBox>));
console.log(boxes);
const App = () => (<div>
  <h1>scrollmonitor-react test</h1>
  <div className="body-scroll">{boxes}</div>
  <Container />
</div>);

render(<App />, document.getElementById('root'));
