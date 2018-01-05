import React,{Component} from 'react';


export default class CategoryData extends Component {
    render(){
        const rows = this.props.data.map((item,index)=>{
            return (
                <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                </tr>
            );
        });
        return (rows);
    }
}