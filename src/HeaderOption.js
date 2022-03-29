import React from 'react';
import './HeaderOption.css';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';

// material ui
// import IconButton from '@material-ui/core/IconButton';
import { Avatar } from '@material-ui/core';

const HeaderOption = ({ title, Icon, avatar, onClick }) => {
  const user = useSelector(selectUser);

  return (
    <div onClick={onClick} className='headerOption'>
      {Icon && <Icon className='headerOption__icon' />}
      {avatar && <Avatar src={avatar}>{user?.email[0]}</Avatar>}
      <p className='headerOption__title'>{title}</p>
    </div>
  );
};

export default HeaderOption;
