import { remote } from 'electron';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';


export const MenuContext = createContext();

export const useMenu = () => {
	const [items, setItems] = useState([]);

	const menuContext = useMemo(() => ({
		append: (item) => {
			setItems((items) => [...items, item]);
		},
		remove: (item) => {
			setItems((items) => items.filter((_child) => _child !== item));
		},
	}), []);

	const menu = useMemo(() => {
		const menu = new remote.Menu();
		items.forEach((item) => {
			menu.append(item);
		});

		return menu;
	}, [items]);

	return [menuContext, menu];
};

export const useMenuItem = (optionsSelector, deps) => {
	const parentContext = useContext(MenuContext);

	const options = useMemo(optionsSelector, deps);

	const menuItem = useMemo(() => new remote.MenuItem(options), [options]);

	useEffect(() => {
		parentContext && parentContext.append(menuItem);

		return () => {
			parentContext && parentContext.remove(menuItem);
		};
	}, [menuItem]);

	return menuItem;
};
