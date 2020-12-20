import React from 'react'
import {Link, NavLink, withRouter} from 'react-router-dom'
import { getLocalStorage } from '../../../utils/localStorageUtil'


function AdminHeader(props) {
    const user = getLocalStorage('user')

// 	useEffect(() => {
//     if (user != null)
//     {
//       if (user.profile == 2)
//         props.history.push('/home')
//     }
//   }, [])
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
                            <i className="lnr lnr-arrow-left-circle"/>
                        </button>
                    </div>

                    <div className="navbar-menu">
                        <ul className="nav navbar-nav navbar-right">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <img src="assets/images/users/doctor.webp" className="img-circle" alt="parson-img"/>
                                    <i className="icon-submenu fa fa-angle-down"/>
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a href="#"><i className="lnr lnr-user"/> <span>Mon profile</span></a></li>
                                    <li><a href="#"><i className="lnr lnr-envelope"/> <span>Notifications</span></a></li>
                                    <li><a href="#"><i className="lnr lnr-cog"/> <span>Mes disponibilités</span></a></li>
                                    <li><a href="#"><i className="lnr lnr-exit"/> <span>Me déconnecter</span></a></li>
                                </ul>
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
                                    <i data-feather="home"/> <span>Dashboard</span>
                                </NavLink>

                            </li>

                            <li>
                                <NavLink to="/mes-consultations" activeClassName="active" exact={true}>
                                    <i data-feather="users"/><span>Utilisateurs</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/consutation-historique" activeClassName="active" exact={true}>
                                    <i data-feather="calendar"/><span>Rendez-vous</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/consutation-historique" activeClassName="active" exact={true}>
                                    <i data-feather="monitor"/><span>Téléconsultations</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/consutation-historique" activeClassName="active" exact={true}>
                                    <i data-feather="monitor"/><span>Télé-expertises</span>
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
