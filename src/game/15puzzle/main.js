// グローバル変数
var CANVAS_X = 512;
var CANVAS_Y = 512;

// ディグリー角からラジアン角に変換
function DegToRad( d ){
	return ( d * ( Math.PI / 180 ) );
}

//=========================================================
// タイトル画面
//---------------------------------------------------------
var title = function(){

	// 初期化
	this.image = new Image();
	this.image.src = "../resource/15puzzle.png";

	this.FrameMove = function(){
		if( PUSH == Input.Mouse.State ){
			return new game();
		}
		return this;
	}

	this.FrameRender = function( context ){
		
		// 背景描画
		context.save();
		context.beginPath();
		context.translate( 256, 256 );
		context.drawImage( this.image, 0, 0, 512, 512, -256, -256, 512, 512 );
		context.restore();

		context.fillStyle = "white";
		context.font = "30px 'ＭＳ Ｐゴシック'";
		context.fillText( "PUSH MOUSE LEFT BUTTON", 70, 300 );
	}
}

//=========================================================
// ゲーム画面
//---------------------------------------------------------
var game = function(){
	//-----------------------------------------------------
	// 変数宣言
	
	this.image = new Image();
	this.image.src = "../resource/15puzzle.png";
	this.alpha = 0;
	
	// 描画領域
	var Rect = function( left, top, right, buttom ){
		this.left = left;
		this.top = top;
		this.right = right;
		this.buttom = buttom;
	}
	
	// パネルクラス
	var Panel = function( id ){
		this.id = id;
		this.pos = id;
		this.x = 0;
		this.y = 0;
		this.rect = new Rect( 0, 0, 0, 0 );
		
		this.Draw = function( context, image ){
			context.save();
			context.beginPath();
			context.translate( this.x, this.y );
			context.drawImage( image, this.rect.left, this.rect.top, this.rect.right, this.rect.buttom, 0, 0, 128, 128 );
			context.restore();
/*
			context.fillStyle = "white";
			context.font = "30px 'ＭＳ Ｐゴシック'";
			context.fillText( this.id, this.x+50, this.y+50 );
			context.fillText( this.pos, this.x+50, this.y+70 );
*/
		}
	}
	
	// パネル共
	this.Panels = new Array();
	for( var i = 0 ; i < 16 ; i++ ){
		this.Panels.push( new Panel(i) );
		this.Panels[i].x = (i%4) * 128;
		this.Panels[i].y = Math.floor((i/4)) * 128;
		this.Panels[i].rect.left = this.Panels[i].x;
		this.Panels[i].rect.right = 128;
		this.Panels[i].rect.top = this.Panels[i].y;
		this.Panels[i].rect.buttom = 128;
	}
	
	
	// 初期化処理
	var count = 0;
	var time = 0;
	var movePos = 0;
	var moveId = 0;
	var moveX = 0;
	var moveY = 0;
	var moveLen = 128;
	var Initialize = function(){
		if( 0 >= time ){
			switch( this.Panels[15].pos ){
			case 0:
				switch( ((Math.floor(Math.random()*1000))%2) ){
				case 0:	// 右が移動
					moveX = -moveLen; moveY = 0; movePos = (this.Panels[15].pos+1);
					break;
				case 1:	// 下が移動
					moveX = 0; moveY = -moveLen; movePos = (this.Panels[15].pos+4);
					break;
				};break;
			case 1:
			case 2:
				switch( ((Math.floor(Math.random()*1000))%3) ){
				case 0:	// 右が移動
					moveX = -moveLen; moveY = 0; movePos = (this.Panels[15].pos+1);
					break;
				case 1:	// 左が移動
					moveX = moveLen; moveY = 0; movePos = (this.Panels[15].pos-1);
					break;
				case 2:	// 下が移動
					moveX = 0; moveY = -moveLen; movePos = (this.Panels[15].pos+4);
					break;
				};break;
			case 3:
				switch( ((Math.floor(Math.random()*1000))%2) ){
				case 0:	// 左が移動
					moveX = moveLen; moveY = 0; movePos = (this.Panels[15].pos-1);
					break;
				case 1:	// 下が移動
					moveX = 0; moveY = -moveLen; movePos = (this.Panels[15].pos+4);
					break;
				};break;
			case 4:
				switch( ((Math.floor(Math.random()*1000))%3) ){
				case 0:	// 右が移動
					moveX = -moveLen; moveY = 0; movePos = (this.Panels[15].pos+1);
					break;
				case 1:	// 上が移動
					moveX = 0; moveY = moveLen; movePos = (this.Panels[15].pos-4);
					break;
				case 2:	// 下が移動
					moveX = 0; moveY = -moveLen; movePos = (this.Panels[15].pos+4);
					break;
				};break;
			case 5:
			case 6:
				switch( ((Math.floor(Math.random()*1000))%4) ){
				case 0:	// 右が移動
					moveX = -moveLen; moveY = 0; movePos = (this.Panels[15].pos+1);
					break;
				case 1:	// 左が移動
					moveX = moveLen; moveY = 0; movePos = (this.Panels[15].pos-1);
					break;
				case 2:	// 上が移動
					moveX = 0; moveY = moveLen; movePos = (this.Panels[15].pos-4);
					break;
				case 3:	// 下が移動
					moveX = 0; moveY = -moveLen; movePos = (this.Panels[15].pos+4);
					break;
				};break;
			case 7:
				switch( ((Math.floor(Math.random()*1000))%3) ){
				case 0:	// 左が移動
					moveX = moveLen; moveY = 0; movePos = (this.Panels[15].pos-1);
					break;
				case 1:	// 上が移動
					moveX = 0; moveY = moveLen; movePos = (this.Panels[15].pos-4);
					break;
				case 2:	// 下が移動
					moveX = 0; moveY = -moveLen; movePos = (this.Panels[15].pos+4);
					break;
				};break;
			case 8:
				switch( ((Math.floor(Math.random()*1000))%3) ){
				case 0:	// 右が移動
					moveX = -moveLen; moveY = 0; movePos = (this.Panels[15].pos+1);
					break;
				case 1:	// 上が移動
					moveX = 0; moveY = moveLen; movePos = (this.Panels[15].pos-4);
					break;
				case 2:	// 下が移動
					moveX = 0; moveY = -moveLen; movePos = (this.Panels[15].pos+4);
					break;
				};break;
			case 9:
			case 10:
				switch( ((Math.floor(Math.random()*1000))%4) ){
				case 0:	// 右が移動
					moveX = -moveLen; moveY = 0; movePos = (this.Panels[15].pos+1);
					break;
				case 1:	// 左が移動
					moveX = moveLen; moveY = 0; movePos = (this.Panels[15].pos-1);
					break;
				case 2:	// 上が移動
					moveX = 0; moveY = moveLen; movePos = (this.Panels[15].pos-4);
					break;
				case 3:	// 下が移動
					moveX = 0; moveY = -moveLen; movePos = (this.Panels[15].pos+4);
					break;
				};break;
			case 11:
				switch( ((Math.floor(Math.random()*1000))%3) ){
				case 0:	// 左が移動
					moveX = moveLen; moveY = 0; movePos = (this.Panels[15].pos-1);
					break;
				case 1:	// 上が移動
					moveX = 0; moveY = moveLen; movePos = (this.Panels[15].pos-4);
					break;
				case 2:	// 下が移動
					moveX = 0; moveY = -moveLen; movePos = (this.Panels[15].pos+4);
					break;
				};break;
			case 12:
				switch( ((Math.floor(Math.random()*1000))%2) ){
				case 0:	// 右が移動
					moveX = -moveLen; moveY = 0; movePos = (this.Panels[15].pos+1);
					break;
				case 1:	// 上が移動
					moveX = 0; moveY = moveLen; movePos = (this.Panels[15].pos-4);
					break;
				};break;
			case 13:
			case 14:
				switch( ((Math.floor(Math.random()*1000))%3) ){
				case 0:	// 右が移動
					moveX = -moveLen; moveY = 0; movePos = (this.Panels[15].pos+1);
					break;
				case 1:	// 左が移動
					moveX = moveLen; moveY = 0; movePos = (this.Panels[15].pos-1);
					break;
				case 2:	// 上が移動
					moveX = 0; moveY = moveLen; movePos = (this.Panels[15].pos-4);
					break;
				};break;
			case 15:
				switch( ((Math.floor(Math.random()*1000))%2) ){
				case 0:	// 左が移動
					moveX = moveLen; moveY = 0; movePos = (this.Panels[15].pos-1);
					break;
				case 1:	// 上が移動
					moveX = 0; moveY = moveLen; movePos = (this.Panels[15].pos-4);
					break;
				};break;
			};
			
			for( var i = 0 ; i < 15 ; i++ ){
				if( movePos == this.Panels[i].pos ){
					moveId = i;
					break;
				}
			}
			
			var tmp = this.Panels[15].pos;
			this.Panels[15].pos = this.Panels[moveId].pos;
			this.Panels[moveId].pos = tmp;
			
			time = (128/moveLen);
			count++;
		}else{
			time--;
			this.Panels[moveId].x += moveX;
			this.Panels[moveId].y += moveY;
		}
		
		if( (150 <= count) && (0 >= time) ){
			this.FrameMove = Main;
		}
		return this;
	}
	
	// クリア処理
	var GameEnd = function(){
		this.alpha += 0.01;
		if( 1.0 <= this.alpha ){
			return new title();
		}
		return this;
	}
	
	// メインゲーム
	var moveFlg = 0;
	var Main = function(){
		
		// パネル移動
		if( 0 != moveFlg ){
			switch( moveFlg ){
			case 1: this.Panels[moveId].x -= 4; break;
			case 2: this.Panels[moveId].x += 4; break;
			case 3: this.Panels[moveId].y -= 4; break;
			case 4: this.Panels[moveId].y += 4; break;
			};
			count--;
			if( 0 >= count ){
				moveFlg = 0;
			}
		}else{
			// クリア判定
			var flg = true;
			for( var i = 0 ; i < 16 ; i++ ){
				if( this.Panels[i].id != this.Panels[i].pos ){
					flg = false;
					break;
				}
			}
			if( true == flg ){
				this.FrameMove = GameEnd;
				return this;
			}
		}
		
		// マウス当たり判定
		if( 0 == moveFlg && PUSH == Input.Mouse.State ){
			for( var i = 0 ; i < 15 ; i++ ){
				if( Input.Mouse.x >= this.Panels[i].x && Input.Mouse.x <= (this.Panels[i].x+128) ){
					if( Input.Mouse.y >= this.Panels[i].y && Input.Mouse.y <= (this.Panels[i].y+128) ){
//						console.log( "i=%d", i );
						switch( this.Panels[i].pos ){
						case 0:
							if( this.Panels[15].pos == (this.Panels[i].pos+1) ){
								moveFlg = 2;	// 右移動
								moveId = i;
							}
							if( this.Panels[15].pos == (this.Panels[i].pos+4) ){
								moveFlg = 4;	// 下移動
								moveId = i;
							}
							break;
						case 1:
						case 2:
							if( this.Panels[15].pos == (this.Panels[i].pos-1) ){
								moveFlg = 1;	// 左移動
								moveId = i;
							}
							if( this.Panels[15].pos == (this.Panels[i].pos+1) ){
								moveFlg = 2;	// 右移動
								moveId = i;
							}
							if( this.Panels[15].pos == (this.Panels[i].pos+4) ){
								moveFlg = 4;	// 下移動
								moveId = i;
							}
							break;
						case 3:
							if( this.Panels[15].pos == (this.Panels[i].pos-1) ){
								moveFlg = 1;	// 左移動
								moveId = i;
							}
							if( this.Panels[15].pos == (this.Panels[i].pos+4) ){
								moveFlg = 4;	// 下移動
								moveId = i;
							}
							break;
						case 4:
							if( this.Panels[15].pos == (this.Panels[i].pos+1) ){
								moveFlg = 2;	// 右移動
								moveId = i;
							}
							if( this.Panels[15].pos == (this.Panels[i].pos-4) ){
								moveFlg = 3;	// 上移動
								moveId = i;
							}
							if( this.Panels[15].pos == (this.Panels[i].pos+4) ){
								moveFlg = 4;	// 下移動
								moveId = i;
							}
							break;
						case 5:
						case 6:
							if( this.Panels[15].pos == (this.Panels[i].pos-1) ){
								moveFlg = 1;	// 左移動
								moveId = i;
							}
							if( this.Panels[15].pos == (this.Panels[i].pos+1) ){
								moveFlg = 2;	// 右移動
								moveId = i;
							}
							if( this.Panels[15].pos == (this.Panels[i].pos-4) ){
								moveFlg = 3;	// 上移動
								moveId = i;
							}
							if( this.Panels[15].pos == (this.Panels[i].pos+4) ){
								moveFlg = 4;	// 下移動
								moveId = i;
							}
							break;
						case 7:
							if( this.Panels[15].pos == (this.Panels[i].pos-1) ){
								moveFlg = 1;	// 左移動
								moveId = i;
							}
							if( this.Panels[15].pos == (this.Panels[i].pos-4) ){
								moveFlg = 3;	// 上移動
								moveId = i;
							}
							if( this.Panels[15].pos == (this.Panels[i].pos+4) ){
								moveFlg = 4;	// 下移動
								moveId = i;
							}
							break;
						case 8:
							if( this.Panels[15].pos == (this.Panels[i].pos+1) ){
								moveFlg = 2;	// 右移動
								moveId = i;
							}
							if( this.Panels[15].pos == (this.Panels[i].pos-4) ){
								moveFlg = 3;	// 上移動
								moveId = i;
							}
							if( this.Panels[15].pos == (this.Panels[i].pos+4) ){
								moveFlg = 4;	// 下移動
								moveId = i;
							}
							break;
						case 9:
						case 10:
							if( this.Panels[15].pos == (this.Panels[i].pos-1) ){
								moveFlg = 1;	// 左移動
								moveId = i;
							}
							if( this.Panels[15].pos == (this.Panels[i].pos+1) ){
								moveFlg = 2;	// 右移動
								moveId = i;
							}
							if( this.Panels[15].pos == (this.Panels[i].pos-4) ){
								moveFlg = 3;	// 上移動
								moveId = i;
							}
							if( this.Panels[15].pos == (this.Panels[i].pos+4) ){
								moveFlg = 4;	// 下移動
								moveId = i;
							}
							break;
						case 11:
							if( this.Panels[15].pos == (this.Panels[i].pos-1) ){
								moveFlg = 1;	// 左移動
								moveId = i;
							}
							if( this.Panels[15].pos == (this.Panels[i].pos-4) ){
								moveFlg = 3;	// 上移動
								moveId = i;
							}
							if( this.Panels[15].pos == (this.Panels[i].pos+4) ){
								moveFlg = 4;	// 下移動
								moveId = i;
							}
							break;
						case 12:
							if( this.Panels[15].pos == (this.Panels[i].pos+1) ){
								moveFlg = 2;	// 右移動
								moveId = i;
							}
							if( this.Panels[15].pos == (this.Panels[i].pos-4) ){
								moveFlg = 3;	// 上移動
								moveId = i;
							}
							break;
						case 13:
						case 14:
							if( this.Panels[15].pos == (this.Panels[i].pos-1) ){
								moveFlg = 1;	// 左移動
								moveId = i;
							}
							if( this.Panels[15].pos == (this.Panels[i].pos+1) ){
								moveFlg = 2;	// 右移動
								moveId = i;
							}
							if( this.Panels[15].pos == (this.Panels[i].pos-4) ){
								moveFlg = 3;	// 上移動
								moveId = i;
							}
							break;
						case 15:
							if( this.Panels[15].pos == (this.Panels[i].pos-1) ){
								moveFlg = 1;	// 左移動
								moveId = i;
							}
							if( this.Panels[15].pos == (this.Panels[i].pos-4) ){
								moveFlg = 3;	// 上移動
								moveId = i;
							}
							break;
						}
						if( 0 != moveFlg ){
							var tmp = this.Panels[15].pos;
							this.Panels[15].pos = this.Panels[moveId].pos;
							this.Panels[moveId].pos = tmp;
							count = 32;
							break;
						}
					}
				}
			}
		}
		
		return this;
	}

	// ゲームクラス更新関数
	this.FrameMove = Initialize;
//	this.FrameMove = function(){
//		return this;
//	}

	// ゲームクラス描画関数
	this.FrameRender = function( context ){
		for( var i = 0 ; i < 15 ; i++ ){
			this.Panels[i].Draw( context, this.image );
		}
		context.globalAlpha = this.alpha;
		this.Panels[15].Draw( context, this.image );
		context.globalAlpha = 1;
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

	}, 16.666666 );	// 1000 / 60 = 16.66666 = 60fps
}
