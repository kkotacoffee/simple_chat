import { createStore } from 'redux';

const initData = {
    now: 0,     // 現在のユーザー
    to: 0,      // ほめる相手
    data: [     // ユーザー一覧
        {name: 'nakaoka', have:100, given:0},
        {name: 'hirota', have:100, given:0},
        {name: 'taro', have:100, given:0},
        {name: 'kotaro', have:100, given:0}
    ],
    item: [],       // 投稿一覧
};

export function wholeReducer(state = initData, action) {
    
    switch(action.type){

        case 'CHANGE':      // 現在のユーザーの変更
            return changeReduce(state,action);

        case 'CHANGETO':    // ほめる相手の変更
            return changetoReduce(state,action);

        case 'CLAP':        // 投稿への拍手
            return clapReduce(state,action);

        case 'ADD':         // 投稿
            return addReduce(state,action);

        default:
            return state;

    }
}

function changeReduce(state, action){
    let newperson = action.number;

    return {
        now: newperson,
        to: state.to,
        data: state.data,
        item: state.item
    };
}

function changetoReduce(state, action){
    let newto = action.number;

    return {
        now: state.now,
        to: newto,
        data: state.data,
        item: state.item
    };
}

function clapReduce(state, action){
    let now = state.now;
    let to = action.to;
    let from = action.from;
    let newdata = state.data.slice();
    let newitem = state.item.slice();
    let id = action.id;

    newdata[now].have -= 2;
    newdata[from].given++;
    newdata[to].given++;

    if(newitem[id].clapped[now]){     // 投稿の拍手一覧を更新
        newitem[id].clapped[now]++;
    }else{
        newitem[id].clapped[now] = 1;
    }

    newitem[id].sum++;

    return {
        now: state.now,
        to: state.to,
        data: newdata,
        item: newitem
    };
}

function addReduce(state, action){

    let d = new Date();
    let h = d.getHours();
    let m = d.getMinutes();

    if(h < 10){
        h = `0${h}`;
    }

    if(m < 10){
        m = `0${m}`;
    }

    let f = `${d.getFullYear()}/${d.getMonth()}/${d.getDate()} ${h}:${m}`
   
    let item = {
        message: action.message,    // メッセージ本文
        from: state.now,            // ほめた人
        to: state.to,               // ほめられた人
        created: f,                 // 作成日時
        clapped: {},                // 拍手をしたひとと拍手数
        sum: 0                      // 拍手数の合計
    };

    let newitem = state.item.slice();
    newitem.unshift(item);

    return {
        now: state.now,
        to: state.to,
        data: state.data,
        item: newitem
    };
}

export function changeNow(num) {
    return {
        type: "CHANGE",
        number: num
    };
}

export function changeTo(num) {
    return {
        type: "CHANGETO",
        number: num
    };
}

export function clap(to,from,id) {
    return {
        type: "CLAP",
        to: to,
        from: from,
        id: id
    };
}

export function add(message) {
    return {
        type: "ADD",
        message: message,
    };
}

export default createStore(wholeReducer);