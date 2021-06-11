import React, { Component,useState } from 'react'
import{Link} from 'react-router-dom';
import "../css/App.css";
import ReactPaginate from "react-paginate";
import "../css/pagination.css";


function Cake(props){

    const [offset, setOffset] = useState(1);
    const [perPage] = useState(8);
    const [pageCount, setPageCount] = useState(0);
    const  [slice, setSlice] = useState([]);
     
    const handlePageClick = (e) => {
       // alert(e.selected)
        const selectedPage = e.selected;
        setOffset(selectedPage + 1);
      };

      React.useEffect(() => {
          if( props.data.length<8){
            setSlice(props.data);
            return;
          }
        setSlice(props.data.slice(offset*perPage, perPage*(offset+1)));
      },[offset, props.data]);

      
     // console.log("props.data.length",props.data)
       
        return (
           
            <>
          { props&&props.data&&props.data.length>0?slice.map((key,index)=>{
                return<div class="col" key={index} className="img-hover-zoom">
                    <div class="card h-100" >
                    <Link to={'/cake/'+key.cakeid}><img  src={key.image} style={{height:'250px'}}class="card-img-top" alt="..." /></Link>
                    <div class="card-body">
                                <h5 class="card-title">{key.name}</h5>
                                <p class="card-text">&#8377; {key.price}</p>
                    </div>
                    </div>
                 </div>
            }):null}

            {props.data&&props.data.length>perPage?
            <div class="col" style={{display:'block',width:"100%"}}>
                <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={ Math.round(props.data.length/perPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
              />
              </div>
                :null}
            </>
        )
}

export default Cake; 
