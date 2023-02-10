import React from "react";
import { styled } from '@mui/material/styles';
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";

import SwipeableEdgeDrawer from "./components/SwipeableEdgeDrawer";

const Ball = styled(Box)(() => ({
    backgroundImage: "linear-gradient(45deg, red, blue)",
    color: "transparent",
    position: "absolute",
    borderRadius: "100%"
}));

const SliderContainer = styled(Box)(({ theme }) => ({
    height: "40px",
    textAlign: "center",
    marginBottom: "10px",
    marginLeft: "auto",
    marginRight: "auto",
    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px;",
    borderRadius: "30px",
    paddingLeft: "30px",
    paddingRight: "30px",
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.up('md')]: {
        width: "50vw"
    },
    [theme.breakpoints.down('md')]: {
        width: "80vw"
    },
}));

const StyledFab = styled(Fab)(({ theme }) => ({
    position: "absolute",
    top: 16,
    left: 16,
    
    [theme.breakpoints.down('md')]: {
        width: "200px",
        fontSize: "10px"
    },
}))

class App extends React.Component {
    state = {
        values: {
            pressure: 1,
            avnum: 1,
            temperature: 0,
            manVar: "pressure"
        },

        Ivalues: {
            pressure: 1,
            avnum: 1,
            temperature: 0,
            manVar: "pressure"
        },

        ball: {
            x: window.innerWidth / 2 - 15,
            y: window.innerHeight / 2 - 70,
            velocity: 0,
            direction: 0,
            friction: 0.05
        },
        
        changed: false,
        mouseDown: false,
        volume: 1,
        open: false
    }

    range = {
        pressure: [1, 10],
        avnum: [1, 10],
        temperature: [-273, 546]
    }

    ball = React.createRef();

    constructor() {
        super();
    }

    handleChange(prop, btn=true) {
        return (function (event) {
            if (btn) {
                let num = event.target.value.toString();
                let minus = false;
                if (num[0] === '-') {
                    minus = true;
                    num = num.replace('-', '');
                }
                num  = parseInt(num.replace(/\D/g, '').replace(/^0*/, '')) || 0;
                if (minus)
                    num *= -1;

                if (num < this.range[prop][0] || num > this.range[prop][1]){
                    return;
                }
                this.setState({ Ivalues : { ...this.state.Ivalues, [prop]: num } });
            } else {
                this.setState({ Ivalues : { ...this.state.Ivalues, [prop]: event.target.value } });
            }
        }).bind(this);
    }

    moveBall() {
        this.setState({ ball: { ...this.state.ball, velocity: this.state.ball.velocity * 0.95 }});
        let nel = {
            x: this.state.ball.x + this.state.ball.velocity * Math.cos(this.state.ball.direction),
            y: this.state.ball.y + this.state.ball.velocity * Math.sin(this.state.ball.direction)
        };

        if (nel.x < 0 || nel.x + 20 > window.innerWidth)
            this.setState({ ball: { ...this.state.ball, direction: Math.PI - this.state.ball.direction } });
        if (nel.y < 0 || nel.y + 90 > window.innerHeight)
            this.setState({ ball: { ...this.state.ball, direction: -1 * this.state.ball.direction } });

        nel = {
            x: this.state.ball.x + this.state.ball.velocity * Math.cos(this.state.ball.direction),
            y: this.state.ball.y + this.state.ball.velocity * Math.sin(this.state.ball.direction)
        };

        this.state.ball.x = nel.x;
        this.state.ball.y = nel.y;
        if (this.state.ball.velocity > 1)
            setTimeout(this.moveBall.bind(this), 16);
    }

    componentDidMount () {
        this.ball.current.style.left = this.state.ball.x
        this.ball.current.style.top = this.state.ball.y
    }

    componentDidUpdate(prevProps, prevState) {
        const move = mouse => e => {
            if (this.state.mouseDown) {
                let x, y;
                if (mouse) {
                    x = e.clientX;
                    y = e.clientY;
                }
                else {
                    x = e.changedTouches[0].clientX;
                    y = e.changedTouches[0].clientY;
                }
                this.ball.current.style.transform = `translate(${((this.state.ball.x + x) / 2 - this.state.ball.x) * 0.2}px, ${((this.state.ball.y + y) / 2 - this.state.ball.y) * 0.2}px)`
            }
        }
        window.addEventListener("mousemove", move(true));
        window.addEventListener("touchmove", move(false));

        const up = mouse => e => {
            if (this.state.mouseDown) {
                let x, y;
                if (mouse) {
                    x = e.clientX;
                    y = e.clientY;
                }
                else {
                    x = e.changedTouches[0].clientX;
                    y = e.changedTouches[0].clientY;
                }

                this.ball.current.style.transform = "translate(0px, 0px)";
                this.setState({ mouseDown: false, ball: { ...this.state.ball, velocity: Math.sqrt((this.state.ball.x - x + 10) ** 2 + (this.state.ball.y - y + 10) ** 2) * Math.sqrt(this.state.values.temperature + 273) / 50, direction: Math.atan2(this.state.ball.y - y + 10, this.state.ball.x - x + 10) } });
                setTimeout(this.moveBall.bind(this), 16);
            }
        }
        window.addEventListener("mouseup", up(true));
        window.addEventListener("touchend", up(false)); 

        if (this.state.Ivalues !== prevState.Ivalues || this.state.values !== prevState.values) {
            if (JSON.stringify(this.state.values) !== JSON.stringify(this.state.Ivalues))
                this.setState({ changed: true });
            else {
                this.setState({ changed: false });
                this.setState({ volume: this.state.values.avnum * (this.state.values.temperature + 273) / (this.state.values.pressure * 273) });
            }
        }
    }
    

    render () {
        return (
            <>
                <Box className="container" sx={{height: "calc(100vh - 152px)"}}>
                    <Ball
                        ref={this.ball}
                        sx={{
                            width: `${30 * this.state.volume}px`,
                            height: `${30 * this.state.volume}px`,
                            top: this.state.ball.y,
                            left: this.state.ball.x
                        }}
                        onMouseDown={() => {
                                if (!this.state.mouseDown)
                                    this.setState({ mouseDown: true });
                            }
                        }
                        onTouchStart={() => {
                            if (!this.state.mouseDown)
                                this.setState({ mouseDown: true });
                        }
                    }
                    />
                </Box>

                <SliderContainer>
                    <Slider
                        size="small"
                        value={this.state.values[this.state.values.manVar]}
                        min={this.range[this.state.values.manVar][0]}
                        max={this.range[this.state.values.manVar][1]}
                        valueLabelDisplay="auto"
                        onChange={(event, value) => {
                            this.handleChange([this.state.values.manVar])(event);
                            this.setState({
                                values: { ...this.state.values, [this.state.values.manVar]: value },
                            });
                        }}
                    />
                </SliderContainer>

                <StyledFab
                    variant="extended"
                    onClick={() => this.setState({ open: true })}
                >
                    Average kinetic energy of a gas particle : {Math.round(207 * (this.state.values.temperature + 273)) / 100} × 10⁻²³
                </StyledFab>
                
                <SwipeableEdgeDrawer>
                    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                            <OutlinedInput
                                disabled={this.state.values.manVar === "pressure"}
                                value={this.state.Ivalues.pressure}
                                onChange={this.handleChange("pressure")}
                                endAdornment={<InputAdornment position="end">atm</InputAdornment>}
                                inputProps={{
                                    "aria-label": "Pressure",
                                }}
                            />
                            <FormHelperText>Pressure (1~10)</FormHelperText>
                        </FormControl>
                        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                            <OutlinedInput
                                disabled={this.state.values.manVar === "temperature"}
                                value={this.state.Ivalues.temperature}
                                onChange={this.handleChange("temperature")}
                                endAdornment={<InputAdornment position="end">°C</InputAdornment>}
                                inputProps={{
                                    "aria-label": "Temperature",
                                }}
                            />
                            <FormHelperText>Temperature (-273~546)</FormHelperText>
                        </FormControl>
                        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                            <OutlinedInput
                                disabled={this.state.values.manVar === "avnum"}
                                value={this.state.Ivalues.avnum}
                                onChange={this.handleChange("avnum")}
                                endAdornment={<InputAdornment position="end">NA</InputAdornment>}
                                inputProps={{
                                    "aria-label": "Avnum",
                                }}
                            />
                            <FormHelperText>Number of particles (1~10)</FormHelperText>
                        </FormControl>
                    </Box>
    
                    <Box sx={{textAlign: "center", marginTop: 2}}>
                        <FormControl>
                            <FormHelperText>Manipulated variable</FormHelperText>
                            <RadioGroup defaultValue="pressure" value={this.state.Ivalues.manVar} onChange={this.handleChange("manVar", false)}>
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
                            disabled={!this.state.changed}
                            onClick={() => this.setState({ values: this.state.Ivalues })}
                        >
                            Apply
                        </Button>
                    </Box>
                </SwipeableEdgeDrawer>

                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={this.state.open}
                    onClick={() => this.setState({ open: !this.state.open })}
                >
                    PV = nRT <br />
                    Ek = 3/2kT
                </Backdrop>
            </>
        )
    }
}

export default App;
