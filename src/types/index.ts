/**
 * TypeScript types for CPA Reconciliation Tracker
 * Based on ADR Section 4 Data Model
 * Excludes database-only fields (password_hash, created_at, updated_at, etc.)
 */

// Enums and Literal Types
export type AccountType =
  | 'checking'
  | 'savings'
  | 'loan'
  | 'investment'
  | 'credit_card'
  | 'mortgage';

export type QuestionStatus = 'open' | 'resolved';

export type NoteType = 'type_specific' | 'user_note';

export type EntityType = 'client' | 'account' | 'checklist' | 'question';

export type PeriodType = 'monthly' | 'quarterly' | 'custom';

export type PipelineStatus = 'grey' | 'green' | 'blue' | 'yellow' | 'red';

// Core Entity Interfaces

export interface Schedule {
  id: string;
  name: string;
  period_type: PeriodType;
  description?: string;
}

export interface Client {
  id: string;
  name: string;
  email?: string;
  schedule_id?: string;
  notes?: string;
  archived: boolean;
}

export interface Account {
  id: string;
  client_id: string;
  type: AccountType;
  institution_name: string;
  location?: string;
  bank_url?: string;
  access_method?: string;
  rec_through_date?: string; // ISO date string
  close_date?: string; // ISO date string
  archived: boolean;
}

export interface ChecklistPeriod {
  id: string;
  client_id: string;
  period: string; // 'YYYY-MM' or 'YYYY-QN'
  step_1_complete: boolean;
  step_1_completed_by?: string; // user id
  step_1_completed_at?: string; // ISO datetime string
  step_2_complete: boolean;
  step_2_completed_by?: string;
  step_2_completed_at?: string;
  step_3_complete: boolean;
  step_3_completed_by?: string;
  step_3_completed_at?: string;
  step_4_complete: boolean;
  step_4_completed_by?: string;
  step_4_completed_at?: string;
  step_5_complete: boolean;
  step_5_completed_by?: string;
  step_5_completed_at?: string;
}

export interface Question {
  id: string;
  client_id: string;
  period: string;
  text: string;
  status: QuestionStatus;
  created_by?: string; // user id
  resolved_by?: string; // user id
  resolved_at?: string; // ISO datetime string
}

export interface AccountNote {
  id: string;
  account_id: string;
  note_type: NoteType;
  content: string;
  created_by?: string; // user id
}

export interface TimelineEvent {
  id: string;
  entity_type: EntityType;
  entity_id: string;
  action: string;
  performed_by?: string; // user id
  timestamp: string; // ISO datetime string
  metadata?: Record<string, unknown>;
  client_id: string; // denormalized for efficient queries
}

// Helper type for demo purposes - combines client with computed status
export interface ClientWithStatus extends Client {
  pipeline_status: PipelineStatus;
  current_step: number; // 0-5
  open_question_count: number;
  days_until_close?: number; // positive = future, negative = past
}
