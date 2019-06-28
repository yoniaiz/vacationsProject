import React, { Component } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import CardV from "../components/CardV";
import { Redirect } from "react-router-dom";
import AddButton from '../components/AddButton'

import {User} from '../User'

import "../styles/mainPageStyle.css" ;
import {Background} from "../styles/Background.js"


import MyModal from '../components/MyModal'
class MainPage extends Component {

  state = {
    vications: [],
    user: new User(),
    userStr:'',
    redirect : false,
    modal: null
  };

  options = {
    params: {
      first_name: this.state.user.first_name,
      password: this.state.user.password,
    },
    withCredentials: true
  }

  componentDidMount = async () => {
    let log = await axios.get(`http://localhost:8080/rememberd`,this.options);
    let user;
    if (log.data.remembrd === '1' || log.data.session || localStorage.getItem('user') ) {      
      if(log.data.remembrd === '1'){
        user = JSON.parse(log.data.user)[0]
        this.setState({userStr:log.data.user})
      }

      else if(log.data.session){
        user = JSON.parse(log.data.session)[0];
        this.setState({userStr:log.data.session})
      }

      else {
          user = JSON.parse(localStorage.getItem('user'))
          this.setState({userStr:log.data.session})
          localStorage.clear();
      }

      await this.setState({ user });
      this.options.params.first_name = user.first_name;
      this.options.params.password = user.password
      this.getCards();
    } else this.setState({redirect:true})
  };

  getCards = async () => {
    const response = await axios.get(`http://localhost:8080/getVacations`);
    const responseLiked = await axios.get(`http://localhost:8080/getLikedVacations`,this.options);
    this.displayCards(response.data , responseLiked.data);
  }

  likeVication = async (id) =>{
    this.options.params.vicationId = id;
    let answer = await axios.get(`http://localhost:8080/likedVic`,this.options);
    if(answer){
      this.getCards();
    }
    
  }

  showModal = async(card) => {
   await this.setState({modal:<MyModal card = {{...card}}  hide = {this.hideModal} show = {true}></MyModal>})
  }

  hideModal = async(card) => {
    await this.setState({modal:<MyModal card = {{}} hide = {this.hideModal} show = {false}></MyModal>})
    await this.setState({modal:null})
    const response = await axios.get(`http://localhost:8080/updateVic`,{
      params: {
          vic:card
      }
    })
    if(response)
      {
        this.getCards();
      }
   }

   deleteVic = async id => {
    const response = await axios.get(`http://localhost:8080/deleteVic`,{
      params: {
          vic:id
      }
    })
    if(response)
      {
        this.getCards();
      }
   } 

  addCard = (add,card) => {
    if(!add && !card){
      this.setState({modal:<MyModal card = {{}} hide = {(card)=>this.addCard(true,card)} show = {true}></MyModal>})
    }
      
    else {
      this.setState({modal:null})
      const response = axios.get(`http://localhost:8080/addVic`,{
        params: {
            vic:card
        }
      })
      if(response)
      {
        this.getCards();
      }
    }
      
  }
////////////////////
  displayCards = (vacations , liked) => {
    let admin = (String(this.state.user.role) === '2')? true:false; //admin cards or regular to create
    let vicationCards = vacations.map(vacation => {
      if(this.search(vacation.id,liked))
       return <CardV deleteVic={this.deleteVic} modal = {this.showModal} admin={admin} like = {true} liked={this.likeVication} key={vacation.id} id={vacation.id} vacation={vacation} />;
      return <CardV deleteVic={this.deleteVic} modal = {this.showModal} admin={admin} like = {false} liked={this.likeVication} key={vacation.id} id={vacation.id} vacation={vacation} />;
    });
    vicationCards.sort(this.compare) //sort cards by liked cards
    vicationCards.push(<AddButton addCard = {this.addCard}></AddButton>) //add button
    this.setState({ vications: vicationCards });
  };

   compare = ( a, b ) => {
    if ( a.props.like > b.props.like ){
      return -1;
    }
    if ( a.props.like < b.props.like ){
      return 1;
    }
    return 0;
  }

   // find if exist liked cards of user
   search = (vicId, myArray) => { 
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].vacationId === vicId) {
            return true
          }
      }
    return false
  }
// //////////////////
  logout = () => {
    const options = {
      params: {
        log: '1',
        user : this.state.userStr
      },
      withCredentials: true
    }
    axios.get(`http://localhost:8080/clear`,options);
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to='/registration/true'/>;
   }
   
    var background = new Background('url("/cloud.jpg") repeat center center fixed');
    return (
      <div className="container-fluid m-0 p-0" style={{height:'100% !important',width:'100vw'}}>
        <div className="mymainbody p-0 m-0" style={background}>
          <Navbar
            name={this.state.user.first_name}
            logout={this.logout}
            admin={(String(this.state.user.role) === '2')? true:false}
          />
          <div className="container-fluid " >
            <div className="offset-xl-1 offset-lg-0 row  mt-5">{this.state.vications}</div>
          </div>
          {this.state.modal}
        </div>
      </div>
    );
  }
}
export default MainPage;
