import { remote } from 'electron';
import { t } from 'i18next';
import React from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { Menu } from '../Menu';
import { MenuItem } from '../MenuItem';
import { MenuSeparator } from '../MenuSeparator';
import { menuItemClicked } from '../../../actions/menus';


const isMacOs = process.platform === 'darwin';
const appName = remote.app.getName();

export function AppMenu() {
	const dispatch = useDispatch();
	const onAction = bindActionCreators(menuItemClicked, dispatch);

	return <Menu label={isMacOs ? appName : t('menus.fileMenu')}>
		{isMacOs
			? <>
				<MenuItem label={t('menus.about', { appName })}	click={() => onAction('about')} />,
				<MenuSeparator />
				<MenuItem role="services" submenu={[]} />
				<MenuSeparator />
				<MenuItem role="hide" accelerator="Command+H" />
				<MenuItem role="hideothers" accelerator="Command+Alt+H" />
				<MenuItem role="unhide" />
			</>
			: <>
				<MenuItem
					label={t('menus.addNewServer')}
					accelerator="CommandOrControl+N"
					click={() => onAction('add-new-server')}
				/>
			</>
		}
		<MenuSeparator />
		<MenuItem
			label={t('menus.quit', { appName })}
			accelerator="CommandOrControl+Q"
			click={() => onAction('quit')}
		/>
	</Menu>;
}
