import "./ShowBusiness.css";
import React, { useState, useEffect } from "react";
import { MDBDataTable } from "mdbreact";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import api  from  '../api';
// import HttpService from '../../utils/httpService'
import axios from "axios";
const ShowBusiness = () => {
  const baseURL = api + "api/businesses?page=0&limit=100";

  const [results, setresults] = useState([]);

  useEffect(() => {
    getresults();
  }, []);
  
  //get todo list from database
  const getresults = () => {
    axios.get(baseURL).then((response) => {
      console.log(response.data.data.data);
      setresults(response.data.data.data);
    });
  };
  const handleExportToCSV = () => {
    const fileName = 'table_data.csv';
    const rows = data.rows;
    const separator = ',';
    const keys = Object.keys(rows[0]).filter(key => key !== 'qrCode' && key !== 'actions');
  
    let csvContent = '';
    csvContent += keys.join(separator) + '\n';
  
    rows.forEach((row) => {
      const values = keys.map((key) => {
        return row[key];
      });
      csvContent += values.join(separator) + '\n';
    });
    console.log(csvContent);
    const link = document.createElement('a');
    link.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvContent);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  const data = {
      columns: [
        {
          label: 'Business Name',
          field: 'businessName'
        },
        {
          label: "First Name",
          field: "firstName",
        },
        {
          label: "middle Name",
          field: "middleName",
          width: 150,
        },
        {
          label: "last Name",
          field: "lastName",
          width: 270,
        },
        {
          label: "Business Contact Number",
          field: "businessContactNo",
          width: 200,
        },
        {
          label: "Personal Contact Number",
          field: "personalContactNo",
          width: 200,
        },
        {
          label: "Business Email ID",
          field: "businessEmailId",
          width: 100,
        },
        {
          label: "Business Registration Date",
          field: "businessRegDate",
          width: 100,
        },

        {
          label: "Personal Email Id",
          field: "personalEmailId",
          width: 150,
        },
        {
          label: "GST Reg. No",
          field: "gstNo",
          width: 100,
        },
        {
          label: "Pan Card",
          field: "pancardNo",
          width: 100,
        },
        // {
        //   label: "Action",
        //   field: "actions",
        //   width: 50,
        //   sort: false,
        // },
      ],
    rows: results && results.map((row) => ({
       // Add a check before calling map
      businessName: row.businessName,
      firstName: row.firstName,
      middleName: row.middleName,
      lastName: row.lastName,
      businessContactNo: row.businessContactNo,
      personalContactNo: row.personalContactNo,
      businessEmailId: row.businessEmailId,
      personalEmailId: row.personalEmailId,
      gstNo: row.gstNo,
      pancardNo: row.pancardNo,
      businessRegDate: new Date(row.createdAt).toISOString().split('T')[0],
      // actions: <button onClick={() => console.log(row)}>Show</button> // Add a button to each row
    })),
  
  };
  console.log(results)
  return (
    <div className="home">
      <div className="homeContainer">
        <div className="VRbody">
          <h3>Registered Business</h3>
          <MDBDataTable
            noBottomColumns
            style={{ lineHeight: "normal", whiteSpace: "pre", justifyContent: "center" }}
            striped
            bordered
            small
            data={data}
          />
      <button onClick={handleExportToCSV}>Download Report</button>

        </div>
      </div>
    </div>
  );
};


export default ShowBusiness;
