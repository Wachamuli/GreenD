import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./supabase.types";

const supabaseUrl = "https://zeawfjfjjegnpsfvfapw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InplYXdmamZqamVnbnBzZnZmYXB3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU4ODk3MzIsImV4cCI6MjAyMTQ2NTczMn0.vJEMme6ZF8gSz1bTEw1wNHGwUDSkzBujUA8-FwagUyo";

const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export { supabase };
