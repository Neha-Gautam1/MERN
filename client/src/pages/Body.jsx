import { BrowserRouter,Routes,Route } from "react-router-dom";
import { Navbar } from "../component/Navbar";
import { Home } from "./Home";
import { About } from "./About";
import { Progress } from "./Progress";
import { Dashboard } from "./Dashboard";
import  {Recommendation} from "./Recommendation";
import { Login } from "./Login";
import { Register } from "./Register";
import { Error } from "./Error";
import "../component/Navbar.css";
import { Footer } from "../component/footer/Footer";


export const Body = () =>{
    return(
        <>
    <section className="cont1">
 <Navbar/>
 <BrowserRouter>
<Routes>
<Route path="/" element={<Home/>}/>
<Route path="/about" element={<About/>}/>
<Route path="/progress" element={<Progress/>}/>
<Route path="/dashboard" element={<Dashboard/>}/>
<Route path="/recommendation" element={<Recommendation/>}/>
<Route path="/register" element={<Register/>}/>
<Route path="/login" element={<Login/>}/>
<Route path="*" element={<Error/>}> </Route>
</Routes>
<Footer/>
  </BrowserRouter>
    </section>
        </>
    )
}