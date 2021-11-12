
import { DANG_KY_ACTION, DANG_NHAP_ACTION, LAY_DANH_SACH_NGUOI_DUNG, OPEN_ADMIN_MODAL, SET_THONG_TIN_NGUOI_DUNG, THEM_NGUOI_DUNG } from "./types/QuanLyNguoiDungType";
import { history } from '../../App'
import { quanLyNguoiDungService } from "../../Service/QuanLyNguoiDungService";
import {message} from "antd";




export const dangNhapAction = (thongTinDangNhap) => {



    return async (dispatch) => {

        try {
            const result = await quanLyNguoiDungService.dangNhap(thongTinDangNhap);


            if (result.data.statusCode === 200) {
                dispatch({
                    type: DANG_NHAP_ACTION,
                    thongTinDangNhap: result.data.content
                });
                //Chuyển hướng đăng nhập về trang trước đó
                history.push("/");
            }

            console.log('result', result);
            alert("Đăng nhập thành thành công!");

        } catch (error) {
            console.log('error', error.response.data);
            alert("Đăng nhập thất bại!");
        }

    }

}
export const dangKyAction = (thongTinDangKy) => {
    return async (dispatch) => {

        try {
            const result = await quanLyNguoiDungService.dangKy(thongTinDangKy);


            if (result.data.statusCode === 200) {
                dispatch({
                    type: DANG_KY_ACTION,
                    thongTinDangKy: result.data.content
                });
                //Chuyển hướng đăng nhập về trang trước đó
                history.push("/");
            }

            console.log('Đăng ký thành công', result);
            alert("Đăng ký thành công!");

        } catch (error) {
            console.log('Đăng ký thất bại', error.response.data);
            alert("Đăng ký thất bại!");

        }

    }
}


export const layThongTinNguoiDungAction = (thongTinDangNhap) => {



    return async (dispatch) => {

        try {
            const result = await quanLyNguoiDungService.layThongTinNguoiDung();


            if (result.data.statusCode === 200) {
                dispatch({
                    type: SET_THONG_TIN_NGUOI_DUNG,
                    thongTinNguoiDung: result.data.content
                });

            }

            console.log('SET_THONG_TIN_NGUOI_DUNG', result);

        } catch (error) {
            console.log('SET_THONG_TIN_NGUOI_DUNG', error.response.data);
        }

    }

}
export const layDanhSachNguoiDungAction = (searchValue) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.layDanhSachNguoiDung(searchValue);


            if (result.data.statusCode === 200) {
                dispatch({
                    type: LAY_DANH_SACH_NGUOI_DUNG,
                    danhSachNguoiDung: result.data.content
                });

            }

            console.log('layDanhSachNguoiDungAction', result);

        } catch (error) {
            console.log('layDanhSachNguoiDungAction', error.response.data);
        }
    }
}
export const OpenAdminModalAction = (componentType, user = {}) => {
    return (dispatch) => {
        dispatch({type: OPEN_ADMIN_MODAL, componentType, user});
    };
};
export const themNguoiDungAction = (user) => {
    return (dispatch) => {
        let promise = quanLyNguoiDungService.themNguoiDung(user);
        promise.then((res) => {
            dispatch({type: THEM_NGUOI_DUNG, user})
            message.success('Thêm người dùng thành công!');
        })
        promise.catch((err) => {
            console.log(err.response?.data)
            message.error('Thêm người dùng thất bại!');
        })
    }
}