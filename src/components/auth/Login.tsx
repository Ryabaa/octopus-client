import { ChangeEvent, FC, FormEvent, useRef, useState } from "react";

import { RootState } from "@app/store";
import { useAppDispatch, useAppSelector } from "@hooks/reduxHooks";

import { loginUserAction } from "./slice";

import { Button, Container, Form, Input, InputContainer } from "./styles";

import { FcGoogle } from "react-icons/fc";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

import { Loader } from "@components/loader/Loader";

const Login: FC = () => {
    const dispatch = useAppDispatch();
    const { isLoading } = useAppSelector((state: RootState) => state.auth);

    const [passwordVisible, setPasswordVisible] = useState(false);

    const emailRef = useRef<string>("");
    const passwordRef = useRef<string>("");

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        dispatch(loginUserAction({ email: emailRef.current, password: passwordRef.current }));
    };

    const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
        emailRef.current = event.target.value;
    };

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        passwordRef.current = event.target.value;
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <InputContainer>
                <Input type="email" placeholder="E-mail" onChange={handleUsernameChange} />
                <div>
                    <Input
                        type={passwordVisible ? "text" : "password"}
                        placeholder="Пароль"
                        minLength={6}
                        maxLength={16}
                        onChange={handlePasswordChange}
                    />
                    <span onClick={togglePasswordVisibility}>
                        {passwordVisible ? <IoMdEyeOff size={25} /> : <IoMdEye size={25} />}
                    </span>
                </div>
            </InputContainer>
            {isLoading && (
                <Loader size={60} position="absolute" top="400px" left="50%" transform="translate(-50%, 0)" />
            )}
            <Container>
                <Button type="submit">Войти</Button>
                <a href="http://localhost:3000/auth/google">
                    <p>Войти через Google</p>
                    <FcGoogle size={28} />
                </a>
            </Container>
        </Form>
    );
};

export default Login;
