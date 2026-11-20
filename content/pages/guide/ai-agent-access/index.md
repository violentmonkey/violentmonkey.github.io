---
title: AI Agent Access (MCP)
date: 2026-10-09 21:00:00+0800
sidebar:
  order: 4
---

Violentmonkey can be managed by AI agents such as Claude through the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/). Instead of copying code back and forth, you can simply ask the agent to list, create, edit, or fix your userscripts, and it will do so directly.

## Demo video

<div class="relative w-full overflow-hidden rounded-lg" style="padding-bottom: 56.25%;">
  <iframe class="absolute inset-0 h-full w-full rounded-lg" src="https://www.youtube-nocookie.com/embed/KaIeVw5fXiE" title="AI Agent Access (MCP) demo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

## Prerequisites

- Violentmonkey >= 2.50.1
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

### 3. Grant tabs (optional)

To let the agent check scripts on a page, open **AI agent access (MCP)** in Violentmonkey settings and tick the tab under **Grant tab access**. The agent can only see the tabs you grant.

### 4. Use it

> "List my userscripts", "Create a script that hides the sidebar on example.com", "Why doesn't my script run on this tab?"

Scripts can also register handlers for the agent to call with [`GM_mcp`](/api/gm/#gm_mcp).

For other options, such as running the server over HTTP or in read-only mode, see the [MCP server docs](https://github.com/violentmonkey/mcp#readme).

## How is this different from browser automation?

| | Violentmonkey MCP | Browser automation (CDP) |
| --- | --- | --- |
| Setup | Approve a connect URL | Launch a separate browser, or enable remote debugging in Chrome |
| Browser | Your own Chrome or Firefox | A separate profile by default |
| Agent can | Manage scripts, inspect granted tabs | Control any page |

## Notes

- The connection request shows the server's port. Only approve it if you started the server yourself.
- The port and token are kept in memory only. After a browser restart, open the connect URL again to reconnect.
- Disconnect at any time from the same settings section.
