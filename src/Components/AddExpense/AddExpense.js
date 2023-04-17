import React, { useState,useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./AddExpense.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddExpense() {
    const [name, setName] = useState('');
    const [product, setProduct] = useState('');
    const [price, setPrice] = useState('');
    const [dates, setDates] = useState('');
    const [namesList, setNamesList] = useState([]);

    //importing db to get the list of names using fake api
    
    useEffect(()=>{
      axios.get('http://localhost:3000/members')
      .then((response)=>{
        setNamesList(response.data.map((member)=>member.payee));

      });
    },[])
    
 
    
    const handleProduct=(e)=>{
        const getProduct= e.target.value;
        
        console.log(getProduct);
        setProduct(getProduct);
    }
    const handlePrice=(e)=>{
        const getPrice= e.target.value;
        
        console.log(getPrice);
        setPrice(getPrice);

    }
    const handleDates=(e)=>{
        const getDates= e.target.value;
        
        console.log(getDates);
        setDates(getDates);

    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(`${name},${product},${price},${dates}`)
        const data = {
            payee: name,
            Product: product,
            price: price,
            Date: dates,
          };
          axios.post('http://localhost:3000/expenses', data)
          .then((response) => {
            console.log(response.data);
            // reset form data
            setName('');
            setProduct('');
            setPrice('');
            setDates('');
            alert("data added successfully");
            window.location.href = '/';
          })
          .catch((error) => {
            console.log(error);
          });
    }
    const handleNameSelect=(e)=>{
        const getName= e.target.value;
        
        console.log(getName);
        setName(getName);
    }
 
  return (
    <div>
    <Form className="formdesign" onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        
        <Form.Select onChange={(e)=>handleNameSelect(e)}>
               {namesList.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          
        </Form.Select>
      </Form.Group>

      <div>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Product Purchased</Form.Label>
          <Form.Control
            type="text"
            placeholder="Product name"
            onChange={(e) => handleProduct(e)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="price"
            onChange={(e) => handlePrice(e)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            placeholder="select a date"
            max={new Date().toISOString().slice(0, 10)} // disable future date selectioN
            min={new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().slice(0, 10)} // restrict usage of date of previous month
            onChange={(e) => handleDates(e)}
          />
        </Form.Group>

        <Button className="button" variant="primary" type="submit" >
          Submit
        </Button>
      </div>
    </Form>
  </div>
);
  
}

export default AddExpense;
