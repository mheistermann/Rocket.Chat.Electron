import { remote } from 'electron';
import { t } from 'i18next';
import React from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { Menu } from '../Menu';
import { MenuItem } from '../MenuItem';
import { MenuSeparator } from '../MenuSeparator';
import { menuItemClicked } from '../../../actions/menus';


const appName = remote.app.getName();
const isMacOs = process.platform === 'darwin';

export function HelpMenu() {
	const dispatch = useDispatch();
	const onAction = bindActionCreators(menuItemClicked, dispatch);

	return <Menu role="help" label={t('menus.helpMenu')}>
		<MenuItem
			label={t('menus.documentation')}
			click={() => onAction('open-url', 'https://rocket.chat/docs')}
		/>
		<MenuSeparator />
		<MenuItem
			label={t('menus.reportIssue')}
			click={() => onAction('open-url', 'https://github.com/RocketChat/Rocket.Chat.Electron/issues/new')}
		/>
		<MenuItem
			label={t('menus.resetUserData')}
			click={() => onAction('reset-app-data')}
		/>
		<MenuSeparator />
		<MenuItem
			label={t('menus.learnMore')}
			click={() => onAction('open-url', 'https://rocket.chat')}
		/>
		{!isMacOs &&
			<MenuItem
				label={t('menus.about', { appName })}
				click={() => onAction('about')}
			/>
		}
	</Menu>;
}
