import { t } from 'i18next';
import React from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Menu } from '../Menu';
import { MenuItem } from '../MenuItem';
import { MenuSeparator } from '../MenuSeparator';
import { menuItemClicked } from '../../../actions/menus';


const isMacOs = process.platform === 'darwin';

export function ViewMenu() {
	const {
		hasTray,
		hasMenus,
		hasSidebar,
		canGoBack,
		canGoForward,
	} = useSelector(({
		preferences: {
			hasTray,
			hasMenus,
			hasSidebar,
		},
		historyFlags: {
			canGoBack,
			canGoForward,
		},
	}) => ({
		hasTray,
		hasMenus,
		hasSidebar,
		canGoBack,
		canGoForward,
	}));
	const dispatch = useDispatch();
	const onAction = bindActionCreators(menuItemClicked, dispatch);

	return <Menu label={t('menus.viewMenu')}>
		<MenuItem
			label={t('menus.reload')}
			accelerator="CommandOrControl+R"
			click={() => onAction('reload-server')}
		/>
		<MenuItem
			label={t('menus.reloadIgnoringCache')}
			click={() => onAction('reload-server', { ignoringCache: true })}
		/>
		<MenuItem
			label={t('menus.clearTrustedCertificates')}
			click={() => onAction('reload-server', { ignoringCache: true, clearCertificates: true })}
		/>
		<MenuItem
			label={t('menus.openDevTools')}
			accelerator={isMacOs ? 'Command+Alt+I' : 'Ctrl+Shift+I'}
			click={() => onAction('open-devtools-for-server')}
		/>
		<MenuSeparator />
		<MenuItem
			label={t('menus.back')}
			accelerator={isMacOs ? 'Command+[' : 'Alt+Left'}
			enabled={canGoBack}
			click={() => onAction('go-back')}
		/>
		<MenuItem
			label={t('menus.forward')}
			accelerator={isMacOs ? 'Command+]' : 'Alt+Right'}
			enabled={canGoForward}
			click={() => onAction('go-forward')}
		/>
		<MenuSeparator />
		<MenuItem
			label={t('menus.showTrayIcon')}
			type="checkbox"
			checked={hasTray}
			click={({ checked }) => onAction('toggle', 'hasTray', checked)}
		/>
		{!isMacOs &&
			<MenuItem
				label={t('menus.showMenuBar')}
				type="checkbox"
				checked={hasMenus}
				click={({ checked }) => onAction('toggle', 'hasMenus', checked)}
			/>
		}
		<MenuItem
			label={t('menus.showServerList')}
			type="checkbox"
			checked={hasSidebar}
			click={({ checked }) => onAction('toggle', 'hasSidebar', checked)}
		/>
		<MenuSeparator />
		<MenuItem
			label={t('menus.resetZoom')}
			accelerator="CommandOrControl+0"
			click={() => onAction('reset-zoom')}
		/>
		<MenuItem
			label={t('menus.zoomIn')}
			accelerator="CommandOrControl+Plus'"
			click={() => onAction('zoom-in')}
		/>
		<MenuItem
			label={t('menus.zoomOut')}
			accelerator="CommandOrControl+-"
			click={() => onAction('zoom-out')}
		/>
	</Menu>;
}
