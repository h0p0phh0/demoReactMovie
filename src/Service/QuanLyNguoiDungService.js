import { GROUPID } from '../util/settings/config';
import { baseService } from './baseService';

export class QuanLyNguoiDungService extends baseService{
    constructor() {
        super();
        
    }
    dangNhap = (thongTinDangNhap) => {
        return this.post(`/api/QuanLyNguoiDung/DangNhap`,thongTinDangNhap)
    }
    dangKy = (thongTinDangKy) => {
        return this.post(`/api/QuanLyNguoiDung/DangKy`,thongTinDangKy)
    }
    layThongTinNguoiDung = () => {
        return this.post('/api/QuanLyNguoiDung/ThongTinTaiKhoan')
    }
    layDanhSachNguoiDung = (searchValue) => {
        if(searchValue!=''){
       return this.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}&tuKhoa=${searchValue}`)

        }
       return this.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}`)
    }
    themNguoiDung = (thongTinDangKy) =>{
        return this.post(`/api/QuanLyNguoiDung/ThemNguoiDung`, thongTinDangKy)
    }
}

export const quanLyNguoiDungService = new QuanLyNguoiDungService();