import { Tables, Enums } from "./supabase.types";

export type Tag = Tables<"tags">;
export type Service = Tables<"services">;

export type ServiceRequest = Tables<"service_requests">;
export type Outsourcer = Tables<"outsourcers">;
export type ServiceRequestStatus = Enums<"service_request_status">;

export type Bookings = Tables<"bookings">
