function Include( scriptURL ){
	var scriptElem = document.createElement( 'SCRIPT' );
	scriptElem.setAttribute( 'language', 'JavaScript' );
	scriptElem.setAttribute( 'src', scriptURL );
	document.head.appendChild( scriptElem );
}
//-----------------------------------------------------------
Include("js/title.js");
Include("js/game.js");




var CANVAS_X = 640;
var CANVAS_Y = 480;


// ページスクロール抑制
var keydownfunc = function( event ){
	var code = event.keyCode;
	switch( code ){
	case 32:	// Space
	case 37:	// ←
	case 38:	// ↑
	case 39:	// →
	case 40:	// ↓
		event.preventDefault();
	}
}

window.onload = function(){
	
	// ページスクロール抑制
	window.addEventListener( 'keydown', keydownfunc, true );
	
	var canvas = document.getElementById("myCanvas");
	if (!canvas.getContext) return;
	var context = canvas.getContext("2d");

	var gamemode = new title();


	canvas.onmousedown = function(){
		Input.Mouse.button = true;
	}
	canvas.onmouseup = function(){
		Input.Mouse.button = false;
	}
	
	canvas.addEventListener( "mousemove", function(e){
		let rect = e.target.getBoundingClientRect();
		Input.Mouse.x = e.clientX - rect.left
		Input.Mouse.y = e.clientY - rect.top
	});

	// メインループ
	setInterval( function(){
		context.clearRect( 0, 0, CANVAS_X, CANVAS_Y );

		Input.Update();
		var tmp = gamemode.FrameMove();
		if( tmp != gamemode ){
			gamemode = null;
			gamemode = tmp;
		}
		gamemode.FrameRender( context );

		}, 16.666666 );	// 1000 / 60 = 16.66666 = 60FPS
}