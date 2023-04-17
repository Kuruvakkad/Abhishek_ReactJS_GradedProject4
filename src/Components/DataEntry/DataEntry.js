import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import "./DataEntry.css";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios, { isCancel, AxiosError } from "axios";

function DataEntry() {
  const [columns, setColumns] = useState([]);
  const [records, setRecords] = useState([]);

  
  //lets import DB data using fake json api.
  useEffect(() => {
    axios.get("http://localhost:3000/expenses/").then((res) => {
      setColumns(Object.keys(res.data[0]));
      setRecords(res.data);
      console.log(res.data);
    });
  });

  const payees = new Set(records.map((record) => record.payee));
  const payeeTotals = {};
  records.forEach((record) => {
    if (!payeeTotals[record.payee]) {
      payeeTotals[record.payee] = 0;
    }
    payeeTotals[record.payee] += parseFloat(record.price);
  });


  const total = records.reduce((acc, curr) => {
    return acc + parseFloat(curr.price);
  }, 0);
  //To add a division function by dividing the total by the total of unique names, we can first create a Set of unique names and then calculate the length of that set to get the number of unique names. Then, you can divide the total by the number of unique names to get the average per person.

  const uniqueNames = new Set(
    records.map((record) => record.payee && record.payee.toLowerCase())
  );

  const numPeople = uniqueNames.size;

  const average = parseFloat(total) / parseFloat(numPeople);
  
  

  return (
    <Container>
      <Row>
        <Col  sm={8}>
          <Table
            className="table"
            striped
            bordered
            hover
            size="s"
            variant="dark"
          >
            <thead>
              <tr>
                {columns.map((c, i) => (
                  <th key={i}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {records.map((d, i) => {
                return (
                  <tr key={i}>
                    <td>{d.id}</td>
                    <td>{d.Date}</td>
                    <td>{d.Product}</td>
                    <td>{d.price}</td>
                    <td>{d.payee}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
        <Col sm={4}>
          <h2 className="header1">Summary</h2>
          <h3 className="design2">Total:{total}</h3>
          
          <h3>Per Person: {average.toFixed(2)}</h3>
          <h2 className="header1">Spent Amount Details</h2>
          {/* Loop over the payee names and display each one */}
          {Array.from(payees).map((payee) => (
            <p className="settlement" key={payee}>
              {payee}:{payeeTotals[payee]}
            </p>
          ))}

          <h2 className="header1">Final Settlement</h2>
          <div>
          {Array.from(payees).map((payee) => {
      const diff = payeeTotals[payee]-average;
      let text = '';
      if (diff > 0) {
        text = 'receive amount from other members';
      } else if (diff < 0) {
        text = 'pay to others';
      }
      return (
        <p className="settlement" key={payee}>
          {payee}: {text} ({diff.toFixed(2)})
        </p>
      );
    })}
   
          </div>
          
          
    
          
        </Col>
      </Row>
    </Container>
  );
}

export default DataEntry;
