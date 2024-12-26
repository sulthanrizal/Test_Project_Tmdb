import './index.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { getAccount } from '../../axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { onClickNav } from '../../@helper';
import { notif } from './notif';
import Logo from './logo.png'


const Header = () => {
    const [account, setAccount] = useState([])
    const navigate = useNavigate()
    const { pathname } = useLocation()



    const onNav = (id) => {
        const element = document?.getElementById(id)
        console.log(id, 'id', element?.clientHeight)

        if (window.innerWidth <= 768) {
            window.scrollTo({ top: element.offsetTop - 65, behavior: "smooth" });
        } else if (window.innerWidth <= 1050) {
            window.scrollTo({ top: element.offsetTop - 70, behavior: "smooth" });
        } else {

            if (id === 'listmovies') {
                window.scrollTo({ top: element?.clientHeight - 70, behavior: "smooth" });
            } else if (id == 'slick-container') {
                window.To({ top: element?.clientHeight - 10000, behavior: "smooth" });
            } else {
                console.log('Error: Invalid ID');
            }
        }

    }

    useEffect(() => {
        getAccount(setAccount)
    }, [])
    const firstLetter = account?.username?.charAt(0) || "";

    return (
        <>
            {
                pathname == '/' ? (
                    <div className="container-header all">
                        <div className='nav-menu'>
                            <div className='nav-menu-left'>
                                <img style={{ cursor: 'pointer' }} src={Logo} className='logo' onClick={() => { onNav('slick-container') }} />
                                <p onClick={() => { onNav('listmovies') }} className='p'>Movies</p>
                            </div>
                            <div className='nav-menu-right'>
                                <p className='user-pp p' >{firstLetter}</p>
                                <div className="dropdown">
                                    <button className="dropbtn">< FontAwesomeIcon icon={faBell} className='p' style={{ marginLeft: '-20px' }} />
                                        <i className="fa fa-caret-down"></i>
                                    </button>
                                    <div className="dropdown-content">
                                        {
                                            notif.map((item, index) => {
                                                return <a href="#" key={index}>{item.notifikasi}</a>
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="container-header all">
                        <div className='nav-menu'>
                            <div className='nav-menu-left'>
                                <img style={{ cursor: 'pointer' }} src={Logo} className='logo' onClick={() => { onClickNav({ path: '/', navigate }) }} />
                            </div>
                            <div className='nav-menu-right'>
                                <p className='user-pp p' >{firstLetter}</p>
                                <div className="dropdown">
                                    <button className="dropbtn">< FontAwesomeIcon icon={faBell} className='p' style={{ marginLeft: '-20px' }} />
                                        <i className="fa fa-caret-down"></i>
                                    </button>
                                    <div className="dropdown-content">
                                        {
                                            notif.map((item, index) => {
                                                return <a href="#" key={index}>{item.notifikasi}</a>
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

        </>
    )
}

export default Header;