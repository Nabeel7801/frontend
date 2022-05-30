import React, { useEffect, useState, useCallback } from 'react'
import * as $ from 'jquery';

import CustomSelect from '../components/CustomSelect'
import BoxHeader from '../components/BoxHeader';
import TextField from '@mui/material/TextField';

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';


function BookDetails(props) {

    const [bookDetails, setBookDetails] = useState({});
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const searchID = urlParams.get('id');

        $.get(`${props.BACKEND_URL}/getBookById/${searchID}`, (data, status) => {
            if (status === 'success') {
                if (data.length > 0) {
                    const { id, book_name, author, borrowed_by, date_of_borrow, date_of_return } = data[0];
                    setBookDetails({id, bookName: book_name, author, borrowedBy: borrowed_by, dateOfBorrow: date_of_borrow, dateOfReturn: date_of_return});
                }
            }
        })

        $.get(`${props.BACKEND_URL}/getStudents`, (data, status) => {
            if (status === 'success') {
                setStudents(data);
            }
        })

    }, [props.BACKEND_URL])

    const onChangeHandler = useCallback(e => {
        setBookDetails(prevDetails => ({
            ...prevDetails,
            [e.target.name]: e.target.value
        }));
    }, [])

    const updateBook = e => {
        
        $.post(`${props.BACKEND_URL}/updateBook`, bookDetails, (data, status) => {
            if (status === 'success') {
                alert("Book Updated Successfully");
                window.location.replace("listBooks")
            }
        })
    }

    const deleteBook = e => {
        $.ajax({
            url: `${props.BACKEND_URL}/deleteBook/${bookDetails.id}`,
            type: 'DELETE',
            success: function() {
                alert("Book Deleted Successfully");
                window.location.replace("listBooks")
            }
        });
    }
  
    return (
        <div className="content">
            
            <div className="box box-primary">
            
                <BoxHeader title="Book Details" />

                <TextField 
                    label="Book Name" 
                    variant="standard" 
                    name="bookName"
                    value= {bookDetails.bookName || ''}
                    onChange = {onChangeHandler}
                    sx={{my: 2, mx: 4, width: "50%"}}
                />

                <br />
                
                <TextField 
                    label="Author" 
                    variant="standard" 
                    name="author"
                    value= {bookDetails.author || ''}
                    onChange = {onChangeHandler}
                    sx={{my: 2, mx: 4, width: "50%"}}
                />

                <br />
                
                <CustomSelect 
                    label="Borrowed By"
                    name="borrowedBy"
                    options={students}
                    value= {bookDetails.borrowedBy || ''}
                    onChange = {onChangeHandler}
                />

                <br />
                
                <TextField 
                    label="Date of Borrow" 
                    variant="standard" 
                    name="dateOfBorrow"
                    value= {bookDetails.dateOfBorrow || ''}
                    onChange = {onChangeHandler}
                    sx={{my: 2, mx: 4, width: "50%"}}
                />

                <br />
                
                <TextField 
                    label="Date of Return" 
                    variant="standard" 
                    name="dateOfReturn"
                    value= {bookDetails.dateOfReturn || ''}
                    onChange = {onChangeHandler}
                    sx={{my: 2, mx: 4, width: "50%"}}
                />


                <div className="box-footer">
                    <Stack direction="row" spacing={2}>
                        <Button variant="outlined" startIcon={<DeleteIcon />} onClick={deleteBook}>
                            Delete
                        </Button>
                        <Button variant="contained" onClick={updateBook}>
                            Update
                        </Button>
                    </Stack>
                </div>
                

            
            </div>

        </div>
    )

}

export default React.memo(BookDetails);