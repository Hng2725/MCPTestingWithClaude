# Các phương pháp Kiểm thử (Testing)

## Phương pháp 1: Debug độc lập bằng MCP Inspector (Khuyên dùng đầu tiên)

Sử dụng công cụ này để kiểm tra logic code và các gói tin JSON-RPC trên giao diện web độc lập trước khi gắn vào ứng dụng thật.

### Cách sử dụng:

1. Chạy lệnh (tại thư mục chứa dự án):
   ```bash
   npx @modelcontextprotocol/inspector npx tsx server.ts
   ```

2. Truy cập http://localhost:5173 trên trình duyệt (nếu không hiện cửa sổ).

3. Bấm **Connect**, chuyển sang tab **Tools** và nhấp **Execute Tool** để chạy thử tính tổng.

---

## Phương pháp 2: Kiểm thử với Claude Code (Giao diện CLI)

### Thêm MCP server:
```bash
claude mcp add my-test-math-server -- npx tsx "C:/Đường/Dẫn/Tuyệt/Đối/server.ts"
```

### Kiểm tra trạng thái kết nối:
```bash
claude mcp list
```
*(Đảm bảo hiển thị Connected)*

### Bắt đầu test:
Mở chat với Claude Code và gõ:
> "Hãy dùng công cụ tính tổng của bạn để tính 4521 + 5479"

---

## Phương pháp 3: Kiểm thử với Claude Desktop (Giao diện App)

### Thêm cấu hình vào file `claude_desktop_config.json`
File nằm ở:
- Windows: `%APPDATA%\Claude`
- Mac: `~/Library/Application Support/Claude/`

```json
"mcpServers": {
  "my-test-math-server": {
    "command": "npx",
    "args": [
      "tsx",
      "C:/Đường/Dẫn/Tuyệt/Đối/server.ts"
    ]
  }
}
```

### Các bước thực hiện:
1. Thoát hẳn (Quit) và khởi động lại ứng dụng Claude Desktop
2. Tạo cuộc trò chuyện mới (New Chat)
3. Gõ vào ô chat:
   > "Tính tổng 1545 và 3423 bằng công cụ của bạn"

---

## 📝 Lưu ý quan trọng

1. **Không dùng `console.log()`** trong luồng code thực thi chính. Nếu cần debug, hãy dùng `console.error("log message")` để tránh làm vỡ định dạng JSON-RPC trên luồng stdio.

2. **Luôn sử dụng đường dẫn tuyệt đối (Absolute Path)** trỏ tới file `server.ts` khi cấu hình.