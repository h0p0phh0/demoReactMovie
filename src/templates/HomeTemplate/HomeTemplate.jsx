import { Fragment, useEffect } from "react";
import { Route } from 'react-router';
import Header from "./Layout/Header/Header";
import HomeCarousel from "./Layout/HomeCarousel/HomeCarousel";
import Footer from './Layout/Footer/Footer';

export const HomeTemplate = (props) => { //path,exact,component
    const { Component, ...restProps } = props;
    //de trang web roll len dau khong bi roll vao giua man hinh
    useEffect(()=>{
        return ()=>{
            window.scrollTo(0,0);
        }
    })


    return (
        <Route{...restProps} render={(propsRoute) => { //props.location,props.history,props.match
            return (
                <Fragment>
                    <Header {...propsRoute} />
                    <Component {...propsRoute} />
                    <Footer />
                </Fragment>
            )
        }} />
    )
}