import { Button, Flex, FormControl, FormHelperText, FormLabel, Input, InputGroup, InputRightElement, Stack, useColorMode, useToast } from "@chakra-ui/react";
import { IonContent, IonIcon, IonPage } from "@ionic/react";
import { eyeOffOutline, eyeOutline } from "ionicons/icons";
import { useState } from "react";
import { validateEmail } from "./Register";
import loginDb from '../utils/Login'
import { TokenContext } from "../loginContext";
import { useHistory } from 'react-router-dom'

const Login: React.FC = () => {

    const [password, setPassword] = useState('')
    const [mail, setMail] = useState('')
    const [show, setShow] = useState(false)

    const colorMode = useColorMode();

    const history = useHistory();

    const errorInit = {
        password: '',
        email: ''
    };

    const toast = useToast()

    const handleClick = () => setShow(!show)


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
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length < 6) {
            setErrors({ ...errors, password: "Passwort muss min. 6 Zeichen lang sein." })
        }
        else {
            setErrors({ ...errors, password: "" })
        }
        setPassword(e.target.value)
    }


    const [errors, setErrors] = useState(errorInit);

    const handleLogin = async (setToken: (value: string) => void) => {
        const token = await loginDb({ password, useremail: mail })
        if (token.token !== undefined) {
            setToken(token.token);
            history.push("/app");
        }
        else {
            toast.closeAll();
            toast({
                title: 'Fehler.',
                description: token.error,
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }

        console.log(token)
    }

    return (
        <IonPage>
            <TokenContext.Consumer>
                {({ setToken }) => <IonContent>
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
                                <Button onClick={() => handleLogin(setToken)}>Login</Button>
                                <Button alignSelf={"end"} onClick={() => history.push("/register")}>Noch kein Account?</Button>
                            </Stack>
                        </Stack>
                    </Flex>
                </IonContent>
                }
            </TokenContext.Consumer>
        </IonPage>
    )
}

export default Login;