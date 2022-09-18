import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
interface Inputs {
  email: string
  password: string
}

const Form = () => {
  const { register, handleSubmit } = useForm<Inputs>()

  return (
    <>
      <form
        className="flex flex-col gap-6 mx-auto max-w-md"
        onSubmit={handleSubmit((data) => console.log(data))}
      >
        <div className="flex flex-col gap-3">
          <label htmlFor="email" className="font-mono font-bold text-gray-500">
            Email
          </label>
          <input
            autoComplete="off"
            id="email"
            type="email"
            placeholder="Enter email..."
            {...register('email')}
          />
        </div>
        <div className="flex flex-col gap-3">
          <label
            htmlFor="password"
            className="font-mono font-bold text-gray-500"
          >
            Password
          </label>
          <input
            autoComplete="off"
            id="password"
            className="w-full max-w-xs input input-bordered"
            type="password"
            placeholder="Enter password..."
            {...register('password')}
          />
        </div>
        <div className="flex gap-6">
          <button
            type="submit"
            className="hover:border-b-2 hover:border-gray-800"
          >
            Login
          </button>
          <button className="italic hover:border-b-2 hover:border-gray-800">
            <Link to="/register">Register User</Link>
          </button>
        </div>
      </form>
    </>
  )
}

export default Form
