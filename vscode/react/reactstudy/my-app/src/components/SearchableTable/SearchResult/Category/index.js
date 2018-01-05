import React,{Component} from 'react';
import CategoryHeader from './CategoryHeader';
import CategoryData from './CategoryData';

export default class Category extends Component {
    render(){
        const category = this.props.category;
        return (
            <tbody>
                <CategoryHeader title={category[0]}/>
                <CategoryData title={category[1]}/>
            </tbody>
        )
    }
}