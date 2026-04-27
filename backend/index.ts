import { serve } from "bun";

const PORT = 3001;

console.log(`Starting Bun server on http://localhost:${PORT}`);

const server = serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);

    if (req.method === "POST" && url.pathname === "/query") {
      // Simulate handling a query with SSE stream response
      try {
        const body = await req.json() as any;

        if (body.stream) {
          // Send back a mock SSE response
          return new Response(
            new ReadableStream({
              start(controller) {
                controller.enqueue(
                  'data: {"event":"stage_update","data":{"stage":"intent_classifier","status":"active"}}\n\n'
                );

                setTimeout(() => {
                  controller.enqueue(
                    'data: {"event":"final_response","data":{"text":"Dummy response","confidence":0.99,"tools_used":[],"memory_hits":0}}\n\n'
                  );
                  controller.close();
                }, 1000);
              },
            }),
            {
              headers: {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
              },
            }
          );
        } else {
           return new Response(JSON.stringify({ message: "Non-streaming query response" }), {
             headers: { "Content-Type": "application/json" }
           });
        }
      } catch (err) {
        return new Response("Invalid JSON", { status: 400 });
      }
    }

    if (req.method === "POST" && url.pathname === "/feedback") {
      return new Response(JSON.stringify({ status: "feedback received" }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    if (req.method === "GET" && url.pathname === "/status") {
      return new Response(JSON.stringify({ status: "healthy", version: "1.0.0" }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    if (req.method === "GET" && url.pathname === "/memory") {
      return new Response(JSON.stringify({ session: "test", context: [] }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response("Not Found", { status: 404 });
  },
});

console.log(`Server is running at ${server.url}`);
