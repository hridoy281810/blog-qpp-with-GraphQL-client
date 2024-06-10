
import './Signup.css'
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
const ADD_USR_REGISTRATION = gql`
mutation Registration($name: String!, $email: String!, $password: String!, $bio: String){
  signup(name: $name, email: $email, password: $password,bio: $bio) {
    token
    userError
  }
}

`
const Signup = () => {
    const [addTodo, { data, loading, error }] = useMutation(ADD_USR_REGISTRATION);
    console.log(data,"need data");
         const navigation= useNavigate()
    const handleRegister = async(e) => {
        e.preventDefault();
        const data = {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value,
            bio: e.target.bio.value
        }
       const result = await addTodo({variables:data})
        // console.log("data: ", result)
        if(result?.data && result?.data?.signup?.token){
            localStorage.setItem("token", result?.data?.signup?.token)
            navigation('/posts')
          alert('registration successful')
          }else{
            alert(`${result?.data?.signup?.userError}`)
          }
    }

    return (
        <div className="form">
            <form onSubmit={handleRegister}>
                <label htmlFor="">Your Name</label>
                <input name="name" type="text" />
                <label htmlFor="">Your Email</label>
                <input name="email" type="email" />
                <label htmlFor="">Your Password</label>
                <input name="password" type="password" />
                <label htmlFor="">Your Bio</label>
                <input name="bio" type="text" />
                <button type='submit' className='rounded-full p-2 bg-white text-black'>Register</button>
            </form>
        </div>
    );
};

export default Signup;