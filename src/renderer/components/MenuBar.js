import { remote } from 'electron';
import React, { useEffect } from 'react';
import { MenuContext, useMenu } from './MenuContext';

export function MenuBar({ children, browserWindow }) {
	const [menuContext, menu] = useMenu();

	useEffect(() => {
		if (!menu) {
			return;
		}

		if (browserWindow) {
			browserWindow.setMenu(menu);
			return;
		}

		remote.Menu.setApplicationMenu(menu);
	}, [browserWindow, menu]);

	return <MenuContext.Provider value={menuContext}>
		{children}
	</MenuContext.Provider>;
}
