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
  const { name, options, defaultValue, placeholder, handleChange, isError } = props;
  return (
    <Select
      id={name}
      name={name}
      className={`${isError ? "input-error" : "input"}`}
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      options={options}
      defaultValue={defaultValue}
      placeholder={placeholder}
      classNamePrefix="select"
      styles={customStyles}
      onChange={(e) => handleChange(e)}
    />
  );
};

export default MultiSelect;
