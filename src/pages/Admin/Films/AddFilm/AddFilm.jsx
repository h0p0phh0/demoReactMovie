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
import { themPhimUploadHinhAction } from '../../../../redux/actions/QuanLyPhimAction';
import { GROUPID, REGEX_URL } from '../../../../util/settings/config';
import * as Yup from "yup";
const { TextArea } = Input;









const AddFilm = () => {
    const [componentSize, setComponentSize] = useState('default');
    const [imgSrc, setImgSrc] = useState('');
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            tenPhim: '',
            trailer: '',
            moTa: '',
            ngayKhoiChieu: '',
            dangChieu: false,
            sapChieu: false,
            hot: false,
            danhGia: 0,
            hinhAnh: {},
        },
        validationSchema: Yup.object({
            tenPhim: Yup.string().required("Không được bỏ trống"),
            trailer: Yup.string()
                .required("Không được bỏ trống")
                .matches(REGEX_URL, "Phải đúng định dạng URL"),
            moTa: Yup.string().required("Không được bỏ trống"),
        }),
        onSubmit: (values) => {
            console.log('values', values)
            values.maNhom = GROUPID;
            //Tạo đối tượng formdata => dua gia tri vbalues tu formik vao formdata
            let formData = new FormData();
            for (let key in values) {
                if (key !== 'hinhAnh') {
                    formData.append(key, values[key]);
                } else {
                    formData.append('File', values.hinhAnh, values.hinhAnh.name);
                }
            }
            //goi api gui gia tri formdata ve backend
            dispatch(themPhimUploadHinhAction(formData))
            // const action = themPhimUploadHinhAction(formData, values);
            // dispatch(action);

            //khong the log ra duoc , phai dung ham get
            // console.log('formData', formData.get('hinhAnh'))
        }
    })
    const handleChangeDatePicker = (value) => {
        // console.log('handleChangeDatePicker');

        let ngayKhoiChieu = moment(value).format('DD/MM/YYYY')
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
    const handleChangeFile = (e) => {
        //lay file ra tu event
        let file = e.target.files[0];
        //xet dinh dang file img 
        if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/gif' || file === 'image/png') {
            //tao mot doi tuong de doc file
            let reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onload = (e) => {
                console.log(e.target.result)
                setImgSrc(e.target.result);//  hinh dang base64
            }
        }
        //dem du lieu luu vao formik
        formik.setFieldValue('hinhAnh', file)

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
                <h1 className="text-center text-4xl">Thêm Phim</h1>
                <Form.Item label="Form Size" name="size">
                    <Radio.Group>
                        <Radio.Button value="small">Small</Radio.Button>
                        <Radio.Button value="default">Default</Radio.Button>
                        <Radio.Button value="large">Large</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="Tên phim">
                    <Input name="tenPhim" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.touched.tenPhim && formik.errors.tenPhim ? (
                        <p className=" bg-red-200 m-0">{formik.errors.tenPhim}</p>
                    ) : null}
                </Form.Item>
                <Form.Item label="Trailer">
                    <Input name="trailer" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.touched.trailer && formik.errors.trailer ? (
                        <p className=" bg-red-200 m-0">{formik.errors.trailer}</p>
                    ) : null}
                </Form.Item>
                <Form.Item label="Mô Tả">
                    <TextArea name="moTa" onChange={formik.handleChange} onBlur={formik.handleBlur} rows={4}/>
                    {formik.touched.moTa && formik.errors.moTa ? (
                        <p className=" bg-red-200 m-0">{formik.errors.moTa}</p>
                    ) : null}
                </Form.Item>
                <Form.Item label="Ngày Khởi Chiếu">
                    <DatePicker format={"DD/MM/YYYY"} onChange={handleChangeDatePicker} />
                </Form.Item>
                {/* khong can name */}
                <Form.Item label="Đang Chiếu">
                    <Switch onChange={handleChangeSwitch('dangChieu')} />
                </Form.Item>
                <Form.Item label="Sắp Chiếu">
                    <Switch onChange={handleChangeSwitch('sapChieu')} />
                </Form.Item>
                <Form.Item label="Hot">
                    <Switch onChange={handleChangeSwitch('hot')} />
                </Form.Item>
                {/*  */}
                <Form.Item label="Số Sao">
                    <InputNumber onChange={handleChangeInputNumber('danhGia')} min={1} max={10} />
                </Form.Item>
                {/*  */}
                <Form.Item label="Hình Ảnh">
                    <input type="file" onChange={handleChangeFile} accept="image/png, image/gif, image/jpeg"  className="mb-5"/>
                    {imgSrc !== "" ? (
                        <img src={imgSrc} alt="" style={{ width: 150, height: 200 }} />
                    ) : null}
                </Form.Item>

                <Form.Item label="Tác Vụ">
                    <button type="submit" className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Thêm Phim</button>
                </Form.Item>
            </Form>
        </>
    );
};

export default AddFilm;