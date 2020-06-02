// グローバル変数
let CANVAS_X = 800;
let CANVAS_Y = 600;

// 重力
const g_GRAVITY = 0.25;

class CRect{
	constructor( left = 0, top = 0, width = 0, height = 0 ){
		this.left = left;
		this.top = top;
		this.width = width;
		this.height = height;
	}
}

class CCamera{
	constructor( WarldWidth, WarldHeight ){
		this.Pos = new CVector2();
		this.Vec = new CVector2();
		this.Limit = new CVector2( WarldWidth, WarldHeight );
	}
}

class CPlayer{
	static #MOVEPOWER = 3.0;
	static get MovePower(){ return this.#MOVEPOWER; }
	static #MOVEDOWN = 0.2;
	static get MoveDown(){ return this.#MOVEDOWN; }
	
	static #JUMPLIMIT = 2;
	static #JUMPPOWER = 10.0;
	
	static #VELOCITYLIMIT = 7.0;
	
	constructor(){
		this.Shape = new CCircle( 0, 0, 15 );
		this.Shape.Body = IShape.DYNAMIC;
		this.Pos = this.Shape.Pos;
		this.Vec = this.Shape.Vec;
		this.JumpCount = 0;
		this.Texture = new Image();
		this.Texture.src = "../resource/chara/chara00.png";
		this.Rect = [];
		for( let y = 0 ; y < 4 ; y++ ){
			let yrect = [];
			for( let x = 0 ; x < 8 ; x++ ){
				let xrect = new CRect();
				xrect.left = x * 64;
				xrect.width =  64;
				xrect.top = y * 128;
				xrect.height = 128;
				yrect.push( xrect );
			}
			this.Rect.push( yrect );
		}
		this.AnimType = 0;
		this.AnimCount = 0;
		this.AnimTime = 0;
		
		this.Camera = new CCamera( 1200, 1200 );
	}
	
	Operation(){
		
		if( (PUSH == Input.Z) && (CPlayer.#JUMPLIMIT > this.JumpCount) ){
			this.Vec.y = -CPlayer.#JUMPPOWER;
			this.JumpCount++;
		}
		
		if( PUSH & Input.Left ){
			if( 1 != this.AnimType ){
				this.AnimType = 1;
				this.AnimTime = 0;
				this.AnimCount = 0;
			}
			
			if( 100 < (this.Pos.x-this.Camera.Pos.x) ){
				this.Vec.x = -CPlayer.#MOVEPOWER;
			}else if( 0 < this.Camera.Pos.x ){
				this.Vec.x = -CPlayer.#MOVEPOWER;
				this.Camera.Vec.x = -CPlayer.#MOVEPOWER;
			}
		}
		
		if( PUSH & Input.Right ){
			if( 2 != this.AnimType ){
				this.AnimType = 2;
				this.AnimTime = 0;
				this.AnimCount = 0;
			}
			if( 700 > (this.Pos.x-this.Camera.Pos.x) ){
				this.Vec.x = CPlayer.#MOVEPOWER;
			}else if( this.Camera.Limit.x > this.Camera.Pos.x ){
				this.Vec.x = CPlayer.#MOVEPOWER;
				this.Camera.Vec.x = CPlayer.#MOVEPOWER;
			}
		}
		
		if( PUSH & Input.Up ){
			if( 3 != this.AnimType ){
				this.AnimType = 3;
				this.AnimTime = 0;
				this.AnimCount = 0;
			}
		}
		
		if( (FREE == Input.Left) &&
		    (FREE == Input.Right)&& 
		    (FREE == Input.Up)   ){
		    if( 0 != this.AnimType ){
				this.AnimType = 0;
				this.AnimTime = 0;
				this.AnimCount = 0;
			}
		}
		
		this.AnimTime++;
		if( 7 < this.AnimTime ){
			this.AnimTime = 0;
			this.AnimCount++;
			if( 7 < this.AnimCount ){
				this.AnimCount = 0;
			}
		}
	}
	
	Update(){
		if( 0 == this.JumpCount ){
			if( 0 < this.Vec.x ){
				this.Vec.x -= CPlayer.#MOVEDOWN;
				if( 0 > this.Vec.x ){
					this.Vec.x = 0.0;
				}
			}else{
				this.Vec.x += CPlayer.#MOVEDOWN;
				if( 0 < this.Vec.x ){
					this.Vec.x = 0.0;
				}
			}
			if( 0 < this.Camera.Vec.x ){
				this.Camera.Vec.x -= CPlayer.#MOVEDOWN;
				if( 0 > this.Camera.Vec.x ){
					this.Camera.Vec.x = 0.0;
				}
			}else{
				this.Camera.Vec.x += CPlayer.#MOVEDOWN;
				if( 0 < this.Camera.Vec.x ){
					this.Camera.Vec.x = 0.0;
				}
			}
		}
		
		this.Vec.y += g_GRAVITY;
		if( CPlayer.#VELOCITYLIMIT < this.Vec.y ){
			this.Vec.y = CPlayer.#VELOCITYLIMIT;
		}
		
		this.Camera.Pos.Add( this.Camera.Vec );
		if( 0 > this.Camera.Pos.x ){
			this.Camera.Pos.x = 0.0;
		}
		if( this.Camera.Limit.x < this.Camera.x ){
			this.Camera.x = this.Camera.Limit.x;
		}
		
		this.Pos.Add( this.Vec );
		if( 100 > (this.Pos.x-this.Camera.Pos.x) ){
			this.Pos.x = (this.Camera.Pos.x + 100);
		}
		if( 700 < (this.Pos.x-this.Camera.Pos.x) ){
			this.Pos.x = (this.Camera.Pos.x + 700);
		}
	}
	
	Render( ctx ){
		this.Shape.DebugRender( ctx, this.Camera.Pos );
		
		ctx.beginPath();
		ctx.setTransform( 1, 0, 0, 1, 0, 0 );
		ctx.translate( (this.Pos.x-this.Camera.Pos.x), (this.Pos.y-this.Camera.Pos.y) );
		ctx.drawImage(	this.Texture,
						this.Rect[this.AnimType][this.AnimCount].left,
						this.Rect[this.AnimType][this.AnimCount].top,
						this.Rect[this.AnimType][this.AnimCount].width,
						this.Rect[this.AnimType][this.AnimCount].height,
						-32, -105, 64, 128 );
		ctx.closePath();
	}
}

class CGround{
	constructor(){
		this.Pos = new CVector2();
		this.Shape = [
			new CLine( -10, 500, 300, 500, CMath.DegToRad(35) ),
			new CLine( 300, 500, 550, 450, CMath.DegToRad(35) ),
			new CLine( 550, 450, 650, 350, CMath.DegToRad(35) ),
			new CLine( 650, 350, 800, 250, CMath.DegToRad(35) ),
			new CLine( 800, 250, 850, 250, CMath.DegToRad(35) ),
			new CLine( 850, 250, 1100, 350, CMath.DegToRad(35) ),
			new CLine( 1100, 350, 1300, 400, CMath.DegToRad(35) ),
			new CLine( 1300, 400, 1350, 500, CMath.DegToRad(35) ),
			new CLine( 1350, 500, 2100, 450, CMath.DegToRad(35) )
		];
		
		for( let i = 0 ; i < this.Shape.length ; i++ ){
			this.Shape[i].Body = IShape.STATIC;
		}
	}
	
	Render( ctx, Camera ){
		for( let i = 0 ; i < this.Shape.length ; i++ ){
			this.Shape[i].DebugRender( ctx, Camera );
		}
	}
}

var game = function(){
	
	this.Player = new CPlayer();
	this.Player.Pos.x = 400;
	this.Player.Pos.y = 300;
	
	this.Ground = new CGround();
	
	// 更新
	this.FrameMove = function(){
	
		this.Player.Operation();
		
		for( let i = 0 ; i < 2 ; i++ ){
			this.Player.Update();
			for( let i = 0 ; i < this.Ground.Shape.length ; i++ ){
				if( Collision.Detect( this.Player.Shape, this.Ground.Shape[i] ) ){
					this.Player.JumpCount = 0;
					if( 100 > (this.Player.Pos.x-this.Player.Camera.Pos.x) ){
						this.Player.Pos.x = (this.Player.Camera.Pos.x + 100);
					}
					if( 700 < (this.Player.Pos.x-this.Player.Camera.Pos.x) ){
						this.Player.Pos.x = (this.Player.Camera.Pos.x + 700);
					}
				}
			}
		}
		
		return this;
	}

	// 描画
	this.FrameRender = function( context ){
		context.save();
		this.Player.Render( context );
		this.Ground.Render( context, this.Player.Camera.Pos );
		context.restore();
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

	}, 16.66666 );	// 1000 / 60 = 16.66666 = 60fps
}					// 33.333333 = 30fps
