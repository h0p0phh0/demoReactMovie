import "./App.css";
import { createBrowserHistory } from "history";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import { Route, Router, Switch } from "react-router";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import News from "./pages/News/News";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Detail from "./pages/Detail/Detail";
import CheckoutTemplate from "./templates/CheckoutTemplate/CheckoutTemplate";
import Checkout from './pages/Checkout/Checkout';
import { Suspense, lazy } from 'react'
// const CheckoutTemplateLazy = lazy(() => import("./templates/CheckoutTemplate/CheckoutTemplate"))
import { UserTemplate } from './templates/UserTemplate/UserTemplate';
import Loading from "./components/Loading/Loading";
import Profile from './pages/Profile/Profile';
import AdminTemplate from "./templates/AdminTemplate/AdminTemplate";
import Dashboard from './pages/Admin/Dasboard/Dashboard';
import Films from './pages/Admin/Films/Films';
import AddFilm from './pages/Admin/Films/AddFilm/AddFilm';
import Edit from './pages/Admin/Films/Edit/Edit';
import ShowTime from "./pages/Admin/Films/ShowTimes/ShowTime";

export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Loading/>
      <Switch>
        <HomeTemplate path="/home" exact Component={Home} />
        <HomeTemplate path="/news" exact Component={News} />
        <HomeTemplate path="/contact" exact Component={Contact} />
        <HomeTemplate path="/detail/:id" exact Component={Detail} />
        <HomeTemplate path="/profile" exact Component={Profile} />

        <CheckoutTemplate path="/checkout/:id" exact Component={Checkout}/>
        
        <UserTemplate path="/register" exact Component={Register} />
        <UserTemplate path="/login" exact Component={Login}/>

        <AdminTemplate path="/admin" exact Component={Dashboard}/>
        <AdminTemplate path="/admin/films" exact Component={Films}/>
        <AdminTemplate path="/admin/films/addfilm" exact Component={AddFilm}/>
        <AdminTemplate path="/admin/films/edit/:id" exact Component={Edit}/>
        <AdminTemplate path="/admin/films/showtime/:id/:tenPhim" exact Component={ShowTime}/>
        <AdminTemplate path="/admin/users" exact Component={Dashboard} />
        

        <HomeTemplate path="/" exact Component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
