
import { Box } from "@mui/material";
import Header from "../../components/Header";
import PieChart from "../../components/PieChart";
import { useRef, useState, useEffect, useContext } from "react";
import { SidebarContext } from "../global/SidebarContext";

const Pie = () => {
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
      <Header title="Pie Chart" subtitle="Simple Pie Chart" />
      <Box ref={chartContainerRef} height="75vh">
        {containerReady && (
          <PieChart key={isCollapsed ? 'collapsed' : 'expanded'} />
        )}
      </Box>
    </Box>
  );
};

export default Pie;
