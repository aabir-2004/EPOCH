import { describe, expect, test } from "bun:test";
import { decomposeTask } from "./decomposer";

describe("Task Decomposer", () => {
  test("should generate a mock DAG with correct original task", () => {
    const input = "Find information about AI models";
    const result = decomposeTask(input);

    expect(result.originalTask).toBe(input);
    expect(result.nodes.length).toBe(4);
    expect(result.nodes[0]?.id).toBe("task-1");
  });
});
