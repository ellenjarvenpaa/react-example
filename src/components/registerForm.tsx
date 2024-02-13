import { useState } from 'react';
import {useUser} from '../hooks/apiHooks';
import useForm from '../hooks/formHooks';

const RegisterForm = () => {
  const {postUser} = useUser();
  const [usernameAvailable, setUsernameAvailable] = useState<boolean>(true);
  const [emailAvailable, setEmailAvailable] = useState<boolean>(true);

  const initValues = {username: '', password: '', email: ''};

  const doRegister = async () => {
    try {
      if (usernameAvailable && emailAvailable) {
        await postUser(inputs);
      }
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const {handleSubmit, handleInputChange, inputs} = useForm(
    doRegister,
    initValues,
  );

  const {getUsernameAvailable, getEmailAvailable} = useUser();

  const handleUsernameBlur = async (event: React.SyntheticEvent<HTMLInputElement>) => {
    const result = await getUsernameAvailable(event.currentTarget.value);
    setUsernameAvailable(result.available)
  }

  const handleEmailBlur = async (event: React.SyntheticEvent<HTMLInputElement>) => {
    const result = await getEmailAvailable(event.currentTarget.value);
    setEmailAvailable(result.available)
  }

  return (
    <>
      <h1 className='text-3xl' >Register</h1>
      <form onSubmit={handleSubmit} className='flex flex-col text-center' >
        <div className='flex w-4/5'>
          <label className='w-1/3 p-6 text-end' htmlFor="username">Username</label>
          <input
          className='m-3 w-2/3 rounded-md border border-slate-500 p-3 text-color-slate-950'
            name="username"
            type="text"
            id="username"
            onChange={handleInputChange}
            onBlur={handleUsernameBlur}
            autoComplete="username"
          />
        </div>
        <div className='flex w-4/5'>
          <label className='w-1/3 p-6 text-end' htmlFor="password">Password</label>
          <input
          className='m-3 w-2/3 rounded-md border border-slate-500 p-3 text-color-slate-950'
            name="password"
            type="password"
            id="password"
            onChange={handleInputChange}
            autoComplete="current-password"
          />
        </div>
        <div className='flex w-4/5'>
          <label className='w-1/3 p-6 text-end' htmlFor="email">Email</label>
          <input
          className='m-3 w-2/3 rounded-md border border-slate-500 p-3 text-color-slate-950'
            name="email"
            type="email"
            id="email"
            onChange={handleInputChange}
            onBlur={handleEmailBlur}
            autoComplete="email"
          />
        </div>
        <div className='flex w-4/5 justify-end'>
        <button className='m-3 w-1/3 rounded-md bg-slate-700' type="submit">Register</button>
        </div>
      </form>
    </>
  );
};

export default RegisterForm;
