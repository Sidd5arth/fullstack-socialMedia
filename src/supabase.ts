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
      comments: {
        Row: {
          comment_id: string
          content: string
          created_at: string | null
          post_id: string | null
          user_id: string | null
        }
        Insert: {
          comment_id: string
          content: string
          created_at?: string | null
          post_id?: string | null
          user_id?: string | null
        }
        Update: {
          comment_id?: string
          content?: string
          created_at?: string | null
          post_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            referencedRelation: "posts"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "comments_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          }
        ]
      }
      followers: {
        Row: {
          followee_id: string
          follower_id: string
        }
        Insert: {
          followee_id: string
          follower_id: string
        }
        Update: {
          followee_id?: string
          follower_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "followers_followee_id_fkey"
            columns: ["followee_id"]
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "followers_follower_id_fkey"
            columns: ["follower_id"]
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          }
        ]
      }
      likes: {
        Row: {
          created_at: string | null
          like_id: string
          post_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          like_id: string
          post_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          like_id?: string
          post_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "likes_post_id_fkey"
            columns: ["post_id"]
            referencedRelation: "posts"
            referencedColumns: ["post_id"]
          },
          {
            foreignKeyName: "likes_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          }
        ]
      }
      mentions: {
        Row: {
          mention_id: string
          mentioned_user_id: string | null
          post_id: string | null
        }
        Insert: {
          mention_id: string
          mentioned_user_id?: string | null
          post_id?: string | null
        }
        Update: {
          mention_id?: string
          mentioned_user_id?: string | null
          post_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mentions_mentioned_user_id_fkey"
            columns: ["mentioned_user_id"]
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "mentions_post_id_fkey"
            columns: ["post_id"]
            referencedRelation: "posts"
            referencedColumns: ["post_id"]
          }
        ]
      }
      posts: {
        Row: {
          content: string
          created_at: string | null
          image_url: string | null
          post_id: string
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          image_url?: string | null
          post_id: string
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          image_url?: string | null
          post_id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          }
        ]
      }
      users: {
        Row: {
          auth_provider: string | null
          created_at: string | null
          email: string
          last_login: string | null
          password_hash: string | null
          user_id: string
          username: string
        }
        Insert: {
          auth_provider?: string | null
          created_at?: string | null
          email: string
          last_login?: string | null
          password_hash?: string | null
          user_id: string
          username: string
        }
        Update: {
          auth_provider?: string | null
          created_at?: string | null
          email?: string
          last_login?: string | null
          password_hash?: string | null
          user_id?: string
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
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
