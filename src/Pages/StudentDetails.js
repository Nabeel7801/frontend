import React, { useEffect, useState } from 'react'
import * as $ from 'jquery';

import BoxHeader from '../components/BoxHeader';
import TextField from '@mui/material/TextField';

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';


function StudentDetails(props) {

    const [studentDetails, setStudentDetails] = useState({});

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get('id');

        $.get(`${props.BACKEND_URL}/getStudentById/${id}`, function(data, status) {
            if (status === "success") {
                if (data.length > 0) {
                    setStudentDetails(data[0]);
                }
            }
        });

    }, [props.BACKEND_URL])

    return (
        <div className="content">
            
            <div className="box box-primary">
            
                <BoxHeader title="Student Details" />

                <TextField 
                    id="standard-basic" 
                    label="First Name" 
                    variant="standard" 
                    value="123"
                />


                <TextField id="standard-basic" label="last Name" variant="standard" />

                <Stack direction="row" sx={{my:2, mx:3}} spacing={2}>
                    <Button variant="outlined" startIcon={<DeleteIcon />}>
                        Delete
                    </Button>
                    <Button variant="contained" endIcon={<SendIcon />}>
                        Update
                    </Button>
                </Stack>

            
            </div>

        </div>
    )

}

export default React.memo(StudentDetails);