import {IonContent, IonIcon, IonPage} from "@ionic/react";
import {
    Button,
    Flex,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    useColorMode,
    useToast
} from "@chakra-ui/react";
import React, {useState} from "react";
import {eyeOffOutline, eyeOutline} from "ionicons/icons";
import {TokenContext} from "../loginContext";
import {useHistory} from "react-router-dom";


const Register: React.FC = () => {
    const [show, setShow] = useState(false);
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [code, setCode] = useState("");

    const toast = useToast();

    const errorInit = {
        password: "Passwort muss min. 6 Zeichen sein.",
        email: "E-Mail Adresse wird benötigt.",
        code: "Code wird benötigt."
    };

    const [errors, setErrors] = useState(errorInit);

    const colorMode = useColorMode();

    const history = useHistory();

    const handleClick = () => setShow(!show);

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length < 6) {
            setErrors({...errors, password: "Passwort muss min. 6 Zeichen lang sein."});
        } else {
            setErrors({...errors, password: ""});
        }
        setPassword(e.target.value);
    };

    const handleEMailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === "") {
            setErrors({...errors, email: "E-Mail Adresse wird benötigt."});
        } else if (!validateEmail(e.target.value)) {
            setErrors({...errors, email: "Falsche E-Mail Adresse."});
        } else {
            setErrors({...errors, email: ""});
        }
        setMail(e.target.value);
    };


    const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === "") {
            setErrors({...errors, code: "Code wird benötigt."});
        } else {
            setErrors({...errors, code: ""});
        }
        setCode(e.target.value);
    };


    function register() {
        return new Promise<{ success: boolean, error?: string, token?: string }>((resolve, reject) => {

            const raw = JSON.stringify({
                "email": mail,
                "password": password,
                "code": code
            });


            fetch("https://etazeta.dev/WorkFit/WorkFit/dbif/register.php", {
                method: "POST",
                body: raw,
                redirect: "follow"
            })
                .then(async response => {
                    const text = await response.text();
                    console.log(text);
                    return new Promise<any>(() => JSON.parse(text));
                })
                .then(result => resolve(result))
                .catch(error => reject(error));
        });
    }


    const handleRegister = async (setToken: (value: string) => void) => {
        const res = await register();
        if (res.success) {
            toast({
                title: "Account wurde erstellt.",
                description: "Der Account wurde erfolgreich erstellt.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            setToken(res.token!);
            history.push("/");
        } else {
            toast.closeAll();
            toast({
                title: "Fehler.",
                description: res.error,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            console.log(res.error);
        }
    };

    return (
        <IonPage>
            <TokenContext.Consumer>
                {({setToken}) => (
                    <IonContent>
                        <Flex direction="column" justifyContent="center" height={"100%"} maxWidth={"40rem"}
                              margin={"auto"}>
                            <Stack m={10}>
                                <img style={{marginBottom: "5vh"}} alt="WorkFit Logo"
                                     src={colorMode.colorMode === "light" ? "assets/images/logo_with_text.png" : "assets/images/logo_with_text_white.png"}></img>
                                <Stack spacing={3} paddingInline={"5%"}>
                                    <FormControl isRequired>
                                        <FormLabel>E-Mail</FormLabel>
                                        <Input placeholder="max.mustermann@gmail.com" onChange={handleEMailChange}/>
                                        <FormHelperText color={"red.500"}>{errors.email}</FormHelperText>
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel>Code</FormLabel>
                                        <Input onChange={handleCodeChange}/>
                                        <FormHelperText color={"red.500"}>{errors.code}</FormHelperText>
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel>Passwort</FormLabel>
                                        <InputGroup>
                                            <Input
                                                type={show ? "text" : "password"}
                                                onChange={handlePasswordChange}
                                            />
                                            <InputRightElement width="3rem">
                                                <Button h="1.75rem" size="sm" onClick={handleClick}>
                                                    {show ? <IonIcon icon={eyeOutline}/> :
                                                        <IonIcon icon={eyeOffOutline}/>}
                                                </Button>
                                            </InputRightElement>
                                        </InputGroup>
                                        <FormHelperText color={"red.500"}>{errors.password}</FormHelperText>
                                    </FormControl>
                                    <Button onClick={() => handleRegister(setToken)}
                                            isDisabled={Object.values(errors).filter(e => e !== "").length !== 0}>Registrieren</Button>
                                </Stack>
                            </Stack>
                        </Flex>
                    </IonContent>
                )}
            </TokenContext.Consumer>

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