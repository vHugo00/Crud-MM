import { useState } from 'react'
import './styles/global.css'
import { useForm, useFieldArray } from 'react-hook-form'
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputMask from 'react-input-mask';
import axios from 'axios';

const createUserFormSchema = z.object({
  name: z.string()
    .nonempty('O nome é obrigatório')
    .transform(name => {
      return name.trim().split(' ').map(word => {
        return word[0].toLocaleUpperCase().concat(word.substring(1));
      }).join(' ');
    }),

  cpf: z.string()
    .nonempty('Número de CPF obrigatório')
    .transform(name => {
      return name.trim().split(' ').map(word => {
        return word[0].toLocaleUpperCase().concat(word.substring(1));
      }).join(' ');
    }),

  rg: z.string()
    .nonempty('Número de RG obrigatório')
    .transform(name => {
      return name.trim().split(' ').map(word => {
        return word[0].toLocaleUpperCase().concat(word.substring(1));
      }).join(' ');
    }),

  email: z.string()
    .nonempty('O e-mail é obrigatório')
    .email('Formato de e-mail inválido')
    .refine(email => {
      return email.endsWith('@mmtech.com.br');
    }, {
      message: 'O e-mail precisa ser da mmtech'
    }),
});

export function App() {
  const [output, setOutput] = useState('')
  const { register, handleSubmit, formState: { errors } } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema)
  });



  type CreateUserFormData = z.infer<typeof createUserFormSchema>;

  async function createUser(data: CreateUserFormData) {
    try {
      const response = await axios.post('http://localhost:3001/users', data);
      setOutput(JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.error('Error saving user:', error);
    }
  }


  return (
    <main className='h-screen  text-zinc-300 flex flex-col gap-12 items-center justify-center'>
      <form
        onSubmit={handleSubmit(createUser)}
        className='flex flex-col gap-4 w-full max-w-xs'>

        <div className='flex flex-col gap-1'>
          <label htmlFor="name">Nome</label>
          <input
            className='border border-zinc-700 shadow-sm rounded h-10 px-3 inputColor text-white'
            type="text"
            id="name"
            {...register('name')} />
          {errors.name && <span className='text-red-500 text-sm'>{errors.name.message}</span>}
        </div>


        <div className='flex flex-col gap-1'>
          <label htmlFor="cpf">CPF</label>
          <InputMask
            mask="999.999.999-99"
            className='border border-zinc-700 shadow-sm rounded h-10 px-3 inputColor text-white'
            type="text"
            id="cpf"
            {...register('cpf')}
          />
          {errors.cpf && <span className='text-red-500 text-sm'>{errors.cpf.message}</span>}
        </div>


        <div className='flex flex-col gap-1'>
          <label htmlFor="rg">RG</label>
          <InputMask
            mask="99.999.999-9"
            className='border border-zinc-700 shadow-sm rounded h-10 px-3 inputColor text-white'
            type="text"
            id="rg"
            {...register('rg')}
          />
          {errors.rg && <span className='text-red-500 text-sm'>{errors.rg.message}</span>}
        </div>


        <div className='flex flex-col gap-1'>
          <label htmlFor="email">E-mail</label>
          <input
            className='border border-zinc-700 shadow-sm rounded h-10 px-3 inputColor text-white'
            type="email"
            id="email"
            {...register('email')} />
          {errors.email && <span className='text-red-500 text-sm'>{errors.email.message}</span>}
        </div>

        <button
          type="submit"
          className='bg-emerald-500 rounded font-semibold text-white h-10 hover:bg-emerald-700'
        >
          Salvar
        </button>
      </form>

      <pre>
        {output}
      </pre>
    </main>
  )
}
