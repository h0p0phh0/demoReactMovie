import React from 'react'

export default function Register(props) {
    return (
        <form action=""  className="account__form">
      <div>
        <p>Tên đăng nhập</p>
        <input
          type="text"
          className="form-control"
          name="taiKhoan"
         
        />
        
      </div>
      <div>
        <p>Mật khẩu</p>
        <input
          name="matKhau"
          type="text"
          className="form-control"
          
        />
        {/* {formik.errors.matKhau && formik.touched.matKhau ? (
          <p className=" text-red-500">{formik.errors.matKhau}</p>
        ) : null} */}
      </div>
      <div>
        <p>Nhập lại mật khẩu</p>
        <input
          name="nhapLaiMatKhau"
          type="text"
          className="form-control"
          
        />
        {/* {formik.values.matKhau !== formik.values.nhapLaiMatKhau ? (
          <p className=" text-red-500">Mật khẩu phải trùng nhau</p>
        ) : null} */}
      </div>
      <div>
        <p>Họ tên</p>
        <input
          name="hoTen"
          type="text"
          className="form-control"
         
        />
        {/* {formik.errors.hoTen && formik.touched.hoTen ? (
          <p className=" text-red-500">{formik.errors.hoTen}</p>
        ) : null} */}
      </div>
      <div>
        <p>Email</p>
        <input
          name="email"
          type="email"
          className="form-control"
          
        />
        {/* {formik.errors.email && formik.touched.email ? (
          <p className=" text-red-500">{formik.errors.email}</p>
        ) : null} */}
      </div>
      <div>
        <p>Số điện thoại</p>
        <input
          name="soDt"
          type="text"
          className="form-control"
          
        />
        {/* {formik.errors.soDt && formik.touched.soDt ? (
          <p className=" text-red-500">{formik.errors.soDt}</p>
        ) : null} */}
      </div>
      <br />
      <button className="btn-login bg-red-600 font-bold rounded-md py-1 px-3  hover:bg-red-700">
        Đăng ký
      </button>
    </form>
    )
}
