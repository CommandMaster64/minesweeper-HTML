var flags = 10;
var done = false;
var board = [
	0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0
];
var boardReveal = [
	0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0
];
setup();
function setup() {
	for (let i = 0; i < 10; i++) {
    	let e = Math.floor(Math.random() * board.length);
        for (let i = 0; i < board.length; i++) {
        	if (board[e] == 1) {
            	e = Math.floor(Math.random() * board.length);
            }
        }
        board[e] = 1;
    }
}
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
function drawGrid(bWidth, bHeight, sWidth, sHeight) {
	for (let x = 0; x < sWidth/bWidth; x++) {
    	for (let y = 0; y < sHeight/bHeight; y++) {
        	ctx.strokeRect(x*bWidth, y*bHeight, bWidth, bHeight);
        }
    }
}
canvas.addEventListener('click', (event) => { if (!done) {
	for (let x = 0; x < 500/72; x++) {
    	for (let y = 0; y < 500/72; y++) {
        	if (event.clientX > x*72 && event.clientY > y*72) {
            	if (event.clientX < (x*72)+72 && event.clientY < (y*72)+72) {
                	if (boardReveal[x+(y*7)] == 0) {
                        if (board[x+(y*7)] != 1){
                            boardReveal[x+(y*7)] = 1; 
                            if (findBombsNear(x, y) == "") {
                               	startReveal(x, y);
                            }
                            draw();
                        }else { 
                            loose();
                            done = true;
                        } 
                    }
                }
            }
        }
    }
}});
function startReveal(x, y) {
	let startboard = [
        0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0
    ];
    startboard[x+(y*7)] = 1;
    for (let n = 0; n < 2; n++) {
        for (let i = 0; i < 500/72; i++) {
            for (let c = 0; c < 500/72; c++) {
                if (startboard[i+(c*7)] == 1) {
                    if (findBombsNear(i, c) == "") {
                        if (i != 6) {
                            boardReveal[(i+1)+(c*7)] = 1;
                            startboard[(i+1)+(c*7)] = 1;
                        }
                        if (i != 0) {
                            boardReveal[(i-1)+(c*7)] = 1;
                            startboard[(i-1)+(c*7)] = 1;
                        }
                        if (c != 0) {
                            boardReveal[i+((c*7)-7)] = 1;
                            startboard[i+((c*7)-7)] = 1;
                        } 
                        if (c != 6) {
                            boardReveal[i+((c*7)+7)] = 1;
                            startboard[i+((c*7)+7)] = 1;
                        }
                    }
                }
            }
        }
    }
}
draw();
function draw() {
	ctx.fillStyle="grey";
	ctx.fillRect(0, 0, 500, 500);
	drawGrid(72, 72, 500, 500);
    for (let x = 0; x < 500/72; x++) {
    	for (let y = 0; y < 500/72; y++) {
        	if (boardReveal[x+(y*7)] == 1) {
            	ctx.fillStyle="black";
            	ctx.font = "36px Arial"; 
                if (findBombsNear(x, y) != "") {
                	ctx.fillText(findBombsNear(x, y), (x*72)+30, (y*72)+45);
                }else {
                	ctx.fillStyle = "darkgrey";
                	ctx.fillRect((x*72)+1, (y*72)+1, 71, 71);
                }
            }else {
            	if (boardReveal[x+(y*7)] == 2) {
                	ctx.font = "36px Arial"; 
                	ctx.fillStyle = "black";
                	ctx.fillText("F", (x*72)+30, (y*72)+45);
                }
            }
        }
    }
}
function findBombsNear(x, y) { 
    let thing = 0; 
    if (board[(x+(y*7))-8] == 1 && x != 0) { 
    	thing++; 
    } 
    if (board[(x+(y*7))-7] == 1) { 
    	thing++; 
    } 
    if (board[(x+(y*7))-6] == 1  && x != 6) { 
    	thing++; 
    } 
    if (board[(x+(y*7))-1] == 1 && x != 0) { 
    	thing++; 
    } 
    if (board[(x+(y*7))+1] == 1  && x != 6) { 
    	thing++; 
    } 
    if (board[(x+(y*7))+6] == 1 && x != 0) { 
    	thing++; 
    } 
    if (board[(x+(y*7))+7] == 1) { 
    	thing++; 
    } 
    if (board[(x+(y*7))+8] == 1  && x != 6) {
    	thing++; 
    } 
    if (thing > 0) { 
    	return thing; 
    }else { 
    	return ""; 
    } 
} 
function loose() {
	for (let x = 0; x < 500/72; x++) {
    	for (let y = 0; y < 500/72; y++) {
        	if (board[x+(y*7)] == 1 && boardReveal[x+(y*7)] != 2) {
            	ctx.fillStyle = "red";
            	ctx.fillRect(x*72, y*72, 72, 72);
            }
        }
    }
}
canvas.addEventListener("contextmenu", (event) => { if (!done) {
	event.preventDefault();
    for (let x = 0; x < 500/72; x++) {
    	for (let y = 0; y < 500/72; y++) {
        	if (event.clientX > x*72 && event.clientY > y*72) {
            	if (event.clientX < (x*72)+72 && event.clientY < (y*72)+72) {
                	if (boardReveal[x+(y*7)] == 0) {
                    	flags--;
                        document.getElementById("flags").innerHTML = "Flags: " + flags;
						boardReveal[x+(y*7)] = 2; 
                    	draw();
                    }else {
                    	if (boardReveal[x+(y*7)] == 2) {
                        	flags++;
                            document.getElementById("flags").innerHTML = "Flags: " + flags;
                        	boardReveal[x+(y*7)] = 0;
                            draw();
                        }
                    }
                }
            }
        }
    }
}});
setInterval(checkWin, 1);
function checkWin() {
	let isFlagged = 0;
	for (let x = 0; x < 500/72; x++) {
    	for (let y = 0; y < 500/72; y++) {
        	if (board[x+(y*7)] == 1 && boardReveal[x+(y*7)] == 2) {
            	isFlagged++;
            }
        }
    }
    let allChecked = 0;
    for (let i = 0; i < board.length; i++) {
    	if (boardReveal[i] != 0) {
        	allChecked++;
        }
    }
    if (allChecked == board.length && isFlagged == 10) {
    	document.getElementById("flags").innerHTML = "You win!";
    }
}
