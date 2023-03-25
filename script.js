const moodboard = document.getElementById("moodboard");
let dragItem = document.querySelectorAll(".drag-item");
let isIn = false;
let indexGrid = 9;
let sliderTranslate = null;

var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener(
    "test",
    null,
    Object.defineProperty({}, "passive", {
      get: function () {
        supportsPassive = true;
      },
    })
  );
} catch (e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent =
  "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

// call this to Disable
function disableScroll() {
  window.addEventListener("DOMMouseScroll", preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener("touchmove", preventDefault, wheelOpt); // mobile
  window.addEventListener("keydown", preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
  window.removeEventListener("DOMMouseScroll", preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
  window.removeEventListener("touchmove", preventDefault, wheelOpt);
  window.removeEventListener("keydown", preventDefaultForScrollKeys, false);
}

document.addEventListener("DOMContentLoaded", () => {
  for (let item of dragItem) {
    dragElement(item);
  }

  function dragElement(elmnt) {
    // let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    let x = 0,
      y = 0;

    if (elmnt) {
      /* if present, the header is where you move the DIV from:*/
      elmnt.onmousedown = dragMouseDown;
      elmnt.ontouchstart = touchstart;
    }

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();

      sliderTranslate = elmnt.parentElement.parentElement.parentElement;

      elmnt.style.zIndex = ++indexGrid;

      sliderTranslate.style.transform = "none";
      sliderTranslate.style.willChange = "auto";

      if (elmnt.style.position == "absolute") {
        elmnt.style.left = x + "px";
        elmnt.style.top = y + "px";
        elmnt.style.transform = `translate(-50%,-50%)`;
      }

      elmnt.style.position = "fixed";
      elmnt.style.pointerEvents = "none";

      // get the mouse cursor position at startup:
      x = e.clientX;

      if (window.scrollY < 1) {
        y = e.clientY;
      } else {
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
      elmnt.style.top = y + "px";
      elmnt.style.left = x + "px";
      elmnt.style.transform = `translate(-50%,-50%)`;

      sliderTranslate.style.transform = "none";
      sliderTranslate.style.willChange = "auto";

      moodboard.onmouseover = () => {
        isIn = true;
      };
      moodboard.onmouseout = () => {
        isIn = false;
      };
    }

    function closeDragElement() {
      if (isIn) {
        moodboard.appendChild(elmnt);
        elmnt.style.zIndex = indexGrid;

        elmnt.style.position = "absolute";
        if (elmnt.style.position == "absolute") {
          if (window.innerWidth > 960) {
            elmnt.style.left = x - moodboard.offsetWidth + "px";
          }
          elmnt.style.transform = `translate(-90%,-100%)`;
        }
        if (window.scrollY < 1) {
          let dim =
            document.querySelector("body").offsetHeight - window.innerHeight;
          elmnt.style.top = y - dim + "px";
        }
      } else {
        elmnt.style.position = "static";
        elmnt.style.transform = `translate(0%,0%)`;
        elmnt.style.top = "";
        elmnt.style.left = "";

        document.getElementById(elmnt.classList[0]).appendChild(elmnt);
      }
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
      elmnt.style.pointerEvents = "auto";
    }

    /* mobile */
    function touchstart(e) {
      let touchLocation = e.targetTouches[0];

      sliderTranslate = elmnt.parentElement.parentElement.parentElement;

      elmnt.style.zIndex = ++indexGrid;

      sliderTranslate.style.transform = "none";
      sliderTranslate.style.willChange = "auto";

      if (elmnt.style.position == "absolute") {
        elmnt.style.left = x + "px";
        elmnt.style.top = y + "px";
        elmnt.style.transform = `translate(-50%,-50%)`;
      }

      elmnt.style.position = "fixed";
      elmnt.style.pointerEvents = "none";

      // get the mouse cursor position at startup:
      x = touchLocation.clientX;

      if (window.scrollY < 1) {
        y = touchLocation.clientY;
      } else {
        y = touchLocation.clientY + window.scrollY;
      }

      elmnt.ontouchend = mobileEnd;
      elmnt.ontouchmove = mobileDrag;
    }

    function mobileDrag(e) {
      disableScroll();

      let touchLocation = e.targetTouches[0];
      sliderTranslate = elmnt.parentElement.parentElement.parentElement;

      x = touchLocation.clientX;
      y = touchLocation.clientY;

      // set the element's new position:
      elmnt.style.top = y + "px";
      elmnt.style.left = x + "px";
      elmnt.style.transform = `translate(-50%,-50%)`;

      sliderTranslate.style.transform = "none";
      sliderTranslate.style.willChange = "auto";

      moodboard.onmouseover = () => {
        isIn = true;
      };
      moodboard.onmouseout = () => {
        isIn = false;
      };

    }

    function mobileEnd() {
      enableScroll();
      let topMoodboard = moodboard.getBoundingClientRect().top
      let bottomMoodboard = moodboard.getBoundingClientRect().bottom
      let leftMoodboard = moodboard.getBoundingClientRect().left
      let rightMoodboard = moodboard.getBoundingClientRect().right

      if( (y > topMoodboard && y < bottomMoodboard) && (x > leftMoodboard && x < rightMoodboard) ){
        isIn = true;
      }else{
        isIn = false;
      }


      if (isIn) {
        moodboard.appendChild(elmnt);
        elmnt.style.zIndex = indexGrid;

        elmnt.style.position = "absolute";
        if (elmnt.style.position == "absolute") {
          if (window.innerWidth > 960) {
            elmnt.style.left = x - moodboard.offsetWidth + "px";
          }
          elmnt.style.transform = `translate(-90%,-100%)`;
        }
        if (window.scrollY < 1) {
          let dim =
            document.querySelector("body").offsetHeight - window.innerHeight;
          elmnt.style.top = y - dim + "px";
        }
      } else {
        elmnt.style.position = "static";
        elmnt.style.transform = `translate(0%,0%)`;
        elmnt.style.top = "";
        elmnt.style.left = "";

        document.getElementById(elmnt.classList[0]).appendChild(elmnt);
      }
      /* stop moving when mouse button is released:*/
      elmnt.style.zIndex = indexGrid;
      document.ontouchend = null;
      document.ontouchmove = null;
      elmnt.style.pointerEvents = "auto";
    }
  }
});

const donwloadLink = document.querySelector("#download-moodboard #download");
let downloadable = false;

donwloadLink.onclick = function () {
  downloadable = true;

  function download(canvas, filename) {
    const data = canvas.toDataURL("image/png;base128");
    donwloadLink.download = filename;
    donwloadLink.href = data;
  }

  html2canvas(document.querySelector("#moodboard")).then((canvas) => {
    // document.body.appendChild(canvas);
    download(canvas, "Moodboard");
    if (downloadable) {
      donwloadLink.click();
      downloadable = false;
    }
  });
};
