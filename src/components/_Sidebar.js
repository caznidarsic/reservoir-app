import React from 'react';
import { Link } from 'react-router-dom';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import reservoirIDs from '../constants/reservoirIDs';

function _Sidebar() {

    const resLinks = reservoirIDs.map((res) => {
        return (
            <MenuItem key={res.id} component={<Link to="/ReservoirPage" state={{ reservoir: res }} />}>{res.name}</MenuItem>
        )
    }
    )

    return (
        <nav>
            <Sidebar width="100%" backgroundColor='white'>
                <Menu>
                    <MenuItem component={<Link to="/" />}>Home</MenuItem>
                    <SubMenu label="Reservoirs">
                        {resLinks}
                    </SubMenu>
                </Menu>
            </Sidebar>
        </nav>
    );

}

export default _Sidebar;