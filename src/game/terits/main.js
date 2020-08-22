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

	//-----------------------------------------------------
	// クラス
	var BLOCK = function(){
		this.x = 0;
		this.y = 0;
		this.speed = 0;
		this.rgba1 = null;
		this.rgba2 = null;
		
		this.Update = function(){
			this.y += this.speed;
			if( 500 < this.y ){
				return true;
			}
			return false;
		}
	}
	
	//-----------------------------------------------------
	// メソッド
	this.Create = function(){
		var tmp = new BLOCK();
		tmp.x = Math.floor( (Math.random() * (CANVAS_X+1)) );
		tmp.speed = 1.5 + (Math.random() * 2.3);
		var r = 26 + Math.floor( (Math.random() * 200) );
		var g = 26 + Math.floor( (Math.random() * 200) );
		var b = 26 + Math.floor( (Math.random() * 200) );
		var a = 0.2 + (Math.random() * 0.6);
		tmp.rgba1 = "rgba(" + r + "," + g + "," + b + "," + a + ")";
		tmp.rgba2 = "rgba(" + (r+30) + "," + (g+30) + "," + (b+30) + "," + a + ")";
		
		this.Blocks.push( tmp );
		this.wTime = Math.floor( Math.random() * 91 );
	}
	
	//-----------------------------------------------------
	// 変数
	
	// ブロック生成用
	this.wTime = 0;
	this.Blocks = [];

	// 文字明暗用
	this.alpha = 1.0;
	this.count = 0;

	// 更新
	this.FrameMove = function(){
		if( PUSH == Input.Enter ){
			return new game();
		}
		
		// ブロック生成
		this.wTime--;
		if( 0 >= this.wTime ){
			this.Create();
			this.Create();
			this.Create();
		}
		
		// ブロック更新
		for( var i = 0 ; i < this.Blocks.length ; i++ ){
			if( true == this.Blocks[i].Update() ){
				this.Blocks[i] = null;
				this.Blocks.splice( i, 1 );
				i--;
			}
		}
		
		// 文字明暗
		this.alpha = Math.cos( this.count );
		this.alpha = this.alpha * this.alpha;
		this.count += 0.015;
		
		return this;
	}

	// 描画
	this.FrameRender = function( context ){
		
		// ブロック描画
		context.save();
		context.beginPath();
		context.translate( 0, 0 );
		for( var i = 0 ; i < this.Blocks.length ; i++ ){
			context.fillStyle = this.Blocks[i].rgba1;
			context.fillRect( this.Blocks[i].x, this.Blocks[i].y, 16, 16 );
			context.fillStyle = this.Blocks[i].rgba2;
			context.fillRect( (this.Blocks[i].x+2), (this.Blocks[i].y+2), 12, 12 );
		}
		context.restore();
		
		context.textAlign = "center";
		context.fillStyle = "white";
		
		context.font = "italic bold 100px 'Arial'"
		context.fillText( "T e r i t s", 320, 200 );
		
		context.fillStyle = "rgba( 255, 255, 255," + this.alpha + ")";
		context.font = "30px 'ＭＳ Ｐゴシック'";
		context.fillText( "Push Enter to Start", 320, 300 );
	}
}

//=========================================================
// ゲーム画面
//---------------------------------------------------------
var game = function(){
	//-----------------------------------------------------
	// クラス
	var BLOCK = function(){
		this.Table = [
			[0,0,0,0,0],
			[0,0,0,0,0],
			[0,0,0,0,0],
			[0,0,0,0,0],
			[0,0,0,0,0]
		];
		this.x = 5;
		this.y = 0;
	}
	
	//-----------------------------------------------------
	// 定数宣言
	var Y_MAX = 26;
	var X_MAX = 15;
	var BLOCKSIZE = 16;
	var BLOCKLIST = [
		[
			[0,0,0,0,0],	// □□□□□
			[0,0,0,0,0],	// □□□□□
			[1,1,1,1,1],	// ■■■■■
			[0,0,0,0,0],	// □□□□□
			[0,0,0,0,0]		// □□□□□
		],
		[
			[0,0,0,0,0],	// □□□□□
			[0,0,0,0,0],	// □□□□□
			[0,1,1,1,1],	// □■■■■
			[0,0,0,0,0],	// □□□□□
			[0,0,0,0,0]		// □□□□□
		],
		[
			[0,0,0,0,0],	// □□□□□
			[0,0,0,0,0],	// □□□□□
			[0,1,1,1,0],	// □■■■□
			[0,0,0,0,0],	// □□□□□
			[0,0,0,0,0]		// □□□□□
		],
		[
			[0,0,0,0,0],	// □□□□□
			[0,0,0,0,0],	// □□□□□
			[0,0,1,1,0],	// □□■■□
			[0,0,0,0,0],	// □□□□□
			[0,0,0,0,0]		// □□□□□
		],
		[
			[0,0,0,0,0],	// □□□□□
			[0,0,0,0,0],	// □□□□□
			[0,0,1,0,0],	// □□■□□
			[0,0,0,0,0],	// □□□□□
			[0,0,0,0,0]		// □□□□□
		],
		[
			[0,0,0,0,0],	// □□□□□
			[0,0,0,0,0],	// □□□□□
			[0,1,1,1,0],	// □■■■□
			[0,0,0,1,0],	// □□□■□
			[0,0,0,0,0]		// □□□□□
		],
		[
			[0,0,0,0,0],	// □□□□□
			[0,0,0,0,0],	// □□□□□
			[0,1,1,1,0],	// □■■■□
			[0,1,0,0,0],	// □■□□□
			[0,0,0,0,0]		// □□□□□
		],
		[
			[0,0,0,0,0],	// □□□□□
			[0,1,1,0,0],	// □■■□□
			[0,0,1,1,0],	// □□■■□
			[0,0,0,0,0],	// □□□□□
			[0,0,0,0,0]		// □□□□□
		],
		[
			[0,0,0,0,0],	// □□□□□
			[0,0,1,1,0],	// □□■■□
			[0,1,1,0,0],	// □■■□□
			[0,0,0,0,0],	// □□□□□
			[0,0,0,0,0]		// □□□□□
		],
		[
			[0,0,0,0,0],	// □□□□□
			[0,0,1,0,0],	// □□■□□
			[0,0,1,1,0],	// □□■■□
			[0,0,0,0,0],	// □□□□□
			[0,0,0,0,0]		// □□□□□
		],
		[
			[0,0,0,0,0],	// □□□□□
			[0,0,1,1,0],	// □□■■□
			[0,0,1,1,0],	// □□■■□
			[0,0,0,0,0],	// □□□□□
			[0,0,0,0,0]		// □□□□□
		],
		[
			[0,0,0,0,0],	// □□□□□
			[0,0,0,0,0],	// □□□□□
			[1,1,1,1,1],	// ■■■■■
			[0,0,0,0,0],	// □□□□□
			[0,0,0,0,0]		// □□□□□
		],
		[
			[0,0,0,0,0],	// □□□□□
			[0,0,0,0,0],	// □□□□□
			[0,1,1,1,1],	// □■■■■
			[0,0,0,0,0],	// □□□□□
			[0,0,0,0,0]		// □□□□□
		],
		[
			[0,0,0,0,0],	// □□□□□
			[0,0,0,0,0],	// □□□□□
			[0,1,1,1,0],	// □■■■□
			[0,0,0,0,0],	// □□□□□
			[0,0,0,0,0]		// □□□□□
		],
		[
			[0,0,0,0,0],	// □□□□□
			[0,0,0,0,0],	// □□□□□
			[0,0,1,1,0],	// □□■■□
			[0,0,0,0,0],	// □□□□□
			[0,0,0,0,0]		// □□□□□
		],
		[
			[0,0,0,0,0],	// □□□□□
			[0,0,0,0,0],	// □□□□□
			[0,0,1,0,0],	// □□■□□
			[0,0,0,0,0],	// □□□□□
			[0,0,0,0,0]		// □□□□□
		],
		[
			[0,0,0,0,0],	// □□□□□
			[0,0,0,0,0],	// □□□□□
			[0,1,1,1,0],	// □■■■□
			[0,0,0,1,0],	// □□□■□
			[0,0,0,0,0]		// □□□□□
		],
		[
			[0,0,0,0,0],	// □□□□□
			[0,0,0,0,0],	// □□□□□
			[0,1,1,1,0],	// □■■■□
			[0,1,0,0,0],	// □■□□□
			[0,0,0,0,0]		// □□□□□
		],
		[
			[0,0,0,0,0],	// □□□□□
			[0,1,1,0,0],	// □■■□□
			[0,0,1,1,0],	// □□■■□
			[0,0,0,0,0],	// □□□□□
			[0,0,0,0,0]		// □□□□□
		],
		[
			[0,0,0,0,0],	// □□□□□
			[0,0,1,1,0],	// □□■■□
			[0,1,1,0,0],	// □■■□□
			[0,0,0,0,0],	// □□□□□
			[0,0,0,0,0]		// □□□□□
		],
		[
			[0,0,0,0,0],	// □□□□□
			[0,0,1,0,0],	// □□■□□
			[0,0,1,1,0],	// □□■■□
			[0,0,0,0,0],	// □□□□□
			[0,0,0,0,0]		// □□□□□
		],
		[
			[0,0,0,0,0],	// □□□□□
			[0,0,1,1,0],	// □□■■□
			[0,0,1,1,0],	// □□■■□
			[0,0,0,0,0],	// □□□□□
			[0,0,0,0,0]		// □□□□□
		],
		[
			[0,0,0,0,0],	// □□□□□
			[0,1,1,1,0],	// □■■■□
			[0,1,1,0,0],	// □■■□□
			[0,0,0,0,0],	// □□□□□
			[0,0,0,0,0]		// □□□□□
		],
		[
			[0,0,0,0,0],	// □□□□□
			[0,1,1,1,0],	// □■■■□
			[0,0,1,1,0],	// □□■■□
			[0,0,0,0,0],	// □□□□□
			[0,0,0,0,0]		// □□□□□
		],
		[
			[0,0,0,0,0],	// □□□□□
			[0,1,0,1,0],	// □■□■□
			[0,1,1,1,0],	// □■■■□
			[0,0,0,0,0],	// □□□□□
			[0,0,0,0,0]		// □□□□□
		],
		[
			[0,0,0,0,0],	// □□□□□
			[0,0,1,0,0],	// □□■□□
			[0,1,1,1,0],	// □■■■□
			[0,0,0,0,0],	// □□□□□
			[0,0,0,0,0]		// □□□□□
		],
		[
			[0,0,0,0,0],	// □□□□□
			[0,0,1,1,0],	// □□■■□
			[0,1,1,0,0],	// □■■□□
			[0,1,0,0,0],	// □■□□□
			[0,0,0,0,0]		// □□□□□
		],
		[
			[0,0,0,0,0],	// □□□□□
			[0,1,1,0,0],	// □■■□□
			[0,0,1,1,0],	// □□■■□
			[0,0,0,1,0],	// □□□■□
			[0,0,0,0,0]		// □□□□□
		],
		[
			[0,0,0,0,0],	// □□□□□
			[0,0,1,0,0],	// □□■□□
			[0,1,1,1,0],	// □■■■□
			[0,0,1,0,0],	// □□■□□
			[0,0,0,0,0]		// □□□□□
		],
		[
			[0,0,0,0,0],	// □□□□□
			[0,0,0,0,0],	// □□□□□
			[0,1,0,1,0],	// □■□■□
			[0,0,0,0,0],	// □□□□□
			[0,0,0,0,0]		// □□□□□
		]/*,
		[
			[0,0,0,0,0],	// □□□□□
			[0,0,0,0,0],	// □□□□□
			[0,0,0,0,0],	// □□□□□
			[0,0,0,0,0],	// □□□□□
			[0,0,0,0,0]		// □□□□□
		]*/
	];
	
	//-----------------------------------------------------
	// 変数宣言
	this.Score = 0;
	this.ScoreDisp = 0;
	this.Lv = 1;
	// ブロックを表示させるためのゲームテーブル
	this.GameTable = [
		[2,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
		[2,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
		[2,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
		[2,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
		[2,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
		[2,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
		[2,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
		[2,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
		[2,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
		[2,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
		[2,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
		[2,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
		[2,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
		[2,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
		[2,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
		[2,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
		[2,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
		[2,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
		[2,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
		[2,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
		[2,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
		[2,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
		[2,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
		[2,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
		[2,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
		[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
	];
	// 次に出てくるブロックの格納用
	this.NextBlock = [
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	];
	// ホールド用
	this.Hold = [
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	];
	// ホールド入れ替え時の退避用
	this.tmpHold = [
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	];
	// 予備ホールド
	this.subHold = [
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	];
	this.BlockCount = 0;	// ブロックがすぐに落下しないようにカウンタを用いる
	this.tx = 0,			// 操作対象の座標
	this.ty = 0;
	this.BlockType;		// ブロックの形状
	this.Time = 0;		// 時間
	this.wTime = 0;		// ウェイトタイム
	
	this.Block = new BLOCK();		// ブロック
	this.subBlock = new BLOCK();	// 予備ブロック
	
	this.endFlag = false;	// ゲームオーバーフラグ
	this.endCount = 0;		// 半透明用
	
	//-----------------------------------------------------
	// メソッド
	
	// 当たり判定(重なり)
	this.HitCheck = function(){
		for( var y = 0 ; y < 5 ; y++ ){
			for( var x = 0 ; x < 5 ; x++ ){
				if( (1 == this.Block.Table[y][x]) && (2 <= this.GameTable[this.Block.y+y][this.Block.x+x]) ){
					return true;
				}
			}
		}
		return false;
	}
	
	// 操作ブロックの確定
	this.CopyBlock = function(){
		for( var y = 0 ; y < 5 ; y++ ){
			for( var x = 0 ; x < 5 ; x++ ){
				if( 1 == this.Block.Table[y][x] ){
					this.GameTable[this.Block.y+y][this.Block.x+x] = (this.Block.Table[y][x]*4);
				}
			}
		}
	}
	
	//ブロックを発生させる関数
	this.OnBlock = function(){
		// 初期位置の設定
		this.Block.x = 5;
		this.Block.y = 0;

		// 出現するブロックをNextBlockから入れる
		for( var y = 0 ; y < 5 ; y++ ){
			for( var x = 0 ; x < 5 ; x++ ){
				this.Block.Table[y][x] = this.NextBlock[y][x];
			}
		}

		// 次に出現するブロックをNextBlockに入れる
		type = Math.floor( Math.random() * BLOCKLIST.length );
		for( var y = 0 ; y < 5 ; y++ ){
			for( var x = 0; x < 5 ; x++ ){
				this.NextBlock[y][x] = BLOCKLIST[type][y][x];
			}
		}

		// 初期位置にブロックがあるとゲームオーバー
		if( this.HitCheck() ){
			for( var y = 0 ; y < 5 ; y++ ){
				for( var x = 0 ; x < 5 ; x++ ){
					this.Block.Table[y][x] = 0;
				}
			}
			return true;
		}
		
		return false;
	}
	
	//-----------------------------------------------------
	// 初期化処理
	this.FrameMove = function(){
	
		// 最初に出現するブロックの設定
		var type = Math.floor( Math.random() * BLOCKLIST.length ) ;
		for( var y = 0 ; y < 5 ; y++ ){
			for( var x = 0; x < 5 ; x++ ){
				this.Block.Table[y][x] = BLOCKLIST[type][y][x];
			}
		}
		
		// 次に出現するブロックを設定
		type = Math.floor( Math.random() * BLOCKLIST.length ) ;
		for( var y = 0 ; y < 5 ; y++ ){
			for( var x = 0; x < 5 ; x++ ){
				this.NextBlock[y][x] = BLOCKLIST[type][y][x];
			}
		}
		
		// ホールドに入れるブロックを設定
		type = Math.floor( Math.random() * BLOCKLIST.length ) ;
		for( var y = 0 ; y < 5 ; y++ ){
			for( var x = 0; x < 5 ; x++ ){
				this.Hold[y][x] = BLOCKLIST[type][y][x];
			}
		}
		
		
		this.FrameMove = Main;
		return this;
	}
	
	//-----------------------------------------------------
	// ゲームオーバー
	var GameOver = function(){
		if( PUSH == Input.Enter ){
			return new title();
		}
		
		this.endCount += 0.01;
		if( 1.0 < this.endCount ){
			this.endCount = 1.0;
		}
		
		// 表示用スコアをカウント
		if( this.Score > this.ScoreDisp ){
			var add = 0;
			var dif = this.Score - this.ScoreDisp;
			if( 60 > dif ){
				add = 1;
			}else if( 600 > dif ){
				add = 10;
			}else if( 6000 > dif ){
				add = 100;
			}else if( 60000 > dif ){
				add = 1000;
			}else if( 600000 > dif ){
				add = 10000;
			}else if( 6000000 > dif ){
				add = 100000;
			}else if( 60000000 > dif ){
				add = 1000000;
			}
			this.ScoreDisp += add;
			if( this.Score <= this.ScoreDisp ){
				this.ScoreDisp = this.Score;
			}
		}
		
		return this;
	}
	
	//-----------------------------------------------------
	// ゲームクラス更新メソッド
	var Main = function(){
		// ブロックが重なった場合に戻す為に予備をコピー
		for( var y = 0 ; y < 5 ; y++ ){
			for( var x = 0 ; x < 5 ; x++ ){
				this.subBlock.Table[y][x] = this.Block.Table[y][x];
				this.subBlock.x = this.Block.x;
				this.subBlock.y = this.Block.y;
				this.subHold[y][x] = this.Hold[y][x];
			}
		}
		
		// キー入力
		// 左
		if( PUSH == Input.Left ){
			this.Block.x--;
			if( true == this.HitCheck() ){
				for( var y = 0 ; y < 5 ; y++ ){
					for( var x = 0 ; x < 5 ; x++ ){
						this.Block.Table[y][x] = this.subBlock.Table[y][x];
						this.Block.x = this.subBlock.x;
						this.Block.y = this.subBlock.y;
					}
				}
			}
			this.wTime = 20;
		}
		if( (HOLD == Input.Left) && (0 == this.wTime) ){
			this.Block.x--;
			if( true == this.HitCheck() ){
				for( var y = 0 ; y < 5 ; y++ ){
					for( var x = 0 ; x < 5 ; x++ ){
						this.Block.Table[y][x] = this.subBlock.Table[y][x];
						this.Block.x = this.subBlock.x;
						this.Block.y = this.subBlock.y;
					}
				}
			}
			this.wTime = 1;
		}

		// 右
		if( PUSH == Input.Right ){
			this.Block.x++;
			if( true == this.HitCheck() ){
				for( var y = 0 ; y < 5 ; y++ ){
					for( var x = 0 ; x < 5 ; x++ ){
						this.Block.Table[y][x] = this.subBlock.Table[y][x];
						this.Block.x = this.subBlock.x;
						this.Block.y = this.subBlock.y;
					}
				}
			}
			this.wTime = 20;
		}
		if( (HOLD == Input.Right) && (0 == this.wTime) ){
			this.Block.x++;
			if( true == this.HitCheck() ){
				for( var y = 0 ; y < 5 ; y++ ){
					for( var x = 0 ; x < 5 ; x++ ){
						this.Block.Table[y][x] = this.subBlock.Table[y][x];
						this.Block.x = this.subBlock.x;
						this.Block.y = this.subBlock.y;
					}
				}
			}
			this.wTime = 1;
		}

		// 下
		if( PUSH == Input.Down ){
			this.Score++;
			this.Block.y++;
			if( true == this.HitCheck() ){
				for( var y = 0 ; y < 5 ; y++ ){
					for( var x = 0 ; x < 5 ; x++ ){
						this.Block.Table[y][x] = this.subBlock.Table[y][x];
						this.Block.x = this.subBlock.x;
						this.Block.y = this.subBlock.y;
					}
				}
				
			}
		}
		if( HOLD == Input.Down ){
			this.Score++;
			this.BlockCount += (121 - this.Lv) / 3;
		}
		
		// SPACE(Holdと交換)
		if( PUSH == Input.Space ){
			for( var y = 0 ; y < 5 ; y++ ){
				for( var x = 0 ; x < 5 ; x++ ){
					this.tmpHold[y][x] = this.Block.Table[y][x];
					this.Block.Table[y][x] = this.Hold[y][x];
					this.Hold[y][x] = this.tmpHold[y][x];
				}
			}
			// ぶつかっていたら元に戻す
			if( true == this.HitCheck() ){
				for( var y = 0 ; y < 5 ; y++ ){
					for( var x = 0 ; x < 5 ; x++ ){
						this.Block.Table[y][x] = this.subBlock.Table[y][x];
						this.Block.x = this.subBlock.x;
						this.Block.y = this.subBlock.y;
						this.Hold[y][x] = this.subHold[y][x];
					}
				}
			}
		}
		
		// Z(左回転)
		if( PUSH == Input.Z ){
			var tmp = [
				[0,0,0,0,0],
				[0,0,0,0,0],
				[0,0,0,0,0],
				[0,0,0,0,0],
				[0,0,0,0,0]
			];
			for( var y = 0 ; y < 5 ; y++ ){
				for( var x = 0 ; x < 5 ; x++ ){
					tmp[4-x][y] = this.Block.Table[y][x];
				}
			}
			for( var y = 0 ; y < 5 ; y++ ){
				for( var x = 0 ; x < 5 ; x++ ){
					this.Block.Table[y][x] = tmp[y][x];
				}
			}
			// 回転した先にブロックがあったら元に戻す
			if( true == this.HitCheck() ){
				for( var y = 0 ; y < 5 ; y++ ){
					for( var x = 0 ; x < 5 ; x++ ){
						this.Block.Table[y][x] = this.subBlock.Table[y][x];
						this.Block.x = this.subBlock.x;
						this.Block.y = this.subBlock.y;
					}
				}
			}
		}
		
		// X(右回転)
		if( PUSH == Input.X ){
			var tmp = [
				[0,0,0,0,0],
				[0,0,0,0,0],
				[0,0,0,0,0],
				[0,0,0,0,0],
				[0,0,0,0,0]
			];
			for( var y = 0 ; y < 5 ; y++ ){
				for( var x = 0 ; x < 5 ; x++ ){
					tmp[x][4-y] = this.Block.Table[y][x];
				}
			}
			for( var y = 0 ; y < 5 ; y++ ){
				for( var x = 0 ; x < 5 ; x++ ){
					this.Block.Table[y][x] = tmp[y][x];
				}
			}
			// 回転した先にブロックがあったら元に戻す
			if( true == this.HitCheck() ){
				for( var y = 0 ; y < 5 ; y++ ){
					for( var x = 0 ; x < 5 ; x++ ){
						this.Block.Table[y][x] = this.subBlock.Table[y][x];
						this.Block.x = this.subBlock.x;
						this.Block.y = this.subBlock.y;
					}
				}
			}
		}
		
		// 時間経過のブロック下降処理
		this.BlockCount++;
		if( this.BlockCount > (121 - this.Lv) ){
			this.BlockCount = 0;
			this.Block.y++;
			if( true == this.HitCheck() ){
				for( var y = 0 ; y < 5 ; y++ ){
					for( var x = 0 ; x < 5 ; x++ ){
						this.Block.Table[y][x] = this.subBlock.Table[y][x];
						this.Block.x = this.subBlock.x;
						this.Block.y = this.subBlock.y;
					}
				}
				// 操作ブロックをゲームテーブルに埋め込む
				this.CopyBlock();
				// ゲームオーバー
				if( true == this.OnBlock() ){
					this.endFlag = true;
					this.FrameMove = GameOver;
					return this;
				}
			}
		}
		
		// 1列揃っていた時のブロック消去
		var delRows = 0;	// 消した行数
		for( y = (Y_MAX-2) ; y > 2 ; y-- ){
			var delFlag = true;	// 消去用のフラグ
			for( var x = 1 ; x < (X_MAX-1) ; x++ ){
				// 揃ってないところがあればループを抜ける
				if( 4 != this.GameTable[y][x] ){
					delFlag = false;
					break;
				}
			}
			if( true == delFlag ){
				delRows++;
				// 揃っている行を消去
				for( var x = 1 ; x < X_MAX-1 ; x++ ){
					this.GameTable[y][x] = 0;
				}
				// 消した行より上にあるブロックを下げる
				for( var i = y ; i > 2 ; i-- ){
					if( 2 == (i-1) ){
						for( var x = 1 ; x < (X_MAX-1) ; x++ ){
							this.GameTable[i][x] = 0;
						}
					}else{
						for( var x = 1 ; x < (X_MAX-1) ; x++ ){
							this.GameTable[i][x] = this.GameTable[(i-1)][x];
						}
					}
				}
			}
		}
		// 消去した行数に応じてスコア加算
		if( 0 < delRows ){
			this.Score += 10 + this.Lv * this.Lv * delRows;
		}
		
		// 表示用スコアをカウント
		if( this.Score > this.ScoreDisp ){
			var add = 0;
			var dif = this.Score - this.ScoreDisp;
			if( 60 > dif ){
				add = 1;
			}else if( 600 > dif ){
				add = 10;
			}else if( 6000 > dif ){
				add = 100;
			}else if( 60000 > dif ){
				add = 1000;
			}else if( 600000 > dif ){
				add = 10000;
			}else if( 6000000 > dif ){
				add = 100000;
			}else if( 60000000 > dif ){
				add = 1000000;
			}
			this.ScoreDisp += add;
			if( this.Score <= this.ScoreDisp ){
				this.ScoreDisp = this.Score;
			}
		}
		
		// 時間によってLvが上がる
		this.Time++;
		if( this.Time >= (120+(this.Lv*2)) ){
			this.Time = 0;
			this.Lv++;
		}
		
		// ウェイト
		this.wTime--;
		if( 0 > this.wTime ){
			this.wTime = 0;
		}
		
		return this;
	}
	
	//-----------------------------------------------------
	// ゲームクラス描画メソッド
	this.FrameRender = function( context ){
	
		// ゲームテーブル描画
		for( var y = 0 ; y < Y_MAX ; y++ ){
			for( var x = 0 ; x < X_MAX ; x++ ){
				if( 0 != this.GameTable[y][x] ){
					context.save();
					context.beginPath();
					context.translate( 0, 0 );
					
					switch( this.GameTable[y][x] ){
					case 1:
						context.fillStyle = "rgba( 255, 0, 0, 0.2 )";
						// x, y, SizeX, SizeY
						context.fillRect( (BLOCKSIZE*2)+(x*BLOCKSIZE), (BLOCKSIZE*2)+(y*BLOCKSIZE), BLOCKSIZE, BLOCKSIZE );
						break;
						
					case 2:
						context.fillStyle = "rgba( 100, 100, 100, 1.0 )";
						context.fillRect( (BLOCKSIZE*2)+(x*BLOCKSIZE), (BLOCKSIZE*2)+(y*BLOCKSIZE), BLOCKSIZE, BLOCKSIZE );
						context.fillStyle = "rgba( 128, 128, 128, 1.0 )";
						context.fillRect( ((BLOCKSIZE*2)+(x*BLOCKSIZE)+2), ((BLOCKSIZE*2)+(y*BLOCKSIZE)+2), (BLOCKSIZE-4), (BLOCKSIZE-4) );
						break;
						
					case 4:
						context.fillStyle = "rgba( 0, 200, 200, 1.0 )";
						context.fillRect( (BLOCKSIZE*2)+(x*BLOCKSIZE), (BLOCKSIZE*2)+(y*BLOCKSIZE), BLOCKSIZE, BLOCKSIZE );
						context.fillStyle = "rgba( 100, 255, 255, 1.0 )";
						context.fillRect( ((BLOCKSIZE*2)+(x*BLOCKSIZE)+2), ((BLOCKSIZE*2)+(y*BLOCKSIZE)+2), (BLOCKSIZE-4), (BLOCKSIZE-4) );
						break;
						
					default:
						console.log( "unk" );
					};
					
					context.restore();
				}
			}
		}

		// 操作ブロック描画
		for( var y = 0 ; y < 5 ; y++ ){
			for( var x = 0 ; x < 5 ; x++ ){
				if( this.Block.Table[y][x] == 1 ){
					// ここにブロック描画処理
					//DrawGraph( 15+(Block.x+x)*BLOCKSIZE, 40+(Block.y+y)*BLOCKSIZE, block, true );
					for( var y = 0 ; y < 5 ; y++ ){
						for( var x = 0 ; x < 5 ; x++ ){
							if( this.Block.Table[y][x] == 1 ){
								context.save();
								context.beginPath();
								context.translate( 0, 0 );
								context.fillStyle = "rgba( 230, 230, 230, 1.0 )";
								// x, y, SizeX, SizeY
								context.fillRect( (BLOCKSIZE*2)+((this.Block.x+x)*BLOCKSIZE), (BLOCKSIZE*2)+((this.Block.y+y)*BLOCKSIZE), BLOCKSIZE, BLOCKSIZE );
								context.fillStyle = "rgba( 255, 255, 255, 1.0 )";
								context.fillRect( ((BLOCKSIZE*2)+((this.Block.x+x)*BLOCKSIZE)+2), ((BLOCKSIZE*2)+((this.Block.y+y)*BLOCKSIZE)+2), (BLOCKSIZE-4), (BLOCKSIZE-4) );
								context.restore();
							}
						}
					}
				}
			}
		}

		// NextBlock描画
		context.fillStyle = "white";
		context.font = "bold 18px 'ＭＳ Ｐゴシック'";
		context.fillText( "NEXT", 290, 45 );
		context.save();
		context.beginPath();
		context.translate( 0, 0 );
		context.fillStyle = "rgba( 0, 255, 0, 1.0 )";
		// x, y, SizeX, SizeY
		context.fillRect( 288, 48, (BLOCKSIZE*7), (BLOCKSIZE*7) );
		context.fillStyle = "rgba( 0, 0, 0, 1.0 )";
		context.fillRect( (288+8), (48+8), (BLOCKSIZE*6), (BLOCKSIZE*6) );
		context.restore();
		for( var y = 0 ; y < 5 ; y++ ){
			for( var x = 0 ; x < 5 ; x++ ){
				if( this.NextBlock[y][x] == 1 ){
					context.save();
					context.beginPath();
					context.translate( 0, 0 );
					context.fillStyle = "rgba( 230, 230, 230, 1.0 )";
					// x, y, SizeX, SizeY
					context.fillRect( 304+(x*BLOCKSIZE), 64+(y*BLOCKSIZE), BLOCKSIZE, BLOCKSIZE );
					context.fillStyle = "rgba( 255, 255, 255, 1.0 )";
					context.fillRect( (304+(x*BLOCKSIZE)+2), (64+(y*BLOCKSIZE)+2), (BLOCKSIZE-4), (BLOCKSIZE-4) );
					context.restore();
				}
			}
		}

		// Hold描画
		context.fillStyle = "white";
		context.font = "bold 18px 'ＭＳ Ｐゴシック'";
		context.fillText( "HOLD", 290, 221 );
		context.save();
		context.beginPath();
		context.translate( 0, 0 );
		context.fillStyle = "rgba( 0, 255, 0, 1.0 )";
		// x, y, SizeX, SizeY
		context.fillRect( 288, 224, (BLOCKSIZE*7), (BLOCKSIZE*7) );
		context.fillStyle = "rgba( 0, 0, 0, 1.0 )";
		context.fillRect( (288+8), (224+8), (BLOCKSIZE*6), (BLOCKSIZE*6) );
		context.restore();
		for( var y = 0 ; y < 5 ; y++ ){
			for( var x = 0 ; x < 5 ; x++ ){
				if( this.Hold[y][x] == 1 ){
					context.save();
					context.beginPath();
					context.translate( 0, 0 );
					context.fillStyle = "rgba( 230, 230, 230, 1.0 )";
					// x, y, SizeX, SizeY
					context.fillRect( 304+(x*BLOCKSIZE), 240+(y*BLOCKSIZE), BLOCKSIZE, BLOCKSIZE );
					context.fillStyle = "rgba( 255, 255, 255, 1.0 )";
					context.fillRect( (304+(x*BLOCKSIZE)+2), (240+(y*BLOCKSIZE)+2), (BLOCKSIZE-4), (BLOCKSIZE-4) );
					context.restore();
				}
			}
		}
		
		if( true == this.endFlag ){
			context.save();
			context.beginPath();
			context.translate( 0, 0 );
			if( 0.8 > this.endCount ){
				context.fillStyle = "rgba( 0, 0, 0," + this.endCount + ")";
			}else{
				context.fillStyle = "rgba( 0, 0, 0, 0.8 )";
			}
			// x, y, SizeX, SizeY
			context.fillRect( 0, 0, CANVAS_X, CANVAS_Y );
			context.restore();
			
			context.textAlign = "center";
			context.fillStyle = "rgba( 255, 0, 0," + this.endCount + ")";;
			context.font = "40px 'ＭＳ Ｐゴシック'";
			context.fillText( "G a m e O v e r", 450, 400 );
			context.font = "20px 'ＭＳ Ｐゴシック'";
			context.fillText( "Push Enter to Title", 450, 430 );
		}
		
		// スコア表示
		context.textAlign = "left";
		context.fillStyle = "white";
		context.font = "bold 30px 'ＭＳ Ｐゴシック'";
		context.fillText( "Score", 450, 80 );
		
		context.textAlign = "right";
		context.font = "20px 'ＭＳ Ｐゴシック'";
		context.fillText( this.ScoreDisp, 550, 100 );
		
		// Lv表示
		context.fillStyle = "white";
		context.textAlign = "left";
		context.font = "bold 30px 'ＭＳ Ｐゴシック'";
		context.fillText( ("Lv." + this.Lv), 450, 150 );
		
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

	}, 16.666666 );	// 1000 / 60 = 16.66666 = 60fps
}
