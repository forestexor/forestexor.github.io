// ゲームクラス
class CGame{
	constructor( canvas, context ){
		this.canvas = canvas;
		this.ctx = context;
		this.gamemode = new title();
	}
	
	Run(){
		this.ctx.clearRect( 0, 0, this.canvas.width, this.canvas.height );
		
		this.gamemode.FrameRender( this.ctx );
		this.gamemode = this.gamemode.FrameMove();
	}
}

let title = function(){
	this.FrameMove = function(){
		if( PUSH == Input.Z ){
			return new game();
		}
		return this;
	}

	this.FrameRender = function( ctx ){

		ctx.strokeStyle = "white";
		ctx.fillStyle = "white";
		
		ctx.font = "15px 'ＭＳ Ｐゴシック'";
		ctx.fillText( "PUSH Z KEY", 280, 240 );
	}
}

// グローバル変数
let CANVAS_X = 640;
let CANVAS_Y = 480;

let game = function(){
	//-----------------------------------------------------
	// 変数宣言
	
	// ボールクラス
	var Ball = function( x, y ){
		// 座標
		this.x = x;
		this.y = y;
		// 移動量
		this.mx = 2.0;
		this.my = -2.0;
		// 当たり判定(半径)
		this.r = 2.5;
		// 加速値
		this.s = 1.0;
		
		// 更新
		this.Update = function(){
			
			this.x += this.mx;
			this.y += (this.my * this.s);
			
			if( 1.0 < this.s ){
				this.s -= 0.001;
				if( 1.0 >= this.s ){ this.s = 1.0; }
			}
			
			// 画面外反射
			if( (0 > (this.x-this.r)) || (640.0 < (this.x+this.r)) ){
				this.mx *= -1.0;
			}
			if( (0 > (this.y-this.r)) ){
				this.my *= -1.0;
			}
		}
		// 描画
		this.Draw = function( context ){
			context.save();
			context.beginPath();
			context.fillStyle = "rgba( 0, 255, 0, 1.0 )";
			context.translate( this.x, this.y );
			// x, y, size, ?, 表示量, ?
			context.arc( 0, 0, 5, 0, Math.PI*2, false );
			context.fill();
			context.restore();
		}
		
		// 衝突判定(左,右,上,下,対象左,対象右,対象上,対象下)
		this.Collision = function( x1, x2, y1, y2, tx1, tx2, ty1, ty2 ){
			if( x1 < tx2 ){
				if( x2 > tx1 ){
					if( y1 < ty2 ){
						if( y2 > ty1 ){
							return true;
						}
					}
				}
			}
			return false;
		}
		// バーとの衝突判定
		this.ColBar = function( b ){
			// 左端
			var x1 = this.x - this.r;
			var x2 = this.x + this.r;
			var y1 = this.y - this.r;
			var y2 = this.y + this.r;
			var tx1 = b.x - b.sizeHX;
			var tx2 = tx1+1.0;
			var ty1 = b.y - b.sizeHY;
			var ty2 = b.y + b.sizeHY;
			if( true == this.Collision( x1, x2, y1, y2, tx1, tx2, ty1, ty2 ) ){
				if( 0 < this.mx ){
					this.x = tx2 - this.r;
					this.mx *= -1.0;
					return;
				}
			}
			// 右端
			tx2 = b.x + b.sizeHX;
			tx1 = tx2 - 1.0;
			if( true == this.Collision( x1, x2, y1, y2, tx1, tx2, ty1, ty2 ) ){
				if( 0 < this.mx ){
					this.x = tx2 + this.r;
					this.mx *= -1.0;
					return;
				}
			}
			// 上辺
			tx1 = b.x - b.sizeHX;
			if( true == this.Collision( x1, x2, y1, y2, tx1, tx2, ty1, ty2 ) ){
				this.y = ty1 - this.r;
				this.my *= -1.0;
				// 左キーが押されていた場合
				if( PUSH == Input.Left || HOLD == Input.Left ){
					if( -4.0 < this.mx ){
						this.mx -= 0.25;
						this.my = -4.0 + Math.abs( this.mx );
					}
				}
				// 右キーが押されていた場合
				if( PUSH == Input.Right || Input.Right ){
					if( 4.0 > this.mx ){
						this.mx += 0.25;
						this.my = -4.0 + Math.abs( this.mx );
					}
				}
				// バーが加速状態だったら
				if( true == b.flag ){
					this.y -= 3.0;
					this.s = 1.5;
				}
			}
		}
		// ブロックとの衝突判定
		this.ColBlock = function( b ){
			// 左端
			var x1 = this.x - this.r;
			var x2 = this.x + this.r;
			var y1 = this.y - this.r;
			var y2 = this.y + this.r;
			var tx1 = b.x - b.sizeHX;
			var tx2 = tx1+1.0;
			var ty1 = b.y - b.sizeHY;
			var ty2 = b.y + b.sizeHY;
			if( true == this.Collision( x1, x2, y1, y2, tx1, tx2, ty1, ty2 ) ){
				if( 0 < this.mx ){
					this.mx *= -1.0;
				}
				b.flag = false;
			}
			// 右端
			tx2 = b.x + b.sizeHX;
			tx1 = tx2 - 1.0;
			if( true == this.Collision( x1, x2, y1, y2, tx1, tx2, ty1, ty2 ) ){
				if( 0 > this.mx ){
					this.mx *= -1.0;
				}
				b.flag = false;
			}
			// 上辺
			tx1 = b.x - b.sizeHX;
			ty2 = ty1 - 2.0;
			if( true == this.Collision( x1, x2, y1, y2, tx1, tx2, ty1, ty2 ) ){
				this.my *= -1.0;
				b.flag = false;
			}
			// 下辺
			ty2 = b.y + b.sizeHY;
			ty1 = ty2 - 2.0;
			if( true == this.Collision( x1, x2, y1, y2, tx1, tx2, ty1, ty2 ) ){
				this.my *= -1.0;
				b.flag = false;
			}
		}
	}
	this.ball = new Ball( (CANVAS_X*0.5), (CANVAS_Y-40.0) );
	
	// ブロッククラス
	var Block = function( x, y ){
		this.x = x;
		this.y = y;
		this.sizeX = 50.0;
		this.sizeY = 15.0;
		this.sizeHX = this.sizeX * 0.5;
		this.sizeHY = this.sizeY * 0.5;
		this.flag = true;
		
		// 描画
		this.Draw = function( context ){
			if( true == this.flag ){
				context.save();
				context.beginPath();
				context.fillStyle = "rgba( 0, 0, 255, 1.0 )";
				context.translate( this.x, this.y );
				// x, y, SizeX, SizeY
				context.fillRect( -this.sizeHX, -this.sizeHY, this.sizeX, this.sizeY );
				context.restore();
			}
		}
	}
	this.blockNumX = 10;
	this.blockNumY = 5;
	this.blocks = Array();
	for( var y = 0 ; y < this.blockNumY ; y++ ){
		this.blocks[y] = new Array();
		for( var x = 0 ; x < this.blockNumX ; x++ ){
			this.blocks[y].push( new Block( 50+x*60, 20+y*25 ) );
		}
	}
	
	// バークラス
	var Bar = function( x, y ){
		this.x = x;
		this.y = y;
		this.sizeX = 70.0;
		this.sizeY = 10.0;
		this.sizeHX = this.sizeX * 0.5;
		this.sizeHY = this.sizeY * 0.5;
		// 加速状態
		this.flag = false;
		// 加速値
		this.s = 0;
		
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
				this.y = 450.0 - (Math.sin( CMath.DegToRad( this.s ) ) * 5.0);
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
		}
	}
	this.bar = new Bar( (CANVAS_X*0.5), (CANVAS_Y-30.0) );

	// ゲームクラス更新関数
	this.FrameMove = function(){
		// ボール更新
		this.ball.Update();
		// バー更新
		this.bar.Update();
		// ボールとバーの衝突判定
		this.ball.ColBar( this.bar );
		// ボールとブロックの衝突判定
		for( var y = 0 ; y < this.blockNumY ; y++ ){
			for( var x = 0 ; x < this.blockNumX ; x++ ){
				if( true == this.blocks[y][x].flag ){
					this.ball.ColBlock( this.blocks[y][x] );
				}
			}
		}
		
		// ゲームオーバー
		if( CANVAS_Y+10 < this.ball.y ){
			return new title();
		}
		
		// ゲームクリア
		var flag = true;
		for( var y = 0 ; y < this.blockNumY ; y++ ){
			for( var x = 0 ; x < this.blockNumX ; x++ ){
				if( true == this.blocks[y][x].flag ){
					flag = false;
				}
			}
		}
		if( true == flag ){
			return new title();
		}
	
		return this;
	}

	// ゲームクラス描画関数
	this.FrameRender = function( ctx ){
	
		// ボール表示
		this.ball.Draw( ctx );
		// ブロック表示
		for( var y = 0 ; y < this.blockNumY ; y++ ){
			for( var x = 0 ; x < this.blockNumX ; x++ ){
				this.blocks[y][x].Draw( ctx );
			}
		}
		// バー表示
		this.bar.Draw( ctx );
	}
}


