// src/types.ts

// --- Inputs & Session ---

export interface UserInput {
  query: string;
  session_id: string;
  context?: Record<string, unknown>;
  stream?: boolean;
}

// --- Classification Layer ---

export interface IntentResult {
  intent: string;
  confidence: number;
}

export interface ComplexityResult {
  score: number; // 0 to 1
  task_type: string;
}

// --- DAG / Decomposer Layer ---

export type TaskType = 'serial' | 'parallel';

export interface DAGNode {
  id: string;
  description: string;
  type: TaskType;
  dependencies?: string[];
  subTasks?: DAGNode[];
}

export interface TaskGraph {
  originalTask: string;
  nodes: DAGNode[];
}

// --- Validation Layer ---

export interface ValidationResult {
  isValid: boolean;
  errors?: string[];
}

// --- Streaming / Output Events ---

export type PipelineStage =
  | 'intent_classifier'
  | 'complexity_classifier'
  | 'decomposer'
  | 'memory_retrieval'
  | 'prompt_compiler'
  | 'generator'
  | 'validator'
  | 'final_response';

export interface StreamEventStageUpdate {
  event: 'stage_update';
  data: {
    stage: PipelineStage;
    status: 'pending' | 'active' | 'complete' | 'failed';
    latency_ms?: number;
  };
}

export interface StreamEventToken {
  event: 'token';
  data: {
    token: string;
  };
}

export interface StreamEventFinalResponse {
  event: 'final_response';
  data: {
    text: string;
    confidence: number;
    tools_used: string[];
    memory_hits: number;
  };
}

export type PipelineStreamEvent = StreamEventStageUpdate | StreamEventToken | StreamEventFinalResponse;
