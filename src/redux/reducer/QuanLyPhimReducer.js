import { SET_DANH_SACH_PHIM, SET_FILM_DANG_CHIEU, SET_FILM_SAP_CHIEU, SET_THONG_TIN_PHIM } from "../actions/types/QuanLyPhimType"
import { SET_CHI_TIET_PHIM } from "../actions/types/QuanLyRapType";

const stateDefault = {
    arrFilm: [{
            "maPhim": 8347,
            "tenPhim": "What If… ?",
            "biDanh": "what-if…-",
            "trailer": "x9D0uUKJ5KI",
            "hinhAnh": "http://movieapi.cyberlearn.vn/hinhanh/what-if…-_gp13.jpg",
            "moTa": "“What If… ?” features fan-favorite characters, including Peggy Carter, T’Challa, Doctor Strange, Killmonger, Thor and more. The new series, directed by Bryan Andrews with AC Bradley as head writer, features signature MCU action with a curious twist.",
            "maNhom": "GP13",
            "ngayKhoiChieu": "2021-08-11T00:00:00",
            "danhGia": 10,
            "hot": true,
            "dangChieu": true,
            "sapChieu": false
        },
        {
            "maPhim": 8348,
            "tenPhim": "Loki",
            "biDanh": "loki",
            "trailer": "nW948Va-l10",
            "hinhAnh": "http://movieapi.cyberlearn.vn/hinhanh/loki_gp13.jpg",
            "moTa": "The mercurial villain Loki resumes his role as the God of Mischief in a new series that takes place after the events of “Avengers: Endgame.”",
            "maNhom": "GP13",
            "ngayKhoiChieu": "2021-06-10T00:00:00",
            "danhGia": 10,
            "hot": true,
            "dangChieu": true,
            "sapChieu": false
        }
    ],
    dangChieu: true,
    sapChieu: true,
    //backup lai phim
    arrFilmDefault: [],
    filmDetail:{},

    thongTinPhim:{} // edit phim
}

export const QuanLyPhimReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case SET_DANH_SACH_PHIM:
            {
                state.arrFilm = action.arrFilm;
                state.arrFilmDefault = state.arrFilm;
                return {...state }
            }
        case SET_FILM_DANG_CHIEU:
            {
                state.dangChieu = !state.dangChieu;

                state.arrFilm = state.arrFilmDefault.filter(film => film.dangChieu === state.dangChieu)
                return {...state }
            }
        case SET_FILM_SAP_CHIEU:
            {
                state.sapChieu = !state.sapChieu;
                state.arrFilm = state.arrFilmDefault.filter(film => film.sapChieu === state.sapChieu)
                return {...state }
            }
        case SET_CHI_TIET_PHIM:
            {
                state.filmDetail = action.filmDetail
                return {...state}
            }
        case SET_THONG_TIN_PHIM:
            {   
                state.thongTinPhim = action.thongTinPhim
                return {...state}
            }
        default:
            return {...state }
    }
}