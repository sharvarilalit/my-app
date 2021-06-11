import React, { Component } from 'react'
import{Link} from 'react-router-dom';
import "../css/App.css";
export default class cake extends Component {
    render() {
        //{console.log(this.props)}
        return (
           this.props&&this.props.data&&this.props.data.length>0?this.props.data.map((key,index)=>{
                return<div class="col" key={index} className="img-hover-zoom">
                    <div class="card h-100" >
                    <Link to={'cake/'+key.cakeid}><img  src={key.image} style={{height:'250px'}}class="card-img-top" alt="..." /></Link>
                    <div class="card-body">
                                <h5 class="card-title">{key.name}</h5>
                                <p class="card-text">{key.price}</p>
                    </div>
                    </div>
                 </div>
            }):null
        )
    }
}
