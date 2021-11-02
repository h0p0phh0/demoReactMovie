import React, { useEffect } from 'react'
import style from './Checkout.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { datVeAction, layChiTietPhongVeAction } from './../../redux/actions/QuanLyDatVeAction';
import { Fragment } from 'react';
import './Checkout.css';
import { StarOutlined, CheckOutlined, UserOutlined } from '@ant-design/icons';
import { DAT_VE } from '../../redux/actions/types/QuanLyDatVeType';
import _ from 'lodash';
import { ThongTinDatVe } from './../../_core/models/ThongTinDatVe';
import { Tabs } from 'antd';
import { layThongTinNguoiDungAction } from '../../redux/actions/QuanLyNguoiDungAction';


function Checkout(props) {
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);
    const { chiTietPhongVe, danhSachGheDangDat } = useSelector(state => state.QuanLyDatVeReducer);
    const dispatch = useDispatch();
    console.log({ danhSachGheDangDat });
    useEffect(() => {
        const action = layChiTietPhongVeAction(props.match.params.id);
        dispatch(action)
    }, [])
    console.log({ chiTietPhongVe })
    console.log({userLogin})
    const { thongTinPhim, danhSachGhe } = chiTietPhongVe;

    const renderSeats = () => {
        return danhSachGhe.map((ghe, index) => {


            let classGheVip = ghe.loaiGhe === 'Vip' ? 'gheVip' : '';
            let classGheDaDat = ghe.daDat === true ? 'gheDaDat' : '';
            let classGheDangDat = '';
            // kiem tra tung ghe co dang dat hay khong
            let indexGheDD = danhSachGheDangDat.findIndex(gheDD => gheDD.maGhe === ghe.maGhe);
            let classGheDaDuocDat = '';
            if (userLogin.taiKhoan === ghe.taiKhoanNguoiDat) {
                classGheDaDuocDat = 'gheDaDuocDat';
            }
            if (indexGheDD != -1) {
                classGheDaDat = 'gheDangDat';
            }
            
            return (
                <Fragment key={index}>
                    {/* {ghe.loaiGhe === 'Vip' ? <button className={`${style['ghe']} ${style['gheVip']}`} >{ghe.stt}</button> : <button className={`${style['ghe']}`} key={index}>{ghe.stt}</button>} */}
                    <button onClick={() => {
                        dispatch({
                            type: DAT_VE,
                            gheDuocChon: ghe,
                        })
                    }} disabled={ghe.daDat} className={`ghe ${classGheVip} ${classGheDaDat} ${classGheDangDat} ${classGheDaDuocDat}`} >

                        {ghe.daDat ? <UserOutlined style={{ fontWeight: 'bold', fontSize: 19 }} /> : ghe.stt}

                    </button>
                    {(index + 1) % 16 === 0 ? <br /> : ''}
                </Fragment>

            )
        })
    }
    console.log(renderSeats.ghe)
    return (
        <div className="min-h-screen mt-5">
            <div className="grid grid-cols-12">
                <div className="col-span-9">
                    <div className="flex flex-col items-center mt-5">
                        <div className="bg-black" style={{ width: '80%', height: 15 }}>

                        </div>
                        <div className={`${style['trapezoid']} text-center`}>
                            <h3 className="mt-3">Màn Hình</h3>
                        </div>
                        <div>
                            {renderSeats()}
                        </div>
                    </div>
                    <div className="mt-5 flex justify-center">
                        <table className="divide-y divide-gray-200 w-2/3">
                            <thead className="bg-gray-50 p-5">
                                <tr>
                                    <th>Ghế chưa đặt</th>
                                    <th>Ghế đang dặt</th>
                                    <th>Ghế vip</th>
                                    <th>Ghế đã được đặt</th>
                                    <th>Ghế bạn đã đặt</th>

                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 text-center">
                                <tr>
                                    <td ><button className="ghe text-center"><CheckOutlined /></button></td>
                                    <td><button className="ghe gheDangDat text-center"><CheckOutlined /></button></td>
                                    <td><button className="ghe gheVip text-center"><CheckOutlined /></button></td>

                                    <td><button className="ghe gheDaDat text-center"><CheckOutlined /></button></td>
                                    <td><button className="ghe gheDaDuocDat text-center"><CheckOutlined /></button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-span-3">
                    {/* <h3 className="text-green-400 text-center text-4xl">  {danhSachGheDangDat.reduce((tongTien, ghe, index) => {
                        return tongTien += ghe.giaVe;
                    }, 0).toLocaleString()}</h3> */}
                    <h1 className="font-bold text-red-500 text-center text-4xl">Đặt Vé</h1>
                    <hr />
                    <h1 className="text-3xl mt-2 font-bold capitalize text-center">{thongTinPhim.tenPhim}</h1>
                    <p className="font-bold text-lg">Địa điểm: {thongTinPhim.tenCumRap} </p >
                    <p className="font-bold text-lg">Ngày chiếu: {thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu} </p>
                    <hr />
                    <div className="flex flex-row my-5">
                        <div className="w-4/5">
                            <span className=" text-lg font-bold">Ghế</span>
                            {_.sortBy(danhSachGheDangDat, ['stt']).map((gheDD, index) => {
                                return (
                                    <span key={index} className="text-green-500 mr-2 text-xl"> {gheDD.stt}</span>
                                )
                            })}

                        </div>

                    </div>
                    <hr />
                    <div className="flex w-4/5 my-5 leading-8">
                        <span className="text-lg font-bold">Tổng Tiền :</span>
                        <div className="text-right ml-5 ">
                            <span className="text-red-600 text-2xl">
                                {danhSachGheDangDat.reduce((tongTien, ghe, index) => {
                                    return tongTien += ghe.giaVe;
                                }, 0).toLocaleString()} vnđ
                            </span>
                        </div>
                    </div>
                    <hr />
                    <div className="my-5 font-bold text-lg">
                        <i>Email</i> <br />
                        {userLogin.email}
                    </div>
                    <hr />
                    <div className="my-5 font-bold text-lg">
                        <i>Phone</i> <br />
                        {userLogin.soDt}
                    </div>
                    <hr />
                    <div className="mb-0 h-full mt-5" style={{ marginBottom: 0 }}>
                        <div onClick={() => {
                            const thongTinDatVe = new ThongTinDatVe();
                            thongTinDatVe.maLichChieu = props.match.params.id;
                            thongTinDatVe.danhSachVe = danhSachGheDangDat;
                            console.log({ thongTinDatVe });
                            dispatch(datVeAction(thongTinDatVe))
                        }}
                            className="bg-green-500 text-white w-full text-center py-3 font-bold text-2xl cursor-pointer">
                            ĐẶT VÉ
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
// component trung gian

const { TabPane } = Tabs;


function callback(key) {
    console.log(key);
}

export default function (props) {
    return (
        <div className="p-5">
            <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="01 Chọn ghế & thanh toán" key="1">
                    <Checkout {...props} />
                </TabPane>
                <TabPane tab="02 Kết quả đặt vé" key="2">
                    <KetQuaDatVe {...props} />
                </TabPane>

            </Tabs>
        </div>
    )
}

// component ket qua dat ve

function KetQuaDatVe(props) {
    const dispatch = useDispatch();
    const {thongTinNguoiDung} = useSelector(state=>state.QuanLyNguoiDungReducer)
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);

    useEffect(()=>{
        const action = layThongTinNguoiDungAction();
        dispatch(action)
    },[])
    console.log('thongTinNguoiDung',thongTinNguoiDung)

    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-20">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-indigo-900">Kết quả đặt vé</h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Đừng nhầm thời gian và địa điểm, để không bỏ lỡ những bộ phim hay bạn nhé</p>
                </div>
                <div className="flex flex-wrap -m-2">
                    <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                        <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                            <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://picsum.photos/80/80" />
                            <div className="flex-grow">
                                <h2 className="text-gray-900 title-font font-medium">lat mat</h2>
                                <p className="text-gray-500">10:20 rap 5, he thong rap</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                        <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                            <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://dummyimage.com/84x84" />
                            <div className="flex-grow">
                                <h2 className="text-gray-900 title-font font-medium">Henry Letham</h2>
                                <p className="text-gray-500">CTO</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                        <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                            <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://dummyimage.com/88x88" />
                            <div className="flex-grow">
                                <h2 className="text-gray-900 title-font font-medium">Oskar Blinde</h2>
                                <p className="text-gray-500">Founder</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                        <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                            <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://dummyimage.com/90x90" />
                            <div className="flex-grow">
                                <h2 className="text-gray-900 title-font font-medium">John Doe</h2>
                                <p className="text-gray-500">DevOps</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                        <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                            <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://dummyimage.com/94x94" />
                            <div className="flex-grow">
                                <h2 className="text-gray-900 title-font font-medium">Martin Eden</h2>
                                <p className="text-gray-500">Software Engineer</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                        <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                            <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://dummyimage.com/98x98" />
                            <div className="flex-grow">
                                <h2 className="text-gray-900 title-font font-medium">Boris Kitua</h2>
                                <p className="text-gray-500">UX Researcher</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                        <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                            <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://dummyimage.com/100x90" />
                            <div className="flex-grow">
                                <h2 className="text-gray-900 title-font font-medium">Atticus Finch</h2>
                                <p className="text-gray-500">QA Engineer</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                        <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                            <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://dummyimage.com/104x94" />
                            <div className="flex-grow">
                                <h2 className="text-gray-900 title-font font-medium">Alper Kamu</h2>
                                <p className="text-gray-500">System</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                        <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                            <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://dummyimage.com/108x98" />
                            <div className="flex-grow">
                                <h2 className="text-gray-900 title-font font-medium">Rodrigo Monchi</h2>
                                <p className="text-gray-500">Product Manager</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}