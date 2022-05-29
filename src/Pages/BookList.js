import React, { useEffect, useState } from 'react';
import * as $ from 'jquery';

import BoxHeader from '../components/BoxHeader';
import CustomTable from '../components/CustomTable';

const rows = [
    {id: "0001", bookName: "Harry Potter", author: "JJ", borrowedBy: "Nabeel", dateOfBorrow: "23/11/2021", dateOfReturn: "23/05/2022"}
];

function BookList(props) {

    const [books, setBooks] = useState([]);

    useEffect(() => {
      $.get(`${props.BACKEND_URL}/getBooks`, function(data, status) {
        if (status === "success")
          setBooks(data);
      });
    }, [props.BACKEND_URL])
  
    return (
        <div className="content">
            <div className="box box-primary">
                
                <BoxHeader title="Books List" />
                <CustomTable 
                    headers={["Book Name", "Author", "Borrowed By" , "Date of Borrow", "Date of Return"]}
                    attributes={["bookName", "author", "borrowedBy" , "dateOfBorrow", "dateOfReturn"]}
                    rows={books}
                    redirectLink="bookDetails"
                />
            </div>
        </div>
    );
}

export default React.memo(BookList)