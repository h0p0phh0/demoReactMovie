import React, { useState } from 'react'
import Logo from '../../../../assets/Logo/web-logo.png'
import { NavLink } from 'react-router-dom'
import { history } from '../../../../App'
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { USER_LOGIN } from '../../../../util/settings/config';
export default function Header() {
    const [isLogin, setLogin] = useState(true);
    const menu = (
        <Menu>
            <Menu.Item key="0">
                <NavLink to="/info">Thông tin cá nhân</NavLink>
            </Menu.Item>
            <Menu.Item key="1">
                <NavLink
                    to="/"
                    onClick={() => {
                        setLogin(false);
                        localStorage.clear();
                    }}
                >
                    Đăng xuất
                </NavLink>
            </Menu.Item>
        </Menu>
    );
    const [navbarOpen, setNavbarOpen] = useState(false);

    return (
        <header header className="p-4 dark:bg-coolGray-800 dark:text-coolGray-100 bg-white bg-opacity-25 text-black fixed w-full z-10">
            <div className="container flex justify-between h-16 mx-auto">
                <div
                    className="relative flex justify-end md:w-auto md:static md:block md:justify-start"
                    style={navbarOpen ? { flexBasis: "60vw" } : {}}
                >
                    <button
                        className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block md:hidden outline-none focus:outline-none"
                        type="button"
                        onClick={() => setNavbarOpen(!navbarOpen)}
                    >
                        <i className="fas fa-bars text-gray-900"></i>
                    </button>
                </div>
                <NavLink to="/" aria-label="Back to homepage" className="flex items-center p-2">
                    <img src={Logo} alt="cybersoft" className="w-50" />
                </NavLink>
                <ul className="items-stretch hidden space-x-3 lg:flex">
                    <li className="flex">
                        <NavLink to="/home" className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent dark:text-violet-400 dark:border-violet-400" activeClassName="border-b-1 border-black">Home</NavLink>
                    </li>
                    <li className="flex">
                        <NavLink to="/news" className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent" activeClassName="border-b-1 border-black">News</NavLink>
                    </li>
                    <li className="flex">
                        <NavLink to="/contact" className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent" activeClassName="border-b-1 border-black">Contact</NavLink>
                    </li>

                </ul>
                {localStorage.getItem(USER_LOGIN) ? (
                    <div
                        className={
                            "relative text-center" +
                            (navbarOpen
                                ? " mt-2 justify-center block items-center text-center"
                                : " w-1/5 justify-end inline-block")
                        }
                    >
                        <Dropdown overlay={menu} trigger={["click"]}>
                            <a
                                className="ant-dropdown-link text-base text-center font-bold text-gray-900 hover:text-red-600"
                                onClick={(e) => e.preventDefault()}
                            >
                                Xin chào,{" "}
                                {JSON.parse(localStorage.getItem(USER_LOGIN)).hoTen}{" "}
                                <DownOutlined />
                            </a>
                        </Dropdown>
                    </div>
                ) : (<div className="items-center flex-shrink-0 hidden lg:flex">
                    <button onClick={() => history.push('/login')} className="self-center px-8 py-3 rounded">Sign in</button>
                    <button onClick={() => history.push('/register')} className="self-center px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-coolGray-900">Sign up</button>
                </div>)}

                <div button className="p-4 lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 dark:text-coolGray-100">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </div>
        </div>
        </header >

    )
}
