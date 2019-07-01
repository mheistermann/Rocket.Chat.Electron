import { remote } from 'electron';
import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';


export const MenuContext = createContext();

export const useMenu = () => {
	const [items, setItems] = useState([]);
	const changeIndexRef = useRef(0);

	const menuContext = useMemo(() => ({
		append: (item) => {
			setItems((items) => {
				items[changeIndexRef.current++] = item;
				return Array.from(items);
			});
		},
		remove: (item) => {
			setItems((items) => {
				changeIndexRef.current = items.findIndex((_item) => _item === item);
				delete items[changeIndexRef.current];
				return Array.from(items);
			});
		},
	}), []);

	const menu = useMemo(() => {
		const menu = new remote.Menu();
		items.forEach((item) => {
			item && menu.append(item);
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
