// ゲームクラス
class CGame{
	constructor( canvas, context ){
		this.canvas = canvas;
		this.ctx = context;
		this.gamemode = new init();
	}
	
	Run(){
		this.ctx.clearRect( 0, 0, this.canvas.width, this.canvas.height );
		
		this.gamemode.FrameRender( this.ctx );
		this.gamemode = this.gamemode.FrameMove();
	}
}

// 内積
function Vec2Dot( v0, v1 ){
	return ((v0.x * v1.x) + (v0.y * v1.y));
}

// 外積
function Vec2Cross( v0, v1 ){
	return ((v0.x * v1.y) - (v0.y * v1.x));
}

// 長さ
function Vec2Length( v ){
	return Math.sqrt( ((v.x * v.x) + (v.y * v.y)) );
}

// ベクトル正規化
function Vec2Normalize( v ){
	let L = Vec2Length( v );
	v.x = (v.x / L);
	v.y = (v.y / L);
}

// 正規化したベクトルを返す
function Vec2Unit( v ){
	var L = Vec2Length( v );
	return new CVector2( (v.x / L), (v.y / L) );
}

// 反射ベクトルを求める
function Reflect( v, n ){
	let f = (Vec2Dot( v, n ) * 2.0);
	v.x -= (n.x * f);
	v.y -= (n.y * f);
	Vec2Normalize( v );
}

// ベクトル
class CVector2{
	constructor( x = 0, y = 0 ){
		this.x = x;
		this.y = y;
	}
}

// 色
class CColor{
	constructor( r = 0, g = 0, b = 0, a = 1 ){
		this.r = r;
		this.g = g;
		this.b = b;
		this.a = a;
	}
	
	GetColor(){
		return "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")";
	}
}

// ボールクラス
class CBall{
	constructor( x, y ){
		// 位置情報
		this.pos = new CVector2( x, y );
		// 角度
		this.rot = (CMath.RADIAN * 270);
		// 進行ベクトル
		this.vec = new CVector2( 0, -1 );
		// 速度
		this.speed = 2.5;
		// 半径
		this.r = 5;
		// 色情報
		this.color = new CColor( 255, 255, 255 );
	}
	
	// 更新メソッド
	Update(){
		// ボールの移動
		this.pos.x += this.vec.x * this.speed;
		this.pos.y += this.vec.y * this.speed;
		
		// 画面端でボールが反射する処理
		if( (this.pos.x-this.r) < 0 ){	// 左端
			this.pos.x = this.r;
			let n = new CVector2( 1, 0 );
			Reflect( this.vec, n );
			this.rot = Math.atan2( this.vec.y, this.vec.x );
		}
		if( 500 < (this.pos.x+this.r) ){	// 右端
			this.pos.x = (500-this.r);
			let n = new CVector2( -1, 0 );
			Reflect( this.vec, n );
			this.rot = Math.atan2( this.vec.y, this.vec.x );
		}
		if( (this.pos.y-this.r) < 0 ){	// 上端
			this.pos.y = this.r;
			let n = new CVector2( 0, -1 );
			Reflect( this.vec, n );
			this.rot = Math.atan2( this.vec.y, this.vec.x );
		}
		// ここはゲームオーバーに関わってくるので後で消す
/*
		if( 480 < (this.pos.y+this.r) ){	// 下端
			this.pos.y = (480-this.r);
			let n = new CVector2( 0, 1 );
			Reflect( this.vec, n );
			this.rot = Math.atan2( this.vec.y, this.vec.x );
		}
*/
	}
	
	// 描画メソッド
	Draw( ctx ){
		ctx.save();
		ctx.fillStyle = this.color.GetColor();
		ctx.beginPath();
		ctx.setTransform( 1, 0, 0, 1, 0, 0 );
		ctx.translate( this.pos.x, this.pos.y );
		// x, y, 半径, 角度1, 角度2
		ctx.arc( 0, 0, this.r, 0, Math.PI*2 );
		ctx.fill();
		ctx.restore();
	}
}

// バー
class CBar{
	constructor( x, y ){
		// 位置情報
		this.pos = new CVector2( x, y );
		// 角度
		this.rot = 0;
		// 移動力
		this.vec = 4;
		// 半径
		this.length = new CVector2( 30, 5 );
		// 色情報
		this.color = new CColor( 255, 255, 255 );
		// 四辺までの距離
		this.dist = Vec2Length( this.length );
		// 各点の角度
		this.p = [
			// 左上
			Math.atan2(-this.length.y, -this.length.x),
			// 右上
			Math.atan2(-this.length.y, +this.length.x),
			// 右下
			Math.atan2(+this.length.y, +this.length.x),
			// 左下
			Math.atan2(+this.length.y, -this.length.x),
			// 左上 ループ用
			Math.atan2(-this.length.y, -this.length.x),
		];
	}
	
	Update(){
		
		if( Input.Shift == FREE ){
			// メインバーの移動
			if( Input.Left & HOLD ){
				this.pos.x -= this.vec;
			}
			if( Input.Right & HOLD ){
				this.pos.x += this.vec;
			}
			if( Input.Up & HOLD ){
				this.pos.y -= this.vec;
			}
			if( Input.Down & HOLD ){
				this.pos.y += this.vec;
			}
			
			// メインバーの回転
			if( Input.X & HOLD ){
				this.rot += 0.025;
				if( CMath.PI_MUL2 <= this.rot ){
					this.rot = this.rot - CMath.PI_MUL2;
				}
			}
			if( Input.Z & HOLD ){
				this.rot -= 0.025;
				if( CMath.PI_MUL2 <= this.rot ){
					this.rot = CMath.PI_MUL2 + this.rot;
				}
			}
		}else if( Input.Shift & HOLD ){
			// メインバーの移動
			if( Input.Left & HOLD ){
				this.pos.x -= (this.vec * 0.5);
			}
			if( Input.Right & HOLD ){
				this.pos.x += (this.vec * 0.5);
			}
			if( Input.Up & HOLD ){
				this.pos.y -= (this.vec * 0.5);
			}
			if( Input.Down & HOLD ){
				this.pos.y += (this.vec * 0.5);
			}
			
			// メインバーの回転
			if( Input.X & HOLD ){
				this.rot += 0.0125;
				if( CMath.PI_MUL2 <= this.rot ){
					this.rot = this.rot - CMath.PI_MUL2;
				}
			}
			if( Input.Z & HOLD ){
				this.rot -= 0.0125;
				if( CMath.PI_MUL2 <= this.rot ){
					this.rot = CMath.PI_MUL2 + this.rot;
				}
			}
		}
		
		if( 0 > this.pos.x-this.length.x ){
			this.pos.x = this.length.x;
		}
		if( 500 < this.pos.x+this.length.x ){
			this.pos.x = (500 - this.length.x);
		}
		if( 0 > this.pos.y-this.length.x ){
			this.pos.y = this.length.x;
		}
		if( 480 < this.pos.y+this.length.x ){
			this.pos.y = (480 - this.length.x);
		}
	}
	
	// ボールとの当たり判定
	Collision( b ){
		// 4辺の線分を作成
		for( let i = 0 ; i < 4 ; i++ ){
			// 線分の始点と終点の座標を取得
			let v0 = new CVector2(Math.cos(this.rot+this.p[i])*this.dist,
									Math.sin(this.rot+this.p[i])*this.dist);
			v0.x += this.pos.x;
			v0.y += this.pos.y;
			let v1 = new CVector2(Math.cos(this.rot+this.p[i+1])*this.dist,
									Math.sin(this.rot+this.p[i+1])*this.dist);
			v1.x += this.pos.x;
			v1.y += this.pos.y;
			// ベクトルを生成
			let vAB = new CVector2( (v1.x-v0.x), (v1.y-v0.y) );
			let vAP = new CVector2( (b.pos.x-v0.x), (b.pos.y-v0.y) );
			let vBP = new CVector2( (b.pos.x-v1.x), (b.pos.y-v1.y) );
			// ABの単位ベクトルを計算
			let nAB = Vec2Unit( vAB );
			// AからXまでの距離を単位ベクトルABとベクトルAPの内積で求める
			let lenAX = Vec2Dot( nAB, vAP );
			
			let shortestDistance = 0.0;	// 線分APとPの最短距離
			if( 0 > lenAX ){
				// AXが負ならAPが円の中心までの最短距離
				shortestDistance = Vec2Length( vAP );
			}else if( Vec2Length( vAB ) < lenAX ){
				// AXがAPよりも長い場合は、BPが円の中心
				// までの最短距離
				shortestDistance = Vec2Length( vBP );
			}else{
				// PがAB上にあるので、PXが最短距離単位ベクトルABとベクトルAPの外積で求める
				shortestDistance = Math.abs( Vec2Cross( nAB, vAP ) );
			}
			
			// Xの座標を求める(AXの長さより計算）
//			let vX = new CVector2(v0.x + (nAB.x * lenAX), v0.y + (nAB.y * lenAX));
			
			// 最短距離が円の半径よりも小さい場合は、当たり
			if( shortestDistance <= b.r ){
				// 線分の法線を求める
				let n = new CVector2();
				let r = Math.atan2( nAB.y, nAB.x );
				r -= CMath.PI_DIV2;
				n.x = Math.cos( r );
				n.y = Math.sin( r );
				// 法線に向かって押し戻す
				let len = ((b.r - shortestDistance) + 1.0);
				b.pos.x += n.x * len;
				b.pos.y += n.y * len;
				
				Reflect( b.vec, n );
				b.rot = Math.atan2( b.vec.y, b.vec.x );
				
				return true;
			}
		}
		// 当たってない
		return false;
	}
	
	// 描画メソッド
	Draw( ctx ){
		ctx.save();
		ctx.setTransform( 1, 0, 0, 1, 0, 0 );
		ctx.translate( this.pos.x, this.pos.y );
		ctx.rotate( this.rot );
		ctx.fillStyle = this.color.GetColor();
		ctx.fillRect( -this.length.x, -this.length.y, this.length.x*2, this.length.y*2 );
		ctx.restore();
	}
}

// ブロック
class CBlock{
	constructor( type, x, y ){
		// タイプ
		this.type = type;
		// 位置情報
		this.pos = new CVector2( x, y );
		// 半径
		this.length = new CVector2( 25, 10 );
		// フラグ
		this.flag = true;
		// 色情報
		this.color = new CColor( 255, 255, 255 );
	}
	
	// ボールとの当たり判定
	Collision( b ){
		let nx = Math.max((this.pos.x-this.length.x), Math.min(b.pos.x, (this.pos.x+this.length.x)));
		let ny = Math.max((this.pos.y-this.length.y), Math.min(b.pos.y, (this.pos.y+this.length.y)));
		let d = new CVector2( (nx - b.pos.x), (ny - b.pos.y) );
		let len = Vec2Length( d );
		if( b.r >= len ){
			len = ((b.r - len) + 1.0);
			// 上辺衝突
			if( ny == (this.pos.y - this.length.y) ){
				// めり込み戻し
				b.pos.y -= len;
				// 反射
				let n = new CVector2( 0, 1 );
				Reflect( b.vec, n );
				b.rot = Math.atan2( b.vec.y, b.vec.x );
				
			// 下辺衝突
			}else if( ny == (this.pos.y + this.length.y) ){
				// めり込み戻し
				b.pos.y += len;
				// 反射
				let n = new CVector2( 0, -1 );
				Reflect( b.vec, n );
				b.rot = Math.atan2( b.vec.y, b.vec.x );
				
			// 左辺衝突
			}else if( nx == (this.pos.x - this.length.x) ){
				// めり込み戻し
				b.pos.x -= len;
				// 反射
				let n = new CVector2( -1, 0 );
				Reflect( b.vec, n );
				b.rot = Math.atan2( b.vec.y, b.vec.x );
				
			// 右辺衝突
			}else if( nx == (this.pos.x + this.length.x) ){
				// めり込み戻し
				b.pos.x -= len;
				// 反射
				let n = new CVector2( 1, 0 );
				Reflect( b.vec, n );
				b.rot = Math.atan2( b.vec.y, b.vec.x );
				
			// 矩形の中
			}else{
			}
			
			// ブロック消滅
			this.flag = false;
			// ブロックの種類で処理を分岐
			switch( this.type ){
			case 0:	// 赤
				// ボール速度アップ
				b.speed += 0.5;
				if( b.speed > 4.0 ){ b.speed = 4.0; }
				break;
			case 1:	// 黄
				// ボーナス倍
				bonus *= 1.1;
				bonus = Math.floor( bonus );
				break;
			case 2:	// 緑
				// 緑以外復活
				revive = true;
				break;
			case 3:	// 水
				// ボーナス追加
				bonus += 2;
				break;
			case 4:	// 青
				// ボール速度ダウン
				b.speed -= 0.25;
				if( b.speed < 0.5 ){ b.speed = 0.5; }
				break;
			}
			// ボーナス加算
			bonus++;
			return true;
		}
		// 当たってない
		return false;
	}
	
	// 描画メソッド
	Draw( ctx ){
		ctx.save();
		ctx.setTransform( 1, 0, 0, 1, 0, 0 );
		ctx.translate( this.pos.x, this.pos.y );
		let color = new CColor( (this.color.r*0.5), (this.color.g*0.5), (this.color.b*0.5) );
		ctx.fillStyle = color.GetColor();
		ctx.fillRect( -this.length.x, -this.length.y, this.length.x*2, this.length.y*2 );
		
		ctx.fillStyle = this.color.GetColor();
		ctx.fillRect( -this.length.x+4, -this.length.y+4, this.length.x*2-8, this.length.y*2-8 );
		ctx.restore();
	}
}


// グローバル変数
let score = 0;
let dispscore = 0;
let bonus = 0;

// ブロック復活フラグ
let revive = false;

let Ball = null;
let Bar = null;
let Block = null;

// 初期化
let init = function(){
	this.FrameMove = function(){
		// ボール作成
		Ball = null;
		Ball = new CBall( 250, 400 );
		Ball.vec.x = Math.cos( Ball.rot );
		Ball.vec.y = Math.sin( Ball.rot );
		
		// バー作成
		Bar = null;
		Bar = new CBar( 250, 450 );
		
		// ブロック作成
		Block = null;
		Block = new Array();
		for( let y = 0 ; y < 10 ; y++ ){
			let array = new Array();
			for( let x = 0 ; x < 10 ; x++ ){
				type = (y % 5);
				let b = new CBlock( type, x*50+25, y*20+10 );
				switch( type ){
				case 0:
					b.color.r = 255;
					b.color.g = 0;
					b.color.b = 0;
					break;
				case 1:
					b.color.r = 255;
					b.color.g = 255;
					b.color.b = 0;
					break;
				case 2:
					b.color.r = 0;
					b.color.g = 255;
					b.color.b = 0;
					break;
				case 3:
					b.color.r = 0;
					b.color.g = 255;
					b.color.b = 255;
					break;
				case 4:
					b.color.r = 0;
					b.color.g = 0;
					b.color.b = 255;
					break;
				}
				array.push( b );
			}
			Block.push( array );
		}
		
		score = 0;
		dispscore = 0;
		bonus = 0;
		
		return new title();
	}
	
	this.FrameRender = function( ctx ){
	}
}

// タイトル
let title = function(){
	// 文字明暗用
	this.alpha = 1.0;
	this.count = 0;
	
	// ボール射出角度
	this.rot = (CMath.RADIAN * 270);
	
	this.FrameMove = function(){
		
		// ボールの射出角変更
		if( Input.Left & HOLD && this.rot >= (CMath.RADIAN * 190) ){
			this.rot -= 0.05;
		}
		
		if( Input.Right & HOLD && this.rot <= (CMath.RADIAN * 350) ){
			this.rot += 0.05;
		}
		
		// ボールの射出角更新
		Ball.rot = this.rot;
		Ball.vec.x = Math.cos( this.rot );
		Ball.vec.y = Math.sin( this.rot );
		Ball.pos.x = Bar.pos.x + Ball.vec.x * 50;
		Ball.pos.y = Bar.pos.y + Ball.vec.y * 50;
		
		
		// スペースでゲーム開始
		if( Input.Space == PUSH ){
			return new maingame();
		}
		
		// 文字明暗
		this.alpha = Math.cos( this.count );
		this.alpha = this.alpha * this.alpha;
		this.count += 0.015;
		
		return this;
	}
	
	
	this.FrameRender = function( ctx ){
		ctx.setTransform( 1, 0, 0, 1, 0, 0 );
		// スペース表示
		ctx.fillStyle = "rgba( 255, 255, 255," + this.alpha + ")";
		ctx.textAlign = "center";
		ctx.font = "25px 'Arial'";
		ctx.fillText( "Hit Space Key!!", 250, 300 );
		
		// 矢印
		ctx.fillStyle = "rgba( 255, 255, 255," + (1-this.alpha) + ")";
		ctx.font = "10px 'Arial'";
		ctx.fillText( "←      →", 250, 403 );
		
		// 右側情報
		ctx.lineWidth = 1;
		ctx.strokeStyle = "white";
		ctx.strokeRect( 500, 1, 139, 478 );
		
		ctx.textAlign = "center";
		ctx.font = "30px 'Arial'";
		ctx.strokeText( "Score", 570, 40 );
		
		ctx.fillStyle = "white";
		ctx.textAlign = "right";
		ctx.font = "20px 'Arial'";
		ctx.fillText( dispscore, 630, 65 );
		
		ctx.textAlign = "center";
		ctx.font = "25px 'Arial'";
		ctx.fillText( "Bonus", 570, 120 );
		
		ctx.textAlign = "right";
		ctx.font = "15px 'Arial'";
		ctx.fillText( "+" + bonus, 630, 140 );
		
		
		// ボール表示
		Ball.Draw( ctx );
		
		// ブロック表示
		for( let y = 0 ; y < Block.length ; y++ ){
			for( let x = 0 ; x < Block[y].length ; x++ ){
				if( !Block[y][x].flag ){ continue; }
				Block[y][x].Draw( ctx );
			}
		}
		
		// バー表示
		Bar.Draw( ctx );
	}
}

// ゲーム
let maingame = function(){
	
	// スコア加算演出
	this.alpha = 0.0;
	this.dispbonus = 0;
	
	this.FrameMove = function(){
		for( let i = 0 ; i < 2 ; i++ ){
			Ball.Update();
			Bar.Update();
			
			// バーとボールとの当たり判定
			if( Bar.Collision( Ball ) ){
				// 当たっっていたらボーナスをスコアに加算
				score += bonus;
				this.dispbonus = bonus;
				bonus = 0;
				this.alpha = 1.1;
			}
			
			// ブロックとボールとの当たり判定
			for( let y = 0 ; y < Block.length ; y++ ){
				for( let x = 0 ; x < Block[y].length ; x++ ){
					if( !Block[y][x].flag ){ continue; }
					if( Block[y][x].Collision( Ball ) ){
						break;
					}
				}
			}
			
		}
		
		// ゲームオーバー
		if( 490 < Ball.pos.y ){
			score += bonus;
			this.dispbonus = bonus;
			bonus = 0;
			return new gameover();
		}
		
		// ブロック復活フラグ
		if( revive ){
			for( let y = 0 ; y < Block.length ; y++ ){
				for( let x = 0 ; x < Block[y].length ; x++ ){
					if( Block[y][x].type == 2 ){ continue; }
					Block[y][x].flag = true;
				}
			}
			revive = false;
		}
		
		// ゲームクリア
		let flag = false;
		for( let y = 0 ; y < Block.length ; y++ ){
			for( let x = 0 ; x < Block[y].length ; x++ ){
				if( flag = Block[y][x].flag ){
					flag = true;
					break;
				}
			}
			if( flag ){ break; }
		}
		if( false == flag ){
			score += bonus;
			this.dispbonus = bonus;
			bonus = 0;
			return new gameclear();
		}
/*
		if( Input.A == PUSH ){
			return new gameclear();
		}
*/
		
		// 表示用スコア処理
		if( dispscore < score ){
			let temp = score - dispscore;
			if( Math.floor(temp / 100000) > 1 ){
				dispscore += 50000;
			}else if( Math.floor(temp / 10000) > 1 ){
				dispscore += 5000;
			}else if( Math.floor(temp / 1000) > 1 ){
				dispscore += 500;
			}else if( Math.floor(temp / 100) > 1 ){
				dispscore += 50;
			}else if( Math.floor(temp / 10) > 1 ){
				dispscore += 5;
			}else{
				dispscore++;
			}
		}
		
		return this;
	}
	
	
	this.FrameRender = function( ctx ){
		ctx.setTransform( 1, 0, 0, 1, 0, 0 );
		ctx.lineWidth = 1;
		ctx.strokeStyle = "white";
		ctx.strokeRect( 500, 1, 139, 478 );
		
		ctx.textAlign = "center";
		ctx.font = "30px 'Arial'";
		ctx.strokeText( "Score", 570, 40 );
		
		ctx.fillStyle = "white";
		ctx.textAlign = "right";
		ctx.font = "20px 'Arial'";
		ctx.fillText( dispscore, 630, 65 );
		
		ctx.textAlign = "center";
		ctx.font = "25px 'Arial'";
		ctx.fillText( "Bonus", 570, 120 );
		
		ctx.textAlign = "right";
		ctx.font = "15px 'Arial'";
		ctx.fillText( "+" + bonus, 630, 140 );
		
		// スコア加算演出
		if( this.alpha > 0.0 ){
			ctx.fillStyle = "rgba( 255, 255, 255," + this.alpha + ")";
			ctx.fillText( "+" + this.dispbonus, 630, (130 - (1.0-this.alpha)*50) );
			this.alpha -= 0.03;
		}
		
		// ボール表示
		Ball.Draw( ctx );
		
		// ブロック表示
		for( let y = 0 ; y < Block.length ; y++ ){
			for( let x = 0 ; x < Block[y].length ; x++ ){
				if( !Block[y][x].flag ){ continue; }
				Block[y][x].Draw( ctx );
			}
		}
		
		// バー表示
		Bar.Draw( ctx );
	}
}

// ゲームオーバー
let gameover = function(){
	
	// 文字明暗用
	this.alpha = 1.0;
	this.count = 0;
	
	this.alpha2 = 0.0;
	
	this.FrameMove = function(){
		
		this.alpha2 += 0.01;
		if( this.alpha2 > 1.0 ){
			this.alpha2 = 1.0;
		}
		
		// 文字明暗
		if( this.alpha2 >= 1.0 ){
			this.alpha = Math.cos( this.count );
			this.alpha = this.alpha * this.alpha;
			this.count += 0.015;
			
			if( Input.Space == PUSH ){
				return new init();
			}
		}
		
		// 表示用スコア処理
		if( dispscore < score ){
			let temp = score - dispscore;
			if( Math.floor(temp / 100000) > 1 ){
				dispscore += 50000;
			}else if( Math.floor(temp / 10000) > 1 ){
				dispscore += 5000;
			}else if( Math.floor(temp / 1000) > 1 ){
				dispscore += 500;
			}else if( Math.floor(temp / 100) > 1 ){
				dispscore += 50;
			}else if( Math.floor(temp / 10) > 1 ){
				dispscore += 5;
			}else{
				dispscore++;
			}
		}
		return this;
	}
	
	
	this.FrameRender = function( ctx ){
		
		ctx.setTransform( 1, 0, 0, 1, 0, 0 );
		ctx.lineWidth = 1;
		ctx.strokeStyle = "white";
		ctx.strokeRect( 500, 1, 139, 478 );
		
		ctx.textAlign = "center";
		ctx.font = "30px 'Arial'";
		ctx.strokeText( "Score", 570, 40 );
		
		ctx.fillStyle = "white";
		ctx.textAlign = "right";
		ctx.font = "20px 'Arial'";
		ctx.fillText( dispscore, 630, 65 );
		
		ctx.textAlign = "center";
		ctx.font = "25px 'Arial'";
		ctx.fillText( "Bonus", 570, 120 );
		
		ctx.textAlign = "right";
		ctx.font = "15px 'Arial'";
		ctx.fillText( "+" + bonus, 630, 140 );
		
		// ブロック表示
		for( let y = 0 ; y < Block.length ; y++ ){
			for( let x = 0 ; x < Block[y].length ; x++ ){
				if( !Block[y][x].flag ){ continue; }
				Block[y][x].Draw( ctx );
			}
		}
		
		// バー表示
		Bar.Draw( ctx );
		
		
		// 戻る表示
		ctx.setTransform( 1, 0, 0, 1, 0, 0 );
		if( this.alpha2 >= 1.0 ){
			ctx.fillStyle = "rgba( 255, 255, 255," + this.alpha + ")";
			ctx.textAlign = "center";
			ctx.font = "25px 'Arial'";
			ctx.fillText( "Hit Space Key!!", 250, 300 );
		}
		
		// GameOver表示
		ctx.strokeStyle = "rgba( 255, 0, 0," + this.alpha2 + ")";
		ctx.textAlign = "center";
		ctx.font = "80px 'Arial'";
		ctx.lineWidth = 4;
		ctx.strokeText( "Game Over", 250, 200 );
	}
}

// ゲームクリア
let gameclear = function(){
	
	// 文字明暗用
	this.alpha = 1.0;
	this.count = 0;
	
	this.alpha2 = 0.0;
	
	this.FrameMove = function(){
		
		this.alpha2 += 0.01;
		if( this.alpha2 > 1.0 ){
			this.alpha2 = 1.0;
		}
		
		// 文字明暗
		if( this.alpha2 >= 1.0 ){
			this.alpha = Math.cos( this.count );
			this.alpha = this.alpha * this.alpha;
			this.count += 0.015;
			
			if( Input.Space == PUSH ){
				return new init();
			}
		}
		
		// 表示用スコア処理
		if( dispscore < score ){
			let temp = score - dispscore;
			if( Math.floor(temp / 100000) > 1 ){
				dispscore += 50000;
			}else if( Math.floor(temp / 10000) > 1 ){
				dispscore += 5000;
			}else if( Math.floor(temp / 1000) > 1 ){
				dispscore += 500;
			}else if( Math.floor(temp / 100) > 1 ){
				dispscore += 50;
			}else if( Math.floor(temp / 10) > 1 ){
				dispscore += 5;
			}else{
				dispscore++;
			}
		}
		return this;
	}
	
	
	this.FrameRender = function( ctx ){
		ctx.setTransform( 1, 0, 0, 1, 0, 0 );
		ctx.lineWidth = 1;
		ctx.strokeStyle = "white";
		ctx.strokeRect( 500, 1, 139, 478 );
		
		ctx.textAlign = "center";
		ctx.font = "30px 'Arial'";
		ctx.strokeText( "Score", 570, 40 );
		
		ctx.fillStyle = "white";
		ctx.textAlign = "right";
		ctx.font = "20px 'Arial'";
		ctx.fillText( dispscore, 630, 65 );
		
		ctx.textAlign = "center";
		ctx.font = "25px 'Arial'";
		ctx.fillText( "Bonus", 570, 120 );
		
		ctx.textAlign = "right";
		ctx.font = "15px 'Arial'";
		ctx.fillText( "+" + bonus, 630, 140 );
		
		// ブロック表示
		for( let y = 0 ; y < Block.length ; y++ ){
			for( let x = 0 ; x < Block[y].length ; x++ ){
				if( !Block[y][x].flag ){ continue; }
				Block[y][x].Draw( ctx );
			}
		}
		
		// バー表示
		Bar.Draw( ctx );
		
		// 戻る表示
		ctx.setTransform( 1, 0, 0, 1, 0, 0 );
		if( this.alpha2 >= 1.0 ){
			ctx.fillStyle = "rgba( 255, 255, 255," + this.alpha + ")";
			ctx.textAlign = "center";
			ctx.font = "25px 'Arial'";
			ctx.fillText( "Hit Space Key!!", 250, 300 );
		}
		
		// GameOver表示
		ctx.strokeStyle = "rgba( 100, 255, 255," + this.alpha2 + ")";
		ctx.textAlign = "center";
		ctx.font = "80px 'Arial'";
		ctx.lineWidth = 4;
		ctx.strokeText( "Game Clear", 250, 180 );
	}
}
