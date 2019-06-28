import React, { Component } from "react";
import { BarChart, Bar, XAxis, YAxis,Tooltip, Legend, CartesianGrid } from 'recharts';
import axios from 'axios'
import {Link} from "react-router-dom";
class Chart extends Component {
    state = {
        vacations : []
    }
    componentDidMount = async () => {
        let vacations = await axios.get('http://localhost:8080/getVacationChart')
        let chartVacations = vacations.data.map(vac => {
            let newVac = {
                name: vac.name,
                Followers: vac.num,
                pv:2400,
                amt:2400
            }
            return newVac;
        })
        this.setState({vacations:chartVacations});
        
    }

    render(){
        var centerCon = {
            height: '100%',
            width:'100vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }
        var w = window.innerWidth - (window.innerWidth/10);
        var h = window.innerHeight - (window.innerHeight/10);

        return(
            <div className='container' style={centerCon}>
                <BarChart width={w} height={h} data={this.state.vacations}>
                 <XAxis dataKey="name" stroke="#8884d8" />
                    <YAxis />
                    <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
                    <Legend width={100} wrapperStyle={{ top: 40, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <Bar type="monotone" dataKey="Followers" fill="#8884d8" barSize={30} />
                </BarChart>
                <Link className='p-0 m-0' to="/"><button className='btn btn-outline-primary btn-block' style={{top:'92vh',width:'98vw'}}>Back</button></Link>
          </div>
        )
    }
}
export default Chart