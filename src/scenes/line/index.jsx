

import { Box } from "@mui/material";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import { useRef, useState, useEffect, useContext } from "react";
import { SidebarContext } from "../global/SidebarContext";


const Line = () => {
  const { isCollapsed } = useContext(SidebarContext);
  const chartContainerRef = useRef(null);
  const [containerReady, setContainerReady] = useState(false);
  const [sidebarTransitioning, setSidebarTransitioning] = useState(false);

  useEffect(() => {
    // Find the sidebar DOM node
    const sidebar = document.querySelector('.pro-sidebar');
    let transitionTimeout;

    function checkSize() {
      if (chartContainerRef.current) {
        const { width, height } = chartContainerRef.current.getBoundingClientRect();
        setContainerReady(width > 0 && height > 0);
      }
    }

    function handleTransitionStart() {
      setSidebarTransitioning(true);
    }
    function handleTransitionEnd() {
      setSidebarTransitioning(false);
      // Wait a tick for layout, then check size
      transitionTimeout = setTimeout(checkSize, 50);
    }

    if (sidebar) {
      sidebar.addEventListener('transitionstart', handleTransitionStart);
      sidebar.addEventListener('transitionend', handleTransitionEnd);
    }
    // Initial check
    checkSize();
    window.addEventListener("resize", checkSize);

    return () => {
      if (sidebar) {
        sidebar.removeEventListener('transitionstart', handleTransitionStart);
        sidebar.removeEventListener('transitionend', handleTransitionEnd);
      }
      window.removeEventListener("resize", checkSize);
      if (transitionTimeout) clearTimeout(transitionTimeout);
    };
  }, [isCollapsed]);

  return (
    <Box m="20px">
      <Header title="Line Chart" subtitle="Simple Line Chart" />
      <Box ref={chartContainerRef} height="75vh">
        {containerReady && !sidebarTransitioning && (
          <LineChart key={isCollapsed ? 'collapsed' : 'expanded'} />
        )}
      </Box>
    </Box>
  );
};

export default Line;
