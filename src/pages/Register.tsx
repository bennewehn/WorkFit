import { IonContent } from "@ionic/react";
import { IonPage } from "@ionic/react";
import { Input, InputGroup, InputRightElement, Button, Container, Stack } from '@chakra-ui/react'
import { useState } from "react";

const Register: React.FC = () => {
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    return (
        <IonPage>
            <IonContent>
                <Stack spacing={3} m={10}>
                    <Input placeholder="E-Mail" />
                    <Input placeholder="Vorname" />
                    <Input placeholder="Nachname" />
                    <InputGroup>
                        <Input
                            type={show ? 'text' : 'password'}
                            placeholder='Enter password'
                        />
                        <InputRightElement width='4.5rem'>
                            <Button h='1.75rem' size='sm' onClick={handleClick}>
                                {show ? 'Verstecken' : 'Zeigen'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </Stack>
            </IonContent>
        </IonPage>
    );
};

export default Register;