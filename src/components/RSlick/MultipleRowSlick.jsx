import React, { Component } from "react";
import Slider from "react-slick";
import { useSelector, useDispatch } from 'react-redux';
import styleSlick from './MultipleRowSlick.module.css';
import Film_Flip from './../Film/Film_Flip';
import { SET_FILM_DANG_CHIEU } from "../../redux/actions/types/QuanLyPhimType";
import { SET_FILM_SAP_CHIEU } from "../../redux/actions/types/QuanLyPhimType";
import { QuanLyPhimReducer } from './../../redux/reducer/QuanLyPhimReducer';


function SampleNextArrow(props) {
    const { className, style, onClick } = props;

    return (
        <div
            className={`${className} ${styleSlick['slick-prev']}`}
            style={{ ...style, display: "block" }}
            onClick={onClick}
        >
        </div>

    );
}




function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} ${styleSlick['slick-prev']}`}

            style={{ ...style, display: "block", left: '-50px' }}
            onClick={onClick}
        >
        </div>
    );
}

const MultipleRowSlick = (props) => {
    const dispatch = useDispatch();
    const { dangChieu, sapChieu } = useSelector(state => state.QuanLyPhimReducer)
    let activeClassDC = dangChieu === true ? 'active_Film' : 'none_active_Film';
    let activeClassSC = sapChieu === true ? 'active_Film' : 'none_active_Film';
    const renderFilms = () => {

        return props.arrFilm.map((item, index) => {
            return (
                <div key={index} className="mt-2">
                    {/* <Film phim={item}/> */}
                    <Film_Flip item={item} />
                </div>
            )
        })
    }
    // console.log(activeClassDC)
    // console.log(activeClassSC)
    const settings = {
        className: "center variable-width",
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 2,
        speed: 500,
        rows: 2,
        slidesPerRow: 2,
        variableWidth: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };
    return (
        <div>
            <button className={`${styleSlick[activeClassDC]} px-8 py-3 font-semibold rounded bg-gray-800 text-white mr-3 border border-gray-800`} onClick={() => {
                const action = { type: SET_FILM_DANG_CHIEU }
                dispatch(action);
            }}>Đang Chiếu</button>
            <button className={`${styleSlick[activeClassSC]} px-8 py-3 font-semibold rounded bg-white text-gray-800 border border-gray-800`} onClick={() => {
                const action = { type: SET_FILM_SAP_CHIEU }
                dispatch(action);
            }}>Sắp Chiếu</button>
            <Slider {...settings}>
                {renderFilms()}
            </Slider>
        </div>
    );
}


export default MultipleRowSlick;