import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { clap } from "./Store";
import ShowImage from './ShowImage';

// 投稿を構成するコンポーネント

class Item extends Component {

    constructor(props){
        super(props);
        this.doAction = this.doAction.bind(this);
        this.inAction = this.inAction.bind(this);
        this.outAction = this.outAction.bind(this);
    }

    fromstyle = {
        width: "100px",
        height : "100px",
        marginLeft: "20px",
        marginTop: "20px"
    }

    tostyle = {
        width: "100px",
        height : "100px",
        marginTop: "20px"
    }

    arrowstyle = {
        width: "100px",
        height : "100px",
        marginTop: "20px"
    }

    msgstyle = {
        marginTop:"20px",
        marginLeft:"50px",
        marginBottom: "20px",
        marginRight: "50px"
    }

    datestyle = {
        marginLeft: "300px",
        marginRight: "50px"
    }

    boxstyle = {
        display: "flex"
    }

    clapstyle = {
        width: "25px",
        height : "25px",
        marginLeft: "50px",
        marginRight: "50px"
    }

    clapperstyle = {
        backgroundColor: "orange",
        color : "white"
    }
    
    doAction(e){        // 拍手ボタンが押されるたびに行われる
        let now = this.props.now;
        let from = this.props.value.from;
        let to = this.props.value.to;
        let id = this.props.index;

        if(now === from || now === to){

            alert("投稿に関する方は拍手できません。");

        }else if(this.props.data[now].have < 2){

            alert("ポイントが足りません。");

        }else if(this.props.item[id].clapped[now]){

            if(15 <= this.props.item[id].clapped[now]){
                alert("１投稿に拍手できるのは最大１５回です。");
            }else{
                let action = clap(to,from,id);
                this.props.dispatch(action);
            }

        }else{
            let action = clap(to,from,id);
            this.props.dispatch(action);
        }
    }

    inAction(e){        // 拍手数をマウスホバーするたびに行われる

        let id = this.props.index;
        let dom = document.querySelector(`#add${id}`);
        let clapper = Object.entries(this.props.item[id].clapped);

        clapper.sort(function(a,b){return b[1] - a[1];});

        let data = clapper.map((value) => (
            <p>{this.props.data[value[0]].name}: {value[1]}</p>
        ));

        let show = (
            <div style = {this.clapperstyle}>
                {data}
            </div>
        );

        ReactDOM.render(show, dom);
    }

    outAction(e){       // マウスが拍手数から外れるたびに行われる
        let id = this.props.index;
        let dom = document.querySelector(`#add${id}`);
        let element = "";

        ReactDOM.render(element, dom);
    }

  render() {

    let ID = this.props.index;
    ID = `add${ID}`;

    return (
        <tbody>
            
            <tr>
                <td>
                    <div className = "box" style = {this.boxstyle}>
                    <div><ShowImage num = {this.props.value.from} style={this.fromstyle}/></div>
                    <div><img src={`${process.env.PUBLIC_URL}/images/arrow.jpg`} alt="arrow"  style={this.arrowstyle}/></div>
                    <div><ShowImage num = {this.props.value.to} style={this.tostyle}/></div>
                </div>
                </td>
            </tr>
            
            <tr>
                <td>
                    <div style = {this.msgstyle}>
                        {this.props.value.message}
                    </div>
                </td>
            </tr>

            <tr>
                <td>
                    <div className = "box" style = {this.boxstyle}>
                    <div><input type = "image" src = {`${process.env.PUBLIC_URL}/images/clap.jpg`} 
                    style = {this.clapstyle} alt = "clap" onClick = {this.doAction}/></div>
                    <div onMouseEnter = {this.inAction} onMouseOut={this.outAction}>{this.props.value.sum}</div>
                    <div id = {ID}></div>
                    <div style = {this.datestyle}>
                        {this.props.value.created}
                    </div>
                </div>
                </td>
            </tr>

            <tr>
            <td>
                --------------------------------------------------------------------------------------------------
                </td>
            </tr>
               
        </tbody>
    );
  }
}

export default connect((state) => state)(Item);