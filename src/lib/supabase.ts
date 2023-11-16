import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zeawfjfjjegnpsfvfapw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InplYXdmamZqamVnbnBzZnZmYXB3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk5Nzk2NDYsImV4cCI6MjAxNTU1NTY0Nn0.6Q2vpwCIXM2fUx4gWyL_AuyVlTIDhlOMnlVHjq3vo4U";

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export { supabase };
