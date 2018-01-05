import React,{Component} from 'react';


export default class CategoryHeader extends Component {
    render(){
        return (
            <tr>
                <th>{this.props.title}</th>
            </tr>
        )
    }
}