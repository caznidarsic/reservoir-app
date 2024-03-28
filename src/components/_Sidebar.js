import React from 'react';
import { Link } from 'react-router-dom';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import reservoirIDs from '../constants/reservoirIDs';

function _Sidebar() {

    const resLinks = reservoirIDs.map((res) => {
        const to = `/${res.id}`;
        return (
            <MenuItem key={res.id} component={<Link to={to} />}>{res.name}</MenuItem>
        )
    }
    )

    return (
        <nav>
            <Sidebar width="100%" height="50%">
                <Menu>
                    <MenuItem component={<Link to="/" />}>Home</MenuItem>
                    <SubMenu label="Reservoirs" defaultOpen={true}>
                        {resLinks}
                    </SubMenu>
                </Menu>
            </Sidebar>
        </nav>
    );

}

export default _Sidebar;