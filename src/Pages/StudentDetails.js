import React, { useEffect, useState, useCallback } from 'react'
import * as $ from 'jquery';

import BoxHeader from '../components/BoxHeader';
import TextField from '@mui/material/TextField';

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';


function StudentDetails(props) {

    const [studentDetails, setStudentDetails] = useState({});

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const searchID = urlParams.get('id');

        $.get(`${props.BACKEND_URL}/getStudentById/${searchID}`, (data, status) => {
            if (status === 'success') {
                if (data.length > 0) {
                    const { id, first_name, last_name } = data[0];
                    setStudentDetails({id, firstName: first_name, lastName: last_name});
                }
            }
        })
    }, [props.BACKEND_URL])

    const onChangeHandler = useCallback(e => {
        setStudentDetails(prevDetails => ({
            ...prevDetails,
            [e.target.name]: e.target.value
        }));
    }, [])

    const updateStudent = e => {
        $.post(`${props.BACKEND_URL}/updateStudent`, studentDetails, (data, status) => {
            if (status === 'success') {
                alert("Student Updated Successfully");
                window.location.replace("listStudents")
            }
        })
    }

    const deleteStudent = e => {
        $.ajax({
            url: `${props.BACKEND_URL}/deleteStudent/${studentDetails.id}`,
            type: 'DELETE',
            success: function() {
                alert("Student Deleted Successfully");
                window.location.replace("listStudents")
            }
        });
    }
  
    return (
        <div className="content">
            
            <div className="box box-primary">
            
                <BoxHeader title="Student Details" />

                <TextField 
                    label="First Name" 
                    variant="standard" 
                    name="firstName"
                    value= {studentDetails.firstName || ''}
                    onChange = {onChangeHandler}
                    sx={{my: 2, mx: 4, width: "50%"}}
                />

                <br />
                
                <TextField 
                    label="Last Name" 
                    variant="standard" 
                    name="lastName"
                    value= {studentDetails.lastName || ''}
                    onChange = {onChangeHandler}
                    sx={{my: 2, mx: 4, width: "50%"}}
                />

                <div className="box-footer">
                    <Stack direction="row" spacing={2}>
                        <Button variant="outlined" startIcon={<DeleteIcon />} onClick={deleteStudent}>
                            Delete
                        </Button>
                        <Button variant="contained" onClick={updateStudent}>
                            Update
                        </Button>
                    </Stack>
                </div>
                

            
            </div>

        </div>
    )

}

export default React.memo(StudentDetails);