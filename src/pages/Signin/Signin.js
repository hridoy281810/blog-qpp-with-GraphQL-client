import { gql, useMutation } from '@apollo/client';
import React from 'react';
import { useNavigate } from 'react-router-dom';
const LOGIN = gql`
mutation UserLogin($email: String!, $password: String!) {
  signIn( email: $email, password: $password) {
    token,
    userError
  }
}
`
const Signin = () => {
    const [addTodo,{ data, loading, error }] = useMutation(LOGIN)
    console.log(error);
    const navigation= useNavigate()
    
    console.log(data);
    const handleRegister = async(e) => {
        e.preventDefault();
        const data = {
            email: e.target.email.value,
            password: e.target.password.value,
        }
        const result = await addTodo({variables:data})
        console.log("data: ", result)
        if(result?.data && result?.data?.signIn?.token){
            localStorage.setItem("token", result?.data?.signIn?.token)
            navigation('/posts')
            alert('login successful')
        }else{
            alert(`${result?.data?.signIn?.userError}`)
        }

    }

    return (
        <div className="form">
            <form onSubmit={handleRegister}>

                <label htmlFor="">Your Email</label>
                <input name="email" type="email" />
                <label htmlFor="">Your Password</label>
                <input name="password" type="password" />

                <button type='submit' className='rounded-full p-2 bg-white text-black'>Login</button>
            </form>
        </div>
    );
};

export default Signin;