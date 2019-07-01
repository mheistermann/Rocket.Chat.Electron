import { useMenuItem } from './MenuContext';


export function MenuItem(props) {
	useMenuItem(() => props, [props]);

	return null;
}
