import { ChangeEvent, FC, FormEvent, useRef, useState } from "react";
import { FcGoogle } from "react-icons/fc";

import { RootState } from "@app/store";
import { useAppDispatch, useAppSelector } from "@hooks/reduxHooks";

import { registerUserAction } from "./slice";

import { Button, Container, Form, Input, InputContainer } from "./styles";

import { Loader } from "@components/loader/Loader";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const Register: FC = () => {
    const dispatch = useAppDispatch();
    const { isLoading } = useAppSelector((state: RootState) => state.auth);

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [errorConfirmation, setErrorConfirmation] = useState(false);

    const emailRef = useRef<string>("");

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (!errorConfirmation) {
            dispatch(
                registerUserAction({
                    username: username,
                    email: emailRef.current,
                    password: password,
                })
            );
        }
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        if (confirmPassword && event.target.value !== confirmPassword) {
            setErrorConfirmation(true);
        } else {
            setErrorConfirmation(false);
        }
    };

    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
        if (password !== event.target.value) {
            setErrorConfirmation(true);
        } else {
            setErrorConfirmation(false);
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const regex = /^[a-zA-Z0-9_]*$/;
        if (regex.test(value)) {
            setUsername(value);
        }
    };

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        emailRef.current = event.target.value;
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <InputContainer isError={errorConfirmation}>
                    <Input
                        type="text"
                        lang="en"
                        inputMode="text"
                        placeholder="Имя пользователя"
                        value={username}
                        onChange={handleUsernameChange}
                        minLength={5}
                        maxLength={16}
                    />
                    <Input type="email" placeholder="E-mail" maxLength={30} onChange={handleEmailChange} />
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
                    <div>
                        <Input
                            type="password"
                            placeholder="Подтвердите пароль"
                            minLength={6}
                            maxLength={16}
                            onChange={handleConfirmPasswordChange}
                        />
                        <p>Пароли не совпадают</p>
                    </div>
                </InputContainer>
                {isLoading && (
                    <Loader
                        size={60}
                        position="absolute"
                        top="400px"
                        left="50%"
                        transform="translate(-50%, 0)"
                    />
                )}
                <Container>
                    <Button type="submit">Регистрация</Button>
                    <a href="http://localhost:3000/auth/google">
                        <p>Войти через Google</p>
                        <FcGoogle size={28} />
                    </a>
                </Container>
            </Form>{" "}
        </>
    );
};

export default Register;
