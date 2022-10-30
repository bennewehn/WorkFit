import { Box, Flex, HStack, IconButton, Stack, Text } from '@chakra-ui/react'
import { IonCard, IonFab, IonFabButton, IonContent, IonIcon, IonPage, IonImg } from '@ionic/react'
import { FaRunning } from 'react-icons/fa'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { addCircle, addOutline, navigateOutline, pulseOutline } from 'ionicons/icons'
import { IoBicycle } from "react-icons/io5";

const WorkoutList = () => {
    return <IonPage>
        <IonContent>
            <Stack align="stretch" spacing={4}>
                <IonCard>
                    <HStack padding={3} >
                        <FaRunning size={"2rem"} />
                        <Text fontSize={"1.5rem"} marginLeft={3}>Laufen</Text>
                    </HStack>
                </IonCard>
                {<IonCard>
                    <HStack padding={3}>
                        <IoBicycle size={"2rem"} />
                        <Text fontSize={"1.5rem"} marginLeft={3}>Fahrrad</Text>
                    </HStack>
                </IonCard>}
            </Stack>
        </IonContent>
    </IonPage>
}

export default WorkoutList