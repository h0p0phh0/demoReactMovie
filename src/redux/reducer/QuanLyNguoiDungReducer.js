import { TOKEN, USER_LOGIN } from '../../util/settings/config';
import { DANG_KY_ACTION, DANG_NHAP_ACTION, LAY_DANH_SACH_NGUOI_DUNG, OPEN_ADMIN_MODAL, SET_THONG_TIN_NGUOI_DUNG, THEM_NGUOI_DUNG } from './../actions/types/QuanLyNguoiDungType';


// kiem tra store
let user = {};
if (localStorage.getItem(USER_LOGIN)) {
    user = JSON.parse(localStorage.getItem(USER_LOGIN))
}



const stateDefault = {
    userLogin: user,
    thongTinNguoiDung: {},
    danhSachNguoiDung: [],
}
export const QuanLyNguoiDungReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case DANG_NHAP_ACTION: {
            const { thongTinDangNhap } = action;
            localStorage.setItem(USER_LOGIN, JSON.stringify(thongTinDangNhap));
            localStorage.setItem(TOKEN, thongTinDangNhap.accessToken)
            return { ...state, userLogin: thongTinDangNhap }
        }
        case DANG_KY_ACTION: {
            const { thongTinDangKy } = action;
            localStorage.setItem(USER_LOGIN, JSON.stringify(thongTinDangKy));
            localStorage.setItem(TOKEN, thongTinDangKy.accessToken)
            return {...state}
        }
        case SET_THONG_TIN_NGUOI_DUNG: {
            state.thongTinNguoiDung = action.thongTinNguoiDung;
            return { ...state }

        }
        case LAY_DANH_SACH_NGUOI_DUNG: {
            state.danhSachNguoiDung = action.danhSachNguoiDung;
            return {...state}
        }
        case THEM_NGUOI_DUNG: {
            state.danhSachNguoiDung.push(action.user);
            return {...state}
        }
        case OPEN_ADMIN_MODAL: {
            state.userChoice = action.user;
            return {...state}
        }
        default:
            return { ...state }
    }
}