<<<<<<< HEAD:src/game/blockout/game.js
// ゲームクラス
class CGame{
	constructor( canvas, context ){
		this.canvas = canvas;
		this.ctx = context;
//		this.gamemode = new title();
//		this.gamemode = new CTitle();
		this.gamemode = new CHoge();
	}
	
	Run(){
		this.ctx.clearRect( 0, 0, this.canvas.width, this.canvas.height );
		
		this.gamemode.FrameRender( this.ctx );
		this.gamemode = this.gamemode.FrameMove();
	}
}

let title = function(){
	class CFuga{
		constructor( num ){
			this.hoge = new CHoge( num );
		}
	}
	
	class CHoge{
		constructor( num ){
			this.hoge = num;
		}
	}
	
	this.count = 0;
	
	this.hoge0 = new CHoge( 0 );
	this.fuga0 = new CFuga( 100 );
	
	let Initialize = function(){
		if( 120 > this.count ){
			this.count++;
		}else{
			this.FrameMove = Main;
		}
		return this;
	}
	
	let Main = function(){
=======
// グローバル変数
var CANVAS_X = 640;
var CANVAS_Y = 480;

// ディグリー角からラジアン角に変換
function DegToRad( d ){
	return ( d * ( Math.PI / 180 ) );
}

//=========================================================
// タイトル画面
//---------------------------------------------------------
var title = function(){

	this.FrameMove = function(){
>>>>>>> parent of 4cf90de... 2020_06_14_1:src/game/blockout/main.js
		if( PUSH == Input.Z ){
			return new game();
		}
		this.hoge0.hoge++;
		this.fuga0.hoge.hoge++;
		return this;
	}
<<<<<<< HEAD:src/game/blockout/game.js
	this.FrameMove = Initialize;
	
	this.FrameRender = function( ctx ){
		ctx.save();
		ctx.beginPath();
		
		ctx.setTransform( 1, 0, 0, 1, 0, 0 );
		ctx.textAlign = "left";
		ctx.textBaseline = "top";
		ctx.fillStyle = "white";
		ctx.font = "15px 'Arial'";
		
		if( 120 > this.count ){
			ctx.fillText( "初期化中です。", 10, 10 );
		}else{
			ctx.fillText( "ここはタイトルです。", 10, 10 );
		}
		ctx.fillText( this.count, 20, 30 );
		
		ctx.fillText( "hoge0:" + this.hoge0.hoge, 20, 50 );
		ctx.fillText( "fuga0:" + this.fuga0.hoge.hoge, 20, 70 );
		
		ctx.closePath();
		ctx.restore();
	}
}

let game = function(){
=======

	this.FrameRender = function( context ){

		context.strokeStyle = "white";
		context.fillStyle = "white";
		
		context.font = "15px 'ＭＳ Ｐゴシック'";
		context.fillText( "PUSH Z KEY", 280, 240 );
	}
}

//=========================================================
// ゲーム画面
//---------------------------------------------------------
var game = function(){
	//-----------------------------------------------------
	// 変数宣言
>>>>>>> parent of 4cf90de... 2020_06_14_1:src/game/blockout/main.js
	
	this.FrameMove = function(){
		if( PUSH == Input.Z ){
			return new title();
		}
		return this;
	}
	
	this.FrameRender = function( ctx ){
		ctx.save();
		ctx.beginPath();
		
		ctx.setTransform( 1, 0, 0, 1, 0, 0 );
		ctx.textAlign = "left";
		ctx.textBaseline = "top";
		ctx.fillStyle = "white";
		ctx.font = "15px 'Arial'";
		
		ctx.fillText( "ここはゲームです。", 10, 10 );
		
		ctx.closePath();
		ctx.restore();
	}
}

////////////////////////////////////////////////////////////

class CTitle{
	
	CHoge = class{
		constructor( num ){
			this.hoge = num;
		}
	}
	
	constructor(){
		this.count = 0;
		this.FrameMove = this.Initialize;
		
		this.hoge0 = new this.CHoge( 0 );
	}
	
	Initialize(){
		if( 120 > this.count ){
			this.count++;
		}else{
			this.FrameMove = this.Main;
		}
		return this;
	}
	
	Main(){
		if( PUSH == Input.Z ){
			return new CMainGame();
		}
		this.hoge0.hoge++;
		return this;
	}
	
	FrameRender( ctx ){
		ctx.save();
		ctx.beginPath();
		
<<<<<<< HEAD:src/game/blockout/game.js
		ctx.setTransform( 1, 0, 0, 1, 0, 0 );
		ctx.textAlign = "left";
		ctx.textBaseline = "top";
		ctx.fillStyle = "white";
		ctx.font = "15px 'Arial'";
		
		if( 120 > this.count ){
			ctx.fillText( "初期化中です。", 10, 10 );
		}else{
			ctx.fillText( "ここはタイトルです。", 10, 10 );
=======
		// 更新
		this.Update = function(){
			if( PUSH == Input.Left || HOLD == Input.Left ){
				if( 0 < (this.x-this.sizeHX) ){
					this.x -= 4.5;
				}
			}
			if( PUSH == Input.Right || HOLD == Input.Right ){
				if( CANVAS_X > (this.x+this.sizeHX) ){
					this.x += 4.5;
				}
			}
			
			// 加速状態じゃないかつZキーが押された時
			if( false == this.flag && PUSH == Input.Z ){
				this.flag = true;
			}
			// 加速状態なら
			if( true == this.flag ){
				this.y = 450.0 - (Math.sin( DegToRad( this.s ) ) * 5.0);
				this.s += 30;
				if( 180 <= this.s ){
					this.s = 0;
					this.flag = false;
				}
			}
		}
		// 描画
		this.Draw = function( context ){
			context.save();
			context.beginPath();
			context.fillStyle = "rgba( 255, 0, 0, 1.0 )";
			context.translate( this.x, this.y );
			// x, y, SizeX, SizeY
			context.fillRect( -this.sizeHX, -this.sizeHY, this.sizeX, this.sizeY );
			context.restore();
>>>>>>> parent of 4cf90de... 2020_06_14_1:src/game/blockout/main.js
		}
		ctx.fillText( this.count, 20, 30 );
		
		ctx.fillText( "hoge0:" + this.hoge0.hoge, 20, 50 );
		
		ctx.closePath();
		ctx.restore();
	}
}

class CMainGame{
	constructor(){
	}
	
	FrameMove(){
		if( PUSH == Input.Z ){
			return new CTitle();
		}
		return this;
	}
	
	FrameRender( ctx ){
		ctx.save();
		ctx.beginPath();
		
		ctx.setTransform( 1, 0, 0, 1, 0, 0 );
		ctx.textAlign = "left";
		ctx.textBaseline = "top";
		ctx.fillStyle = "white";
		ctx.font = "15px 'Arial'";
		
		ctx.fillText( "ここはゲームです。", 10, 10 );
		
		ctx.closePath();
		ctx.restore();
	}
}

////////////////////////////////////////////////////////////
class CFuga{
	constructor( num ){
		this.num = num;
	}
}
class CPiyo{
	constructor(){
		this.fuga = new CFuga( 0 );
	}
}

class CHoge{
	constructor(){
		this.fuga = new CFuga( 0 );
		this.piyo = new CPiyo();
		
		this.count = 0;
		this.FrameMove = this.Initialize;
	}
	
	Initialize(){
		if( 120 > this.count ){
			this.count++;
		}else{
			this.FrameMove = this.Main;
		}
		return this;
	}
	
	Main(){
		this.fuga.num++;
		return this;
	}
<<<<<<< HEAD:src/game/blockout/game.js
	
	FrameRender( ctx ){
		ctx.save();
		ctx.beginPath();
		
		ctx.setTransform( 1, 0, 0, 1, 0, 0 );
		ctx.textAlign = "left";
		ctx.textBaseline = "top";
		ctx.fillStyle = "white";
		ctx.font = "15px 'Arial'";
		
		if( 120 > this.count ){
			ctx.fillText( "初期化中です。", 10, 10 );
		}else{
			ctx.fillText( "ここはタイトルです。", 10, 10 );
		}
		ctx.fillText( this.count, 20, 30 );
		
		ctx.fillText( "fuga:" + this.fuga.num, 20, 50 );
		
		ctx.closePath();
		ctx.restore();
	}
}
=======

	// ゲームクラス描画関数
	this.FrameRender = function( context ){
	
		// ボール表示
		this.ball.Draw( context );
		// ブロック表示
		for( var y = 0 ; y < this.blockNumY ; y++ ){
			for( var x = 0 ; x < this.blockNumX ; x++ ){
				this.blocks[y][x].Draw( context );
			}
		}
		// バー表示
		this.bar.Draw( context );
	}
}

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

//=========================================================
// 所謂メイン関数
//---------------------------------------------------------
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
		gamemode = gamemode.FrameMove();
		gamemode.FrameRender( context );

		}, 16.666666 );	// 1000 / 60 = 16.66666 = 60FPS
}
>>>>>>> parent of 4cf90de... 2020_06_14_1:src/game/blockout/main.js
