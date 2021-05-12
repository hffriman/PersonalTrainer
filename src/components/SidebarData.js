import React from 'react'
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [

    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome/>,
        className: 'nav-text'
    },
   
    {
        title: 'Customers',
        path: '/customers',
        icon: <IoIcons.IoMdPeople/>,
        className: 'nav-text'
    },

    {
        title: 'Trainings',
        path: '/trainings',
        icon: <IoIcons.IoMdBicycle/>,
        className: 'nav-text'
    },



]