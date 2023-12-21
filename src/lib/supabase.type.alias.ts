import { Database } from "./supabase.types";

export type Tag = Database["public"]["Tables"]["tags"]["Row"]