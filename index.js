/**
 * @format
 */

import {AppRegistry} from 'react-native';
import { registerRootComponent } from "expo";
import App from './src/App';
import {name as appName} from './app.json';

registerRootComponent(App);
AppRegistry.registerComponent(appName, () => App);
