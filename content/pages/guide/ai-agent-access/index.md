---
title: AI Agent Access (MCP)
date: 2026-10-09 21:00:00+0800
sidebar:
  order: 4
---

Violentmonkey can be managed by AI agents such as Claude through the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/). Instead of copying code back and forth, you can simply ask the agent to list, create, edit, or fix your userscripts, and it will do so directly.

## Setup

### 1. Add the server to your agent

With Claude Code:

```bash
claude mcp add violentmonkey -- npx -y @violentmonkey/mcp -p 5678
```

With Claude Desktop or any stdio-based client, add this to the `mcpServers` config:

```json
{
  "mcpServers": {
    "violentmonkey": {
      "command": "npx",
      "args": ["-y", "@violentmonkey/mcp", "-p", "5678"]
    }
  }
}
```

### 2. Connect Violentmonkey

Ask the agent for the Violentmonkey connect URL. It looks like this:

```text
https://violentmonkey.github.io/mcp_connect.html?port=5678&token=<generated_token>
```

Open it in your browser. Violentmonkey intercepts the URL and takes you to the **AI agent access (MCP)** section in settings, where you can approve the request. After approval, the extension connects to the server and the agent can manage your scripts.

### 3. Use it

> "List my userscripts", "Create a script that hides the sidebar on example.com", "Fix the bug in my GitHub script".

## Notes

- The connection request shows the server's port. Only approve it if you started the server yourself.
- The port and token are kept in memory only. After a browser restart, open the connect URL again to reconnect.
- Disconnect at any time from the same settings section.
