import { Button } from '@mui/material';
import React, { useEffect, useState }  from 'react'
import { ShepherdOptionsWithType, ShepherdTour, TourMethods } from 'react-shepherd'
import "shepherd.js/dist/css/shepherd.css";
import { LoadTourSteps } from '../Examples/Messages';
import StartAnything from './StartAnything';
const tourOptions = {
  defaultStepOptions: {
    cancelIcon: {
      enabled: true
    }
  },
  useModalOverlay: true
};

function TourMainPage() {

  const [newSteps, setNewSteps]=useState([
    {
      id: 'welcome',
      title:'Visual API',
      
      text: [
        `
        <p>
        Welcome to Visual API!</p>
        <p>
        `
      ],
      classes: 'shepherd shepherd-welcome',
      buttons: [
        {
          type: 'cancel',
          classes: 'shepherd-button-secondary',
          text: 'Exit'
        },
        {
          type: 'next',
          text: 'Next'
        }
      ]
    }] as ShepherdOptionsWithType[]);

  useEffect(()=>{

    var x= LoadTourSteps.getTS().subscribe(
      it=>{
          var data=it.map((val, index) =>
            ({
            id: "index" + index,
            title: 'Visual API',
            text: val.text,
            attachTo: { element: val.query,on: (index===0)?'top' as const:'right-end' as const},
            
            buttons: [
              {
                type: 'cancel',
                classes: 'shepherd-button-secondary',
                text: 'Exit'
              },
              {
                type: 'next',
                text: 'Next',
                classes:'shepherd-button-primary'
              }
            ]
          }) 
          );
          setNewSteps(data);
      }
    );
    return ()=>x.unsubscribe();
    },[])

  return (
    
    <ShepherdTour steps={newSteps} tourOptions={tourOptions}>
        <TourMethods>
            {tourContext=>

        <Button variant="contained" onClick={()=>tourContext!.start()}>
            Help!
            <StartAnything start={()=>{
                if(newSteps.length>1) {
                    tourContext!.start();
                    return true;
                  }
                return false;}
            }>
          </StartAnything>
        </Button>

        }
        </TourMethods>
        {/* {cloneElement(children, {tourContext: ShepherdTourContext})} */}
  </ShepherdTour>

  );
}

export default TourMainPage;