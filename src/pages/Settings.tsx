import {IonContent, IonPage} from "@ionic/react";
import "./Settings.css";
import * as React from "react";
import {useState} from "react";

import {
    Avatar,
    Box,
    Button,
    ChakraProvider,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useColorMode,
    useDisclosure
} from "@chakra-ui/react";

function Settings() {

    const [showCode, setShowCode] = useState(false);
    const {isOpen, onOpen, onClose} = useDisclosure();
    const {colorMode, toggleColorMode} = useColorMode();
    const toggleDarkModeHandler = () => {
        document.body.classList.toggle("dark");
    };

    return (
        <>
            <ChakraProvider>
                <IonPage>
                    <IonContent fullscreen>
                        <Flex display="flex" align="center" justify="center" direction="row" margin="50px">
                            <Avatar src="" size="xl"/>
                            <Box ml="3">
                                <Text fontWeight="bold" fontSize="25px">
                                    Account Name
                                </Text>
                                <Text fontSize="20px">Firma Name</Text>
                            </Box>
                        </Flex>
                        <Flex display="flex" direction="row" align="center" justify="center">
                            <Button variant="solid" size="md" height="48px" width="300px"
                                    border="2px" onClick={onOpen}>
                                Ändern Sie ihren Code
                            </Button>
                            <Modal isOpen={isOpen} onClose={onClose}>
                                <ModalOverlay/>
                                <ModalContent>
                                    <ModalHeader></ModalHeader>
                                    <ModalCloseButton/>
                                    <ModalBody>
                                        <FormControl isRequired>
                                            <FormLabel>Bitte geben Sie ihren neuen Code ein</FormLabel>
                                            <Input placeholder="Ihr Code"/>
                                        </FormControl>
                                    </ModalBody>
                                    <ModalFooter gap=".5em">
                                        <Button colorScheme="brand" >Absenden</Button>
                                        <Button onClick={onClose} variant="ghost">Abbrechen</Button>
                                    </ModalFooter>
                                </ModalContent>
                            </Modal>
                        </Flex>

                        <Flex display="flex" direction="row" align="center" justify="center" margin="20px">
                            <Button colorScheme="teal" variant="ghost" size="md" height="48px" width="300px"
                                    border="2px">
                                E-Mail
                            </Button>
                        </Flex>

                        <Flex display="flex" direction="row" align="center" justify="center" margin="20px">
                            <Button colorScheme="teal" variant="ghost" size="md" height="48px" width="300px"
                                    border="2px">
                                Passwort
                            </Button>

                        </Flex>
                    </IonContent>
                </IonPage>
            </ChakraProvider>
        </>
    );
}

export default Settings;