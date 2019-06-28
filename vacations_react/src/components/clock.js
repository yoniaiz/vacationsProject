import React, { Component } from 'react';
class Clock extends Component {
	constructor(props) {

		super(props)
		
		this.state = {
            time: new Date(),
            today:''
		}
		
	}
	
	componentDidMount() {
        setInterval(this.update, 1000)
        let today = new Date();
		let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        this.setState({today:mm + '/' + dd + '/' + yyyy});
	}
	
	update = () => {
		this.setState({
			time: new Date()
		})
		
	};
	
	render() {	
		const h = this.state.time.getHours()
		const m = this.state.time.getMinutes()
		const s = this.state.time.getSeconds()
		return (
			<div>{this.state.today} {h}:{(m < 10 ? '0' + m : m)}:{(s < 10 ? '0' + s : s)} {h < 12 ? 'am' : 'pm'} </div>
		)
		
	}
	
}

export default Clock;
