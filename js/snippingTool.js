/* utility to take snapshot of area under mouse drag */

var myCanvas = document.getElementById("image_renderer");
var myContext = myCanvas.getContext("2d");
var mySnapshot = document.getElementById("image_canvas_container");
var mySnapsDeck = document.getElementById("snapshots");
var element = null;
var mouseInitPos={
	mouseStartX:0,
	mouseStartY:0,
	canvasLeft:0,
	canvasTop:0,
	divWidth:0,
	divHeight:0
};
var isSelecting = false;
var currentSnapshot;

$(document).ready(function(e){
	var img = new Image();
	img.onload = function(){
		myCanvas.width = 300;
		myCanvas.height = 300;
		myContext.drawImage(img, 0, 0, 300, 300);
	}
	img.src = "../images/testImage.png";
});

function createNewCanvasSnapshot(startX, startY, endX, endY){
	currentSnapshot = document.createElement("canvas");
	currentSnapshot.width = endX;
	currentSnapshot.height = endY;
	mySnapsDeck.appendChild(currentSnapshot);
	var currentSnapshotContext = currentSnapshot.getContext("2d");
	var imgData = myContext.getImageData(startX, startY, endX, endY);
	currentSnapshotContext.putImageData(imgData,0,0);
	var img    = currentSnapshot.toDataURL("image/png");
	var imgElement = document.createElement("img");
	imgElement.src = img;
	imgElement.className = "snapshot_format"
	imgElement.style.width = endX+'px';
	imgElement.style.height = endY+'px';
	mySnapsDeck.appendChild(imgElement);
	var imgObj = {};
	imgObj.id = (new Date()).getTime();
	imgObj.img = img;
	mySnapsDeck.removeChild(currentSnapshot);
}

myCanvas.addEventListener("mousedown", function(e){
	if(!isSelecting){
		var ev = e || window.event;
		mouseInitPos.mouseStartX = ev.clientX;
		mouseInitPos.mouseStartY = ev.clientY;
		mouseInitPos.canvasLeft = myCanvas.getBoundingClientRect().left;
		mouseInitPos.canvasTop = myCanvas.getBoundingClientRect().top;
		element = document.createElement("div");
		element.className = 'rectangle'
	    element.style.left = ev.clientX + 'px';
	    element.style.top = ev.clientY + 'px';
	    mySnapshot.appendChild(element);
	    isSelecting = true;
	}
	myCanvas.addEventListener("mousemove", function(e){
		var ev = e || window.event;
		if (element !== null && isSelecting) {
	        element.style.width = Math.abs(ev.clientX - mouseInitPos.mouseStartX) + 'px';
	        element.style.height = Math.abs(ev.clientY - mouseInitPos.mouseStartY) + 'px';
	        console.log("element.style.width:"+element.style.width);
	        console.log("element.style.height:"+element.style.height);
	        mouseInitPos.divWidth = Math.abs(ev.clientX - mouseInitPos.mouseStartX) ;
	        mouseInitPos.divHeight = Math.abs(ev.clientY - mouseInitPos.mouseStartY)
	        element.style.left = (ev.clientX - mouseInitPos.mouseStartX < 0) ? ev.clientX + 'px' : mouseInitPos.mouseStartX + 'px';
	        element.style.top = (ev.clientY - mouseInitPos.mouseStartY < 0) ? ev.clientY + 'px' : mouseInitPos.mouseStartY + 'px';
	    }
	});

	myCanvas.addEventListener("mouseup", function(e){
		if(isSelecting){
			if(mouseInitPos.divWidth <10 || mouseInitPos.divHeight<10){
				isSelecting = false;
				mySnapshot.removeChild(element);
				return;
			}
			var ev = e || window.event;
			isSelecting = false;
			mySnapshot.removeChild(element);
			createNewCanvasSnapshot(mouseInitPos.mouseStartX - mouseInitPos.canvasLeft, 
				mouseInitPos.mouseStartY - mouseInitPos.canvasTop, 
				mouseInitPos.divWidth, 
				mouseInitPos.divHeight)
		}
	});
	if(element){
		element.addEventListener("mouseup", function(e){
			if(isSelecting){
				if(mouseInitPos.divWidth <10 || mouseInitPos.divHeight<10){
					isSelecting = false;
					mySnapshot.removeChild(element);
					return;
				}
				var ev = e || window.event;
				isSelecting = false;
				mySnapshot.removeChild(element);
				createNewCanvasSnapshot(mouseInitPos.mouseStartX - mouseInitPos.canvasLeft, 
					mouseInitPos.mouseStartY - mouseInitPos.canvasTop, 
					mouseInitPos.divWidth, 
					mouseInitPos.divHeight)
			}
		});
		element.addEventListener("mousemove", function(e){
			var ev = e || window.event;
			if (element !== null && isSelecting) {
		        element.style.width = Math.abs(ev.clientX - mouseInitPos.mouseStartX) + 'px';
		        element.style.height = Math.abs(ev.clientY - mouseInitPos.mouseStartY) + 'px';
		        console.log("element.style.width:"+element.style.width);
		        console.log("element.style.height:"+element.style.height);
		        mouseInitPos.divWidth = Math.abs(ev.clientX - mouseInitPos.mouseStartX) ;
		        mouseInitPos.divHeight = Math.abs(ev.clientY - mouseInitPos.mouseStartY)
		        element.style.left = (ev.clientX - mouseInitPos.mouseStartX < 0) ? ev.clientX + 'px' : mouseInitPos.mouseStartX + 'px';
		        element.style.top = (ev.clientY - mouseInitPos.mouseStartY < 0) ? ev.clientY + 'px' : mouseInitPos.mouseStartY + 'px';
		    }
		});
	}
});

document.getElementById("clear_snapshots").addEventListener("click", function(e){
	document.getElementById("snapshots").innerHTML = "";
});