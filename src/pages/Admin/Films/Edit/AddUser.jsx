import React from 'react'
import { useFormik } from "formik";
import { useDispatch } from 'react-redux';
import { Form, Input, Select } from "antd";


export default function AddUser() {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            taiKhoan: "",
            hoTen: "",
            email: "",
            soDt: "",
            matKhau: "",
            maLoaiNguoiDung: "KhachHang",
            maNhom: GROUP_ID,
        },
        onSubmit: (values) => {
            const action = AddUserAction(values);
            dispatch(action);
        }
    });
    return (
        <Form>
            <Form.Item label="Tài khoản">
                <Input
                    name="taiKhoan"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.taiKhoan && formik.errors.taiKhoan ? (
                    <p className=" bg-red-200">{formik.errors.taiKhoan}</p>
                ) : null}
            </Form.Item>
            <Form.Item label="Mật khẩu">
                <Input
                    name="matKhau"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.matKhau && formik.errors.matKhau ? (
                    <p className=" bg-red-200">{formik.errors.matKhau}</p>
                ) : null}
            </Form.Item>
            <Form.Item label="Họ tên">
                <Input
                    name="hoTen"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.hoTen && formik.errors.hoTen ? (
                    <p className=" bg-red-200">{formik.errors.hoTen}</p>
                ) : null}
            </Form.Item>
            <Form.Item label="Số điện thoại">
                <Input
                    name="soDt"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.soDt && formik.errors.soDt ? (
                    <p className=" bg-red-200">{formik.errors.soDt}</p>
                ) : null}
            </Form.Item>
            <Form.Item label="Email">
                <Input
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                    <p className=" bg-red-200">{formik.errors.email}</p>
                ) : null}
            </Form.Item>
            <Form.Item label="Mã loại người dùng">
                <Select
                    defaultValue={"KhachHang"}
                    onChange={(value) => {
                        formik.setFieldValue("maLoaiNguoiDung", value);
                    }}
                >
                    <Select.Option value="KhachHang">Khách Hàng</Select.Option>
                    <Select.Option value="QuanTri">Quản trị</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item className="items-center justify-center">
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded p-2 mx-auto block mt-2"
                    type="submit"
                >
                    Thêm người dùng
                </button>
            </Form.Item>
        </Form >
    )
}
