import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../../App';
import { useFormik, formikProps } from "formik";
import { NavLink } from 'react-router-dom';
import * as Yup from "yup";
import { REGEX_ASCII } from '../../util/settings/config';
import axios from 'axios';
import { dangKyAction } from '../../redux/actions/QuanLyNguoiDungAction';

export default function Register(props) {
  const dispatch = useDispatch();
  const {userLogin} = useSelector(state=> state.QuanLyNguoiDungReducer);
  console.log('userLogin',userLogin)


  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      nhapLaiMatKhau: "",
      email: "",
      soDt: "",
      maNhom: "GP01",
      hoTen: "",
    },
    validationSchema: Yup.object({
      hoTen: Yup.string()
        .matches(REGEX_ASCII, "Họ tên phải dúng định dạng")
        .required("Không được bỏ trống"),
      taiKhoan: Yup.string().required("Không được bỏ trống"),
      matKhau: Yup.string().required("Không được bỏ trống"),
      email: Yup.string()
        .email("Không đúng định dạng email")
        .required("Không được bỏ trống"),
      soDt: Yup.number()
        .typeError("Chỉ có thể nhập số ")
        .required("Không được bỏ trống")
    }),
    onSubmit: (values) => {

      const action = dangKyAction(values);
      dispatch(action);
      console.log('values', values)
    }
    //   axios({
    //     method:"POST",
    //     url: "http://movieapi.cyberlearn.vn/api/QuanLyNguoiDung/DangKy",
    //     data: values
    //   })
    //   .then(res=>{
    //     console.log(res);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   })
    // },
  });
  return (
    <form onSubmit={formik.handleSubmit} className="lg:w-1/2 xl:max-w-screen-sm account__form" >
      <div className="py-12 bg-indigo-100 lg:bg-white flex justify-center lg:justify-start lg:px-12">
        <div className="cursor-pointer flex items-center" onClick={() => history.push('/home')}>
          <div>
            <svg className="w-10 text-indigo-500" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 225 225" style={{ enableBackground: 'new 0 0 225 225' }} xmlSpace="preserve">
              <style type="text/css" dangerouslySetInnerHTML={{ __html: "\n                                                .st0{fill:none;stroke:currentColor;stroke-width:20;stroke-linecap:round;stroke-miterlimit:3;}\n                                            " }} />
              <g transform="matrix( 1, 0, 0, 1, 0,0) ">
                <g>
                  <path id="Layer0_0_1_STROKES" className="st0" d="M173.8,151.5l13.6-13.6 M35.4,89.9l29.1-29 M89.4,34.9v1 M137.4,187.9l-0.6-0.4     M36.6,138.7l0.2-0.2 M56.1,169.1l27.7-27.6 M63.8,111.5l74.3-74.4 M87.1,188.1L187.6,87.6 M110.8,114.5l57.8-57.8" />
                </g>
              </g>
            </svg>
          </div>
          <div className="text-2xl text-indigo-800 tracking-wide ml-2 font-semibold">Cyber Movie</div>
        </div>
      </div>
      <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
        <h2 className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
                  xl:text-bold">Đăng Ký</h2>
        <div className="mt-12">
          <div>
            <div>
              <div className="">
                <div class="text-xl font-bold text-gray-700 tracking-wide">Tên đăng nhập</div>
                <input
                  type="text"
                  className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  name="taiKhoan"
                  placeholder="Nhập vào tên đăng nhập"
                  onChange={formik.handleChange}
                />
                {formik.errors.taiKhoan && formik.touched.taiKhoan ? (
                  <p className=" text-red-500">{formik.errors.taiKhoan}</p>
                ) : null}
              </div>
              <div>
                <div className="text-xl font-bold text-gray-700 tracking-wide" >Mật khẩu</div>
                <input
                  name="matKhau"
                  type="text"
                  className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  placeholder="Nhập vào mật khẩu"
                  onChange={formik.handleChange}


                />
                {formik.errors.matKhau && formik.touched.matKhau ? (
                  <p className=" text-red-500">{formik.errors.matKhau}</p>
                ) : null}
              </div>
              <div>
                <div className="text-xl font-bold text-gray-700 tracking-wide">Nhập lại mật khẩu</div>
                <input
                  name="nhapLaiMatKhau"
                  type="text"
                  className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  placeholder="Nhập vào mật khẩu"
                  onChange={formik.handleChange}
                />
                {formik.values.matKhau !== formik.values.nhapLaiMatKhau ? (
                  <p className=" text-red-500">Mật khẩu phải trùng nhau</p>
                ) : null}
              </div>
              <div>
                <div className="text-xl font-bold text-gray-700 tracking-wide">Họ tên</div>
                <input
                  name="hoTen"
                  type="text"
                  className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  placeholder="Nhập vào họ và tên"
                  onChange={formik.handleChange}
                />
                {formik.errors.hoTen && formik.touched.hoTen ? (
                  <p className=" text-red-500">{formik.errors.hoTen}</p>
                ) : null}
              </div>
              <div>
                <div className="text-xl font-bold text-gray-700 tracking-wide">Email</div>
                <input
                  name="email"
                  type="email"
                  className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  placeholder="Nhập vào địa chỉ email"
                  onChange={formik.handleChange}
                />
                {formik.errors.email && formik.touched.email ? (
                  <p className=" text-red-500">{formik.errors.email}</p>
                ) : null}
              </div>
              <div>
                <div className="text-xl font-bold text-gray-700 tracking-wide">Số điện thoại</div>
                <input
                  name="soDt"
                  type="text"
                  className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  placeholder="Nhập vào số điện thoại"
                  onChange={formik.handleChange}
                />
                {formik.errors.soDt && formik.touched.soDt ? (
                  <p className=" text-red-500">{formik.errors.soDt}</p>
                ) : null}
              </div>
              <div className="mt-10">
                <button className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                              font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                              shadow-lg">
                  Đăng ký
                </button>
              </div>
            </div>
            <div className="mt-12 text-xl font-display font-semibold text-gray-700 text-center">
              Bạn đã có tài khoản <NavLink to="/Login" className="cursor-pointer text-indigo-600 hover:text-indigo-800">Đăng nhập</NavLink>
            </div>
          </div>
        </div>

      </div>

    </form >
  )
}
