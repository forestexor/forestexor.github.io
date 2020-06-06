// ゲームクラス
class CGame{
	constructor( canvas, context ){
		this.canvas = canvas;
		this.ctx = context;
		this.gamemode = new CTitle();
	}
	
	Run(){
		this.ctx.clearRect( 0, 0, this.canvas.width, this.canvas.height );

		this.gamemode = this.gamemode.FrameMove();
		this.gamemode.FrameRender( this.ctx );
	}
}

//=========================================================
// タイトル画面
//---------------------------------------------------------
class CTitle{
	// 初期化
	constructor(){
		this.image = new Image();
		this.image.src = "../resource/15puzzle.png";
	}

	// 更新メソッド
	FrameMove(){
		if( PUSH == Input.Mouse.State ){
			return new CMainGame();
		}
		return this;
	}

	// 描画メソッド
	FrameRender( ctx ){
		
		// 背景描画
		ctx.save();
		ctx.beginPath();
		
		ctx.translate( 256, 256 );
		ctx.drawImage( this.image, 0, 0, 512, 512, -256, -256, 512, 512 );
		ctx.restore();

		ctx.fillStyle = "white";
		ctx.font = "30px 'ＭＳ Ｐゴシック'";
		ctx.fillText( "PUSH MOUSE LEFT BUTTON", 70, 300 );
		
		ctx.closePath();
		ctx.restore();
	}
}

//=========================================================
// ゲーム画面
//---------------------------------------------------------
class CMainGame{
	// 描画領域
	static CRect = class{
		constructor( left=0, top=0, right=0, buttom=0 ){
			this.left = left;
			this.top = top;
			this.right = right;
			this.buttom = buttom;
		}
	}
	
	// パネルクラス
	static CPanel = class{
		constructor( id ){
			this.id = id;
			this.pos = id;
			this.x = 0;
			this.y = 0;
			this.rect = new CMainGame.CRect( 0, 0, 0, 0 );
		}
		
		Draw( ctx, image ){
			ctx.save();
			ctx.beginPath();
			
			ctx.translate( this.x, this.y );
			ctx.drawImage( image, this.rect.left, this.rect.top, this.rect.right, this.rect.buttom, 0, 0, 128, 128 );
/*
			ctx.fillStyle = "white";
			ctx.font = "30px 'ＭＳ Ｐゴシック'";
			ctx.fillText( this.id, this.x+50, this.y+50 );
			ctx.fillText( this.pos, this.x+50, this.y+70 );
*/
			ctx.closePath();
			ctx.restore();
		}
	}
	
	// 初期化
	constructor(){
		this.image = new Image();
		this.image.src = "../resource/15puzzle.png";
		this.alpha = 0;
		
		// パネル共
		this.Panels = new Array();
		for( let i = 0 ; i < 16 ; i++ ){
			this.Panels.push( new CMainGame.CPanel(i) );
			this.Panels[i].x = (i%4) * 128;
			this.Panels[i].y = Math.floor((i/4)) * 128;
			this.Panels[i].rect.left = this.Panels[i].x;
			this.Panels[i].rect.right = 128;
			this.Panels[i].rect.top = this.Panels[i].y;
			this.Panels[i].rect.buttom = 128;
		}
		
		// 初期化処理
		this.count = 0;
		this.time = 0;
		this.movePos = 0;
		this.moveId = 0;
		this.moveX = 0;
		this.moveY = 0;
		this.moveLen = 128;
		this.moveFlg = 0;
		this.FrameMove = this.Initialize;
	}// constructor(){
	
	Initialize(){
		if( 0 >= this.time ){
			switch( this.Panels[15].pos ){
			case 0:
				switch( ((Math.floor(Math.random()*1000))%2) ){
				case 0:	// 右が移動
					this.moveX = -this.moveLen;
					this.moveY = 0;
					this.movePos = (this.Panels[15].pos+1);
					break;
				case 1:	// 下が移動
					this.moveX = 0;
					this.moveY = -this.moveLen;
					this.movePos = (this.Panels[15].pos+4);
					break;
				};break;
			case 1:
			case 2:
				switch( ((Math.floor(Math.random()*1000))%3) ){
				case 0:	// 右が移動
					this.moveX = -this.moveLen;
					this.moveY = 0;
					this.movePos = (this.Panels[15].pos+1);
					break;
				case 1:	// 左が移動
					this.moveX = this.moveLen;
					this.moveY = 0;
					this.movePos = (this.Panels[15].pos-1);
					break;
				case 2:	// 下が移動
					this.moveX = 0;
					this.moveY = -this.moveLen;
					this.movePos = (this.Panels[15].pos+4);
					break;
				};break;
			case 3:
				switch( ((Math.floor(Math.random()*1000))%2) ){
				case 0:	// 左が移動
					this.moveX = this.moveLen;
					this.moveY = 0;
					this.movePos = (this.Panels[15].pos-1);
					break;
				case 1:	// 下が移動
					this.moveX = 0;
					this.moveY = -this.moveLen;
					this.movePos = (this.Panels[15].pos+4);
					break;
				};break;
			case 4:
				switch( ((Math.floor(Math.random()*1000))%3) ){
				case 0:	// 右が移動
					this.moveX = -this.moveLen;
					this.moveY = 0;
					this.movePos = (this.Panels[15].pos+1);
					break;
				case 1:	// 上が移動
					this.moveX = 0;
					this.moveY = this.moveLen;
					this.movePos = (this.Panels[15].pos-4);
					break;
				case 2:	// 下が移動
					this.moveX = 0;
					this.moveY = -this.moveLen;
					this.movePos = (this.Panels[15].pos+4);
					break;
				};break;
			case 5:
			case 6:
				switch( ((Math.floor(Math.random()*1000))%4) ){
				case 0:	// 右が移動
					this.moveX = -this.moveLen;
					this.moveY = 0;
					this.movePos = (this.Panels[15].pos+1);
					break;
				case 1:	// 左が移動
					this.moveX = this.moveLen;
					this.moveY = 0;
					this.movePos = (this.Panels[15].pos-1);
					break;
				case 2:	// 上が移動
					this.moveX = 0;
					this.moveY = this.moveLen;
					this.movePos = (this.Panels[15].pos-4);
					break;
				case 3:	// 下が移動
					this.moveX = 0;
					this.moveY = -this.moveLen;
					this.movePos = (this.Panels[15].pos+4);
					break;
				};break;
			case 7:
				switch( ((Math.floor(Math.random()*1000))%3) ){
				case 0:	// 左が移動
					this.moveX = this.moveLen;
					this.moveY = 0;
					this.movePos = (this.Panels[15].pos-1);
					break;
				case 1:	// 上が移動
					this.moveX = 0;
					this.moveY = this.moveLen;
					this.movePos = (this.Panels[15].pos-4);
					break;
				case 2:	// 下が移動
					this.moveX = 0;
					this.moveY = -this.moveLen;
					this.movePos = (this.Panels[15].pos+4);
					break;
				};break;
			case 8:
				switch( ((Math.floor(Math.random()*1000))%3) ){
				case 0:	// 右が移動
					this.moveX = -this.moveLen;
					this.moveY = 0;
					this.movePos = (this.Panels[15].pos+1);
					break;
				case 1:	// 上が移動
					this.moveX = 0;
					this.moveY = this.moveLen;
					this.movePos = (this.Panels[15].pos-4);
					break;
				case 2:	// 下が移動
					this.moveX = 0;
					this.moveY = -this.moveLen;
					this.movePos = (this.Panels[15].pos+4);
					break;
				};break;
			case 9:
			case 10:
				switch( ((Math.floor(Math.random()*1000))%4) ){
				case 0:	// 右が移動
					this.moveX = -this.moveLen;
					this.moveY = 0;
					this.movePos = (this.Panels[15].pos+1);
					break;
				case 1:	// 左が移動
					this.moveX = this.moveLen;
					this.moveY = 0;
					this.movePos = (this.Panels[15].pos-1);
					break;
				case 2:	// 上が移動
					this.moveX = 0;
					this.moveY = this.moveLen;
					this.movePos = (this.Panels[15].pos-4);
					break;
				case 3:	// 下が移動
					this.moveX = 0;
					this.moveY = -this.moveLen;
					this.movePos = (this.Panels[15].pos+4);
					break;
				};break;
			case 11:
				switch( ((Math.floor(Math.random()*1000))%3) ){
				case 0:	// 左が移動
					this.moveX = this.moveLen;
					this.moveY = 0;
					this.movePos = (this.Panels[15].pos-1);
					break;
				case 1:	// 上が移動
					this.moveX = 0;
					this.moveY = this.moveLen;
					this.movePos = (this.Panels[15].pos-4);
					break;
				case 2:	// 下が移動
					this.moveX = 0;
					this.moveY = -this.moveLen;
					this.movePos = (this.Panels[15].pos+4);
					break;
				};break;
			case 12:
				switch( ((Math.floor(Math.random()*1000))%2) ){
				case 0:	// 右が移動
					this.moveX = -this.moveLen;
					this.moveY = 0;
					this.movePos = (this.Panels[15].pos+1);
					break;
				case 1:	// 上が移動
					this.moveX = 0;
					this.moveY = this.moveLen;
					this.movePos = (this.Panels[15].pos-4);
					break;
				};break;
			case 13:
			case 14:
				switch( ((Math.floor(Math.random()*1000))%3) ){
				case 0:	// 右が移動
					this.moveX = -this.moveLen;
					this.moveY = 0;
					this.movePos = (this.Panels[15].pos+1);
					break;
				case 1:	// 左が移動
					this.moveX = this.moveLen;
					this.moveY = 0;
					this.movePos = (this.Panels[15].pos-1);
					break;
				case 2:	// 上が移動
					this.moveX = 0;
					this.moveY = this.moveLen;
					this.movePos = (this.Panels[15].pos-4);
					break;
				};break;
			case 15:
				switch( ((Math.floor(Math.random()*1000))%2) ){
				case 0:	// 左が移動
					this.moveX = this.moveLen;
					this.moveY = 0;
					this.movePos = (this.Panels[15].pos-1);
					break;
				case 1:	// 上が移動
					this.moveX = 0;
					this.moveY = this.moveLen;
					this.movePos = (this.Panels[15].pos-4);
					break;
				};break;
			};
			
			for( let i = 0 ; i < 15 ; i++ ){
				if( this.movePos == this.Panels[i].pos ){
					this.moveId = i;
					break;
				}
			}
			
			let tmp = this.Panels[15].pos;
			this.Panels[15].pos = this.Panels[this.moveId].pos;
			this.Panels[this.moveId].pos = tmp;
			
			this.time = (128/this.moveLen);
			this.count++;
		}else{
			this.time--;
			this.Panels[this.moveId].x += this.moveX;
			this.Panels[this.moveId].y += this.moveY;
		}
		
		if( (150 <= this.count) && (0 >= this.time) ){
			this.FrameMove = this.Main;
		}
		return this;
	}// Initilaize()
	
	// クリア処理
	GameEnd(){
		this.alpha += 0.01;
		if( 1.0 <= this.alpha ){
			return new CTitle();
		}
		return this;
	}
	
	// メインゲーム
	Main(){
		
		// パネル移動
		if( 0 != this.moveFlg ){
			switch( this.moveFlg ){
			case 1: this.Panels[this.moveId].x -= 4; break;
			case 2: this.Panels[this.moveId].x += 4; break;
			case 3: this.Panels[this.moveId].y -= 4; break;
			case 4: this.Panels[this.moveId].y += 4; break;
			};
			this.count--;
			if( 0 >= this.count ){
				this.moveFlg = 0;
			}
		}else{
			// クリア判定
			let flg = true;
			for( var i = 0 ; i < 16 ; i++ ){
				if( this.Panels[i].id != this.Panels[i].pos ){
					flg = false;
					break;
				}
			}
			if( true == flg ){
				this.FrameMove = this.GameEnd;
				return this;
			}
		}
		
		// マウス当たり判定
		if( 0 == this.moveFlg && PUSH == Input.Mouse.State ){
			for( var i = 0 ; i < 15 ; i++ ){
				if( Input.Mouse.x >= this.Panels[i].x && Input.Mouse.x <= (this.Panels[i].x+128) ){
					if( Input.Mouse.y >= this.Panels[i].y && Input.Mouse.y <= (this.Panels[i].y+128) ){
//						console.log( "i=%d", i );
						switch( this.Panels[i].pos ){
						case 0:
							if( this.Panels[15].pos == (this.Panels[i].pos+1) ){
								this.moveFlg = 2;	// 右移動
								this.moveId = i;
							}
							if( this.Panels[15].pos == (this.Panels[i].pos+4) ){
								this.moveFlg = 4;	// 下移動
								this.moveId = i;
							}
							break;
						case 1:
						case 2:
							if( this.Panels[15].pos == (this.Panels[i].pos-1) ){
								this.moveFlg = 1;	// 左移動
								this.moveId = i;
							}
							if( this.Panels[15].pos == (this.Panels[i].pos+1) ){
								this.moveFlg = 2;	// 右移動
								this.moveId = i;
							}
							if( this.Panels[15].pos == (this.Panels[i].pos+4) ){
								this.moveFlg = 4;	// 下移動
								this.moveId = i;
							}
							break;
						case 3:
							if( this.Panels[15].pos == (this.Panels[i].pos-1) ){
								this.moveFlg = 1;	// 左移動
								this.moveId = i;
							}
							if( this.Panels[15].pos == (this.Panels[i].pos+4) ){
								this.moveFlg = 4;	// 下移動
								this.moveId = i;
							}
							break;
						case 4:
							if( this.Panels[15].pos == (this.Panels[i].pos+1) ){
								this.moveFlg = 2;	// 右移動
								this.moveId = i;
							}
							if( this.Panels[15].pos == (this.Panels[i].pos-4) ){
								this.moveFlg = 3;	// 上移動
								this.moveId = i;
							}
							if( this.Panels[15].pos == (this.Panels[i].pos+4) ){
								this.moveFlg = 4;	// 下移動
								this.moveId = i;
							}
							break;
						case 5:
						case 6:
							if( this.Panels[15].pos == (this.Panels[i].pos-1) ){
								this.moveFlg = 1;	// 左移動
								this.moveId = i;
							}
							if( this.Panels[15].pos == (this.Panels[i].pos+1) ){
								this.moveFlg = 2;	// 右移動
								this.moveId = i;
							}
							if( this.Panels[15].pos == (this.Panels[i].pos-4) ){
								this.moveFlg = 3;	// 上移動
								this.moveId = i;
							}
							if( this.Panels[15].pos == (this.Panels[i].pos+4) ){
								this.moveFlg = 4;	// 下移動
								this.moveId = i;
							}
							break;
						case 7:
							if( this.Panels[15].pos == (this.Panels[i].pos-1) ){
								this.moveFlg = 1;	// 左移動
								this.moveId = i;
							}
							if( this.Panels[15].pos == (this.Panels[i].pos-4) ){
								this.moveFlg = 3;	// 上移動
								this.moveId = i;
							}
							if( this.Panels[15].pos == (this.Panels[i].pos+4) ){
								this.moveFlg = 4;	// 下移動
								this.moveId = i;
							}
							break;
						case 8:
							if( this.Panels[15].pos == (this.Panels[i].pos+1) ){
								this.moveFlg = 2;	// 右移動
								this.moveId = i;
							}
							if( this.Panels[15].pos == (this.Panels[i].pos-4) ){
								this.moveFlg = 3;	// 上移動
								this.moveId = i;
							}
							if( this.Panels[15].pos == (this.Panels[i].pos+4) ){
								this.moveFlg = 4;	// 下移動
								this.moveId = i;
							}
							break;
						case 9:
						case 10:
							if( this.Panels[15].pos == (this.Panels[i].pos-1) ){
								this.moveFlg = 1;	// 左移動
								this.moveId = i;
							}
							if( this.Panels[15].pos == (this.Panels[i].pos+1) ){
								this.moveFlg = 2;	// 右移動
								this.moveId = i;
							}
							if( this.Panels[15].pos == (this.Panels[i].pos-4) ){
								this.moveFlg = 3;	// 上移動
								this.moveId = i;
							}
							if( this.Panels[15].pos == (this.Panels[i].pos+4) ){
								this.moveFlg = 4;	// 下移動
								this.moveId = i;
							}
							break;
						case 11:
							if( this.Panels[15].pos == (this.Panels[i].pos-1) ){
								this.moveFlg = 1;	// 左移動
								this.moveId = i;
							}
							if( this.Panels[15].pos == (this.Panels[i].pos-4) ){
								this.moveFlg = 3;	// 上移動
								this.moveId = i;
							}
							if( this.Panels[15].pos == (this.Panels[i].pos+4) ){
								this.moveFlg = 4;	// 下移動
								this.moveId = i;
							}
							break;
						case 12:
							if( this.Panels[15].pos == (this.Panels[i].pos+1) ){
								this.moveFlg = 2;	// 右移動
								this.moveId = i;
							}
							if( this.Panels[15].pos == (this.Panels[i].pos-4) ){
								this.moveFlg = 3;	// 上移動
								this.moveId = i;
							}
							break;
						case 13:
						case 14:
							if( this.Panels[15].pos == (this.Panels[i].pos-1) ){
								this.moveFlg = 1;	// 左移動
								this.moveId = i;
							}
							if( this.Panels[15].pos == (this.Panels[i].pos+1) ){
								this.moveFlg = 2;	// 右移動
								this.moveId = i;
							}
							if( this.Panels[15].pos == (this.Panels[i].pos-4) ){
								this.moveFlg = 3;	// 上移動
								this.moveId = i;
							}
							break;
						case 15:
							if( this.Panels[15].pos == (this.Panels[i].pos-1) ){
								this.moveFlg = 1;	// 左移動
								this.moveId = i;
							}
							if( this.Panels[15].pos == (this.Panels[i].pos-4) ){
								this.moveFlg = 3;	// 上移動
								this.moveId = i;
							}
							break;
						}
						if( 0 != this.moveFlg ){
							let tmp = this.Panels[15].pos;
							this.Panels[15].pos = this.Panels[this.moveId].pos;
							this.Panels[this.moveId].pos = tmp;
							this.count = 32;
							break;
						}
					}
				}
			}
		}
		
		return this;
	}// Main()
	
	// 描画メソッド
	FrameRender( ctx ){
		for( var i = 0 ; i < 15 ; i++ ){
			this.Panels[i].Draw( ctx, this.image );
		}
		ctx.globalAlpha = this.alpha;
		this.Panels[15].Draw( ctx, this.image );
		ctx.globalAlpha = 1;
	}
}

