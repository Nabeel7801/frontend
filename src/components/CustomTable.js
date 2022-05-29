import * as React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

function CustomTable(props) {

    const viewPage = e => {
        window.location.replace(`${props.redirectLink}?id=${e.target.id}`);
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">

                <TableHead>
                    <TableRow>

                        {props.headers.map((header, index) => 
                            index === 0 ?
                                <TableCell key={index}>{header}</TableCell>
                            :
                                <TableCell align="right" key={index}>{header}</TableCell>
                        )}

                        <TableCell align="right">ACTION</TableCell>

                    </TableRow>
                </TableHead>

                <TableBody>
                    {props.rows.map((row, key) => (
                        <TableRow
                            key={key}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            {props.attributes.map((attr, index) => 
                                index === 0 ?
                                    <TableCell component="th" scope="row" key={index}>{row[attr]}</TableCell>
                                :
                                    <TableCell align="right" key={index}>{row[attr]}</TableCell>
                            )}

                            <TableCell align="right">
                                <Button aria-label="view" id={row.id} onClick={viewPage}>
                                    View
                                </Button>
                            </TableCell>

                        </TableRow>
                    ))}

                </TableBody>

            </Table>

        </TableContainer>
    );
}

export default React.memo(CustomTable);