import React, {Component} from 'react';
import Registration from './pages/Registration'
import Main from './pages/MainPage'
import Chart from './pages/Chart'
import {BrowserRouter, Route} from 'react-router-dom';
import axios from 'axios'


class App extends Component {

    state = {
        check: 3
    }
    componentDidMount = async() => {
        let check = await axios.get(`http://localhost:8080/rememberd`, {withCredentials: true})
        await this.setState({check: check.data.remembrd})
    }

    render() {
        return (
            <BrowserRouter>
                <Route path='/' exact component={Main}/>
                <Route path='/registration/:login' component={Registration}/>
                <Route path='/chart' component={Chart}/>
            </BrowserRouter>
        //  <BrowserRouter>
        // {(this.state.check==='1'||localStorage.getItem('user'))?<Main></Main>:<Registr
        // ation></Registration>}  </BrowserRouter>
        );
    }
}

export default App;
