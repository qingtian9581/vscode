import React,{Component} from 'react';
import Category from './Category'
export default class SearchResult extends Component {
render(){
    const categories = this.converData(this.props.result).map((category,index)=>{
        return <Category key={index} category={category}/>
    });
    return (
        <table>
            <thead>
                <tr><th>名称</th><th>价格</th></tr>
            </thead>
            {
                categories
            }
        </table>
    );
}

converData(result){
    const categoryNames = new Set();
    result.forEach(item=>{
        categoryNames.add(item.category);
    })
    const map = new Map();
    for(let name of categoryNames.keys()){
        let categoryData = result.fliter(item=>{
            return item.category ===name;
        });
        map.set(name,categoryData);
    }
    return [...map];
}
}