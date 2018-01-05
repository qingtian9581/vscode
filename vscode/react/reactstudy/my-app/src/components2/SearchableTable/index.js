import React,{Component} from 'react';

import SearchBar from './SeachBar';
import SearchResult from './SearchResult';
import productData from './data.json';

export default class SearchableTable extends Component {
    constructor(props){
        super(props);

        this.state={
            "keyword":"ad",
            "onlyShowStocked":true,
            "productData":productData
        };
    }

    handChange=(e)=>{
        let name = e.target.name;
        // 根据新的条件搜索结果
        let val = e.target.value;
        let temp = productData.filter((item)=>{
            return item.name.indexOf(val)>-1;
        });

        this.setState({
            [name]:val,
            productData:temp
        });
    }
    render(){
        return (
            <div>
                <SearchBar keyword={this.state.keyword} isOnlyShowStocked={this.state.isOnlyShowStocked} handChange={this.handChange}/>
                <SearchResult result={this.state.productData}/>
            </div>
        );
    }
}