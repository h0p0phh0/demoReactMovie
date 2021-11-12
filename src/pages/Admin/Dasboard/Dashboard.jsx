import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Input, Popconfirm, Table, Tag, Space, Form } from 'antd';
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { QuanLyNguoiDungReducer } from './../../../redux/reducer/QuanLyNguoiDungReducer';
import { layDanhSachNguoiDungAction, OpenAdminModelAction } from '../../../redux/actions/QuanLyNguoiDungAction';
import { Modal, Button } from 'antd';
import { useFormik } from 'formik';


const { Search } = Input;
export default function Dashboard() {
    const { danhSachNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);
    const dispatch = useDispatch();
    const [search, setSearch] = useState("")

    // console.log('danhSachNguoiDung',danhSachNguoiDung)
    useEffect(() => {
        dispatch(layDanhSachNguoiDungAction(search));
    }, [search])
    const confirm = []
    const columns = [
        {
            title: "Tài khoản",
            dataIndex: "taiKhoan",
            value: (text, object) => <span>{text}</span>,
            sorter: (a, b) => {
                let user1 = a.taiKhoan.toLowerCase().trim();
                let user2 = b.taiKhoan.toLowerCase().trim();
                if (user1 > user2) return 1;
                return -1;
            },
            sortDirections: ["ascend", "descend"],
            width: '20%',
            fixed: 'left'
        },
        {
            title: "Mật khẩu",
            dataIndex: "matKhau",
            value: (text, object) => <span>{text}</span>,
            width: '20%',
        },
        {
            title: "Họ tên",
            dataIndex: "hoTen",
            sorter: (a, b) => {
                let user1 = a.hoTen.toLowerCase().trim();
                let user2 = b.hoTen.toLowerCase().trim();
                if (user1 > user2) return 1;
                return -1;
            },
            sortDirections: ["ascend", "descend"],
            width: '20%',
        },
        {
            title: "Số điện thoại",
            dataIndex: "soDt",
            value: (text, object) => <span>{text}</span>,
            width: '10%',
        },
        {
            title: "Email",
            dataIndex: "email",
            value: (text, object) => <span>{text}</span>,
            width: '20%',
        },
        {
            title: "Mã loại người dùng",
            dataIndex: "maLoaiNguoiDung",
            value: (text, object) => <span>{text}</span>,
            width: '10%',
        },
        {
            title: "",
            render: (text, user, index) => {
                return (
                    <div className="flex items-center justify-center flex-col md:flex-row">
                        <button
                            className="rounded bg-yellow-600 hover:bg-yellow-700 p-2 mx-1 my-2 text-white flex items-center justify-center"

                        >
                            <EditOutlined />
                        </button>
                        <Popconfirm
                            title={`Bạn có chắc muốn xóa người dùng ${user.hoTen} không?`}
                            onConfirm={() => confirm(user)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <button
                                className="rounded bg-red-600 hover:bg-red-700 p-2 mx-1 my-2 text-white flex items-center justify-center">
                                <DeleteOutlined />
                            </button>
                        </Popconfirm>
                    </div>
                );
            },
            fixed: "right",
            width: 80,
        },
    ];

    const data = danhSachNguoiDung;
    const onSearch = value => {
        dispatch(layDanhSachNguoiDungAction(value));
    }
    const onEnter = e => {
        setSearch(e.target.value);
    };
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const formik = useFormik({

    });
    return (
        <div className="container my-5">
            <h3 className="text-3xl font-bold mb-4">Quản lý người dùng</h3>
            <div className="grid grid-cols-12 mb-3 ">
                <button
                    className="bg-blue-600 hover:bg-blue-500 text-white rounded-md px-3 py-2 col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2"
                    onClick={showModal}
                >
                    Thêm người dùng
                </button>
                <Modal title="Thêm người dùng" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <Form>
                        <Form.Item label="Tài khoản">
                            <Input
                                name="taiKhoan"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </Form.Item>
                    </Form>
                </Modal>
                <Search
                    className="pl-3 rounded col-span-6 md:col-span-8 lg:col-span-9 xl:col-span-10"
                    placeholder="Nhập nội dung"
                    enterButton="Search"
                    size="large"
                    onSearch={onSearch}
                    onPressEnter={onEnter}
                    allowClear
                    enterButton
                />
            </div>
            <Table
                columns={columns} dataSource={data} rowKey="taiKhoan"
            />
        </div>
    )
}
