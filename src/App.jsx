import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";

import SwipeableEdgeDrawer from "./components/SwipeableEdgeDrawer";

function App() {
    const [values, setValues] = React.useState({
        pressure: 1,
        avnum: 1,
        volume: 1,
        temperature: 0
    });
    
    const [Ivalues, setIValues] = React.useState({
        pressure: 1,
        avnum: 1,
        volume: 1,
        temperature: 0
    });

    const [changed, setChanged] = React.useState(false);
    
    const handleChange = prop => event =>
        setIValues({ ...Ivalues, [prop]: parseInt(event.target.value.replace(/\D/g, '').replace(/^0*/, '')) || 0});
    
    
    React.useEffect(() => {
        if (JSON.stringify(values) !== JSON.stringify(Ivalues))
            setChanged(true);
        else
            setChanged(false);
    }, [Ivalues, values])

    return (
        <SwipeableEdgeDrawer>
            <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                    <OutlinedInput
                        id="outlined-adornment-pressure"
                        value={Ivalues.pressure}
                        onChange={handleChange("pressure")}
                        endAdornment={<InputAdornment position="end">atm</InputAdornment>}
                        aria-describedby="outlined-pressure-helper-text"
                        inputProps={{
                            "aria-label": "Pressure",
                        }}
                    />
                    <FormHelperText id="outlined-pressure-helper-text">Pressure</FormHelperText>
                </FormControl>
                <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                    <OutlinedInput
                        id="outlined-adornment-volume"
                        value={Ivalues.volume}
                        onChange={handleChange("volume")}
                        endAdornment={<InputAdornment position="end">L</InputAdornment>}
                        aria-describedby="outlined-volume-helper-text"
                        inputProps={{
                            "aria-label": "Volume",
                        }}
                    />
                    <FormHelperText id="outlined-volume-helper-text">Volume</FormHelperText>
                </FormControl>
                <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                    <OutlinedInput
                        id="outlined-adornment-temperature"
                        value={Ivalues.temperature}
                        onChange={handleChange("temperature")}
                        endAdornment={<InputAdornment position="end">°C</InputAdornment>}
                        aria-describedby="outlined-temperature-helper-text"
                        inputProps={{
                            "aria-label": "Temperature",
                        }}
                    />
                    <FormHelperText id="outlined-temperature-helper-text">Temperature</FormHelperText>
                </FormControl>
                <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                    <OutlinedInput
                        id="outlined-adornment-avnum"
                        value={Ivalues.avnum}
                        onChange={handleChange("avnum")}
                        endAdornment={<InputAdornment position="end">NA</InputAdornment>}
                        aria-describedby="outlined-avnum-helper-text"
                        inputProps={{
                            "aria-label": "Avnum",
                        }}
                    />
                    <FormHelperText id="outlined-avnum-helper-text">Number of particles</FormHelperText>
                </FormControl>
            </Box>
            <Box sx={{textAlign: "center"}}>
                <Button
                    sx={{width: "30ch"}}
                    variant="outlined"
                    disabled={!changed}
                    onClick={() => setValues(Ivalues)}
                >
                    Apply
                </Button>
            </Box>
        </SwipeableEdgeDrawer>
    )
}

export default App;
