import { useState, useEffect } from 'react';
import { createContainer } from 'unstated-next';

function useSidebar() {
  const [edges, setEdges] = useState(null);
  const [items, setItems] = useState(null);
  const [show, setShow] = useState(false);
  const [data, setData] = useState(null);
  const toggle = () => {
    setShow(!show);
  };
  useEffect(() => {
    let items;
    if (data?.match && edges) {
      items = edges.filter(edge => edge.node.frontmatter.sidebar?.match === data.match)
        .sort((a, b) => a.node.frontmatter.sidebar.order - b.node.frontmatter.sidebar.order);
    }
    setItems(items);
  }, [data, edges]);
  return {
    items, setItems,
    show, setShow, toggle,
    edges, setEdges,
    data, setData,
  };
}

export const SidebarContainer = createContainer(useSidebar);
