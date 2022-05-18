import React from "react";
import { Slider } from "@mui/material";
import { Controller } from "react-hook-form";

export const SliderInputComp = ({name,control,setValue,label}) => {
  //const [sliderValue, setSliderValue] = React.useState(0);

/*   useEffect(() => {
    if (sliderValue) setValue(name, sliderValue);
  }, [sliderValue]); */

/*   const handleChange = (event: any, newValue: number | number[]) => {
    setSliderValue(newValue as number);
  }; */

  const marks = [
    {
      value: 0,
      label: '0',
    },
    {
      value: 100,
      label: '100',
    },
  ];
  
  function valuetext(value) {
    return `${value}`;
  }

  return <Controller
      name={name}
      control={control}
      render={({ value, field, fieldState, formState, onChange }) => (
        <Slider
          value={value}
          onChange={onChange}
          valueLabelDisplay="auto"
          defaultValue={70}
          marks={marks}
        />
      )}
    />
};