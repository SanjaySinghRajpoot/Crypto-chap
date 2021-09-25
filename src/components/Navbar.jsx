import React from 'react'
import { Button, Menu, Typography, Avatar } from 'antd'; 
import { Link } from "react-router-dom";

import { HomeOutlined, MoneyOutlined, BulbOutlined, FundOutlined, MenuOutlined, MoneyCollectOutlined } from '@ant-design/icons';

// import icon from "../images/png-image.png"

const Navbar = () => {
    return (
        <div className="nav-container">
            <div className="logo-container">
              <Avatar size="large"/>
               <Typography.Title level={2} className="logo">
                  <Link to="/">Cryptoverse</Link>
               </Typography.Title>
            </div>
            <Menu theme = "dark"> 
                <Menu.Item icon={<HomeOutlined />}>
                  <Link to="/">Cryptoverse</Link>
                </Menu.Item>
                <Menu.Item icon={<FundOutlined />}>
                  <Link to="/cryptocurrencies">Cryptocurrencies</Link>
                </Menu.Item>
                <Menu.Item icon={<MoneyCollectOutlined />}>
                  <Link to="/exchanges">Exchanges</Link>
                </Menu.Item>
                <Menu.Item icon={<BulbOutlined />}>
                  <Link to="/news">News</Link>
                </Menu.Item>
            </Menu>
        </div>
    )
}

export default Navbar;
