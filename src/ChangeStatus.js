import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeNow } from './Store';

// 使用中のユーザーを変更するためのコンポーネント

class ChangeStatus extends Component {

  style = {
    paddingLeft : "90px",
    paddingBottom : "10px"
  }

  constructor(props){
    super(props);
    this.state = {
        number: 0   // デフォルトのユーザーの番号
    }
    this.doChange = this.doChange.bind(this);
  }
  
  doChange(e){    // selectが押されるたびに行われる
    let element = document.getElementById("targetnow");
    let now = element.value;
    let action = changeNow(now);
    this.props.dispatch(action);
  }

  render() {

    let n = 0;
    let items = this.props.data.map((value) => (
      <option key={n} value={n++}>{value.name}</option>
    ));

    return (
        <div style = {this.style}>
            <select id = "targetnow" onClick = {this.doChange} defaultValue = "-1">
                {items}
            </select>
        </div>
    )
  }
}

export default connect((state) => state)(ChangeStatus);