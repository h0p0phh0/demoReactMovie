import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Carousel } from 'antd';
import './HomeCarousel.css'
import { getCarouselAction } from './../../../../redux/actions/CarouselAction';
import { axios } from 'axios';
const contentStyle = {
    height: '600px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
    backgroundPosition: 'center',
    backgroundSize: '100%',
    backgroundRepeat: 'no-repeat',
    margin: 'auto',
};
export default function HomeCarousel(props) {
    const { arrImg } = useSelector(state => state.CarouselReducer);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(getCarouselAction)

    // }, [])
    useEffect(() => {
        dispatch(getCarouselAction())
    },[])

    const renderImg = () => {
        return arrImg.map((item, index) => {
            return (
                <div key={index} className="">
                    <div style={{ ...contentStyle, backgroundImage: `url(${item.hinhAnh})` }}>
                        <img src={item.hinhAnh} alt={item.hinhAnh} className="opacity-0" />
                    </div>
                </div>
            )
        })
    }
    return (
        <Carousel effect="fade" style={{width:'100%',padding:0,margin:'0px'}}>
            {renderImg()}
        </Carousel>

    )
}
