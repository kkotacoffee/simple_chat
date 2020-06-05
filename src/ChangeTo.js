import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeTo } from './Store';

// ほめる相手を変更するためのコンポーネント

class ChangeTo extends Component {

  constructor(props){
    super(props);
    this.state = {
      number: 0   // デフォルトのほめる相手の番号
    }
    this.doChange = this.doChange.bind(this);
  }

  style = {
    paddingLeft : "90px",
    paddingBottom : "10px"
  }

  doChange(e){    // selectが押されるたびに行われる
    let element = document.getElementById("targetto");
    let now = element.value;
    let action = changeTo(now);
    this.props.dispatch(action);
  }

  render() {

    let n = 0;
    let items = this.props.data.map((value) => (
      <option key={n} value={n++}>{value.name}</option>
    ));

    return (
        <div style = {this.style}>
            <select id = "targetto" onClick = {this.doChange} defaultValue = "-1">
                {items}
            </select>
        </div>
    )
  }
}

export default connect((state) => state)(ChangeTo);