export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      decoraciones: {
        Row: {
          cantidad_terminada: number
          created_at: string
          fotos: string[]
          id: string
          lote_id: string
          tipo: string
          unidad: string
        }
        Insert: {
          cantidad_terminada: number
          created_at?: string
          fotos?: string[]
          id?: string
          lote_id: string
          tipo: string
          unidad: string
        }
        Update: {
          cantidad_terminada?: number
          created_at?: string
          fotos?: string[]
          id?: string
          lote_id?: string
          tipo?: string
          unidad?: string
        }
        Relationships: [
          {
            foreignKeyName: "decoraciones_lote_id_fkey"
            columns: ["lote_id"]
            isOneToOne: false
            referencedRelation: "lotes_produccion"
            referencedColumns: ["id"]
          },
        ]
      }
      historial_merma: {
        Row: {
          cantidad: number
          created_at: string
          fecha: string
          id: string
          producto_id: string
          tipo: string | null
        }
        Insert: {
          cantidad: number
          created_at?: string
          fecha: string
          id?: string
          producto_id: string
          tipo?: string | null
        }
        Update: {
          cantidad?: number
          created_at?: string
          fecha?: string
          id?: string
          producto_id?: string
          tipo?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "historial_merma_producto_id_fkey"
            columns: ["producto_id"]
            isOneToOne: false
            referencedRelation: "productos"
            referencedColumns: ["id"]
          },
        ]
      }
      historial_produccion: {
        Row: {
          cantidad: number
          created_at: string
          fecha: string
          id: string
          origen: string
          producto_id: string
        }
        Insert: {
          cantidad: number
          created_at?: string
          fecha: string
          id?: string
          origen?: string
          producto_id: string
        }
        Update: {
          cantidad?: number
          created_at?: string
          fecha?: string
          id?: string
          origen?: string
          producto_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "historial_produccion_producto_id_fkey"
            columns: ["producto_id"]
            isOneToOne: false
            referencedRelation: "productos"
            referencedColumns: ["id"]
          },
        ]
      }
      lotes_produccion: {
        Row: {
          cantidad: number
          created_at: string
          fecha: string
          fotos: string[]
          id: string
          notas: string | null
          producto_id: string
          responsable: string | null
          unidad: string
        }
        Insert: {
          cantidad: number
          created_at?: string
          fecha?: string
          fotos?: string[]
          id?: string
          notas?: string | null
          producto_id: string
          responsable?: string | null
          unidad: string
        }
        Update: {
          cantidad?: number
          created_at?: string
          fecha?: string
          fotos?: string[]
          id?: string
          notas?: string | null
          producto_id?: string
          responsable?: string | null
          unidad?: string
        }
        Relationships: [
          {
            foreignKeyName: "lotes_produccion_producto_id_fkey"
            columns: ["producto_id"]
            isOneToOne: false
            referencedRelation: "productos"
            referencedColumns: ["id"]
          },
        ]
      }
      mermas: {
        Row: {
          cantidad: number
          causa: string | null
          created_at: string
          fecha: string
          foto: string | null
          id: string
          lote_id: string | null
          producto_id: string
          tipo: string
          unidad: string
        }
        Insert: {
          cantidad: number
          causa?: string | null
          created_at?: string
          fecha?: string
          foto?: string | null
          id?: string
          lote_id?: string | null
          producto_id: string
          tipo: string
          unidad: string
        }
        Update: {
          cantidad?: number
          causa?: string | null
          created_at?: string
          fecha?: string
          foto?: string | null
          id?: string
          lote_id?: string | null
          producto_id?: string
          tipo?: string
          unidad?: string
        }
        Relationships: [
          {
            foreignKeyName: "mermas_lote_id_fkey"
            columns: ["lote_id"]
            isOneToOne: false
            referencedRelation: "lotes_produccion"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mermas_producto_id_fkey"
            columns: ["producto_id"]
            isOneToOne: false
            referencedRelation: "productos"
            referencedColumns: ["id"]
          },
        ]
      }
      perfiles: {
        Row: {
          created_at: string | null
          rol: string
          sucursal: string | null
          user_id: string
          username: string
        }
        Insert: {
          created_at?: string | null
          rol: string
          sucursal?: string | null
          user_id: string
          username: string
        }
        Update: {
          created_at?: string | null
          rol?: string
          sucursal?: string | null
          user_id?: string
          username?: string
        }
        Relationships: []
      }
      productos: {
        Row: {
          activo: boolean
          created_at: string
          id: string
          nombre: string
          sku: string
          unidad: string
        }
        Insert: {
          activo?: boolean
          created_at?: string
          id?: string
          nombre: string
          sku: string
          unidad: string
        }
        Update: {
          activo?: boolean
          created_at?: string
          id?: string
          nombre?: string
          sku?: string
          unidad?: string
        }
        Relationships: []
      }
      pronosticos: {
        Row: {
          cantidad_predicha: number
          created_at: string
          fecha_objetivo: string
          id: string
          mae: number | null
          mape: number | null
          producto_id: string
          version_modelo: string
        }
        Insert: {
          cantidad_predicha: number
          created_at?: string
          fecha_objetivo: string
          id?: string
          mae?: number | null
          mape?: number | null
          producto_id: string
          version_modelo?: string
        }
        Update: {
          cantidad_predicha?: number
          created_at?: string
          fecha_objetivo?: string
          id?: string
          mae?: number | null
          mape?: number | null
          producto_id?: string
          version_modelo?: string
        }
        Relationships: [
          {
            foreignKeyName: "pronosticos_producto_id_fkey"
            columns: ["producto_id"]
            isOneToOne: false
            referencedRelation: "productos"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      v_resumen_hoy: {
        Row: {
          decorado: number | null
          fecha: string | null
          merma: number | null
          producido: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
