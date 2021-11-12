import React, { Fragment } from 'react'
import { Button, Table, } from 'antd';
import { Input, Space } from 'antd';
import { AudioOutlined, EditOutlined, DeleteOutlined, CalendarOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { QuanLyPhimReducer } from './../../../redux/reducer/QuanLyPhimReducer';
import { useEffect } from 'react';
import { layDanhSachPhimAction, xoaPhimAction } from './../../../redux/actions/QuanLyPhimAction';
import { NavLink } from 'react-router-dom';
import { history } from '../../../App';





export default function Films() {
    const { arrFilmDefault } = useSelector(state => state.QuanLyPhimReducer);
    console.log({ arrFilmDefault })
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(layDanhSachPhimAction())
    }, [])
    const columns = [
        {
            title: 'Mã Phim',
            dataIndex: 'maPhim',
            value: (text, object) => { return <span>{text}</span> },
            sorter: (a, b) => a.maPhim - b.maPhim,
            sortDirections: ['descend'],
            width: '10%'
        },
        {
            title: 'Hình Ảnh',
            dataIndex: 'hinhAnh',
            render: (text, films, index) => { return <Fragment><img src={films.hinhAnh} alt={films.tenPhim} width={50} height={50} onError={(e) => { e.target.onError = null; e.target.src = `https://picsum.photos/id/${index}/50/50` }} /></Fragment> },
            // defaultSortOrder: 'descend',
            // sorter: (a, b) => a.age - b.age,
            width: '20%'

        },
        {
            title: 'Tên Phim',
            dataIndex: 'tenPhim',
            sorter: (a, b) => {
                let tenPhimA = a.tenPhim.toLowerCase().trim();
                let tenPhimB = b.tenPhim.toLowerCase().trim();
                if (tenPhimA > tenPhimB) {
                    return 1;
                } return -1;
            },
            width: '20%',

            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Mô Tả',
            dataIndex: 'moTa',
            sorter: (a, b) => {
                let moTaA = a.moTa.toLowerCase().trim();
                let moTaB = b.moTa.toLowerCase().trim();
                if (moTaA > moTaB) {
                    return 1;
                } return -1;
            },
            render: (text, film) => {
                return (<Fragment >
                    {film.moTa.length > 50 ? film.moTa.substr(0, 50) + '. . . ' : film.moTa}
                </Fragment>)
            },
            sortDirections: ['descend', 'ascend'],
            width: '30%',

        },
        {
            title: 'Hành Động',
            dataIndex: 'maphim',

            render: (text, film) => {
                return (<Fragment >
                    <NavLink key={1} className="text-4xl hover:text-red-700 flex-auto color" to={`/admin/films/edit/${film.maPhim}`}><EditOutlined /></NavLink>
                    <span key={2} className="text-4xl hover:text-red-700 flex-auto mx-10 text-blue-500" style={{ cursor: 'pointer' }} onClick={() => {
                        // goi action xoa 
                        if (window.confirm('Bạn có chắc muốn xóa phim không ' + film.tenPhim)) {
                            // goi action
                            dispatch(xoaPhimAction(film.maPhim))
                        }
                    }}><DeleteOutlined />
                    </span>
                    {/* <NavLink key={3} className="text-4xl hover:text-red-700 flex-auto" to={`/admin/films/showtime/${film.maPhim}/${film.tenPhim}`} onClick={()=>{
                        localStorage.setItem('filmParams',JSON.stringify(film))
                    }}>
                        <CalendarOutlined />
                    </NavLink> */}
                </Fragment>)
            },
            sortDirections: ['descend', 'ascend'],
            width: '20%'
        },
    ];

    const data = arrFilmDefault;

    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }

    const { Search } = Input;
    const onSearch = value => {
        console.log(value);
        // goi api lay danh sach phim
        dispatch(layDanhSachPhimAction(value));
    };
    return (
        <div className="p-5">
            <h1 className="text-3xl">Quản lý phim</h1>
            <Button className="mb-5" onClick={() => {
                history.push('/admin/films/addfilm')
            }}>Thêm Phim</Button>
            <Search
                className="mb-5"
                placeholder="input search text"
                enterButton="Search"
                size="large"
                onSearch={onSearch}
            />

            <Table columns={columns} dataSource={data} onChange={onChange} rowKey={"maPhim"} />

        </div>
    )
}
