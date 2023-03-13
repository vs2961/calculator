import { useState } from "react";
import { Button, Container, Grid, Paper, styled } from "@mui/material";
import { GridDigitButton } from "./GridDigitButton";
import { GridOperationButton } from "./GridOperationButton";

const OutputContainer = styled(`div`)(({ theme }) => ({
  width: "100%",
  textAlign: "right",
  height: "2em",
  padding: theme.spacing(2),
  fontSize: "3em",
  overflow: "hidden",
}));

const CalculatorBase = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginTop: theme.spacing(4),
  borderRadius: 15,
}));

function App() {
  const [prevValue, setPrevValue] = useState("0");
  const [currentValue, setCurrentValue] = useState("0");
  const [displayValue, setDisplayValue] = useState("0");
  const [operation, setOperation] = useState("");
  const [overwrite, setOverwrite] = useState(true);

  const equals = () => {
    var curr = 0;
    try {
      console.log(currentValue.replace("Ans", prevValue));
      curr = eval(currentValue.replace("Ans", prevValue));
    } catch (err) {
      console.log(err);
      setDisplayValue("Error");
      setCurrentValue("0");
      setPrevValue("0");
      setOverwrite(true);
      return;
    }
    setCurrentValue(`${curr}`);
    setDisplayValue(parseDisplay(`${curr}`));
    setPrevValue(`${curr}`);
    setOperation("");
    setOverwrite(true);
  };

  const parseDisplay = (x: string) => {
    var num = Number(parseFloat(x));
    console.log(x);
    var truncatedNum = num.toPrecision(Math.min(num.toString().length, 13));
    if (truncatedNum.includes(".")) {
      if (truncatedNum.includes("e")) {
        var index = truncatedNum.lastIndexOf("e");
        var power = truncatedNum.substring(index);
        truncatedNum = truncatedNum.substring(0, index).replace(/(\.\d*?[1-9])0+$/g, "$1" ) + power;
      } else {
        truncatedNum = truncatedNum.replace(/(\.\d*?[1-9])0+$/g, "$1" );
      }
    }
    if (truncatedNum.endsWith(".0")) {
      return truncatedNum.substring(0, truncatedNum.length - 2);
    }
    return truncatedNum;
  }

  const clear = () => {
    setPrevValue("0");
    setOperation("");
    setCurrentValue("0");
    setDisplayValue("0");
    setOverwrite(true);
  };

  const del = () => {
    setCurrentValue("0");
    setDisplayValue("0");
    setOverwrite(true);
  };

  const percent = () => {
    const curr = parseFloat(currentValue);
    setCurrentValue((curr / 100).toString());
    setDisplayValue(parseDisplay((curr / 100).toString()));
  };

  const selectOperation = (op: string) => {
    setCurrentValue(`${currentValue}${op}`);
    setDisplayValue(`${currentValue}${op}`);
    console.log(currentValue, displayValue);
    setOverwrite(false);
  };

  const setDigit = (digit: string) => {
    if (overwrite && digit !== ".") {
      setCurrentValue(digit);
      setDisplayValue(digit);
    } else {
      console.log(currentValue, displayValue);
      setCurrentValue(`${currentValue}${digit}`);
      setDisplayValue(`${currentValue}${digit}`);
    }
    setOverwrite(false);
  };

  return (
    <Container maxWidth="sm">
      <CalculatorBase elevation={3}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <OutputContainer data-testid="output">
              <div style={{float:"right"}}>
                {displayValue}
              </div>
            </OutputContainer>
          </Grid>
          <Grid item container columnSpacing={1}>
            <GridOperationButton
              operation={"AC"}
              selectOperation={clear}
              selectedOperation={operation}
            />
            <GridOperationButton
              operation={"C"}
              selectOperation={del}
              selectedOperation={operation}
            />
            <GridOperationButton
              operation={"%"}
              selectOperation={percent}
              selectedOperation={operation}
            />
            <GridOperationButton
              operation={"/"}
              selectOperation={selectOperation}
              selectedOperation={operation}
            />
          </Grid>
          <Grid item container columnSpacing={1}>
            <GridDigitButton digit={"7"} enterDigit={setDigit} />
            <GridDigitButton digit={"8"} enterDigit={setDigit} />
            <GridDigitButton digit={"9"} enterDigit={setDigit} />
            <GridOperationButton
              operation={"*"}
              selectOperation={selectOperation}
              selectedOperation={operation}
            />
          </Grid>
          <Grid item container columnSpacing={1}>
            <GridDigitButton digit={"4"} enterDigit={setDigit} />
            <GridDigitButton digit={"5"} enterDigit={setDigit} />
            <GridDigitButton digit={"6"} enterDigit={setDigit} />
            <GridOperationButton
              operation={"-"}
              selectOperation={selectOperation}
              selectedOperation={operation}
            />
          </Grid>
          <Grid item container columnSpacing={1}>
            <GridDigitButton digit={"1"} enterDigit={setDigit} />
            <GridDigitButton digit={"2"} enterDigit={setDigit} />
            <GridDigitButton digit={"3"} enterDigit={setDigit} />

            <GridOperationButton
              operation={"+"}
              selectOperation={selectOperation}
              selectedOperation={operation}
            />
          </Grid>
          <Grid item container columnSpacing={1}>
            <GridDigitButton digit={"Ans"} enterDigit={setDigit} />
            <GridDigitButton digit={"0"} enterDigit={setDigit} />
            <GridDigitButton digit={"."} enterDigit={setDigit} />
            <Grid item xs={3}>
              <Button fullWidth variant="contained" onClick={equals}>
                =
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </CalculatorBase>
    </Container>
  );
}

export default App;
