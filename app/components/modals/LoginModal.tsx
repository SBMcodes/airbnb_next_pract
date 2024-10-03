"use client";

import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";

import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useLoginModal from "@/app/hooks/useLoginModal";
import { login } from "@/actions/login";
import { LoginSchema } from "@/schemas/LoginSchema";
import { useRouter } from "next/navigation";
import useRegisterModal from "@/app/hooks/useRegisterModal";

const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Form Controls using useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const toggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, []);

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setIsLoading(true);
    const res = await login(values);
    console.log("Login: ", res);
    loginModal.onClose();
    setIsLoading(false);
    router.refresh();
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back to Airbnb" />
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
        type="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      {/* <Button
        outline
        label={"Continue with google"}
        icon={FcGoogle}
        onClick={() => {}}
      />
      <Button
        outline
        label={"Continue with Github"}
        icon={AiFillGithub}
        onClick={() => {}}
      /> */}
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex flex-row items-center gap-2">
          <div>Dont have an account?</div>
          <div
            onClick={toggle}
            className="text-blue-400 cursor-pointer hover:underline"
          >
            Register
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={loginModal.isOpen}
      disabled={isLoading}
      title="Login"
      actionLabel="Login"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
