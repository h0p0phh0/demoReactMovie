import React from 'react'
import { Form, InputNumber, Button, DatePicker, Cascader, Select } from 'antd';
import { useState, useEffect } from 'react';
import { quanLyRapService } from '../../../../Service/QuanLyRapService';
import { useFormik } from 'formik';
import moment from 'moment';
import { quanLyDatVeService } from '../../../../Service/QuanLyDatVeService';

export default function ShowTime(props) {

    const formik = useFormik({
        initialValues: {
            maPhim: props.match.params.id,
            ngayChieuGioChieu: '',
            maRap: '',
            giaVe: ''
        },
        onSubmit: async (values) => {
            console.log('values', values);
            try {
                const result = await quanLyDatVeService.taoLichChieu(values);
                alert(result.data.content)
            } catch (errors) {
                console.log('errors', errors.response?.data);

            }
        }
    })



    const [state, setState] = useState({
        heThongRapChieu: [],
        cumRapChieu: []
    })
    console.log(state.heThongRapChieu)
    useEffect(async () => {
        try {
            let result = await quanLyRapService.layThongTinHeThongRap();

            setState({
                ...state,
                heThongRapChieu: result.data.content
            })

        } catch (errors) {
            console.log('errors', errors.response?.data)
        }
    }, [])
    const handleChangeHeThongRap = async (value) => {
        // console.log('maHeThongRap',values)
        // tu he thong rap call api lay thong tin he thong rap
        try {
            let result = await quanLyRapService.layThongTinCumRapTheoHeThong(value);
            //gan gia tri cum rap vao state.cumRap
            setState({
                ...state,
                cumRapChieu: result.data.content
            })
        } catch (errors) {
            console.log('errors', errors.response?.data)
        }

    }
    const handleChangeCumRap = (value) => {
        formik.setFieldValue('maRap', value)
    }
    const onOk = (values) => {
        formik.setFieldValue('ngayChieuGioChieu', moment(values).format('DD/MM/YYYY hh:mm:ss'))
        console.log('valuesD', moment(values).format('DD/MM/YYYY hh:mm:ss'))

    }
    const onChangeData = (values) => {
        formik.setFieldValue('ngayChieuGioChieu', moment(values).format('DD/MM/YYYY hh:mm:ss'))
        console.log('valuesD', moment(values).format('DD/MM/YYYY hh:mm:ss'))
    }
    const onChangeInputNumber = (values) => {
        formik.setFieldValue('giaVe', values)
    }


    // tach ham ra viet rieng
    const convertSelectHTR = () => {
        //c1
        // state.heThongRapChieu?.map((htr,index)=>({label:htr.tenHeThongRap, value:htr.tenHeThongRap}))
        // state.heThongRapChieu?.map((htr,index)=>{return{label:htr.tenHeThongRap,value:htr.tenHeThongRap}})
        //c2
        return state.heThongRapChieu?.map((htr, index) => {
            return { label: htr.tenHeThongRap, value: htr.maHeThongRap }
        })

    }

    //luc nao cung co  gia tri default
    let film = {};
    if (localStorage.getItem('filmParams')) {
        film = JSON.parse(localStorage.getItem('filmParams'));
    }
    return (
        <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 10 }}
            initialValues={{ remember: true }}
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
            onSubmitCapture={formik.handleSubmit}
        >
            <Form.Item wrapperCol={{ offset: 4, span: 10 }}>
                <h1 className="text-4xl text-center">T???o L???ch Chi???u - {props.match.params.tenPhim}</h1>
                <img src={film.hinhAnh} alt="..." width={300} height={250} />
            </Form.Item>

            <Form.Item
                label="H??? th???ng r???p"
            >
                <Select options={convertSelectHTR()} onChange={handleChangeHeThongRap} placeholder="Ch???n h??? th???ng r???p" />
            </Form.Item>
            <Form.Item
                label="C???m r???p"
            >
                <Select options={state.cumRapChieu?.map((cumRap, index) => ({ label: cumRap.tenCumRap, value: cumRap.maCumRap }))} onChange={handleChangeCumRap} placeholder="Ch???n C???m r???p" />
            </Form.Item>
            <Form.Item
                label="Ch???n ng??y gi??? chi???u"
            >
                <DatePicker format="DD/MM/YYYY hh:mm:ss" showTime onChange={onChangeData} onOk={onOk} />
            </Form.Item>
            <Form.Item
                label="Ch???n gi?? v??"
            >
                <InputNumber onChange={onChangeInputNumber} />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 4, span: 10 }}>
                <Button type="primary" htmlType="submit">
                    T???o l???ch chi???u
                </Button>
            </Form.Item>
        </Form>
    )
}
