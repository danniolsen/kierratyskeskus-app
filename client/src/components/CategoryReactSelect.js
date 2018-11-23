import React, { Fragment } from 'react';
import Select from 'react-select';

const CategoryReactSelect = (props) => {
  const {
    options, label, input: { value }, meta,
  } = props;

  const className = `form-group ${meta.touched && meta.error ? 'is-invalid' : ''}`;

  const onInputChange = valueToChange => props.input.onChange(valueToChange.length === 0 ? '' : valueToChange);

  const customStyles = {
    control: base => ({
      ...base,
      boxShadow: 'none',
      // You can also use state.isFocused to conditionally style based on the focus state
      borderColor: meta.error && meta.touched ? 'red' : 'lightgrey',
      ':hover': {
        borderColor: meta.error && meta.touched ? 'red' : 'lightgrey',
      },
    }),
  };

  return (
    <Fragment>
      <label>{label}</label>
      <Select
        {...props}
        value={value}
        onChange={onInputChange}
        onBlur={() => props.input.onBlur(props.input.value)}
        options={options}
        placeholder="Select a category"
        isMulti
        styles={customStyles}
        blurInputOnSelect={false}
      />
      <div className={className}>
        <div className="text-help">
          {meta.touched ? meta.error : ''}
        </div>
      </div>
    </Fragment>
  );
};

export default CategoryReactSelect;
