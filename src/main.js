import { store } from './store';
import { appLaunched } from './store/actions';
import './main/app';
import './main/basicAuth';
import './main/certificates';
import './main/config';
import './main/deepLinks';
import './main/mainWindow';
import './main/spellchecking';
import './main/updates';


store.dispatch(appLaunched(process.argv.slice(2)));

export { contextMenu } from './main/contextMenu';
export { dock } from './main/dock';
export { menus } from './main/menus';
export { touchBar } from './main/touchBar';
export { tray } from './main/tray';
