import React, { useState } from 'react';
import {
    Form,
    Input,
    Button,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
} from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { capNhatPhimAction, capNhatPhimUploadAction, themPhimUploadHinhAction } from '../../../../redux/actions/QuanLyPhimAction';
import { GROUPID, REGEX_URL } from '../../../../util/settings/config';
import * as Yup from "yup";
import { useEffect } from 'react';
import { layThongTinPhimAction } from './../../../../redux/actions/QuanLyPhimAction';
import { useSelector } from 'react-redux';
import { QuanLyPhimReducer } from './../../../../redux/reducer/QuanLyPhimReducer';
const { TextArea } = Input;


const Edit = (props) => {
    const [componentSize, setComponentSize] = useState('default');
    const { thongTinPhim } = useSelector(state => state.QuanLyPhimReducer);
    console.log({ thongTinPhim })
    const [imgSrc, setImgSrc] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        let { id } = props.match.params;
        dispatch(layThongTinPhimAction(id))
    }, [])



    const formik = useFormik({
        //dua prop vao state cua formilk dung thuoc tinh enableReinitialize: chi nen su dung cho form edit

        enableReinitialize: true,
        initialValues: {
            maPhim:thongTinPhim.maPhim, // default de khong thay doi duoc 
            // neu co tham so thu hai nen kiem tra truoc 
            tenPhim: thongTinPhim?.tenPhim,
            trailer: thongTinPhim?.trailer,
            moTa: thongTinPhim?.moTa,
            ngayKhoiChieu: thongTinPhim.ngayKhoiChieu, //moment
            dangChieu: thongTinPhim.dangChieu, //bo
            sapChieu: thongTinPhim.sapChieu, //bo
            hot: thongTinPhim.hot, //bo
            danhGia: thongTinPhim.danhGia, //num
            hinhAnh: null,
            maNhom: GROUPID
        },
        // validationSchema: Yup.object({
        //     tenPhim: Yup.string().required("Kh??ng ???????c b??? tr???ng"),
        //     trailer: Yup.string()
        //         .required("Kh??ng ???????c b??? tr???ng")
        //         .matches(REGEX_URL, "Ph???i ????ng ?????nh d???ng URL"),
        //     moTa: Yup.string().required("Kh??ng ???????c b??? tr???ng"),
        // }),
        onSubmit: (values) => {
            console.log('values', values)
            values.maNhom = GROUPID;
            //T???o ?????i t?????ng formdata => dua gia tri vbalues tu formik vao formdata
            let formData = new FormData();
            for (let key in values) {
                if (key !== 'hinhAnh') {
                    formData.append(key, values[key]);
                } else {
                    if (values.hinhAnh !== null) {
                        formData.append('File', values.hinhAnh, values.hinhAnh.name);
                    }

                }
            }
            // cap nhat phim upload 
            dispatch(capNhatPhimUploadAction(formData))

        }
    })
    const handleChangeDatePicker = (value) => {
        // console.log('handleChangeDatePicker');

        // let ngayKhoiChieu = moment(value).format('DD/MM/YYYY')
        let ngayKhoiChieu = moment(value);
        formik.setFieldValue('ngayKhoiChieu', ngayKhoiChieu)
    }
    //xu ly switch
    const handleChangeSwitch = (name) => {
        return (value) => {
            formik.setFieldValue(name, value)
        }
    }
    // number
    const handleChangeInputNumber = (name) => {
        return (value) => {
            formik.setFieldValue(name, value);
        }
    }
    // img
    const handleChangeFile = async (e) => {
        //lay file ra tu event
        let file = e.target.files[0];
        //xet dinh dang file img 
        if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/gif' || file === 'image/png') {
            //dem du lieu luu vao formik
            await formik.setFieldValue('hinhAnh', file);
            //tao mot doi tuong de doc file
            let reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onload = (e) => {
                // console.log(e.target.result) 
                setImgSrc(e.target.result);//  hinh dang base64
            }
        }


        // console.log({ file })
    }

    //
    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };
    // cua ant la onsubmitcapture
    return (
        <>
            <Form
                onSubmitCapture={formik.handleSubmit}
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                initialValues={{
                    size: componentSize,
                }}
                onValuesChange={onFormLayoutChange}
                size={componentSize}
            >
                <h1 className="text-center text-4xl">Th??m Phim</h1>
                <Form.Item label="Form Size" name="size">
                    <Radio.Group>
                        <Radio.Button value="small">Small</Radio.Button>
                        <Radio.Button value="default">Default</Radio.Button>
                        <Radio.Button value="large">Large</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="T??n phim">
                    <Input name="tenPhim" onChange={formik.handleChange} value={formik.values.tenPhim} />

                </Form.Item>
                <Form.Item label="Trailer">
                    <Input name="trailer" onChange={formik.handleChange} value={formik.values.trailer} />

                </Form.Item>
                <Form.Item label="M?? T???">
                    <TextArea name="moTa" onChange={formik.handleChange} rows={4} value={formik.values.moTa} />

                </Form.Item>
                <Form.Item label="Ng??y Kh???i Chi???u">
                    <DatePicker format={"DD/MM/YYYY"} onChange={handleChangeDatePicker} value={moment(formik.values.ngayKhoiChieu)} />
                </Form.Item>
                {/* khong can name */}
                <Form.Item label="??ang Chi???u">
                    <Switch onChange={handleChangeSwitch('dangChieu')} checked={formik.values.dangChieu} />
                </Form.Item>
                <Form.Item label="S???p Chi???u">
                    <Switch onChange={handleChangeSwitch('sapChieu')} checked={formik.values.sapChieu} />
                </Form.Item>
                <Form.Item label="Hot">
                    <Switch onChange={handleChangeSwitch('hot')} checked={formik.values.hot} />
                </Form.Item>
                {/*  */}
                <Form.Item label="S??? Sao">
                    <InputNumber onChange={handleChangeInputNumber('danhGia')} min={1} max={10} value={formik.values.danhGia} />
                </Form.Item>
                {/*  */}
                <Form.Item label="H??nh ???nh">
                    <input type="file" onChange={handleChangeFile} accept="image/png, image/gif, image/jpeg" className="mb-5" />
                    <img alt="" style={{ width: 150, height: 200 }} src={imgSrc === '' ? thongTinPhim.hinhAnh : imgSrc} />
                </Form.Item>

                <Form.Item label="T??c V???">
                    <button type="submit" className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">C???p Nh???t</button>
                </Form.Item>
            </Form>
        </>
    );
};

export default Edit;