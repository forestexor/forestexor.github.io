
// グローバル変数
var CANVAS_X = 640;
var CANVAS_Y = 480;

// ディグリー角からラジアン角に変換
function DegToRad( d ){
	return ( d * ( Math.PI / 180 ) );
}
let g_Radian = (Math.PI / 180);



// 円
class CCircleObject extends CCircle{
	constructor( px, py, radius ){
		super( px, py, radius );
	}
	Render( ctx ){
		this.DebugRender( ctx );
		
		ctx.beginPath();
		ctx.setTransform( 1, 0, 0, 1, 0, 0 );
		ctx.translate( this.Pos.x, this.Pos.y );
		ctx.rotate( this.Rot.z );
		ctx.beginPath();
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillStyle = "white";
		ctx.font = "italic 20px 'Arial'"
		ctx.fillText( this.Num, 0, 0 );
		ctx.closePath();
	}
}

// 線
class CLineObject extends CLine{
	// 始点x,始点y,長さ,回転
	constructor( px, py, length, rot ){
		super( px, py, length, rot );
	}
	Render( ctx ){
		this.DebugRender( ctx );
		
		ctx.beginPath();
		ctx.setTransform( 1, 0, 0, 1, 0, 0 );
		ctx.translate( this.Pos.x, this.Pos.y );
		ctx.rotate( this.Rot.z );
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillStyle = "white";
		ctx.font = "italic 20px 'Arial'"
		ctx.fillText( this.Num, 0, 0 );
		ctx.closePath();
		
	}
}

// OBBボックス
class CBoxObject extends CBox{
	// x,y,x半径,y半径,回転
	constructor( px, py, xrad, yrad, rot ){
		super( px, py, xrad, yrad, rot );
	}
	Render( ctx ){
		this.DebugRender( ctx );
		
		ctx.beginPath();
		ctx.setTransform( 1, 0, 0, 1, 0, 0 );
		ctx.translate( this.Pos.x, this.Pos.y );
		ctx.rotate( this.Rot.z );
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillStyle = "white";
		ctx.font = "italic 20px 'Arial'"
		ctx.fillText( this.Num, 0, 0 );
		ctx.closePath();
		
	}
}

// AABBボックス
class CFixedBoxObject extends CFixedBox{
	// x,y,x半径,y半径
	constructor( px, py, xrad, yrad ){
		super( px, py, xrad, yrad );
	}
	Render( ctx ){
		this.DebugRender( ctx );
		
		ctx.beginPath();
		ctx.setTransform( 1, 0, 0, 1, 0, 0 );
		ctx.translate( this.Pos.x, this.Pos.y );
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillStyle = "white";
		ctx.font = "italic 20px 'Arial'"
		ctx.fillText( this.Num, 0, 0 );
		ctx.closePath();
		
	}
}


var game = function(){
	
	this.c0 = new CCircleObject( 130, 70, 20 );
	this.c1 = new CCircleObject( 200, 130, 30 );
	
	this.l0 = new CLineObject( 200, 450, 550, 350 );
	this.l1 = new CLineObject( 130, 450, 50, 100 );
	
	this.b0 = new CBoxObject( 350, 100, 30, 15, DegToRad(-10) );
	this.b1 = new CBoxObject( 480, 170, 25, 40, DegToRad(20) );
	
	this.fb0 = new CFixedBoxObject( 250, 250, 35, 20 );
	this.fb1 = new CFixedBoxObject( 380, 240, 25, 40 );
	
	this.Obj = this.c0;
	
	this.text = null;
	
	// 更新
	this.FrameMove = function(){
		
		if( PUSH == Input.Enter ){
		}
		
		//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
		// オブジェクト選択
		if( PUSH == Input._1 ){
			this.Obj = this.c0;
		}
		if( PUSH == Input._2 ){
			this.Obj = this.c1;
		}
		if( PUSH == Input._3 ){
			this.Obj = this.l0;
		}
		if( PUSH == Input._4 ){
			this.Obj = this.l1;
		}
		if( PUSH == Input._5 ){
			this.Obj = this.b0;
		}
		if( PUSH == Input._6 ){
			this.Obj = this.b1;
		}
		if( PUSH == Input._7 ){
			this.Obj = this.fb0;
		}
		if( PUSH == Input._8 ){
			this.Obj = this.fb1;
		}
		//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
		// ボディチェンジ
		if( PUSH == Input.Q ){
			this.Obj.Body = IShape.GHOST;
		}
		if( PUSH == Input.W ){
			this.Obj.Body = IShape.STATIC;
		}
		if( PUSH == Input.E ){
			this.Obj.Body = IShape.DYNAMIC;
		}
		//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
		// オブジェクト操作
		this.Obj.Vec.x = this.Obj.Vec.y = 0.0;
//		if( FREE == Input.R && (PUSH == Input.Left || HOLD == Input.Left) ){
		if( FREE == Input.R && (PUSH & Input.Left) ){
			this.Obj.Vec.x = -1;
		}
		if( FREE == Input.R && (PUSH == Input.Right || HOLD == Input.Right) ){
			this.Obj.Vec.x = 1;
		}
		if( PUSH == Input.Up || HOLD == Input.Up ){
			this.Obj.Vec.y = -1;
		}
		if( PUSH == Input.Down || HOLD == Input.Down ){
			this.Obj.Vec.y = 1;
		}
		// 回転
		if( HOLD == Input.R && (PUSH == Input.Left || HOLD == Input.Left) ){
			this.Obj.Rot.z -= g_Radian;
		}
		if( HOLD == Input.R && (PUSH == Input.Right || HOLD == Input.Right) ){
			this.Obj.Rot.z += g_Radian;
		}
		this.Obj.Pos.x += this.Obj.Vec.x;
		this.Obj.Pos.y += this.Obj.Vec.y;
		this.Obj.Update();
		
		//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
		
		// 衝突判定
		this.text = "";
		// 1と2（円と円）
		if( true == Physics.Detect( this.c0, this.c1 ) ){
			this.text += "(1&2 Hit)";
		}
		// 1と3（円と線）
		if( true == Physics.Detect( this.c0, this.l0 ) ){
			this.text += "(1&3 Hit)";
		}
		// 1と4（円と線）
		if( true == Physics.Detect( this.c0, this.l1 ) ){
			this.text += "(1&4 Hit)";
		}
		// 2と3（円と線）
		if( true == Physics.Detect( this.c1, this.l0 ) ){
			this.text += "(2&3 Hit)";
		}
		// 2と4（円と線）
		if( true == Physics.Detect( this.c1, this.l1 ) ){
			this.text += "(2&4Hit)";
		}
		// 3と4（線と線）
		if( true == Physics.Detect( this.l0, this.l1 ) ){
			this.text += "(3&4Hit)";
		}
		// 1と5（円とOBB）
		if( true == Physics.Detect( this.c0, this.b0 ) ){
			this.text += "(1&5Hit)";
		}
		// 1と6（円とOBB）
		if( true == Physics.Detect( this.c0, this.b1 ) ){
			this.text += "(1&6Hit)";
		}
		// 2と5（円とOBB）
		if( true == Physics.Detect( this.c1, this.b0 ) ){
			this.text += "(2&5Hit)";
		}
		// 2と6（円とOBB）
		if( true == Physics.Detect( this.c1, this.b1 ) ){
			this.text += "(2&6Hit)";
		}
		// 3と5（線とOBB）
		if( true == Physics.Detect( this.l0, this.b0 ) ){
			this.text += "(3&5Hit)";
		}
		// 3と6（線とOBB）
		if( true == Physics.Detect( this.l0, this.b1 ) ){
			this.text += "(3&6Hit)";
		}
		// 4と5（線とOBB）
		if( true == Physics.Detect( this.l1, this.b0 ) ){
			this.text += "(4&5Hit)";
		}
		// 4と6（線とOBB）
		if( true == Physics.Detect( this.l1, this.b1 ) ){
			this.text += "(4&6Hit)";
		}
		// 5と6（OBBとOBB）
		if( true == Physics.Detect( this.b0, this.b1 ) ){
			this.text += "(5&6Hit)";
		}
		// 1と7（円とAABB）
		if( true == Physics.Detect( this.c0, this.fb0 ) ){
			this.text += "(1&7 Hit)";
		}
		// 1と8（円とAABB）
		if( true == Physics.Detect( this.c0, this.fb1) ){
			this.text += "(1&8 Hit)";
		}
		// 2と7（円とAABB）
		if( true == Physics.Detect( this.c1, this.fb0 ) ){
			this.text += "(2&7 Hit)";
		}
		// 2と8（円とAABB）
		if( true == Physics.Detect( this.c1, this.fb1) ){
			this.text += "(2&8 Hit)";
		}
		// 3と7（線とAABB）
		if( true == Physics.Detect( this.l0, this.fb0 ) ){
			this.text += "(3&7Hit)";
		}
		// 3と8（線とAABB）
		if( true == Physics.Detect( this.l0, this.fb1 ) ){
			this.text += "(3&8Hit)";
		}
		// 4と7（線とAABB）
		if( true == Physics.Detect( this.l1, this.fb0 ) ){
			this.text += "(4&7Hit)";
		}
		// 4と8（線とAABB）
		if( true == Physics.Detect( this.l1, this.fb1 ) ){
			this.text += "(4&8Hit)";
		}
		// 5と7（OBBとAABB）
		if( true == Physics.Detect( this.b0, this.fb0 ) ){
			this.text += "(5&7Hit)";
		}
		// 5と8（OBBとAABB）
		if( true == Physics.Detect( this.b0, this.fb1 ) ){
			this.text += "(5&8Hit)";
		}
		// 6と7（OBBとAABB）
		if( true == Physics.Detect( this.b1, this.fb0 ) ){
			this.text += "(6&7Hit)";
		}
		// 6と8（OBBとAABB）
		if( true == Physics.Detect( this.b1, this.fb1 ) ){
			this.text += "(6&8Hit)";
		}
		// 7と8（AABBとAABB）
		if( true == Physics.Detect( this.fb0, this.fb1 ) ){
			this.text += "(7&8Hit)";
		}
		
		return this;
	}

	// 描画
	this.FrameRender = function( context ){
		context.save();
		this.c0.Render( context );
		this.c1.Render( context );
		this.l0.Render( context );
		this.l1.Render( context );
		this.b0.Render( context );
		this.b1.Render( context );
		this.fb0.Render( context );
		this.fb1.Render( context );
		context.restore();
		
		context.save();
		context.beginPath();
		context.textAlign = "left";
		context.textBaseline = "top";
		context.fillStyle = "white";
		context.font = "15px 'Arial'"
		let text = "Select Object : " + this.Obj.Num;
		switch( this.Obj.Body ){
		case IShape.GHOST:
			text += "(GHOST)";		break;
		case IShape.STATIC:
			text += "(STATIC)";		break;
		case IShape.DYNAMIC:
			text += "(DYNAMIC)";	break;
		}
		context.fillText( text, 0, 0 );
		context.fillText( "x:" + this.Obj.Pos.x.toFixed(1) + "  y:" + this.Obj.Pos.y.toFixed(1), 0, 15 );
		context.fillText( "rot:" + (this.Obj.Rot.z/g_Radian).toFixed(0), 0, 30 );
		if( IShape.LINE == this.Obj.Type ){
			context.fillText( "ex:" + this.Obj.ePos.x.toFixed(1) + "  ey:" + this.Obj.ePos.y.toFixed(1), 0, 45 );
		}
		
		if( "" != this.text ){
			context.fillStyle = "red";
			context.fillText( this.text, 0, 70 );
		}
		
		context.closePath();
		context.restore();
	}
}

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

	// マウス左クリック取得
	canvas.onmousedown = function(){
		Input.Mouse.L_Button = true;
	}
	canvas.onmouseup = () => {
		Input.Mouse.L_Button = false;
	}
	// マウス座標取得
	canvas.addEventListener( "mousemove", (e) => {
		let rect = e.target.getBoundingClientRect();
		Input.Mouse.x = e.clientX - rect.left;
		Input.Mouse.y = e.clientY - rect.top;
	});
	
	var gamemode = new game();

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
