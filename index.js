/**
 * @format
 */

import {AppRegistry} from 'react-native';
import { registerRootComponent } from "expo";
import App from './src/App';
import {name as appName} from './app.json';
import { createClient } from '@supabase/supabase-js'

registerRootComponent(App);
AppRegistry.registerComponent(appName, () => App);


const supabaseUrl = 'https://zeawfjfjjegnpsfvfapw.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InplYXdmamZqamVnbnBzZnZmYXB3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk5Nzk2NDYsImV4cCI6MjAxNTU1NTY0Nn0.6Q2vpwCIXM2fUx4gWyL_AuyVlTIDhlOMnlVHjq3vo4U";
const supabase = createClient(supabaseUrl, supabaseKey)

export { supabase }; 