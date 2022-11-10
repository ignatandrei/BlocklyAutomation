import ShowCodeAndXML from "../Components/GUI/ShowCodeAndXML";

export interface SimpleDialogProps {
    open: boolean;
    selectedValue: string;
    onClose: (value: string) => void;
  }

  export interface ShowBlocklyOutput{
    showData: ShowCodeAndXML
  }