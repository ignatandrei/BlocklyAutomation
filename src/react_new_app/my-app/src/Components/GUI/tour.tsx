import { Button } from '@mui/material';
import React  from 'react'
import { ShepherdTour, TourMethods } from 'react-shepherd'
import "shepherd.js/dist/css/shepherd.css";
const tourOptions = {
  defaultStepOptions: {
    cancelIcon: {
      enabled: true
    }
  },
  useModalOverlay: true
};

const newSteps=[
    {
      id: 'welcome',
      text: [
        `
        <p>
        Shepherd is a JavaScript library for guiding users through your app.
        It uses <a href="https://popper.js.org/">Popper.js</a>,
        another open source library, to render dialogs for each tour "step".
        </p>
        <p>
        Among many things, Popper makes sure your steps never end up off screen or
        cropped by an overflow. (Try resizing your browser to see what we mean.)
        </p>
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
    }]
function TourMainPage() {


  return (
    
    <ShepherdTour steps={newSteps} tourOptions={tourOptions}>
        <TourMethods>
            {tourContext=>
        <Button variant="contained" onClick={()=>tourContext!.start()}>
            Help!
        </Button>
        }
        </TourMethods>
        {/* {cloneElement(children, {tourContext: ShepherdTourContext})} */}
  </ShepherdTour>

  );
}

export default TourMainPage;