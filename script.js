const moodboard = document.getElementById("moodboard")

let isIn = false;

//Make the DIV element draggagle:
dragElement(document.getElementById("mydiv"));


function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

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

    

    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    if(elmnt.style.position == "fixed"){
      pos4 = e.clientY;
    }else{
      pos4 = e.clientY + window.scrollY;
    }

    elmnt.style.position = "fixed";
    elmnt.style.pointerEvents = "none";

    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";

    moodboard.onmouseover = () => {
        isIn = true;
    };
    moodboard.onmouseout = () => {
        isIn = false;
    };

  }

  function closeDragElement() {

    if(isIn){
      // moodboard.appendChild(elmnt)
      
      elmnt.style.position = "fixed";
      // elmnt.style.left = elmnt.offsetLeft - pos1 - moodboard.offsetWidth + "px";
      // if(window.scrollY < 1){
      //   let dim = document.querySelector("body").offsetHeight - window.innerHeight
      //   elmnt.style.top = elmnt.offsetTop - pos2 - dim + "px";
      // }
      

        
    }else{
        elmnt.style.position = "static";
        elmnt.style.top = "";
        elmnt.style.left = "";
    }
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
    elmnt.style.pointerEvents = "auto";
    
  }
}
