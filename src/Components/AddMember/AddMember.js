import React, { useState } from "react";
import './AddMember.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import App from "../../App";

function AddMember() {
  const [memberName, setMemberName] = useState('');
  const [email,setEmail]= useState('');
  const navigate=useNavigate()

  const handleMemberName= (e)=>{
    const getMemberName= e.target.value;
    console.log(getMemberName)
    setMemberName(getMemberName);

  }

  const handleEmailId=(e)=>{
    const getEmailid=e.target.value;
    console.log(getEmailid);
    setEmail(getEmailid)

  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    const data={
      payee: memberName,
      email: email
    };
    axios.post('http://localhost:3000/members',data)
    .then((response=>{
      console.log(response.data);
      setMemberName('');
      setEmail('');
     
      navigate('/')
      
      
    }))

  }
  return (
    
    <div >
      <form className="formadd" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="NameInput">Member Name</label>
          <input
            type="text"
            className="form-control"
            id="input1"
            placeholder="Enter your Name"
            onChange={(e) => handleMemberName(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={(e)=>handleEmailId(e)}
          />
         
        </div>
        <button type="submit" className="btn btn-primary">
        
          Submit
        </button>
        <button type="submit" className="btn btn-primary" onClick={()=>{ navigate('/')}}>
        
          Cancel
        </button>
      </form>
    </div>
  );
}

export default AddMember;
