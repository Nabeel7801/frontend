import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function CustomSelect(props) {

  return (
    <FormControl variant="standard"  sx={{my: 2, mx: 4, width: "50%"}}>
        <InputLabel>{props.label}</InputLabel>
        <Select
            name={props.name}
            value={props.value}
            onChange={props.onChange}
            label={props.label}
            defaultValue="" >
            <MenuItem value="">No one</MenuItem>
            {props.options.map((option, index) => 
                <MenuItem key={index} value={option.id}>{option.first_name + " " + option.last_name}</MenuItem>
            )}

        </Select>
    </FormControl>
  );
}

export default React.memo(CustomSelect)