import React from 'react';
import { MenuContext, useMenu, useMenuItem } from './MenuContext';


export function Menu(props) {
	const {
		children,
		...options
	} = props;

	const [menuContext, submenu] = useMenu();
	useMenuItem(() => ({
		...options,
		submenu,
	}), [submenu, props]);

	return <MenuContext.Provider value={menuContext}>
		{children}
	</MenuContext.Provider>;
}
