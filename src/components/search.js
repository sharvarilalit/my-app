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

    const queryString = require('query-string');
    const res = queryString.parse(props.location.search);
    

    React.useEffect(() => {
        axios.get(process.env.REACT_APP_BASE_URI+`searchcakes?q=${res.q}`)
                .then(res => {
                    const Data = res.data.data;
                    console.log("search data is",Data);
                    setCakeData(Data);
                    setLoading(false);
                    //console.log('result is',res.data.data)
                })

      }, [res.q])



    return (
        <>
            {/* search is :{res.q} */}
            {/* {console.log("props in search",props)} */}
            <Carousel />
            <div class="container" >
           { isLoading===true?<center><Loader type="Bars" color="#00BFFF" height={80} width={80} /></center>:
            cakedata&&cakedata.length>0?<div class="row row-cols-1 row-cols-md-4 row-cols-sm-3 row-cols-xs-12 g-4">
                <Cake data={cakedata}/>
            </div>:<center><img src={Img1} alt="..." style={{width:'50%'}}/></center>}
            </div>
            
        </>
    )
}
