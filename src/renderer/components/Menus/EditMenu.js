import { t } from 'i18next';
import React from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Menu } from '../Menu';
import { MenuItem } from '../MenuItem';
import { MenuSeparator } from '../MenuSeparator';
import { menuItemClicked } from '../../../actions/menus';


const isWindows = process.platform === 'win32';

export function EditMenu() {
	const {
		canUndo,
		canRedo,
		canCut,
		canCopy,
		canPaste,
		canSelectAll,
	} = useSelector(({ editFlags }) => editFlags);
	const dispatch = useDispatch();
	const onAction = bindActionCreators(menuItemClicked, dispatch);

	return <Menu label={t('menus.editMenu')}>
		<MenuItem
			label={t('menus.undo')}
			accelerator="CommandOrControl+Z"
			enabled={canUndo}
			click={() => onAction('undo')}
		/>
		<MenuItem
			label={t('menus.redo')}
			accelerator={isWindows ? 'Control+Y' : 'CommandOrControl+Shift+Z'}
			enabled={canRedo}
			click={() => onAction('redo')}
		/>
		<MenuSeparator />
		<MenuItem
			label={t('menus.cut')}
			accelerator="CommandOrControl+X"
			enabled={canCut}
			click={() => onAction('cut')}
		/>
		<MenuItem
			label={t('menus.copy')}
			accelerator="CommandOrControl+C"
			enabled={canCopy}
			click={() => onAction('copy')}
		/>
		<MenuItem
			label={t('menus.paste')}
			accelerator="CommandOrControl+V"
			enabled={canPaste}
			click={() => onAction('paste')}
		/>
		<MenuItem
			label={t('menus.selectAll')}
			accelerator="CommandOrControl+A"
			enabled={canSelectAll}
			click={() => onAction('select-all')}
		/>
	</Menu>;
}
