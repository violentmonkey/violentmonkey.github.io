import { useState, useMemo } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { createContainer } from 'unstated-next';

function useSidebar(data) {
  const {
    allMdx: { nodes },
  } = useStaticQuery(graphql`
    query {
      allMdx {
        nodes {
          fields {
            slug
          }
          frontmatter {
            title
            sidebar {
              match
              order
            }
          }
        }
      }
    }
  `);
  const matchedNodes = useMemo(
    () =>
      data?.match &&
      nodes
        ?.filter((node) => node.frontmatter.sidebar?.match === data.match)
        .sort(
          (a, b) => a.frontmatter.sidebar.order - b.frontmatter.sidebar.order
        ),
    [data, nodes]
  );
  const [show, setShow] = useState(false);
  const toggle = () => {
    setShow(!show);
  };
  return {
    matchedNodes,
    show,
    setShow,
    toggle,
  };
}

export const SidebarContainer = createContainer(useSidebar);
