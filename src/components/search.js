import React from 'react';
import axios from 'axios';
import Cake from './cake';
import Img1 from '../images/notfound.gif';
import Loader from "react-loader-spinner";
import Carousel from './carousel';


// import queryString from 'query-string';
export default function SearchCake(props) {
    const[cakedata,setCakeData] =React.useState([]);
    const[isLoading,setLoading] =React.useState(true);
    let[resdata,setResData]  =React.useState([]);

    const queryString = require('query-string');
    const res = queryString.parse(props.location.search);
    

    React.useEffect(() => {
        axios.get(process.env.REACT_APP_BASE_URI+`searchcakes?q=${res.q}`)
                .then(res => {
                    const Data = res.data.data;
                    console.log("search data is",Data);
                    setCakeData(Data);
                    setLoading(false);
                    setResData(Data);
                    //console.log('result is',res.data.data)
                })

      }, [res.q])


      const sortList =(i)=>{
        let user =[...cakedata]
          if(i===1){
              user.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
              //console.log('yuser',user)
              setCakeData(user);
              return;
          }
          if(i===2){
            user.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
            setCakeData(user);
            return;
          }
          setCakeData(resdata);
      }

    return (
        <>
            {/* search is :{res.q} */}
            {/* {console.log("props in search",props)} */}
            <Carousel />
            <div class="container" >
           { isLoading===true?<center><Loader type="Bars" color="#00BFFF" height={80} width={80} /></center>:
            cakedata&&cakedata.length>0?
            <>
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
            <div class="row row-cols-1 row-cols-md-4 row-cols-sm-3 row-cols-xs-12 g-4">
                <Cake data={cakedata}/>
            </div></>:<center><img src={Img1} alt="..." style={{width:'50%'}}/></center>}
            </div>
            
        </>
    )
}
