/** Class for the popup Webcomponent, handles two types of inputs havent 
 * completed lot of functionalties which I would have,
 * since I have executed this in timed manner
 * Video and form template will be accepted, rest all will be handled accordingly but not in this test
 * Form also would require dynamic templayte, since am only using native template tag this would 
 * all be injected from the script, ideally i would be using X-Tags or polymer or templating engines
 * Now the format of 
 * */
class PopupComponent extends HTMLElement {
  static get observedAttributes() {return ['data-contentdata']; }
  constructor() {
    super();
    let thatDoc = document;
    let thisDoc = (thatDoc._currentScript || thatDoc.currentScript).ownerDocument;
    // Gets content from base template.
    let baseTemplate = thisDoc.querySelector('#popup-component');
    // Create a shadow root
    let shadow = this.attachShadow({mode: 'open'});
    shadow.appendChild(baseTemplate.content);
    let templateData = JSON.parse(this.getAttribute("data-contentdata"));
    //Loads the necessary template
    this.typeTemplateLoader(templateData);
    };
    //Triggered when this element is added to the DOM
    connectedCallback() {
      let templateData = JSON.parse(this.getAttribute("data-contentdata"));
      //Initialize Component
      this.componentInitializer(templateData);
      //Attaches all event handlers
      this.attachEventHandlers();
    };
     //Triggered when this element is removed from the DOM
    disconnectedCallback() {
      console.log('Popup element removed from page.');
    };
    //Triggered when watched attributes are changed, nothing watched as of now
    attributeChangedCallback(name, oldValue, newValue) {
      console.log('Popup element data attribute changed.');
    };
    //Helper to initialize the component
    componentInitializer(templateData){
      let shadowRef = this.shadowRoot;
      //Sets just the header value for now
      let header = shadowRef.querySelector('.popup-header');
      header.innerHTML = templateData.popupHeader;
    }
    //Helper to initialize all event handlers
    attachEventHandlers(){
      let shadowRef = this.shadowRoot;
      let close = shadowRef.querySelector('.close-btn');
      close.onclick = function() {
        // Close the popup
        this.parentNode.classList.toggle("display-none");
        shadowRef.querySelector(".popup-screen").classList.toggle("display-none");
      };
    };
    //TemplateLoader helper private method
    typeTemplateLoader (templateData){
      switch(templateData.contentType) {
        case "Video":
          let thatDoc = document;
          let thisDoc = (thatDoc._currentScript || thatDoc.currentScript).ownerDocument;
          // Gets content from base template.
          let tobeLoadedTemplate = thisDoc.querySelector('#video-container');
          //Ideally this should be imported as an external component and its methods and properties should be used
          this.shadowRoot.querySelector(".popup-content").appendChild(tobeLoadedTemplate.content);
          this.videoinitializer(templateData);
          break;
        case "Form":
          console.log(this.shadowRoot);
          break;
        default:
          console.log("Nothing here as of now");
      }
    };  
    //Helper to initialize contents if the type is video
    videoinitializer(templateData){
      let sourceElement=this.shadowRoot.querySelector('.video-player source');
      sourceElement.src = templateData.videoDetails.videoSrc;
      sourceElement.type = templateData.videoDetails.videoType;
      //Lot of things to be done here like type checking etc, also this should ideally be a helper method
      //exposed from an external Video component. I am signing off with just this since form would require lot
      //of validation, similar JSON format will be used and will be even taking rules for client side
      //validation in regex format, callbacks will be attached etc based on actions.
    }
  }
  
  // Define the new element
  customElements.define('popup-component', PopupComponent); 