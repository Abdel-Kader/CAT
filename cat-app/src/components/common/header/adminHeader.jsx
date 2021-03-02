import React, { useEffect } from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom'
import { getLocalStorage } from '../../../utils/localStorageUtil'
import { logout } from '../../../services/authService'


function AdminHeader(props) {
    const user = getLocalStorage('user')

    const logOut = () => {
        props.dispatch(logout());
        props.history.push('/')
    };
    
    /*useEffect(() => {
        if (user !== null) {
            if (user.profile === 2)
                props.history.push('home');

            if (user.profile === 1)
                props.history.push('dashboard');
        }
    });*/
    return (
        <>
            <nav className="navbar navbar-default navbar-fixed-top">
                <div className="brand">
                    <Link to={"/admin"} exact={"true"}>
                        <span>C.A.T</span>
                    </Link>
                </div>
                <div className="container-fluid">
                    <div className="navbar-btn">
                        <button type="button" className="btn-toggle-fullwidth">
                            <i className="lnr lnr-arrow-left-circle" />
                        </button>
                    </div>

                    <div className="navbar-menu">
                        <ul className="nav navbar-nav navbar-right">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <img src="assets/images/users/doctor.webp" className="img-circle" alt="parson-img" />
                                    <i className="icon-submenu fa fa-angle-down" />
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a href="#"><i className="lnr lnr-user" /> <span>Mon profile</span></a></li>
                                    <li><a href="#"><i className="lnr lnr-envelope" /> <span>Notifications</span></a></li>
                                    <li><a href="#"><i className="lnr lnr-cog" /> <span>Mes disponibilités</span></a></li>
                                    <li>
                                        <a href="#" onClick={logOut}>
                                            <i className="lnr lnr-exit" /> <span>Me déconnecter</span>
                                        </a>
                                    </li>                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div id="sidebar-nav" className="sidebar">
                <div className="sidebar-scroll">
                    <nav>
                        <ul className="nav">
                            <li>
                                <NavLink to="/admin" activeClassName="active" exact={true}>
                                <i className="icofont-dashboard-web" style={{fontSize:18, marginLeft:20}}/><span>Dashboard</span>
                                </NavLink>

                            </li>

                            <li>
                                <NavLink to="/users" activeClassName="active" exact={true}>
                                <i className="icofont-users" style={{fontSize:18, marginLeft:20}}/><span>Utilisateurs</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/rendez-vous" activeClassName="active" exact={true}>
                                <i className="icofont-calendar" style={{fontSize:18, marginLeft:20}}/><span>Rendez-vous</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="" activeClassName="active" exact={true}>
                                <i className="icofont-architecture-alt" style={{fontSize:18, marginLeft:20}}/><span>Téléconsultations</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="" activeClassName="active" exact={true}>
                                <i className="icofont-architecture-alt" style={{fontSize:18, marginLeft:20}}/><span>Télé-expertises</span>
                                </NavLink>
                            </li>

                        </ul>

                    </nav>
                </div>

            </div>
        </>
    )
}

export default withRouter(AdminHeader)
