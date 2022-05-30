import React, { useEffect, useState } from 'react';
import * as $ from 'jquery';

import BoxHeader from '../components/BoxHeader';
import CustomTable from '../components/CustomTable';

function BookList(props) {

    const [books, setBooks] = useState([]);

    useEffect(() => {
      $.get(`${props.BACKEND_URL}/getBooks`, function(data, status) {
        if (status === "success")
            data.map(d => d.borrowedBy = d.first_name + " " + d.last_name);
            setBooks(data);
      });
    }, [props.BACKEND_URL])
  
    return (
        <div className="content">
            <div className="box box-primary">
                
                <BoxHeader title="Books List" />
                <CustomTable 
                    headers={["Book Name", "Author", "Borrowed By" , "Date of Borrow", "Date of Return"]}
                    attributes={["book_name", "author", "borrowedBy" , "date_of_borrow", "date_of_return"]}
                    rows={books}
                    redirectLink="bookDetails"
                />
            </div>
        </div>
    );
}

export default React.memo(BookList)