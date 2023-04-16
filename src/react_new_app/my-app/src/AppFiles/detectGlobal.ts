export class DetectFramework{
    
    public IsCreateReactApp: boolean=false;
    public urlReact :string| null  = null;
    public IsViteApp: boolean=false;
    constructor() {
        //console.log('process.env.PUBLIC_URL', process.env.PUBLIC_URL)
        //console.log("~~!!", process );
        //console.log("~~!!", process.env );
        try{
            this.urlReact= ((process as any).env as any).PUBLIC_URL;
            // console.log('!!!is create react');
            this.IsCreateReactApp=true;
            
            return;
        }
        catch{this.IsCreateReactApp=false;}
        // if(typeof process !== "undefined" && process.env){
        //     console.log('!!!is create react');
        //     this.IsCreateReactApp=true;
        // }
        if(typeof import.meta != "undefined" && (import.meta as any).env){
            console.log('!!!!is vite');
            this.IsViteApp=true;
            return;
        }
        console.log('framework is none');
        
        
    }

    public baseUrl():string| never{
        if(this.IsCreateReactApp)
            return this.urlReact!;

        if(this.IsViteApp){
            //for github blocks
            if((import.meta as any).resolve){
                return ( import.meta as any).resolve('../../public');
            }
            
            if(( import.meta as any).env.BASE_URL)
                return ( import.meta as any).env.BASE_URL;

            return "";
        }
        throw new Error("could not find framework ");
        
    }


}