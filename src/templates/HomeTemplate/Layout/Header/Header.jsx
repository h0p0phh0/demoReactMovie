import React, { useState } from 'react'
import Logo from '../../../../assets/Logo/web-logo.png'
import { NavLink } from 'react-router-dom'
import { history } from '../../../../App'
import { TOKEN, USER_LOGIN } from '../../../../util/settings/config';
import { Select } from 'antd';
import i18n from '../../../../i18n';
import { Fragment } from 'react';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';




const { Option } = Select;
export default function Header() {
    const handleChange = (value) => {
        i18n.changeLanguage(value)
    }
    const { t, i18n } = useTranslation();

    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);

    const renderLogin = () => {
        if (_.isEmpty(userLogin)) {
            return <Fragment>
                <button onClick={() => {
                    history.push('/login')
                }} className="self-center px-8 py-3 rounded capitalize">{t('signin')}</button>
                <button onClick={() => {
                    history.push('/register')
                }} className="self-center px-8 py-3 font-semibold rounded bg-violet-600 text-coolGray-50 capitalize">{t('register')}</button>

            </Fragment>
        }


        return (
            <Fragment>
                <button onClick={() => {
                    history.push('/profile')
                }} className="self-center px-8 py-3 rounded">Hello ! {userLogin.taiKhoan
                }</button>
                <button onClick={() => {
                    localStorage.removeItem(USER_LOGIN);
                    localStorage.removeItem(TOKEN);
                    history.push('/home');
                    window.location.reload();
                }} className="text-black-500 font-bold mr-5 capitalize">{t('log out')}
                </button>
            </Fragment>
        )
    }

    return (
        <header className="p-4  bg-white bg-opacity-95 text-black fixed w-full z-10 h-16 top-0">
            <div className="container flex justify-between h-full mx-auto">
                <NavLink to="/" aria-label="Back to homepage" className="flex items-center p-2">
                    <img src={Logo} alt="cybersoft" className="w-1/2" />
                </NavLink>
                <ul className="items-stretch hidden space-x-3 lg:flex mb-0" >
                    <li className="flex">
                        <NavLink to="/home" className="header-text flex items-center px-4 dark:border-transparent dark:text-violet-400 dark:border-violet-400 capitalize hover:text-red-500 text-gray-900 leading-16"
                         activeClassName="text-red-500">{t('home')}
                         </NavLink>
                    </li>
                    <li className="flex">
                        <NavLink to="/news" className="header-text flex items-center px-4 dark:border-transparent capitalize hover:text-red-500 text-gray-900" activeClassName=" text-red-500">{t('news')}
                        </NavLink>
                    </li>
                    <li className="flex">
                        <NavLink to="/contact" className="header-text flex items-center px-4 dark:border-transparent capitalize hover:text-red-500 text-gray-900" 
                        activeClassName="text-red-500">{t('contact')}
                        </NavLink>
                    </li>

                </ul>

                <div className="items-center flex-shrink-0 hidden lg:flex">

                    {renderLogin()}

                    <Select defaultValue="en" style={{ width: 100 }} onChange={handleChange}>
                        <Option value="en">Eng</Option>
                        <Option value="chi">Chi</Option>

                        <Option value="vi">Vi</Option>
                    </Select>

                </div>
                <div className="p-4 lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 dark:text-coolGray-100">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>


                </div>
            </div>
        </header >

    )
}
