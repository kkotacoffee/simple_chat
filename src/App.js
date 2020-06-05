import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.css';
import ShowStatus from './ShowStatus.js';
import ChangeStatus from './ChangeStatus';
import ChangeTo from './ChangeTo';
import ShowItem from './ShowItem';
import AddItem from './AddItem';

class App extends Component {

  statusstyle = {
    backgroundColor: "lightBlue"
  }

  tostyle = {
    backgroundColor: "lightGray"
  }

  render() {
    return (
      <div>
        <div style = {this.statusstyle}>
        <ShowStatus></ShowStatus>
        <ChangeStatus></ChangeStatus>
        </div>
        <div style = {this.tostyle}>
        <AddItem></AddItem>
        <ChangeTo></ChangeTo>
        </div>
        <ShowItem></ShowItem>
      </div>
    );
  }
}

export default connect((state) => state)(App);