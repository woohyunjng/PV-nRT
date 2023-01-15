import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";

import SwipeableEdgeDrawer from "./components/SwipeableEdgeDrawer";

function App() {
    const [values, setValues] = React.useState({
        pressure: 1,
        avnum: 1,
        temperature: 0,
        manVar: "pressure"
    });
    
    const [Ivalues, setIValues] = React.useState({
        pressure: 1,
        avnum: 1,
        temperature: 0,
        manVar: "pressure"
    });

    const [changed, setChanged] = React.useState(false);
    
    const handleChange = (prop, btn=true) => event =>
        setIValues({ ...Ivalues, [prop]: btn ? parseInt(event.target.value.replace(/\D/g, '').replace(/^0*/, '')) || 0 : event.target.value});
    
    
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
                        value={Ivalues.pressure}
                        onChange={handleChange("pressure")}
                        endAdornment={<InputAdornment position="end">atm</InputAdornment>}
                        inputProps={{
                            "aria-label": "Pressure",
                        }}
                    />
                    <FormHelperText>Pressure</FormHelperText>
                </FormControl>
                <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                    <OutlinedInput
                        value={Ivalues.temperature}
                        onChange={handleChange("temperature")}
                        endAdornment={<InputAdornment position="end">°C</InputAdornment>}
                        inputProps={{
                            "aria-label": "Temperature",
                        }}
                    />
                    <FormHelperText>Temperature</FormHelperText>
                </FormControl>
                <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                    <OutlinedInput
                        value={Ivalues.avnum}
                        onChange={handleChange("avnum")}
                        endAdornment={<InputAdornment position="end">NA</InputAdornment>}
                        inputProps={{
                            "aria-label": "Avnum",
                        }}
                    />
                    <FormHelperText>Number of particles</FormHelperText>
                </FormControl>
            </Box>

            <Box sx={{textAlign: "center", marginTop: 2}}>
                <FormControl>
                    <FormHelperText>Manipulated variable</FormHelperText>
                    <RadioGroup defaultValue="pressure" value={Ivalues.manVar} onChange={handleChange("manVar", false)}>
                        <FormControlLabel value="pressure" label="Pressure" control={<Radio />} />
                        <FormControlLabel value="temperature" label="Temperature" control={<Radio />} />
                        <FormControlLabel value="avnum" label="Number of particles" control={<Radio />} />
                    </RadioGroup>
                </FormControl>
            </Box>

            <Box sx={{textAlign: "center", marginTop: 4}}>
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
