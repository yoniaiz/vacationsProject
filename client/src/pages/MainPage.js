import React, { Component } from "react";
import axios from "axios";
import socketIOClient from "socket.io-client";

import Navbar from "../components/Navbar";
import CardV from "../components/CardV";
import { Redirect } from "react-router-dom";
import AddButton from "../components/AddButton";

import { User, host } from "../User";

import "../styles/mainPageStyle.css";
import { Background } from "../styles/Background.js";

import MyModal from "../components/MyModal";
class MainPage extends Component {
  state = {
    vications: [],
    user: new User(),
    userStr: "",
    redirect: false,
    modal: null,
    host: host
  };

  options = {
    params: {
      first_name: this.state.user.first_name,
      password: this.state.user.password
    },
    withCredentials: true
  };

  componentDidMount = async () => {
    let log = await axios.get(`${this.state.host}/rememberd`, this.options);
    let user;
    if (
      log.data.remembrd === "1" ||
      log.data.session ||
      localStorage.getItem("user")
    ) {
      const socket = socketIOClient(this.state.host);
      socket.on("cardsChanged", () => {
        this.getCards();
      });
      if (log.data.remembrd === "1") {
        user = JSON.parse(log.data.user)[0];
        this.setState({ userStr: log.data.user });
      } else if (log.data.session) {
        user = JSON.parse(log.data.session)[0];
        this.setState({ userStr: log.data.session });
      } else {
        user = JSON.parse(localStorage.getItem("user"));
        this.setState({ userStr: log.data.session });
        localStorage.clear();
      }

      await this.setState({ user });
      this.options.params.first_name = user.first_name;
      this.options.params.password = user.password;
      this.getCards();
    } else this.setState({ redirect: true });
  };

  getCards = async () => {
    const response = await axios.get(`${this.state.host}/getVacations`);
    const responseLiked = await axios.get(
      `${this.state.host}/getLikedVacations`,
      this.options
    );
    this.displayCards(response.data, responseLiked.data);
  };

  likeVication = async id => {
    this.options.params.vicationId = id;
    let answer = await axios.get(`${this.state.host}/likedVic`, this.options);
    if (answer) {
      this.getCards();
      this.sendEmit("like");
    }
  };

  showModal = async card => {
    await this.setState({
      modal: (
        <MyModal
          card={{
            ...card
          }}
          hide={this.hideModal}
          show={true}
        />
      )
    });
  };

  hideModal = async card => {
    await this.setState({
      modal: <MyModal card={{}} hide={this.hideModal} show={false} />
    });
    await this.setState({ modal: null });
    const response = await axios.get(`${this.state.host}/updateVic`, {
      params: {
        vic: card
      }
    });
    if (response) {
      this.getCards();
      this.sendEmit("cardsChanged");
    }
  };

  deleteVic = async id => {
    const response = await axios.get(`${this.state.host}/deleteVic`, {
      params: {
        vic: id
      }
    });
    if (response) {
      this.getCards();
      this.sendEmit("cardsChanged");
    }
  };

  addCard = async (add, card) => {
    if (!add && !card) {
      this.setState({
        modal: (
          <MyModal
            card={{}}
            hide={card => this.addCard(true, card)}
            show={true}
          />
        )
      });
    } else {
      this.setState({ modal: null });
      const response = await axios.get(`${this.state.host}/addVic`, {
        params: {
          vic: card
        }
      });
      if (response.data) {
        this.getCards();
        this.sendEmit("cardsChanged");
      }
    }
  };
  ////////////////////
  displayCards = (vacations, liked) => {
    let admin = String(this.state.user.role) === "2" ? true : false; //admin cards or regular to create
    let vicationCards = vacations.map(vacation => {
      if (this.search(vacation.id, liked))
        return (
          <CardV
            deleteVic={this.deleteVic}
            modal={this.showModal}
            admin={admin}
            like={true}
            liked={this.likeVication}
            key={vacation.id}
            id={vacation.id}
            vacation={vacation}
          />
        );
      return (
        <CardV
          deleteVic={this.deleteVic}
          modal={this.showModal}
          admin={admin}
          like={false}
          liked={this.likeVication}
          key={vacation.id}
          id={vacation.id}
          vacation={vacation}
        />
      );
    });
    vicationCards.sort(this.compare); //sort cards by liked cards
    if (admin) vicationCards.push(<AddButton addCard={this.addCard} />); //add button
    this.setState({ vications: vicationCards });
  };

  compare = (a, b) => {
    if (a.props.like > b.props.like) {
      return -1;
    }
    if (a.props.like < b.props.like) {
      return 1;
    }
    return 0;
  };

  // find if exist liked cards of user
  search = (vicId, myArray) => {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].vacationId === vicId) {
        return true;
      }
    }
    return false;
  };
  // //////////////////
  logout = () => {
    const options = {
      params: {
        log: "1",
        user: this.state.userStr
      },
      withCredentials: true
    };
    axios.get(`${this.state.host}/clear`, options);
  };

  sendEmit = emitStr => {
    const socket = socketIOClient(this.state.host);
    socket.emit(emitStr);
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/registration/true" />;
    }

    var background = new Background(
      'url("/cloud.jpg") repeat center center fixed'
    );
    return (
      <div
        className="container-fluid m-0 p-0"
        style={{
          height: "100% !important",
          width: "100vw"
        }}
      >
        <div className="mymainbody p-0 m-0" style={background}>
          <Navbar
            name={this.state.user.first_name}
            logout={this.logout}
            admin={String(this.state.user.role) === "2" ? true : false}
            add={this.addCard}
          />
          <div className="container-fluid cardCon" >
            <div className="offset-xl-1 offset-lg-0 row  mt-5">
              {this.state.vications}
            </div>
          </div>
          {this.state.modal}
        </div>
      </div>
    );
  }
}
export default MainPage;
