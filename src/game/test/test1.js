// グローバル変数
let CANVAS_X = 640;
let CANVAS_Y = 480;

var game = function(){
	
	this.Camera = new CVector2( 0, 0 );
	this.Rectangle = new CVector2( 320, 240 );
	this.RectRadius = new CVector2( 50, 30 );
	this.RectRot = 0;
	
	// 更新
	this.FrameMove = function(){
		
		if( PUSH == Input.Enter ){
		}
		
		//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
		// オブジェクト操作
		if( PUSH & Input.Left ){
			this.Camera.x += 1;
		}
		if( (PUSH == Input.Right) || (HOLD == Input.Right) ){
			this.Camera.x -= 1;
		}
		if( (PUSH == Input.Up) || (HOLD == Input.Up) ){
			this.Camera.y += 1;
		}
		if( (PUSH == Input.Down) || (HOLD == Input.Down) ){
			this.Camera.y -= 1;
		}
		
		this.RectRot += CMath.RADIAN;
		if( CMath.PI_MUL2 <= this.RectRot ){
			this.RectRot -= CMath.PI_MUL2;
		}

		return this;
	}

	// 描画
	this.FrameRender = function( ctx ){
		ctx.save();
		
		ctx.beginPath();
		
		// 伸縮x, 傾斜y, 傾斜x, 伸縮y, 移動x, 移動y
		ctx.setTransform( 1, 0, 0, 1, 0, 0 );

//		ctx.translate( this.Camera.x, this.Camera.y );
//		ctx.translate( this.Rectangle.x, this.Rectangle.y );
		ctx.translate( (this.Camera.x+this.Rectangle.x), (this.Camera.y+this.Rectangle.y) );
		ctx.rotate( this.RectRot );
		
		ctx.strokeStyle = "rgba( 255, 255, 255, 1.0 )";
		ctx.lineWidth = 1.0;
		
		let x0 = ( -this.RectRadius.x);
		let x1 = (this.RectRadius.x*2);
		let y0 = (-this.RectRadius.y);
		let y1 = (this.RectRadius.y*2);

		ctx.strokeRect( x0, y0, x1, y1 );
		ctx.stroke();
		
		
		ctx.setTransform( 1, 0, 0, 1, 0, 0 );
		ctx.textAlign = "left";
		ctx.textBaseline = "top";
		ctx.fillStyle = "white";
		ctx.font = "15px 'Arial''"
		
		ctx.fillText( "CameraX = " + this.Camera.x, 5, 5 );
		ctx.fillText( "CameraY = " + this.Camera.y, 5, 15 );
		
		ctx.fillText( "ObjX = " + this.Rectangle.x, 5, 30 );
		ctx.fillText( "ObjY = " + this.Rectangle.y, 5, 40 );
		ctx.fillText( "ObjRot = " + CMath.RadToDeg(this.RectRot).toFixed(1), 5, 50 );

		ctx.closePath();

		ctx.restore();
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

    var gamemode = new game();


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

	}, 16.666666 );	// 1000 / 60 = 16.66666 = 60fps
}
