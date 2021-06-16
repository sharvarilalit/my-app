import React from 'react';
import Cake from './cake'
import axios from 'axios';
import Carousel from './carousel';



function CakeList(props) {

    let[data,setData]  =React.useState([]);
    let[resdata,setResData]  =React.useState([]);


    React.useEffect(() => {
        axios.get(process.env.REACT_APP_BASE_URI+'allcakes')
                .then(res => {
                    const Data = res.data.data;
                    setData(Data);
                    setResData(Data);
                    //console.log('result is',res.data.data)
                })
                   
      }, []);

     
      const sortList =(i)=>{
        let user =[...data]
          if(i===1){
              user.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
              //console.log('yuser',user)
              setData(user);
              return;
          }
          if(i===2){
            user.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
            setData(user);
            return;
          }
          setData(resdata);
      }

   //// {console.log('props are',data)}
    return (
        <>
        <Carousel />
        <div class="container" >
        <div class="dropdown d-flex flex-row-reverse bd-highlight" >
        <button class="btn btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="fa fa-filter" style={{color:'purple'}}></i> Filter
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li><a class="dropdown-item" onClick={(e)=>sortList(1)}>Low to High</a></li>
            <li><a class="dropdown-item" onClick={(e)=>sortList(2)}>High to Low</a></li>
            <li><a class="dropdown-item" onClick={(e)=>sortList(0)}>Reset</a></li>
        </ul>
        </div>
        <br />
        <div style={{clear:'both',  display: "table"}}></div>
         <div class="row row-cols-1 row-cols-md-4 row-cols-sm-3 row-cols-xs-12 g-4">
            <Cake data={data}/>
            </div>
        </div>
        </>
        
    )
}

export default  CakeList;