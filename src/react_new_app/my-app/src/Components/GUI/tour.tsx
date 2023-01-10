import { Button } from '@mui/material';
import React, { useEffect, useState }  from 'react'
import { ShepherdOptionsWithType, ShepherdTour, Tour, TourMethods } from 'react-shepherd'
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

  const dismissTour=()=>{
    localStorage.setItem('BA_ShepherdHide', 'yes');
  };

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
      var title=document.title;
    var x= LoadTourSteps.getTS().subscribe(
      it=>{
        var l=it.length;
          var data=it.map((val, index) =>
            ({
            id: "index" + index,
            title: `${title} ( ${index+1} / ${l})` ,
            text: val.text,
            attachTo: { element: val.query,on: (index===0)?'top' as const:'right-end' as const},
            
            buttons: [
              {
                text: 'Do not show again',
                action(){  dismissTour();this.hide();},
                disabled:(index !== l-1) 
              },
              {
                type: 'cancel',
                classes: 'shepherd-button-secondary',
                text: 'Exit'
              },
              
              {
                type: 'back',
                text: 'Back',
                classes:'shepherd-button-primary',
                disabled:(index === 0) 
              },
              {
                type: 'next',
                text: 'Next',
                classes:'shepherd-button-primary'
              }
              
            ]
          } as ShepherdOptionsWithType) 
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
                  if(!localStorage.getItem('BA_ShepherdHide')) {
                    tourContext!.start();
                  }      
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