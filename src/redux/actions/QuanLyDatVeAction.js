import { quanLyDatVeService } from "../../Service/QuanLyDatVeService";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";
import { CHUYEN_TAB, DAT_VE, DAT_VE_HOAN_TAT, SET_CHI_TIET_PHONG_VE } from './types/QuanLyDatVeType';
import { DISPLAY_LOADING, HIDE_LOADING } from './types/LoadingType';
import { displayLoadingAction, hideLoadingAction } from './LoadingAction';
import { QuanLyNguoiDungReducer } from './../reducer/QuanLyNguoiDungReducer';
import { connection } from "../../index";

export const layChiTietPhongVeAction = (maLichChieu) => {
    return async dispatch => {
        try {
            const result = await quanLyDatVeService.layChiTietPhongVe(maLichChieu);
            console.log('result', result);
            if (result.status === 200) {
                dispatch({
                    type: SET_CHI_TIET_PHONG_VE,
                    chiTietPhongVe: result.data.content,

                })
            }
        } catch (errors) {
            console.log('errors', errors)
            console.log('errorsQLDV', errors.response?.data);
        }
    }
}

export const datVeAction = (thongTinDatVe = new ThongTinDatVe()) => {
    return async (dispatch,getState) => {
        try {
            dispatch(displayLoadingAction)
            const result = await quanLyDatVeService.datVe(thongTinDatVe);
            console.log(result.data.content)
            // load lai phong ve khi dat thanh cong
            await dispatch(layChiTietPhongVeAction(thongTinDatVe.maLichChieu))
            await dispatch({type:DAT_VE_HOAN_TAT})
            await dispatch(hideLoadingAction)
            //huy dat khi dat ghe thanh cong
            let userLogin = getState().QuanLyNguoiDungReducer.userLogin
            connection.invoke('datGheThanhCong',userLogin.taiKhoan,thongTinDatVe.maLichChieu)
            dispatch({type:CHUYEN_TAB})

            
        } catch (error) {
            dispatch(hideLoadingAction)

            console.log('datVe', error.response.data)
        }
    }
}

export const datGheAction = (ghe,maLichChieu)=>{
    return async (dispatch,getState)=>{
        //dua thong tin len reducer
        await dispatch({
            type: DAT_VE,
            gheDuocChon: ghe,
        })
        //call api ve backend
        let danhSachGheDangDat = getState().QuanLyDatVeReducer.danhSachGheDangDat;
        let taiKhoan = getState().QuanLyNguoiDungReducer.userLogin.taiKhoan;
        console.log([{danhSachGheDangDat},{taiKhoan},{maLichChieu}])
        //chuyen doi ve string
        danhSachGheDangDat = JSON.stringify(danhSachGheDangDat)
        //call api cua signalR se chay ham ben connection on
        connection.invoke('datGhe',taiKhoan,danhSachGheDangDat,maLichChieu)
    }
}