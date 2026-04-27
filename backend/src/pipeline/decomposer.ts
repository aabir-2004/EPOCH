import type { TaskGraph, DAGNode } from '../types';

/**
 * Task Decomposer (DAG Engine) Shell
 * Takes an original task and splits it into a DAG of sub-tasks.
 */
export function decomposeTask(originalTask: string): TaskGraph {
  // Mock hardcoded DAG representation
  const nodes: DAGNode[] = [
    {
      id: 'task-1',
      description: 'Analyze user intent and extract keywords',
      type: 'serial',
    },
    {
      id: 'task-2',
      description: 'Fetch related data from Vector DB',
      type: 'parallel',
      dependencies: ['task-1'],
    },
    {
      id: 'task-3',
      description: 'Query API for real-time status',
      type: 'parallel',
      dependencies: ['task-1'],
    },
    {
      id: 'task-4',
      description: 'Synthesize final answer',
      type: 'serial',
      dependencies: ['task-2', 'task-3'],
    }
  ];

  return {
    originalTask,
    nodes,
  };
}
