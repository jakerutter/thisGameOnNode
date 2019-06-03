
//This button displays a counter that iterates once each time clicked
class Button extends React.Component {
state = { counter: 0};

handleClick = () => {
	// this === component instance
  this.setState({
  	counter: this.state.counter + 1
  })
};

render() {
return (
		<button onClick={this.handleClick}>
			{this.state.counter}
		</button>
		);
	}
}

ReactDOM.render(<Button />, mountNode);
