import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    // color: state.isSelected ? "white" : "black",
    color: state.isFocused ? "white" : "black",
    backgroundColor: state.isFocused ? "#B87817" : "white",
    "&:hover": {
      backgroundColor: "#B87817",
      color: "white",
    },
  }),
};

const MultiSelect = (props) => {
  const { options, placeholder } = props;
  return (
    <Select
      className="mt-1"
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      options={options}
      placeholder={placeholder}
      classNamePrefix="select"
      styles={customStyles}
    />
  );
};

export default MultiSelect;
