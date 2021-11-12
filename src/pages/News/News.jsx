import React from 'react'
import { NavLink } from 'react-router-dom';
import "./News.css"
import { useSelector } from 'react-redux';
export default function News() {

    return (
        <div id="notfound">
            <div className="notfound">
                <div className="notfound-404">
                    <h1>Oops!</h1>
                    <h2>404 - The Page can't be found</h2>
                </div>
                <NavLink to="/">Go To Homepage</NavLink>
            </div>
        </div>
    )
}
