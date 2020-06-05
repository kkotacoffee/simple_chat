import React, { Component } from 'react';
import { connect } from 'react-redux';
import { add } from './Store';
import ShowImage from './ShowImage';

class AddItem extends Component {

  constructor(props){
    super(props);
    this.state = {
        message: ''
    }
    this.doChange = this.doChange.bind(this);
    this.doAction = this.doAction.bind(this);
  }

  imgstyle = {
    width: "150px",
    height : "150px",
    paddingLeft: "50px",
    paddingTop: "30px"
  }

  divstyle = {
    display: "flex"
  }

  formstyle = {
    paddingTop : "50px",
    paddingLeft : "50px"
  }

  textstyle = {
    width : "300px",
    padding : "50px"
  }

  inputstyle = {
    fontSize: "15pt",
  }

  doChange(e){
    this.setState({
      message: e.target.value
    });
  }

  doAction(e){
    e.preventDefault();
    if(5 <= this.state.message.length){
      let action = add(this.state.message);
      this.props.dispatch(action);
      this.setState({
        message: ''
      });
    }else{
      alert("5文字以上入力してください");
    }
  }

  render() {

    return (
        <div style = {this.divstyle}>
          <main>
          <ShowImage num = {this.props.to} style={this.imgstyle}></ShowImage>
          </main>
          <aside>
          <form onSubmit = {this.doAction} style = {this.formstyle}>
            <textarea onChange={this.doChange} style={this.inputstyle}
            value = {this.state.message} cols = "40" rows = "5" required/>
            <input type = "submit" value="投稿"></input>
          </form>
          </aside>
        </div>
    );
  }
}

export default connect((state) => state)(AddItem);