import React, { useEffect, useState } from 'react';
import * as $ from 'jquery';

import BoxHeader from '../components/BoxHeader';
import CustomTable from '../components/CustomTable';

function StudentList(props) {
  
  const [students, setStudents] = useState([]);

  useEffect(() => {
    $.get(`${props.BACKEND_URL}/getStudents`, function(data, status) {
      if (status === "success")
        setStudents(data);
    });
  }, [props.BACKEND_URL])

  return (
      
    <div className="content">
        <div className="box box-primary">
            
            <BoxHeader title="Students List" />
            <CustomTable 
                headers={["First Name", "Last Name"]}
                attributes={["first_name", "last_name"]}
                rows={students}
                redirectLink="studentDetails"
            />

        </div>
    </div>
  );
}

export default React.memo(StudentList);
