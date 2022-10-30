import {IonContent, IonPage, IonFab, IonFabButton, IonIcon} from "@ionic/react";
import { Heading, Text, Box, Button, useControllableProp, useControllableState } from '@chakra-ui/react'
import { Geolocation, Position } from '@capacitor/geolocation';
import TopBar from "../components/TopBar";
import {addOutline} from "ionicons/icons";
import { useRef, useEffect } from "react";
import React from 'react';
import { Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title, } from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';
import { sign } from "crypto";

ChartJS.register(ArcElement, Tooltip, Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title);

const data = {
  labels: ['Erreicht', 'Noch erreichbar'],
  datasets: [
    {
      data: [200, 200],

      backgroundColor: [
        'rgba(29, 107, 209, 0.2)',
        'rgba(171, 169, 164, 0.2)',
      ],
      borderColor: [
        'rgba(29, 107, 209, 1)',
        'rgba(171, 169, 164, 1)',
      ],
      
      borderWidth: 1,
    },
  ],
};

const options = {
  rotation: -90,
  circumference: 180,
  
  plugins: {
    legend: {
      display: false
    },
  },
};

const lineLabels = ['Mo.', 'Di.', 'Mi.', 'Do.', 'Fr', 'Sa.', 'So.'];

const lineData = {
  labels: lineLabels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [12, 10, 12, 15, 6, 5, 6],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      yAxisID: 'y',
    },
  ],
};

let crtDistance = 0;
let newLatitude = 0;
let lastLatitude = 0;
let newLongitude = 0;
let lastLongitude = 0;

const lineOptions = {
  responsive: true,
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: 'Punkte pro Tag',
    },
    legend: {
      display: false
    },
  },
  scales: {
    y: {
      type: 'linear' as const,
      display: true,
      position: 'left' as const,
    },
  },
};

let latitude;
let longitude;

let timeCount = 0;
let isExercising = false;

const Home: React.FC = () => {

  const interval = useRef<NodeJS.Timeout>();
  function startExercise()
  {
    console.log(isExercising);
    if (!isExercising)
    {
      isExercising = true;
      interval.current = setInterval(() => {
        timeCount += 1;
        setTime(timeCount);
        console.log(timeCount);
      }, 1000);
      setExecBool(true);
    }
    else
    {
      isExercising = false;
      clearInterval(interval.current);
      timeCount = 0;
      setExecBool(false);
    }
  }

  useEffect(() => {Geolocation.watchPosition({enableHighAccuracy:false}, (position, err) => {
    if (position != null)
    {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      // nicht fertig
      // lastLatitude = newLatitude;
      // lastLongitude = newLongitude; 
      // newLatitude = latitude;
      // newLongitude = longitude;

      // crtDistance += (6378.388 * Math.acos(Math.sin(newLatitude) * Math.sin(lastLatitude) + Math.cos(newLatitude) * Math.cos(lastLatitude) * Math.cos(newLongitude - lastLongitude)));
      // setDistance(crtDistance);
    }
  });
}, [])

  const [distance, setDistance] = useControllableState({ defaultValue: 0 });
  const [time, setTime] = useControllableState({ defaultValue: 0 });
  const [exercisingBool, setExecBool] = useControllableState({ defaultValue: false });

  return (
        <IonPage>
            <IonContent fullscreen>
                <TopBar>
                </TopBar>
                <main>
                  <Heading ml="1rem" mt="-1rem" size="lg">Guten Tag, NAME</Heading>
                  <div style={{width:"80%", marginLeft:"auto", marginTop:"-3rem", marginRight:"auto"}}>
                    <Doughnut data={data} options={options}/>
                  </div>
                  <Text textAlign={['center']} mt="-3rem">Du hast heute so viele Punkte erreicht: PUNKTE</Text>
                  <Box borderRadius="lg" borderWidth='2px' bg='rgb(73, 147, 174, 1)' w='90%' p={2} color='white' marginLeft="auto" marginRight="auto" marginTop="1rem" textAlign="center">Random Fakt</Box>
                  <div style={{marginTop:"1rem"}}>
                    <Line data={lineData} options={lineOptions}/>
                  </div>
                  <div style={{marginTop:"3rem"}}>
                    <div style={{height:"100%", width:"100%", display:"flex", justifyContent:"center", marginTop:"auto", marginBottom:"auto", alignContent:"space-around", border:"1px solid black"}}>
                      <Box borderRadius="lg" borderWidth='1px' bg='rgb(220, 220, 220, 1)' w='40%' p={2} color='white' marginLeft="auto" marginRight="auto" textAlign="center"><Text color='black'>Zeit: {time}s</Text></Box>
                      <Button onClick={() => startExercise()} colorScheme={exercisingBool ? "red" : "gray"}><IonIcon icon={addOutline}></IonIcon></Button>
                      <Box borderRadius="lg" borderWidth='1px' bg='rgb(220, 220, 220, 1)' w='40%' p={2} color='white' marginLeft="auto" marginRight="auto" textAlign="center"><Text color='black'>Distanz: {distance}km</Text></Box>
                    </div>
                  </div>
                </main>
                
            </IonContent>
        </IonPage>
    );
};

export default Home;
