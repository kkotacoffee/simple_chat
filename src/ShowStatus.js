import React, { Component } from 'react';
import { connect } from 'react-redux';
import ShowImage from './ShowImage';

// 現在のユーザーの情報を表示するコンポーネント

class ShowStatus extends Component {

  imgstyle = {
    width: "150px",
    height : "150px",
    paddingLeft : "50px",
    paddingTop : "10px"
  }

  h1style = {
    paddingTop : "50px",
    paddingLeft : "50px"
  }

  divstyle = {
    display: "flex",
  }

  render() {

    let num = this.props.now;

    return (
        <div className = "container" style = {this.divstyle}>
          <main>
            <ShowImage num = {this.props.now} style = {this.imgstyle}/>
          </main>
          <aside>
            <h1 style = {this.h1style}>
              拍手できる : {this.props.data[num].have} 拍手された数 : {this.props.data[num].given}
            </h1>
          </aside>
        </div>
    );
  }
}

export default connect((state) => state)(ShowStatus);