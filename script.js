const moodboard = document.getElementById("moodboard")
const sliderTranslate = document.querySelector(".uk-slider-items")

let isIn = false;

//Make the DIV element draggagle:
dragElement(document.getElementById("mydiv"));


function dragElement(elmnt) {
  // let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  let x = 0, y = 0;

  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();

    sliderTranslate.style.transform = "none"
    sliderTranslate.style.willChange = "auto"

    if(elmnt.style.position == "absolute"){
      elmnt.style.left = x + "px";
      elmnt.style.top = y + "px";
      elmnt.style.transform = `translate(-50%,-50%)`;
    }


    elmnt.style.position = "fixed";
    elmnt.style.pointerEvents = "none";
  
    // get the mouse cursor position at startup:
    x = e.clientX;

    if(window.scrollY < 1){
      y = e.clientY;
    }else{
      y = e.clientY + window.scrollY;
    }

    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    x = e.clientX;
    y = e.clientY;

    // set the element's new position:
    elmnt.style.top = (y) + "px";
    elmnt.style.left = (x) + "px";
    elmnt.style.transform = `translate(-50%,-50%)`;

    sliderTranslate.style.transform = "none"
    sliderTranslate.style.willChange = "auto"

    moodboard.onmouseover = () => {
        isIn = true;
    };
    moodboard.onmouseout = () => {
        isIn = false;
    };

  }

  function closeDragElement() {

    if(isIn){
      moodboard.appendChild(elmnt)
      
      elmnt.style.position = "absolute";
      if(elmnt.style.position == "absolute"){
        elmnt.style.left = x - moodboard.offsetWidth + "px";
        elmnt.style.transform = `translate(-90%,-60%)`;

      }
      if(window.scrollY < 1){
        let dim = document.querySelector("body").offsetHeight - window.innerHeight
        elmnt.style.top = y - dim + "px";
      }
      

        
    }else{
        elmnt.style.position = "static";
        elmnt.style.transform = `translate(0%,0%)`;
        elmnt.style.top = "";
        elmnt.style.left = "";

        document.getElementById(elmnt.classList[0]).appendChild(elmnt)

    }
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
    elmnt.style.pointerEvents = "auto";
    
  }
}
