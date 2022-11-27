import React from "react";
import Skeleton from "@mui/material/Skeleton";

import SwipeableEdgeDrawer from "./components/SwipeableEdgeDrawer";

function App() {
    return (
        <SwipeableEdgeDrawer>
            <Skeleton variant="rectangular" height="100%" />
        </SwipeableEdgeDrawer>
    )
}

export default App;
