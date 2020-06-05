import { createStore } from 'redux';

const initData = {
    now: 0,
    to: 0,
    data: [
        {name: 'kota', have:100, given:0},
        {name: 'miho', have:100, given:0},
        {name: 'kkota', have:100, given:0},
    ],
    item: [],
};

export function wholeReducer(state = initData, action) {
    
    switch(action.type){

        case 'CHANGE':
            return changeReduce(state,action);

        case 'CHANGETO':
            return changetoReduce(state,action);

        case 'CLAP':
            return clapReduce(state,action);

        case 'ADD':
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
    let msgto = action.to;
    let msgfrom = action.from;
    let newdata = state.data.slice();
    let newitem = state.item.slice();
    let id = action.id;

    newdata[state.now].have -= 2;
    newdata[msgfrom].given++;
    newdata[msgto].given++;

    if(newitem[id].clapped[state.now]){
        newitem[id].clapped[state.now]++;
    }else{
        newitem[id].clapped[state.now] = 1;
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
        message: action.message,
        from: state.now,
        to: state.to,
        created: f,
        clapped: {},
        sum: 0
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