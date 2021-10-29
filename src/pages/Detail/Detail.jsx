import React, { useLayoutEffect } from 'react'
import { Button, CustomCard } from '@tsamantanis/react-glassmorphism'
import '@tsamantanis/react-glassmorphism/dist/index.css'
import '../../assets/styles/circle.scss'
import { Tabs, Radio, Space } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { SET_CHI_TIET_PHIM } from '../../redux/actions/types/QuanLyRapType';
import { layThongTinChiTietPhim } from '../../redux/actions/QuanLyRapActions';
import moment from 'moment';
import { Rate } from 'antd';
import { NavLink } from 'react-router-dom';

const { TabPane } = Tabs;


export default function Detail(props) {
    const filmDetail = useSelector(state => state.QuanLyPhimReducer.filmDetail);
    console.log({ filmDetail })
    const dispatch = useDispatch();
    useLayoutEffect(() => {
        let { id } = props.match.params;
        console.log(id)
        dispatch(layThongTinChiTietPhim(id))
    }, [])
    return (
        <div style={{ backgroundImage: `url(${filmDetail.hinhAnh})`, backgroundSize: '100%', backgroundPosition: 'center', minHeight: '100vh' }}>
            <CustomCard
                effectColor="#fff" // required
                color="#fff)" // default color is white
                blur={10} // default blur value is 10px
                borderRadius={1} // default border radius value is 10px
                style={{ paddingTop: 150, minHeight: '100vh' }}
            >
                <div className="grid grid-cols-12">
                    <div className="col-span-5 col-start-3">
                        <div className="grid grid-cols-3">
                            <img className="col-span-1" src={filmDetail.hinhAnh} style={{ width: '100%', height: 300 }} alt={filmDetail.tenPhim} />
                            <div className="col-span-2 ml-5" style={{ marginTop: '25%' }}>
                                <p>Ngày Chiếu: {moment(filmDetail.ngayKhoiChieu).format('DD.MM.YY')}</p>
                                <p className="text-4xl leading-3 text-white">{filmDetail.tenPhim}</p>
                                <p className="">{filmDetail.moTa}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-4">
                        <h1 style={{ marginLeft: '15%', color: 'red', fontWeight: 'bold', fontSize: 15 }}>Đánh Giá</h1>
                        <h1 style={{ marginLeft: '5%' }} className="text-green-400 text-2xl"><Rate allowHalf defaultValue={filmDetail.danhGia / 2} style={{ color: 'efe357f0', fontSize: 30 }} /></h1>
                        <div className={`c100 p${filmDetail.danhGia * 10} big`}>
                            <span>{filmDetail.danhGia * 10}%</span>
                            <div className="slice">
                                <div className="bar" />
                                <div className="fill" />
                            </div>
                        </div>

                    </div>
                </div>
                <div className="container mt-10 ml-72 w-2/3 bg-white bg-opacity-20 px-5 py-5">
                    <Tabs defaultActiveKey="1" centered className="container">
                        <TabPane tab="Lịch chiếu" key="1" style={{ minHeight: 300 }}>
                            <div>
                                <Tabs tabPosition={'left'} >
                                    {filmDetail.heThongRapChieu?.map((htr, index) => {
                                        return (
                                            <TabPane tab={
                                                <div className="flex flex-row items-center justify-center">
                                                    <img src={htr.logo} className="rounded-full" width="50" />
                                                    <div className="text-center ml-2">
                                                        {htr.tenHeThongRap}
                                                    </div>
                                                </div>} key={index}>
                                                {/* hien thi cum rap chieu */}

                                                {htr.cumRapChieu?.map((cumRap, index) => {
                                                    return (
                                                        <div key={index} className="mt-5">
                                                            <div className="flex flex-row">
                                                                <img style={{ width: 60, height: 60 }} src={cumRap.hinhAnh} />
                                                                <div className="ml-2 ">
                                                                    <p style={{ fontSize: 20, fontWeight: 'bold', lineheight: 1, marginBottom: 0 }}>{cumRap.tenCumRap}</p>
                                                                    <p className="text-white" style={{ marginTop: 0 }}>{cumRap.diaChi}</p>
                                                                </div>
                                                            </div>
                                                            <div className="thong-tin-lich-chieu grid grid-cols-4">
                                                                {cumRap.lichChieuPhim?.slice(0, 8).map((lichChieu, index) => {
                                                                    return (
                                                                        <NavLink to={`/checkout/${lichChieu.maLichChieu}`} className="col-span-1 text-green-800 font-bold" key={index}>
                                                                            {moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}
                                                                        </NavLink>
                                                                    )
                                                                })}
                                                            </div>
                                                        </div>
                                                    )
                                                })}

                                            </TabPane>
                                        )
                                    })}
                                </Tabs>
                            </div>
                        </TabPane>
                        <TabPane tab="Thông tin" key="2" style={{ minHeight: 300 }} className="p-10">
                            Chưa có thông tin
                        </TabPane>
                        <TabPane tab="Đánh giá" key="3" style={{ minHeight: 300 }} className="p-10">
                           Chưa có đánh giá nào
                        </TabPane>
                    </Tabs>
                </div>

            </CustomCard>

        </div>
    )
}
