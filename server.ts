import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";

// Khởi tạo Server
const server = new Server(
  { name: "test-mcp-server", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

// Khai báo công cụ tính tổng
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "calculate_sum",
        description: "Tính tổng 2 số nguyên",
        inputSchema: {
          type: "object",
          properties: {
            a: { type: "number" },
            b: { type: "number" }
          },
          required: ["a", "b"]
        }
      }
    ]
  };
});

// Xử lý thực thi công cụ
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "calculate_sum") {
    const { a, b } = request.params.arguments as { a: number; b: number };
    
    // LƯU Ý QUAN TRỌNG KHI DEBUG:
    // Không dùng console.log() ở đây vì nó sẽ phá vỡ luồng JSON-RPC của stdio.
    // Dùng console.error() để in log ra terminal mà không làm lỗi giao thức.
    console.error(`[DEBUG] Đang tính tổng của ${a} và ${b}`);
    
    return {
      content: [{ type: "text", text: String(a + b) }]
    };
  }
  throw new Error("Công cụ không tồn tại");
});

// Chạy Server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("[DEBUG] MCP Server đã sẵn sàng kết nối qua stdio!");
}

main().catch(console.error);