'use client'
import { useState , useRef} from 'react'
import Input from './Input'

interface LoginProps {
  onSubmit: (name: string, password: string) => void;
}

const Login: React.FC<LoginProps> = (props) => {

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const nameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);


  const handleSubmit = (event:React.SyntheticEvent) => {
    event.preventDefault();
    if (!name) {
        nameRef.current!.focus();
        return;
    }
    if (!password) {
        passwordRef.current!.focus();
        return;
    }
    console.log('Form submitted');
    props.onSubmit(name, password);
};

	return (
    <form onSubmit={handleSubmit} className='w-full max-w-sm'>
      <div className='mb-6'>
        <Input 
          label='昵称'
          type='text'
          value={name}
          onChange={(event) => setName(event.target.value)}
          name='username'
          maxLength={20}
          autoComplete='off'
          placeholder='请输入您的用户昵称'
          required
          ref={nameRef}
        />
      </div>
      <div className='mb-6'>
        <Input 
          label='访问密码'
          type='password'
          name='password'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          maxLength={10}
          autoComplete='off'
          placeholder='请输入您的访问密码'
          required
          ref={passwordRef}
        />
      </div>
      <button
        type='submit'
        className='inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-slate-900 text-white hover:bg-slate-700 w-full'>
        登 录
      </button>
    </form>
	)
}

export default Login
