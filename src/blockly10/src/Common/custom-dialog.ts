interface optionsToInterface{
    showOkay: boolean,
    showCancel:boolean,
    showInput:boolean,
    onOkay: ()=>void,
    onCancel:()=>void
}
export default class CustomDialog {
  public backdropDiv_: HTMLElement | null = null;
  public inputField: HTMLInputElement | null = null;
  public dialogDiv_: HTMLElement | null = null;
  

  private opt:Partial<optionsToInterface> | null = null;
  public show(title: string, message: string, options: Partial<optionsToInterface>): void {
    this.opt=options;
    const element = document.getElementById("customDialogBackdrop");
    if(element){
        element.remove();
    }
    if (!this.dialogDiv_) {
      // Generate HTML
      this.backdropDiv_ = document.createElement("div");
      this.backdropDiv_.id = "customDialogBackdrop";
      this.backdropDiv_.style.cssText =
        "position: absolute;" +
        "top: 0; left: 0; right: 0; bottom: 0;" +
        "background-color: rgba(0, 0, 0, 0.7);" +
        "z-index: 100;";
      document.body.appendChild(this.backdropDiv_);

      this.dialogDiv_= document.createElement("div");
      this.dialogDiv_.id = "customDialog";
      this.dialogDiv_.style.cssText =
        "background-color: #fff;" +
        "width: 400px;" +
        "margin: 20px auto 0;" +
        "padding: 10px;";
      this.backdropDiv_.appendChild(this.dialogDiv_);

      this.dialogDiv_.onclick = function (event: any) {
        event.stopPropagation();
      };
      this.backdropDiv_.style.display = "block";
      this.dialogDiv_.style.display = "block";  
    }

    this.dialogDiv_.innerHTML =
      '<header class="customDialogTitle"></header>' +
      '<p class="customDialogMessage"></p>' +
      (options.showInput ? '<div><input id="customDialogInput"></div>' : "") +
      '<div class="customDialogButtons">' +
      (options.showCancel
        ? '<button id="customDialogCancel">Cancel</button>'
        : "") +
      (options.showOkay ? '<button id="customDialogOkay">OK</button>' : "") +
      "</div>";
      this.dialogDiv_
      .getElementsByClassName("customDialogTitle")[0]
      .appendChild(document.createTextNode(title));
      this.dialogDiv_
      .getElementsByClassName("customDialogMessage")[0]
      .appendChild(document.createTextNode(message));

      this.init();
    }

    public hide () {
        if (this.backdropDiv_) {
          this.backdropDiv_.style.display = 'none';
        }
        if(this.dialogDiv_){
            this.dialogDiv_.style.display = 'none';
        }
      }
    
      
  public onOkay(event: any, me:CustomDialog): void {
    // console.log('tghis is', this);
    me.hide();
    if(me.opt && me.opt.onOkay) me.opt.onOkay();
    event && event.stopPropagation();
  }
  public onCancel(event: any, me: CustomDialog) {
    me.hide();
    if(me.opt && me.opt.onCancel) me.opt.onCancel();
    event && event.stopPropagation();
  }
  public init() {
    var self=this;
    var dialogInput = document.getElementById("customDialogInput");
    this.inputField = dialogInput as HTMLInputElement;
    if (dialogInput) {
      dialogInput.focus();

      dialogInput.onkeyup = function (event) {
        if (event.key === "Enter") {
          // Process as OK when user hits enter.
          self.onOkay(null,self);
          return false;
        } else if (event.key === "Escape") {
          // Process as cancel when user hits esc.
          self.onCancel(null,self);
          return false;
        }
      };
    } else {
      var okay = document.getElementById("customDialogOkay");
      okay && okay.focus();
    }
    console.log('set ok', self.opt);
    if (self.opt!.showOkay) {
        console.log('set ok');
      document
        .getElementById("customDialogOkay")!
        .addEventListener("click",(evt)=> self.onOkay(evt, self));
    }
    if (self.opt!.showCancel) {
      document
        .getElementById("customDialogCancel")!
        .addEventListener("click", (evt)=> self.onCancel(evt, self));
    }
    if(self.backdropDiv_)
        self.backdropDiv_.onclick =(evt)=> self.onCancel(evt,self);
  }
}
