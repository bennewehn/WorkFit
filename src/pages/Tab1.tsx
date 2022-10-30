import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import * as React from 'react'
import { useState } from 'react';

// 1. import `ChakraProvider` component
import { ChakraProvider, Modal, ColorModeScript, extendTheme, ModalOverlay, useColorMode, useDisclosure, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, Wrap, WrapItem, EditablePreview, EditableInput, Avatar, Button, Switch, ButtonGroup, Stack, Alert, Editable, AlertIcon, AlertTitle, AlertDescription, Flex, Box, Text, Badge, ListItem } from '@chakra-ui/react'



function App() {

  const [showCode, setShowCode] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()


  // 2. Wrap ChakraProvider at the root of your app
  return (
    <>


      {/* onClick={()=> setShowCode(!showCode)} */}


      
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Tab 1</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent fullscreen>
            <IonHeader collapse="condense">
              <IonToolbar>
                <IonTitle size="large">Tab 1</IonTitle>
              </IonToolbar>
            </IonHeader>
            <ChakraProvider>

              <Flex display="flex" align='center' justify='center' direction='row' margin='50px'>
                <Avatar src='' size='xl'/>
                <Box ml='3'>
                  <Text fontWeight='bold' fontSize='25px'>
                    Account Name
                  </Text>
                  <Text fontSize='20px'>Firma Name</Text>
                </Box>
              </Flex>


              <Flex display="flex" direction='row' align='center' justify='center' >
                <Button
                  colorScheme='teal'
                  variant='solid'
                  size='md'
                  height='48px'
                  width='300px'
                  border='2px'
                  onClick={onOpen}
                >
                  Ändern Sie ihren Code
                </Button>
                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader></ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                      <FormControl isRequired width='300px'>
                        <FormLabel>Bitte geben Sie ihren neuen Code ein</FormLabel>
                        <Input placeholder='Ihr Code' />
                      </FormControl>


                    </ModalBody>
                    <ModalFooter>
                      <Button colorScheme='blue' >
                        Absenden
                      </Button>
                      <Button variant='ghost'>Abbrechen</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </Flex>

              <Flex display="flex" direction='row' align='center' justify='center' margin='20px'>
                <Button
                  colorScheme='teal'
                  variant='solid'
                  size='md'
                  height='48px'
                  width='300px'
                  border='2px'
                  onClick={onOpen}
                >
                  Hier steht ihre E-Mail
                </Button>
                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Hier ist ihre E-Mail</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <Text>
                        E-Mail
                      </Text>
                     </ModalBody>
                    <ModalFooter>
                      <Button colorScheme='blue' onClick={onClose}>
                        Schließen
                      </Button>
                      
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </Flex>

              <Flex display="flex" direction='row' align='center' justify='center' margin='20px'>
                <Button
                  colorScheme='teal'
                  variant='solid'
                  size='md'
                  height='48px'
                  width='300px'
                  border='2px'
                  onClick={onOpen}
                >
                  Hier steht ihre E-Mail
                </Button>
                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Hier ist ihr Passwort</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <Text>
                        Passwort
                      </Text>
                     </ModalBody>
                    <ModalFooter>
                      <Button colorScheme='blue' onClick={onClose}>
                        Schließen
                      </Button>
                      
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </Flex>






            </ChakraProvider>

          </IonContent>
        </IonPage>
      </>
      );
};

      export default App;
