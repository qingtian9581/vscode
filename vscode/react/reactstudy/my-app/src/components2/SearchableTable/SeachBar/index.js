import React,{Component} from 'react';


export default class SearchBar extends Component {

    render(){
        return (
            <div>
                <input type="text" name="keyword" placeholder="请输入关键词" value={this.props.keyword} onChange={this.props.handChange}/>
                <div>
                    <label>
                        <input type="checkbox" name="onlyShowStocked" checked={this.props.isOnlyShowStocked} onChange={this.props.handChange}/>是否只显示库存
                    </label>
                </div>
            </div>
        );
    }
}