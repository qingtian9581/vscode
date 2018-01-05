import React,{Component} from 'react';

import Category from './Category'

export default class SearchResult extends Component {

    render(){
        // 将属性result里的数据显示在表格中
        // 将数据整理下
        
        // map中的每一个元素生成一个分类
        const categories = this.convertData(this.props.result).map((category,index)=>{
            return <Category key={index} category={category}/>
        });
        return (
            <table>
                <thead>0
                    <tr><th>名称</th><th>价格</th></tr>
                </thead>
                {
                    categories
                }
            </table>
        );
    }

    convertData(result){
        const categoryNams = new Set();
        result.forEach(item=>{
            categoryNams.add(item.category);
        });
        const map = new Map();
        for(let name of categoryNams.keys()){
            let categoryData = result.filter(item=>{
                return item.category === name;
            });
            map.set(name,categoryData);//将每一个分类的名称作为键，这个分类的数据作为值
        }
        console.log([...map]);
        return [...map];
    }
}