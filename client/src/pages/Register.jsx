 import { useState } from "react";
 import { useNavigate } from "react-router-dom";

export const Register = () =>{
    const [user,setUser]  = useState({
        username:"",
        email:"",
        phone:"",
        password:""
    });

    const navigate = useNavigate;

    //handling the input value
  const handleInput = (e) =>{
    console.log(e);
    let name = e.target.name;
    let value = e.target.value;

    setUser({
        ...user,
      [name]:value,
    });
  };

  //handling the form submission
  const handleSubmit = async(e) =>{
   e.preventDefault();
  console.log(user);
  try{
    const response =await fetch('https://localhost:5000/api/auth/register',{
      method :"POST",
      headers:{
      'Content-Type':"application/json",
      },
      body:JSON.stringify(user),
    });
    if(response.ok){
      setUser({username:"",email:"", phone:"", password:""});
      navigate("/login");
    }
    console.log(response);
    }
  catch(error){
   console.log("register",error);
  }
}
  

    return(
        <>
       <section>
        <main>
            <div className="section-registration">
      <div className="container grid grid-two-cols">

     <div className="registration-image">
   <img src="../images/register.jpeg" alt="trying to fill registration form" width="400" height="500"></img>
     </div>
     <div className="registration-form">
        <h1 className="main-heading mb-3">Registration Form</h1>
        <br/>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username</label>
                <input type="text" 
                name="username" 
                placeholder="username" 
                id="username" 
                required autoComplete="off" 
                value={user.username} 
                onChange={handleInput}></input>
                </div>
                <div>
                <label htmlFor="email">Email</label>
                <input type="text" name="email" placeholder="email" value={user.email} 
                id="email" required autoComplete="off"  
                onChange={handleInput}></input>
                </div>
                <div>
                <label htmlFor="phone">Phone</label>
                <input type="number" name="phone" placeholder="phone" value={user.phone}
                 id="phone" required autoComplete="off " 
                 onChange={handleInput}></input>
                </div>
                <div>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" placeholder="password" value={user.password}
                 id="password" required autoComplete="off"  onChange={handleInput}></input>
                </div>
                <br/>
                <button type="submit" className="btn btn-submit">Register</button>
        </form>
     </div>

      </div>
            </div>
        </main>
       </section>
        </>
    )
}