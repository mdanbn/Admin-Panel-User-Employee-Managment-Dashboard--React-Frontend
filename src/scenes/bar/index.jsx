
import { Box } from "@mui/material";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";
import { useContext, useRef, useState, useEffect } from "react";
import { SidebarContext } from "../global/SidebarContext";

const Bar = () => {
  const { isCollapsed } = useContext(SidebarContext);
  const chartContainerRef = useRef(null);
  const [containerReady, setContainerReady] = useState(false);

  useEffect(() => {
    function checkSize() {
      if (chartContainerRef.current) {
        const { width, height } = chartContainerRef.current.getBoundingClientRect();
        setContainerReady(width > 0 && height > 0);
      }
    }
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, [isCollapsed]);

  return (
    <Box m="20px">
      <Header title="Bar Chart" subtitle="Simple Bar Chart" />
      <Box ref={chartContainerRef} height="75vh">
        {containerReady && (
          <BarChart key={isCollapsed ? 'collapsed' : 'expanded'} />
        )}
      </Box>
    </Box>
  );
};

export default Bar;
