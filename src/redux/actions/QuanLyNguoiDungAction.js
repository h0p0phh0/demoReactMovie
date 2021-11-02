
import { DANG_KY_ACTION, DANG_NHAP_ACTION, SET_THONG_TIN_NGUOI_DUNG } from "./types/QuanLyNguoiDungType";
import { history } from '../../App'
import { quanLyNguoiDungService } from './../../Service/QuanLyNguoiDung';



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
                history.goBack();
            }

            console.log('result', result);

        } catch (error) {
            console.log('error', error.response.data);
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
                history.goBack();
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
