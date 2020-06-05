import React, { Component } from 'react';
import { connect } from 'react-redux';
import Item from './Item';

// 投稿一覧を表示するコンポーネント

class ShowItem extends Component {

  render() {

    let n = 0;

    let items = this.props.item.map((value) => (
        <Item value = {value} key = {n} index = {n++}></Item>
    ));
    
    return (
        <table>{items}</table>
    );
  }
}

export default connect((state) => state)(ShowItem);