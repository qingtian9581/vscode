import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';
const moneynames = {
    ren:'人民币',
    mei:'美元'
}
class Money extends React.Component {
    constructor(props){
        super(props);
        this.handlechange = this.handlechange.bind(this);
    }
    handlechange(e){
        this.props.onmoneychange(e.target.value);
    }
    render(){
        const moneyname = this.props.moneyname;
        const moneycount = this.props.moneycount;
        return (
            <fieldset>
            <div>我是{moneynames[moneyname]}
            <input value = {moneycount} onChange = {this.handlechange}/>
            </div>
            </fieldset>
        );
    }
       
    
}
function ToMei (ren){
    return (ren/6);
}
function ToRen (mei){
    return (mei*6);
}
function tryCovert(moneycount,covert){
    const input = parseFloat(moneycount);
    if (Number.isNaN(input)) {
        return '';
      }
    const output = covert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}
class Moneychange extends React.Component {
    constructor(props){
        super(props);
        this.handleRenChange = this.handleRenChange.bind(this);
        this.handleMeiChange = this.handleMeiChange.bind(this);
        this.state = {bizhong:'ren',moneycount:''};
    }
    handleRenChange(moneycount){
        this.setState({bizhong:'ren',moneycount})
    }
    handleMeiChange(moneycount){
        this.setState({bizhong:'mei',moneycount})
    }
    render(){
        const bizhong = this.state.bizhong;
        const moneycount = this.state.moneycount;
        const ren = (bizhong ==='mei'?tryCovert(moneycount,ToMei):moneycount);
        const mei = (bizhong ==='ren'?tryCovert(moneycount,ToRen):moneycount);
        return (
            <div>
            <Money moneyname = 'ren' moneycount = {ren} 
            onmoneychange = {this.handleRenChange}/>
            <Money moneyname = 'mei' moneycount = {mei} 
            onmoneychange = {this.handleMeiChange}/>
        </div>
        );
        
    }
}
ReactDOM.render(
    <Moneychange/>,
    document.getElementById('root')
)
registerServiceWorker();
