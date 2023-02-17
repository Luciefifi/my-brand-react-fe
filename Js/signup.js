
const {useState ,useEffect} = React;

function SignUpForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [signUpMessage, setSignUpMessage] = useState('');
  const handleSignUp = (event) => {
    event.preventDefault();
    setSignUpMessage('Signing up...');
    const data = {
      firstName: firstName,
      lastName: lastName,
      email: userEmail,
      password: userPassword,
      repeatPassword: repeatPassword,
    };

    fetch('http://localhost:5000/api/createUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
     
      .then((data) =>   {
        console.log(data)
        if (data.message) {
          setSignUpMessage(data.message);
        } else if (data.successMessage) {
          setSignUpMessage(data.successMessage);
          setTimeout(() => {
            window.location.href = 'login.html';
          }, 3000);
        } else if (data.validationError) {
          setSignUpMessage(data.validationError);
        } else {
          setSignUpMessage('Something went wrong, we were unable to register this account!');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setSignUpMessage('Something went wrong, please try again later.');
      });
};

  return (
    

    <div className="sign-up-htm">
    <form onSubmit={handleSignUp} name="signUpForm" id="signupForm">
    <div className="group">
      <label htmlFor="user" className="label">First Name</label>
      <input id="firstName" type="text" className="input" name="fname"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            />
    </div>
    <div className="group">
      <label htmlFor="user" className="label">Last Name</label>
      <input id="lastName" type="text" className="input" name="lname"
      
      value={lastName}
           onChange={(event) => setLastName(event.target.value)}
      />
    </div>
    <div className="group">
      <label htmlFor="pass" className="label">Email Address</label>
      <input id="userEmail" type="email" className="input"  name="emaddress"
       value={userEmail}
       onChange={(event) => setUserEmail(event.target.value)}
      />
    </div>
    <div className="group">
      <label htmlFor="pass" className="label">Password</label>
      <input id="userPassword" type="password" className="input" data-type="password" name="pwd"
      value={userPassword}
       onChange={(event) =>setUserPassword(event.target.value)}
      />
    </div>
    <div className="group">
      <label htmlFor="pass" className="label">Repeat Password</label>
      <input id="repeatPassword" type="password" className="input" data-type="password" name="repwd"
       value={repeatPassword}
       onChange={(event) => setRepeatPassword(event.target.value)}
      />
    </div> 
     <div className="spinnerContainer" id="signUpMessage">

    </div> 
     <div className="group" id="signupContainer">
      <input type="submit" id="signUp" className="button" value="Sign Up"/>
    </div> 
     <div className="hr"></div>
    <div className="foot-lnk">
      {/* <label for="tab-1">Already Member?</a> */}
    </div>
    </form> 
    <div id="signUpContainer"></div>
</div>


  )}
            ReactDOM.render(<SignUpForm/> , document.getElementById("signUpContainer"))
  
  
        

