import { CHANGE_TAB_ACTIVE, CHUYEN_TAB, DAT_GHE, DAT_VE, DAT_VE_HOAN_TAT, SET_CHI_TIET_PHONG_VE } from "../actions/types/QuanLyDatVeType"
import { ThongTinLichChieu } from '../../_core/models/ThongTinPhongVe'
const stateDefault = {
    chiTietPhongVe: new ThongTinLichChieu(),
    danhSachGheDangDat: [],
    danhSachGheKhachDat:[],
    //{maGhe:64327},{maGhe:64328}
    tabActive:1
}
export const QuanLyDatVeReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case SET_CHI_TIET_PHONG_VE: {
            state.chiTietPhongVe = action.chiTietPhongVe;
            return { ...state }
        }
        case DAT_VE: {
            //cap nhat danh sach ghe
            // console.log(action)
            let danhSachGheCapNhat = [...state.danhSachGheDangDat];
            let index = danhSachGheCapNhat.findIndex(gheDD => gheDD.maGhe === action.gheDuocChon.maGhe);
            if (index != -1) {
                danhSachGheCapNhat.splice(index, 1);
            } else {
                danhSachGheCapNhat.push(action.gheDuocChon);
            }
            return { ...state, danhSachGheDangDat: danhSachGheCapNhat }
        }
        case DAT_VE_HOAN_TAT:{
            state.danhSachGheDangDat = [];
            return {...state}
        }
        case CHUYEN_TAB:{
            state.tabActive = 2 ;
            return {...state}
        }
        case CHANGE_TAB_ACTIVE:{    
            state.tabActive = action.number;
            return {...state}
        }
        case DAT_GHE:{
            state.danhSachGheKhachDat = action.arrGheKhachDat;
            return{...state}
        }
        default: return { ...state }
        
    }

}

// let danhSachGheCapNhat = [...state.danhSachGheDangDat];
//             let index = danhSachGheCapNhat.findIndex(gheDD => gheDD.maGhe === action.gheDuocChon.maGhe);
//             if(index!=-1){
//                 danhSachGheCapNhat.splice(index,1);
//             }else {
//                 danhSachGheCapNhat.push(action.gheDuocChon);
//             }
//             return {...state}