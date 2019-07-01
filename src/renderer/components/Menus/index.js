import { remote } from 'electron';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { MenuBar } from '../MenuBar';
import { AppMenu } from './AppMenu';
import { EditMenu } from './EditMenu';
import { ViewMenu } from './ViewMenu';
import { WindowMenu } from './WindowMenu';
import { HelpMenu } from './HelpMenu';


const isMacOs = process.platform === 'darwin';

export function Menus() {
	const hasMenus = useSelector(({ preferences: { hasMenus } }) => hasMenus);

	useEffect(() => {
		if (!isMacOs) {
			remote.getCurrentWindow().setAutoHideMenuBar(!hasMenus);
			remote.getCurrentWindow().setMenuBarVisibility(!!hasMenus);
		}
	}, [hasMenus]);

	return <MenuBar>
		<AppMenu />
		<EditMenu />
		<ViewMenu />
		<WindowMenu />
		<HelpMenu />
	</MenuBar>;
}
