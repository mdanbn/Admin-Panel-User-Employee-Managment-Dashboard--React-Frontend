import { Box, useTheme } from "@mui/material";
import GeographyChart from "../../components/GeographyChart";
import { useContext } from "react";
import { SidebarContext } from "../global/SidebarContext";
import Header from "../../components/Header";
import { tokens } from "../../theme";


import { useRef, useState, useEffect } from "react";

const Geography = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
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
      <Header title="Geography" subtitle="Simple Geography Chart" />
      <Box
        ref={chartContainerRef}
        height="75vh"
        border={`1px solid ${colors.grey[100]}`}
        borderRadius="4px"
      >
        {containerReady && (
          <GeographyChart key={isCollapsed ? 'collapsed' : 'expanded'} />
        )}
      </Box>
    </Box>
  );
};

export default Geography;
