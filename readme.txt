general color palette: https://coolors.co/1e6bd0-4993ae-04030f-aba9a4-d72638
font: roboto (google fonts link incoming)


Pseudocode Bewegungsarten:

Bewegungsart zu Fuß:

     Datenfeld für Gesamtmessung;
     Datenfeld für Gesamtzeit;
     boolean laufen;
     boolean joggen;
     boolena rennen;
        
    set laufen true;
    starte Timer;
    starte Strecke zählen;

    Kalorien BestimmenGesamt(){
        
        }

    Punkte BestimmenLaufenGesamt(){
                
        }


	while(laufen true){

		If (Strecke.aritmetischesMittel == 0km/h for 60 sekunden){
			(Warnung)                                               //Auf App anzeigen, dass man sich schneller Bewegen soll
            pause Timer;
			-->	(starte BufferTimer)
			-->	(Strecke in Buffer speichern)
        }

        If (Strecke.aritmetischesMittel >= 7km/h for 60 sekunden){
            joggen = true;
            laufen = false;
        }

		If (Strecke.aritmetischesMittel != 0 && 1 for 60 sekunden){
            --> (stoppe Messung zwischenspeichern)
            --> (addiere BufferTimer zu Timer && Strecke(Buffer) zu Strecke)
            --> (stoppe Buffer Timer && cleare Buffer)
            --> (starte Timer)
        }


		If (BufferTimer > 10min){ 
			(set laufen = false)
		}

    }

    while(joggen true){

    If (Strecke.aritmetischesMittel <= 6km/h for 60 sekunden){
            pause Timer;
			-->	(starte BufferTimer)
			-->	(Strecke in Buffer speichern)
        }

        If (Strecke.aritmetischesMittel >= 15km/h for 60 sekunden){
            rennen = true;
            joggen = false;
        }

		If (Strecke.aritmetischesMittel !<= 6km/h for 60 sekunden){
            --> (stoppe Messung zwischenspeichern)
            --> (addiere BufferTimer zu Timer && Strecke(Buffer) zu Strecke)
            --> (stoppe BufferTimer && cleare Buffer)
            --> (starte Timer)
        }


		If (BufferTimer > 10min){ 
			(set joggen = false)
            (Beende Bewegung zu Fuß)
		}

    }

    while(rennen true){

    If (Strecke.aritmetischesMittel <= 15km/h for 60 sekunden){
            pause Timer;
			-->	(starte BufferTimer)
			-->	(Strecke in Buffer speichern)
        }

        If (Strecke.aritmetischesMittel >= 35km/h for 60 sekunden){
            (set rennen = false)
            (Beende Bewegung zu Fuß)
        }

		If (Strecke.aritmetischesMittel !<= 15km/h for 60 sekunden){
            --> (stoppe Messung zwischenspeichern)
            --> (addiere BufferTimer zu Timer && Strecke(Buffer) zu Strecke)
            --> (stoppe BufferTimer && cleare Buffer)
            --> (starte Timer)
        }


		If (BufferTimer > 10min){ 
			(set joggen = false)
            (Beende Bewegung zu Fuß)
		}

    }