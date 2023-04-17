import { Link } from 'react-router-dom';
import React, { useState, useSyncExternalStore } from "react";
import AddExpense from "../AddExpense/AddExpense";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Modal from "react-bootstrap/Modal";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';




function NavBar() {
    const [showAddExpense, setShowAddExpense] = useState(false);
    const [members,setMembers]=useState('');

    const handleAddExpenseClick = () => {
        setShowAddExpense(true);
      };
      const handleClose = () => {
        setShowAddExpense(false);
      };
      
    
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand >EXPENSE TRACKER</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
           
            <Nav.Link onClick={handleAddExpenseClick}>Add Expense</Nav.Link>
            <Nav.Link as={Link} to='/addMember'>Add Member</Nav.Link>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
        </Navbar>
        
        <Modal show={showAddExpense} onHide={handleClose}>
        <Modal.Header >
          <Modal.Title>Add Expense</Modal.Title>
          
        </Modal.Header>
        <Modal.Body>
          <AddExpense />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default NavBar;
