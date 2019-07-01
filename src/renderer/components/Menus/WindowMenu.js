import { t } from 'i18next';
import React from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Menu } from '../Menu';
import { MenuItem } from '../MenuItem';
import { MenuSeparator } from '../MenuSeparator';
import { menuItemClicked } from '../../../actions/menus';


const isMacOs = process.platform === 'darwin';

export function WindowMenu() {
	const {
		servers = [],
		activeServerUrl,
		showWindowOnUnreadChanged,
	} = useSelector(({
		servers,
		view,
		preferences: {
			showWindowOnUnreadChanged,
		},
	}) => ({
		servers,
		activeServerUrl: view.url,
		showWindowOnUnreadChanged,
	}));
	const dispatch = useDispatch();
	const onAction = bindActionCreators(menuItemClicked, dispatch);

	return <Menu role="window" label={t('menus.windowMenu')}>
		{isMacOs && <>
			<MenuItem
				label={t('menus.addNewServer')}
				accelerator="CommandOrControl+N"
				click={() => onAction('add-new-server')}
			/>
			<MenuSeparator />
		</>}
		{servers.map((server, i) => <MenuItem
			key={i}
			label={(server.title && server.title.replace(/&/g, '&&')) || server.url}
			type={server.url === activeServerUrl ? 'radio' : 'normal'}
			checked={server.url === activeServerUrl}
			accelerator={`CommandOrControl+${ i + 1 }`}
			click={() => onAction('select-server', server)}
		/>)}
		<MenuSeparator />
		<MenuItem
			label={t('menus.reload')}
			accelerator="CommandOrControl+Shift+R"
			click={() => onAction('reload-app')}
		/>
		<MenuItem
			label={t('menus.toggleDevTools')}
			click={() => onAction('toggle-devtools')}
		/>
		<MenuSeparator />
		<MenuItem
			label={t('menus.showOnUnreadMessage')}
			type="checkbox"
			checked={showWindowOnUnreadChanged}
			click={({ checked }) => onAction('toggle', 'showWindowOnUnreadChanged', checked)}
		/>
		<MenuSeparator />
		<MenuItem
			role="minimize"
			label={t('menus.minimize')}
			accelerator="CommandOrControl+M"
		/>
		{isMacOs &&
			<MenuItem
				role="toggleFullScreen"
				label={t('menus.showFullScreen')}
				accelerator="Control+Command+F"
			/>
		}
		<MenuItem
			role="close"
			label={t('menus.close')}
			accelerator="CommandOrControl+W"
		/>
	</Menu>;
}
