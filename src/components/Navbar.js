import React, {useState} from 'react'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons'

function Navbar() {
    const [sidebar, setSiderbar] = useState(false);

    const showSideBar = () => setSiderbar(!sidebar);

    return (

        <>
        <IconContext.Provider value={{color: 'black'}}>
            <div className="navbar">
                <Link to="#" className='menu-bars'>
                    <FaIcons.FaBars onClick={showSideBar}/>
                </Link>
                <h1 className="title">PersonalTrainer</h1>
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items' onClick={showSideBar}>
                    {SidebarData.map((item, index) => {
                        return (
                            <li key={index} className={item.className}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        );
                    })}
                    <li className="navbar-toggle">
                        <Link to="#" className='menu-bars'>
                            <AiIcons.AiOutlineClose/>
                        </Link>
                    </li>
                </ul>
            </nav>
            </IconContext.Provider>
        </>
    )
}

export default Navbar