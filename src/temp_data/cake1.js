import React, { Component } from 'react'

export default class cake extends Component {
    render() {
        return (<div className="card col-md-3 gy-3 p-3 " style={{width: '18rem;'}} >
                        <img src={this.props.data.image} class="card-img-top" alt="..." />
                        <div class="card-body">
                            <h5 class="card-title">{this.props.data.name}</h5>
                            <p class="card-text">{this.props.data.price}</p>
                        </div>
                 </div>
       
        )
    }
}
