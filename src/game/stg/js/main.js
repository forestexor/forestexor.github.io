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

//=========================================================
// 所謂メイン関数
//---------------------------------------------------------
window.onload = function(){
	
	// ページスクロール抑制
	window.addEventListener( "keydown", (e) => {
		let code = e.keyCode;
		switch( code ){
		case 32:	// Space
		case 37:	// ←
		case 38:	// ↑
		case 39:	// →
		case 40:	// ↓
			e.preventDefault();
		}
	});
	
	// キーが押された時
	document.onkeydown = function(e){
		Input.onKeyDown( e );
	}
	
	// キーが離された時
	document.onkeyup = (e) => {
		Input.onKeyUp( e );
	}
	
	var canvas = document.getElementById("myCanvas");
	if (!canvas.getContext) return;
	var context = canvas.getContext("2d");

	var gamemode = new title();

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