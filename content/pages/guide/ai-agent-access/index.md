---
title: AI Agent Access (MCP)
date: 2026-10-09 21:00:00+0800
sidebar:
  order: 4
---

Violentmonkey can be managed by AI agents such as Claude through the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/). Instead of copying code back and forth, you can simply ask the agent to list, create, edit, or fix your userscripts, and it will do so directly.

## Prerequisites

- Violentmonkey >= 2.49.5
- Node.js >= 24

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

## Connecting from another device

By default the server runs in stdio mode: your agent starts it as a child process, and everything stays on your own machine. If your agent runs elsewhere — for example on a remote server or a mobile device — use the HTTP mode instead:

```bash
VM_MCP_TOKEN=secret npx -y @violentmonkey/mcp -p 5678 --transport http
```

Then register it with your agent:

```bash
claude mcp add --transport http violentmonkey http://127.0.0.1:5678/mcp --header "Authorization: Bearer secret"
```

A few things to know about this mode:

- The token acts as a password. The server generates a random one on each start, so set a fixed token with `--token` or the `VM_MCP_TOKEN` environment variable — otherwise the agent's saved credentials stop working after a restart, and the extension can no longer connect either.
- The server only listens on your own machine (`127.0.0.1`) by default. If you open it up with `--host 0.0.0.0`, put it behind HTTPS and keep the token secret, like any password exposed to the network.

## Notes

- The connection request shows the server's port. Only approve it if you started the server yourself.
- The port and token are kept in memory only. After a browser restart, open the connect URL again to reconnect.
- Disconnect at any time from the same settings section.
