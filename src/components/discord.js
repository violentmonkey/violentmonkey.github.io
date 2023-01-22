import React, { useState } from 'react';

export default function DiscordButton() {
  const [open, setOpen] = useState(false);
  return open ? (
    <div className="fixed bottom-0 right-0 w-full h-full flex flex-col items-end z-10 max-w-[320px] max-h-[450px]">
      <div className="p-2 cursor-pointer" onClick={() => setOpen(false)}>
        <svg viewBox="0 0 12 12" className="w-4 h-4">
          <path
            d="M0 1L11 12L12 11L1 0zM11 0L0 11L1 12L12 1z"
            stroke="none"
            fill="currentColor"
          />
        </svg>
      </div>
      <iframe
        className="flex-1 w-full"
        src="https://discord.com/widget?id=995346102003965952&theme=dark"
        sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
      />
    </div>
  ) : (
    <a
      className="fixed bottom-0 right-8 px-8 py-2 bg-blue-500 hover:bg-blue-600 text-white hover:text-white rounded-t-lg uppercase cursor-pointer"
      onClick={() => setOpen(true)}
    >
      Open Chat
    </a>
  );
}
