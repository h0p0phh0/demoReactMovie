import { quanLyPhimService } from "../../Service/QuanLyPhimService";
import { SET_DANH_SACH_PHIM, SET_THONG_TIN_PHIM } from "./types/QuanLyPhimType";
import { history } from './../../App';

export const layDanhSachPhimAction = (tenPhim='') => {
    return async (dispatch)=>{
        try{
            const result = await quanLyPhimService.layDanhSachPhim(tenPhim);
            dispatch({
                type: SET_DANH_SACH_PHIM,
                arrFilm:result.data.content
            })
        }catch (errors){
            console.log('errors',errors)
        }
    }
    
}

export const themPhimUploadHinhAction = (formData) =>{
    return async (dispatch) =>{
        try{
            let result = await quanLyPhimService.themPhimUploadHinh(formData);
            alert('Thêm phim thành công');
            console.log('result',result.data.content);

        }catch(errors){
            console.log('errors',errors.response?.data)
            alert('Thêm phim thất bại');
        }
       
    }
}

export const layThongTinPhimAction = (maPhim)=>{
    return async (dispatch) =>{
        try{
            let result = await quanLyPhimService.layThongTinPhim(maPhim);
            
            console.log('result',result.data.content);

            dispatch({
                type:SET_THONG_TIN_PHIM,
                thongTinPhim: result.data.content
            })

        }catch(errors){
            console.log('errors',errors.response?.data)
            
        }
       
    }
}


export const capNhatPhimUploadAction = (formData) => {
    return async (dispatch) =>{
        try{
            let result = await quanLyPhimService.capNhatPhimUpload(formData);
            alert('Cập nhật thành công');
            console.log('result',result.data.content);
            // cap nhat lai state cua redux 
            dispatch(layDanhSachPhimAction())
            history.push('/admin/films')

        }catch(errors){
            console.log('errors',errors.response?.data)
            alert('Cập nhật thất bại');
        }
       
    }
}

export const xoaPhimAction = (maPhim) => {
    return async (dispatch) =>{
        try{
            let result = await quanLyPhimService.xoaPhim(maPhim);
            alert('Xóa thành công');
            console.log('result',result.data.content);
            // cap nhat lai state cua redux  sau khi xoa load lai danh sach phim
            dispatch(layDanhSachPhimAction())
            

        }catch(errors){
            console.log('errors',errors.response?.data)
            alert('Xóa phim thất bại');
        }
    }
}