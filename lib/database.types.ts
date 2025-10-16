export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      guestlists: {
        Row: {
          id: string
          name: string
          event_name: string
          event_date: string
          venue: string
          description: string | null
          max_guests: number | null
          created_by: string
          created_at: string
          is_active: boolean
        }
        Insert: {
          id?: string
          name: string
          event_name: string
          event_date: string
          venue: string
          description?: string | null
          max_guests?: number | null
          created_by: string
          created_at?: string
          is_active?: boolean
        }
        Update: {
          id?: string
          name?: string
          event_name?: string
          event_date?: string
          venue?: string
          description?: string | null
          max_guests?: number | null
          created_by?: string
          created_at?: string
          is_active?: boolean
        }
      }
      guests: {
        Row: {
          id: string
          guestlist_id: string
          name: string
          email: string
          phone: string | null
          plus_ones: number
          registered_at: string
          status: 'pending' | 'approved' | 'rejected'
        }
        Insert: {
          id?: string
          guestlist_id: string
          name: string
          email: string
          phone?: string | null
          plus_ones?: number
          registered_at?: string
          status?: 'pending' | 'approved' | 'rejected'
        }
        Update: {
          id?: string
          guestlist_id?: string
          name?: string
          email?: string
          phone?: string | null
          plus_ones?: number
          registered_at?: string
          status?: 'pending' | 'approved' | 'rejected'
        }
      }
    }
  }
} 