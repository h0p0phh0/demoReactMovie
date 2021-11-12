import React, { Fragment, useState } from 'react'
import { Tabs, Radio, Space } from 'antd';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
const { TabPane } = Tabs;
export default class HomeMenu extends React.PureComponent {
  state = {
    tabPosition: 'left'
  }
  changeTabPosition = e => {
    this.setState({ tabPosition: e.target.value });
  };
  componentDidMount() {
  }
  renderHeThongRap = () => {
    return this.props.heThongRapChieu?.map((heThongRap, index) => {
      let { tabPosition } = this.state;
      return (
        <TabPane tab={<img src={heThongRap.logo} className="rounded-full" width="50"/>} key={index}>
          <Tabs tabPosition={tabPosition}>
            {heThongRap.lstCumRap?.slice(0, 3).map((cumRap, index) => {
              return (
                <TabPane tab={
                  <div style={{ width: '300px', display: 'flex' }}>
                    <img src="https://s3img.vcdn.vn/123phim/2021/01/bhd-star-discovery-16105949126342.png" width="50"></img>
                    <div className="text-left ml-2">
                      {cumRap.tenCumRap}
                      <p className="text-red-300">Chi tiết</p>
                    </div>
                  </div>
                } key={index}>
                  {/* load phim */}
                  {cumRap.danhSachPhim.slice(0, 4).map((phim, index) => {
                    return (
                      <Fragment key={index}>
                        <div className="my-5">
                          <div style={{ display: 'flex' }}>
                            <img src={phim.hinhAnh} alt={phim.tenPhim} style={{ height: 100, width: 150 }} onError={(e) => { e.target.onerror = null; e.target.src = "https://picsum.photos/75/75" }} />
                            <div className="ml-2">
                              <h1 className="text-2xl text-indigo-900">{phim.tenPhim}</h1>
                              <p>{cumRap.diaChi}</p>
                              <div className="grid grid-cols-5 gap-5">

                                {phim.lstLichChieuTheoPhim?.slice(0, 10).map((lichChieu, index) => {
                                  return (
                                    <NavLink to={`/checkout/${lichChieu.maLichChieu}`} className="text-2xl text-green-500">
                                      {moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}
                                      {/* A la am pm */}
                                    </NavLink>
                                  )
                                })}
                              </div>
                            </div>

                          </div>
                        </div>
                        <hr />
                      </Fragment>
                    )
                  })}
                </TabPane>
              )
            })}
          </Tabs>
        </TabPane>
      )
    })
  }
  render() {
    const { tabPosition } = this.state;
    console.log(this.props, 'props123')

    return (

      <Fragment className="container m-auto">
        <Tabs tabPosition={tabPosition}>
          {this.renderHeThongRap()}
        </Tabs>
      </Fragment>
    )
  }
}
