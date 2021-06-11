import React, { Component } from 'react'
//import Data from './data';
import CakeList from './cake1';
import axios from 'axios';
export default class cakeMain extends Component {

    state = {
        Data: []
      }

    componentDidMount() {
        axios.get('http://apibyashu.herokuapp.com/api/allcakes')
            .then(res => {
                const Data = res.data.data;
                this.setState({ Data });
                console.log('result is',res.data.data)
            })
        }       

    render() {
        return (
            <div class="container px-4">
                    <div class="row gx-3">
                    {this.state.Data&&this.state.Data.length>0?this.state.Data.map((key,index)=><CakeList key={index} data={key}/>):null}
                    </div>
            </div>
          
        )
    }
}
