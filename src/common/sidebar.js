import React, { useState, useEffect } from 'react';
import { createContainer } from 'unstated-next';

function useSidebar() {
  const [nodes, setNodes] = useState(null);
  const [matchedNodes, setMatchedNodes] = useState(null);
  const [show, setShow] = useState(false);
  const [data, setData] = useState(null);
  const toggle = () => {
    setShow(!show);
  };
  useEffect(() => {
    let matched;
    if (data?.match && nodes) {
      matched = nodes
        .filter((node) => node.frontmatter.sidebar?.match === data.match)
        .sort(
          (a, b) => a.frontmatter.sidebar.order - b.frontmatter.sidebar.order
        );
    }
    setMatchedNodes(matched);
  }, [data, nodes]);
  return {
    matchedNodes,
    show,
    setShow,
    toggle,
    setNodes,
    setData,
  };
}

export const SidebarContainer = createContainer(useSidebar);

export function withProvider(Component) {
  return function WithSidebarProvider(props) {
    return (
      <SidebarContainer.Provider>
        <Component {...props} />
      </SidebarContainer.Provider>
    );
  };
}
