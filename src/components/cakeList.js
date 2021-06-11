import React from 'react';
import Cake from './cake'
import axios from 'axios';
import Carousel from './carousel';



function CakeList(props) {

    let[data,setData]  =React.useState([]);
       

    React.useEffect(() => {
        axios.get(process.env.REACT_APP_BASE_URI+'allcakes')
                .then(res => {
                    const Data = res.data.data;
                    setData(Data);
                    //console.log('result is',res.data.data)
                })
                   
      }, []);

     

      //{console.log('props are',props)}
    return (
        <>
        <Carousel />
        <div class="container" >
         <div class="row row-cols-1 row-cols-md-4 row-cols-sm-3 row-cols-xs-12 g-4">
            <Cake data={data}/>
            </div>
        </div>
        </>
        
    )
}

export default  CakeList;