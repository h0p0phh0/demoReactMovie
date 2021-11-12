import React from 'react'
import { useSelector } from 'react-redux';
import _ from 'lodash'
import "./Footer.css"

import { QuanLyRapReducer } from './../../../../redux/reducer/QuanLyRapReducer';

export default function Footer(props) {
    const { heThongRapChieu } = useSelector(state => state.QuanLyRapReducer);

    const arrHeThongRap = _.map(heThongRapChieu, (heThongRap) => _.pick(heThongRap, ['maHeThongRap', 'tenHeThongRap', 'logo']));
    console.log('arrHeThongRap', arrHeThongRap)
    return (
        <footer className="footer">
            <div className="container mx-auto ">
                <div className="footer__top py-5 flex flex-col md:flex-row justify-between items-start border-b-2 border-gray-500 px-4">
                    <div className="w-full md:w-1/6">
                        <p className="text-lg font-medium">Category</p>
                        <ul className="text-gray-500">
                            <li>
                                <a href="/" className="hover:text-white">Tix</a>
                            </li>
                            <li>
                                <a href="/" className="hover:text-white">FAQ</a>
                            </li>
                            <li>
                                <a href="/" className="hover:text-white">Brand Guidelines</a>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full md:w-1/6 pt-2">
                        <ul className="md:mt-9 leading-3">
                            <li>
                                <a href="/" className="mb-1 block pr-7 hover:text-white">
                                    Thỏa thuận sử dụng
                                </a>
                            </li>
                            <li>
                                <a href="/" className="mb-1 block pr-7 hover:text-white">
                                    Chính sách bảo mật
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full md:w-2/6">
                        <p className="pb-1 text-lg font-medium">Category</p>
                        <div className="grid grid-cols-3 logoPartner" >
                            {arrHeThongRap.map((htr, index) => {
                                return (
                                    <a key={index} className="p-2">
                                        <img src={htr.logo} alt="logo" className="w-2/4" />
                                    </a>
                                )
                            })}

                        </div>
                    </div>
                    <div className="w-full md:w-1/6 text-center mt-5 md:m-0" id="apps">
                        <p className="footer__heading">MOBILE APP</p>
                        <div className="mobileIcon flex justify-center">
                            <img
                                src="./logo/apple.png"
                                alt=""
                                width="30"
                                height="30"
                                className=" block mr-4"
                            />
                            <img src="./logo/android.png" alt="" width="30" height="30" />
                        </div>
                    </div>
                    <div className="w-full md:w-1/6 text-center mt-5 md:m-0">
                        <p className="footer__heading">SOCIAL</p>
                        <div className="socialIcon flex justify-center">
                            <img
                                src="./logo/facebook.png"
                                alt=""
                                width="30"
                                height="30"
                                className=" block mr-4"
                            />
                            <img src="./logo/zalo.png" alt="" width="30" height="30" />
                        </div>
                    </div>
                </div>
                <div className="footer__bottom flex-col mt-6 md:flex-row flex text-center md:text-left">
                    <div className="w-full md:w-1/12">
                        <img
                            src="./logo/zion.jpeg"
                            alt=""
                            className="rounded-lg block mx-auto mb-5"
                            width="80"
                        />
                    </div>
                    <div className="w-full md:w-9/12 pl-4 leading-3" id="contact">
                        <p className="footer__heading ">
                            TIX – SẢN PHẨM CỦA CÔNG TY CỔ PHẦN ZION
                        </p>
                        <p>
                            Địa chỉ: Z06 Đường số 13, Phường Tân Thuận Đông, Quận 7, Tp. Hồ
                            Chí Minh, Việt Nam.
                        </p>
                        <p>Giấy chứng nhận đăng ký kinh doanh số: 0101659783,</p>
                        <p>
                            đăng ký thay đổi lần thứ 30, ngày 22 tháng 01 năm 2020 do Sở kế
                            hoạch và đầu tư Thành phố Hồ Chí Minh cấp.
                        </p>
                        <p>Số Điện Thoại (Hotline): 1900 545 436</p>
                        <p>
                            Email:{" "}
                            <a href="" className=" text-red-600 hover:text-red-700">
                                support@tix.vn
                            </a>
                        </p>
                    </div>
                    <div className="w-full md:w-2/12">
                        <a href="http://online.gov.vn/Home/WebDetails/62782?AspxAutoDetectCookieSupport=1">
                            <img
                                src="./logo/logoSaleNoti.png"
                                alt=""
                                width="130"
                                className="block mx-auto mb-5"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </footer>

    )
}
