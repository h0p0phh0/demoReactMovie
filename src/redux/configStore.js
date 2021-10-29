import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { CarouselReducer } from './reducer/CarouselReducer';
import { QuanLyPhimReducer } from './reducer/QuanLyPhimReducer';
import { QuanLyRapReducer } from './reducer/QuanLyRapReducer';
import { QuanLyNguoiDungReducer } from './reducer/QuanLyNguoiDungReducer';
import { QuanLyDatVeReducer } from './reducer/QuanLyDatVeReducer';
const rootReducer = combineReducers({
    //state app
    CarouselReducer,
    QuanLyPhimReducer,
    QuanLyRapReducer,
    QuanLyNguoiDungReducer,
    QuanLyDatVeReducer,

})
export const store = createStore(rootReducer, applyMiddleware(thunk));