import React, { useEffect } from 'react'
import HomeMenu from './HomeMenu/HomeMenu'
import { useSelector, useDispatch } from 'react-redux';

import Film from '../../components/Film/Film';
import MultipleRowSlick from '../../components/RSlick/MultipleRowSlick';
import { layDanhSachPhimAction } from '../../redux/actions/QuanLyPhimAction';
import { QuanLyRapReducer } from './../../redux/reducer/QuanLyRapReducer';
import { layDanhSachHeThongRapAction } from './../../redux/actions/QuanLyRapActions';
import HomeCarousel from '../../templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel';
export default function Home(props) {
    const { arrFilm } = useSelector(state => state.QuanLyPhimReducer);
    const { heThongRapChieu } = useSelector(state => state.QuanLyRapReducer);
    const dispatch = useDispatch();
    console.log(arrFilm)

    useEffect(() => {
        // const action = layDanhSachPhimAction();
        // dispatch(action);
        dispatch(layDanhSachPhimAction());

        dispatch(layDanhSachHeThongRapAction());
    }, [])
    return (
        <div>
            <HomeCarousel />

            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <MultipleRowSlick arrFilm={arrFilm} />
                    {/* <div className="flex flex-wrap -m-4">
                        {renderFlims()}
                    </div> */}
                </div>
            </section>

            <div className="container m-auto">

                <HomeMenu heThongRapChieu={heThongRapChieu} />

            </div>
        </div>
    )
}
