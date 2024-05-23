import { Database } from "./supabase.types";

export type Tag = Database["public"]["Tables"]["tags"]["Row"]
export type Service = Database["public"]["Tables"]["services"]["Row"]

export type ServiceRequest = Database["public"]["Tables"]["service_requests"]["Row"]
export type Outsourcer = Database["public"]["Tables"]["outsourcers"]["Row"]
export type ServiceRequestStatus = Database["public"]["Enums"]["service_request_status"]
