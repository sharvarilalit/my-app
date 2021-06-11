import React from 'react';
import Img1 from '../images/4.jpg';
import Img2 from '../images/5.jpg';
import Img3 from '../images/3.jpg';
import Img5 from '../images/6.jpg';
import {  Link } from 'react-router-dom'  
import {withRouter} from 'react-router-dom';

function Carousel() {
    return (
        <>
            <div id="carouselExampleDark" class="carousel carousel-dark slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="3" aria-label="Slide 4"></button>

            </div>
            <div class="carousel-inner">
                <div class="carousel-item active peopleCarouselImg" data-bs-interval="10000">
                <Link to ={"/searchdetails?q=cup"}> <img src={Img1} class="d-block w-100" alt="..." /></Link>
                </div>
                <div class="carousel-item peopleCarouselImg" data-bs-interval="2000">
                <Link to ={"/searchdetails?q=black"}> <img src={Img2} class="d-block w-100" alt="..." /></Link>
                </div>
                <div class="carousel-item peopleCarouselImg">
                <img src={Img3} class="d-block w-100" alt="..." />
                </div>
                <div class="carousel-item peopleCarouselImg">
                <img src={Img5} class="d-block w-100" alt="..." />
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
            </div>
        </>
    )
}

export default withRouter(Carousel)