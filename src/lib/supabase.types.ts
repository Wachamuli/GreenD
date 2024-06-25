export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      bookings: {
        Row: {
          booking_id: number
          outsourcer_id: string
          user_id: string
        }
        Insert: {
          booking_id?: number
          outsourcer_id: string
          user_id: string
        }
        Update: {
          booking_id?: number
          outsourcer_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_outsourcer_id_fkey"
            columns: ["outsourcer_id"]
            isOneToOne: false
            referencedRelation: "outsourcers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      condominium_services: {
        Row: {
          availability: boolean | null
          condominium_id: string
          service_id: number
        }
        Insert: {
          availability?: boolean | null
          condominium_id: string
          service_id: number
        }
        Update: {
          availability?: boolean | null
          condominium_id?: string
          service_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "condominium_services_condominium_id_fkey"
            columns: ["condominium_id"]
            isOneToOne: false
            referencedRelation: "condominiums"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "condominium_services_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      condominiums: {
        Row: {
          created_at: string | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      details: {
        Row: {
          detail: string
          id: number
          service_id: number
        }
        Insert: {
          detail: string
          id?: number
          service_id: number
        }
        Update: {
          detail?: string
          id?: number
          service_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "details_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      outsourcers: {
        Row: {
          availability: boolean | null
          brief_description: string
          condominium: string
          created_at: string | null
          description: string
          id: string
          logo: string | null
          name: string
          ncf: string | null
          owner: string | null
          service: number
          updated_at: string | null
        }
        Insert: {
          availability?: boolean | null
          brief_description: string
          condominium: string
          created_at?: string | null
          description: string
          id?: string
          logo?: string | null
          name: string
          ncf?: string | null
          owner?: string | null
          service: number
          updated_at?: string | null
        }
        Update: {
          availability?: boolean | null
          brief_description?: string
          condominium?: string
          created_at?: string | null
          description?: string
          id?: string
          logo?: string | null
          name?: string
          ncf?: string | null
          owner?: string | null
          service?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "outsourcers_condominium_fkey"
            columns: ["condominium"]
            isOneToOne: false
            referencedRelation: "condominiums"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "outsourcers_service_fkey"
            columns: ["service"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          active: boolean
          address: string
          avatar: string | null
          condominium: string
          id: string
          name: string
          surname: string | null
          telephone: string | null
          updated_at: string | null
        }
        Insert: {
          active?: boolean
          address: string
          avatar?: string | null
          condominium: string
          id: string
          name: string
          surname?: string | null
          telephone?: string | null
          updated_at?: string | null
        }
        Update: {
          active?: boolean
          address?: string
          avatar?: string | null
          condominium?: string
          id?: string
          name?: string
          surname?: string | null
          telephone?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_condominium_fkey"
            columns: ["condominium"]
            isOneToOne: false
            referencedRelation: "condominiums"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      service_requests: {
        Row: {
          created_at: string | null
          details: string
          id: string
          note: string | null
          outsourcer: string
          r_date: string
          r_time: string
          service: number
          status: Database["public"]["Enums"]["service_request_status"] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          details: string
          id?: string
          note?: string | null
          outsourcer: string
          r_date: string
          r_time: string
          service: number
          status?: Database["public"]["Enums"]["service_request_status"] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          details?: string
          id?: string
          note?: string | null
          outsourcer?: string
          r_date?: string
          r_time?: string
          service?: number
          status?: Database["public"]["Enums"]["service_request_status"] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_requests_outsourcer_fkey"
            columns: ["outsourcer"]
            isOneToOne: false
            referencedRelation: "outsourcers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_requests_service_fkey"
            columns: ["service"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          created_at: string | null
          description: string
          id: number
          image: string
          name: string
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: number
          image: string
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: number
          image?: string
          name?: string
        }
        Relationships: []
      }
      suggestions: {
        Row: {
          body: string
          created_at: string | null
          id: string
          seen: boolean | null
          service_request: string
          subject: string
        }
        Insert: {
          body: string
          created_at?: string | null
          id?: string
          seen?: boolean | null
          service_request: string
          subject: string
        }
        Update: {
          body?: string
          created_at?: string | null
          id?: string
          seen?: boolean | null
          service_request?: string
          subject?: string
        }
        Relationships: [
          {
            foreignKeyName: "suggestions_service_request_fkey"
            columns: ["service_request"]
            isOneToOne: false
            referencedRelation: "service_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      suggestions_tags: {
        Row: {
          suggestion: string
          tag: number
        }
        Insert: {
          suggestion: string
          tag: number
        }
        Update: {
          suggestion?: string
          tag?: number
        }
        Relationships: [
          {
            foreignKeyName: "suggestions_tags_suggestion_fkey"
            columns: ["suggestion"]
            isOneToOne: false
            referencedRelation: "suggestions"
            referencedColumns: ["id"]
          },
        ]
      }
      tags: {
        Row: {
          color: string
          id: number
          name: string
          positive: boolean
        }
        Insert: {
          color: string
          id?: number
          name: string
          positive: boolean
        }
        Update: {
          color?: string
          id?: number
          name?: string
          positive?: boolean
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      email_exists: {
        Args: {
          email_param: string
        }
        Returns: boolean
      }
      insert_suggestion: {
        Args: {
          service_request_id_param: string
          subject_param: string
          body_param: string
          tags_param: number[]
        }
        Returns: undefined
      }
    }
    Enums: {
      service_request_status:
        | "Pending"
        | "Confirmed"
        | "InProgress"
        | "Completed"
        | "Canceled"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
