import { IonContent, IonIcon } from "@ionic/react";
import { IonPage } from "@ionic/react";
import { useColorMode, Input, InputGroup, InputRightElement, Button, Container, Stack, FormControl, FormLabel, Flex, Icon } from '@chakra-ui/react'
import { useState } from "react";
import { eyedrop, eyeOffOutline, eyeOutline } from "ionicons/icons";

const Register: React.FC = () => {
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
    const [mail, setMail] = useState('')
    const [surname, setSurname] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [code, setCode] = useState('')

    const colorMode = useColorMode();

    const isValid = false

    return (
        <IonPage>
            <IonContent>
                <Flex direction="column" justifyContent="center" height={"100%"} maxWidth={"40rem"} margin={"auto"}>
                    <Stack  m={10}>
                        <img style={{ marginBottom: "5vh"}} src={colorMode.colorMode === "light" ? "assets/images/logo_with_text.png" : "assets/images/logo_with_text_white.png"}></img>
                        <Stack spacing={3} paddingInline={"5%"}>
                            <FormControl>
                                <FormLabel>E-Mail</FormLabel>
                                <Input placeholder="test@test.com" onChange={event => setMail(event.target.value)} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Vorname</FormLabel>
                                <Input onChange={event => setName(event.target.value)} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Nachname</FormLabel>
                                <Input onChange={event => setSurname(event.target.value)} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Code</FormLabel>
                                <Input onChange={event => setCode(event.target.value)} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Passwort</FormLabel>
                                <InputGroup>
                                    <Input
                                        type={show ? 'text' : 'password'}
                                        onChange={event => setPassword(event.target.value)}
                                    />
                                    <InputRightElement width='3rem'>
                                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                                            {show ? <IonIcon icon={eyeOutline} /> : <IonIcon icon={eyeOffOutline} />}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>

                        <Button>Registrieren</Button>
                        </Stack>
                    </Stack>

                </Flex>
            </IonContent>
        </IonPage>
    );
};

export default Register;