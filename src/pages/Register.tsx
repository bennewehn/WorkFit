import { IonContent, IonIcon } from "@ionic/react";
import { IonPage } from "@ionic/react";
import { useColorMode, Input, InputGroup, InputRightElement, Button, Stack, FormControl, FormLabel, Flex, FormHelperText } from '@chakra-ui/react'
import React, { useState } from "react";
import { eyeOffOutline, eyeOutline } from "ionicons/icons";


const Register: React.FC = () => {
    const [show, setShow] = useState(false)
    const [mail, setMail] = useState('')
    const [surname, setSurname] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [code, setCode] = useState('')

    const errorInit = {
        password: '', email: '', name: '', surname: '', code: ''
    };

    const [errors, setErrors] = useState(errorInit);

    const colorMode = useColorMode();

    const handleClick = () => setShow(!show)

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length < 6) {
            setErrors({ ...errors, password: "Passwort muss min. 6 Zeichen lang sein." })
        }
        else {
            setErrors({ ...errors, password: "" })
        }
        setPassword(e.target.value)
    }

    const handleEMailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === "") {
            setErrors({ ...errors, email: "E-Mail Adresse wird benötigt." })
        }
        else if (!validateEmail(e.target.value)) {
            setErrors({ ...errors, email: "Falsche E-Mail Adresse." })
        }
        else {
            setErrors({ ...errors, email: "" })
        }
        setMail(e.target.value)
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === "") {
            setErrors({ ...errors, name: "Vorname wird benötigt." })
        }
        else {
            setErrors({ ...errors, name: "" })
        }
        setName(e.target.value)
    }

    const handleSurname = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === "") {
            setErrors({ ...errors, surname: "Nachname wird benötigt." })
        }
        else {
            setErrors({ ...errors, surname: "" })
        }
        setSurname(e.target.value)
    }

    const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === "") {
            setErrors({ ...errors, code: "Code wird benötigt." })
        }
        else {
            setErrors({ ...errors, code: "" })
        }
        setCode(e.target.value)
    }

    return (
        <IonPage>
            <IonContent>
                <Flex direction="column" justifyContent="center" height={"100%"} maxWidth={"40rem"} margin={"auto"}>
                    <Stack m={10}>
                        <img style={{ marginBottom: "5vh" }} src={colorMode.colorMode === "light" ? "assets/images/logo_with_text.png" : "assets/images/logo_with_text_white.png"}></img>
                        <Stack spacing={3} paddingInline={"5%"}>
                            <FormControl isRequired>
                                <FormLabel>E-Mail</FormLabel>
                                <Input placeholder="max.mustermann@gmail.com" onChange={handleEMailChange} />
                                <FormHelperText color={"red.500"}>{errors.email}</FormHelperText>
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Vorname</FormLabel>
                                <Input placeholder="Max" onChange={handleNameChange} />
                                <FormHelperText color={"red.500"}>{errors.name}</FormHelperText>
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Nachname</FormLabel>
                                <Input placeholder="Mustermann" onChange={handleSurname} />
                                <FormHelperText color={"red.500"}>{errors.surname}</FormHelperText>
                            </FormControl>
                            <FormControl isRequired >
                                <FormLabel>Code</FormLabel>
                                <Input onChange={handleCodeChange} />
                                <FormHelperText color={"red.500"}>{errors.code}</FormHelperText>
                            </FormControl>
                            <FormControl isInvalid={errors.password !== ""} isRequired>
                                <FormLabel>Passwort</FormLabel>
                                <InputGroup>
                                    <Input
                                        type={show ? 'text' : 'password'}
                                        onChange={handlePasswordChange}
                                    />
                                    <InputRightElement width='3rem'>
                                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                                            {show ? <IonIcon icon={eyeOutline} /> : <IonIcon icon={eyeOffOutline} />}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                <FormHelperText color={"red.500"}>{errors.password}</FormHelperText>
                            </FormControl>
                            <Button>Registrieren</Button>
                        </Stack>
                    </Stack>

                </Flex>
            </IonContent>
        </IonPage>
    );
};


export const validateEmail = (email: String) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

export default Register;