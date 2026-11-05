'use client';

import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useRegisterModal from '@/app/Hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../Inputs/Input';
import toast from 'react-hot-toast';
import Button from '../Button';
import useLoginModal from '@/app/Hooks/useLoginModal';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function LoginModal() {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, formState: {errors}} = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    // signIn('credentials', {email: 'user1@gmail.com', password: '123456'})
    // .then((result) => {
    //   toast.success('success');
    //   console.log(result)
    // })
    // .catch((error) => {
    //   console.log(error);
    //   toast.error(error);
    // })

    signIn('credentials', {
      ...data,
      redirect: false,
    })
    .then((result) => {
      setIsLoading(false);

      if(result?.ok) {
        toast.success('Logged in successfully');
        router.refresh();
        loginModal.onClose()
      }

      if(result?.error) {
        toast.error(result.error);
      }
    })
    .catch(error => {console.log('=== ERROR: ', error)});
  }
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome back"
        subtitle="Login to your account"
      />
      <Input 
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input 
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr className='border-neutral-200' />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => {}}
      />
      <Button
        outline
        label="Continue with Google"
        icon={AiFillGithub}
        onClick={() => {}}
      />
      <div className="
        text-neutral-600
        text-center
        mt-4
        font-light
      ">
        <div className="flex  items-center justify-center gap-2">
          <div className="">Already have an account?</div>
          <div onClick={registerModal.onClose} className="
          text-neutral-800 
          cursor-pointer 
          hover:underline
          ">
            Log in
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default LoginModal;