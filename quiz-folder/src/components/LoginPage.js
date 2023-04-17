import { useState } from "react";
import QuizMain from "./Quiz/QuizMain";

const logindetails = [
    {
      "username": "admin",
      "password": '12345'
    }
];

function LoginPage(props) {
    
      const [enterdUserName, setEnteredUserName] = useState('');
      const [enteredPassword, setEnteredPassword] = useState('');      
      const [loggedin , setLoggedin] = useState(false);

      const nameChangeHandler = (event) => {
        setEnteredUserName(event.target.value);
      };

      const passwordChangeHandler = (event) => {
        setEnteredPassword(event.target.value);
      };


      const formSubmitHandler = (event) => {
        event.preventDefault();
        const formData = {
            enterusername: enterdUserName,
            enterpassword: enteredPassword,
            isLoggedIn: loggedin
        };
        console.log(formData);

        const userCheck = logindetails.find(user => (
            user.username === formData.enterusername && user.password === formData.enterpassword
        ));

        if(userCheck){
            setLoggedin(true);
        }
        else{
            alert('Wrong Username or Password.');
            setLoggedin(false);
        }

      
        
      };


    return (
        
        <> 
        {!loggedin ? 
        (
        <div>
            <h2 className="title">Login</h2>
            <div className="LoginWrapper">            
                <form onSubmit={formSubmitHandler}>
                    <div className="formControls">
                        <div className="formDiv">
                            <label className="form_label">User Name</label>
                            <input 
                                name="username"
                                type="text" 
                                className="form_control"   
                                value={enterdUserName}
                                onChange={nameChangeHandler}
                            />
                        </div>
                        <div className="formDiv">
                            <label className="form_label">Password</label>
                            <input 
                                type="password" 
                                className="form_control" 
                                value={enteredPassword}
                                onChange={passwordChangeHandler}
                            />
                        </div>
                        <div className="formDiv">
                            <button type="submit" className="btn">Submit</button>
                        </div>

                        <p className="text-center">Username: admin, Password: 12345</p>
                       
                    </div>
                </form>
            </div>
        </div>
        ) : <QuizMain />
        }
       
        

        
        
        
        </>
       
    );
}

export default LoginPage;