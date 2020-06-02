// 自機
var Player = function(){

	// 座標
	this.x = 250;
	this.y = 420;
	// 移動量
	this.movepower = 4.5;
	// HP
	this.hp = 10;
	// 攻撃力
	this.power = 1;
	// キー同時押しフラグ
	this.wkey = false;
	// 当たり判定の半径
	this.r = 2;
	// 自機弾
	this.bullet = [];
	// 自機弾の発射管理
	this.shottime = 0;
	// サブウェポン
	this.sub = [];
	for( var i = 0 ; i < 4 ; i++ ){
		this.sub.push( new SubWepon(this.image) );
	}

	// 自機更新関数
	this.Update = function(){
		// キー同時押し判定
		let count = 0;
		if( PUSH & Input.Left ){ count++; }
		if( PUSH & Input.Right ){ count++; }
		if( PUSH & Input.Up ){ count++; }
		if( PUSH & Input.Down ){ count++; }
		if( 1 < count ){
			this.wkey = true;
			this.movepower = 3.5;
		}else{
			this.wkey = false;
			this.movepower = 4.5;
		}

		// 低速移動処理
		if( PUSH & Input.Shift ){
			if( this.wkey ) this.movepower = 1.5;
			else			this.movepower = 2;
		}

		// キー入力で移動処理
		this.animy = 0;
		if( PUSH & Input.Left ){
			if( this.x > 10 ) this.x -= this.movepower;	// 左移動
			this.animy = 1;
		}
		if( PUSH & Input.Right ){
			if( this.x < 490 ) this.x += this.movepower;	// 右移動
			this.animy = 2;
		}
		if( PUSH & Input.Up ){
			if( this.y > 30 ) this.y -= this.movepower;	// 上移動
		}
		if( PUSH & Input.Down ){
			if( this.y < 460 )  this.y += this.movepower;	// 下移動
		}

		// 弾発射
		if( !(this.shottime < 0) ) this.shottime--;
		if( PUSH & Input.Z && this.shottime < 0 ){
			this.shottime = 6;
			this.bullet.push( new PlayerBullet(this.x, this.y-10) );
		}

		/*
		if( KM.KEY[_A] == PUSH ){
			this.power++;
			if( this.power >= 4 ) this.power = 4;
		}
		if( KM.KEY[_S] == PUSH ){
			this.power--;
			if( this.power <= 1 ) this.power = 1;
		}
		*/
	}

	// 自機描画関数
	this.Draw = function( context ){
		context.save();
		context.beginPath();
		context.fillStyle = "rgba( 0, 153, 255, 1.0 )";
		context.translate( this.x, this.y );
		context.scale( 0.75, 1.0 );
		context.arc( 0, 0, 17, 0, Math.PI*2, false );
		context.fill();
		context.restore();
		
		context.save();
		context.beginPath();
		context.textAlign = "center";
		context.strokeStyle = "white";
		context.fillStyle = "white";
		context.translate( this.x, this.y );
		context.font = "15px 'ＭＳＰゴシック'";
		context.fillText( "自", 0, 5 );
		context.restore();
	}
}

//--------------------------------------------------------------------------------------------------------------

//自機弾
var PlayerBullet = function( x, y ){

	// 弾の初期位置設定
	this.x = x;
	this.y = y;

	// 弾の半径
	this.r = 4;

	// 弾更新関数
	this.Update = function(){
		this.y -= 6;	// 自機弾はY移動のみ
		if ( this.y < -50 ) return false;	// 画面外に消えたら消す為にfalseを返す
		return true;
	}

	// 弾描画関数
	this.Draw = function( context ){
		context.save();
		context.beginPath();
		context.fillStyle = "rgba( 0, 255, 255, 1.0 )";
		context.translate( this.x, this.y );
		context.scale( 0.5, 1.0 );
		context.arc( 0, 0, 5, 0, Math.PI*2, false );
		context.fill();
		context.restore();
	}
}

//--------------------------------------------------------------------------------------------------------------

// サブウェポン
var SubWepon = function(){
	this.x = 0;
	this.y = 0;
	this.time = 0;
	this.rot = 0;
	this.bullet = [];

	this.Update = function( x, y, power, i ){
		switch( power ){
		case 1:
			this.x = x;
			this.y = y + 30;
			break;

		case 2:
			switch( i ){
			case 0:
				this.x = x - 15;
				this.y = y + 30;
				break;
			case 1:
				this.x = x + 15;
				this.y = y + 30;
				break;
			}
			break;

		case 3:
			switch( i ){
			case 0:
				this.x = x;
				this.y = y + 30;
				break;
			case 1:
				this.x = x - 40;
				this.y = y + 10;
				break;
			case 2:
				this.x = x + 40;
				this.y = y + 10;
				break;
			}
			break;

		case 4:
			switch( i ){
			case 0:
				this.x = x - 15;
				this.y = y + 30;
				break;
			case 1:
				this.x = x + 15;
				this.y = y + 30;
				break;
			case 2:
				this.x = x - 40;
				this.y = y + 10;
				break;
			case 3:
				this.x = x + 40;
				this.y = y + 10;
				break;
			}
			break;
		}
		this.rot += 5;

		// 弾発射
		if( !(this.time < 0) ) this.time--;
		if( PUSH & Input.Z && this.time < 0 ){
			this.time = 15;
			switch( power ){
			case 1:
				this.bullet.push( new SubBullet( this.x, this.y-10, 270 ) );			break;

			case 2:
				switch( i ){
				case 0: this.bullet.push( new SubBullet( this.x, this.y-10, 260 ) );	break;
				case 1: this.bullet.push( new SubBullet( this.x, this.y-10, 280 ) );	break;
				}
				break;

			case 3:
				switch( i ){
				case 0: this.bullet.push( new SubBullet( this.x, this.y-10, 270 ) );	break;
				case 1: this.bullet.push( new SubBullet( this.x, this.y-10, 260 ) );	break;
				case 2: this.bullet.push( new SubBullet( this.x, this.y-10, 280 ) );	break;
				}
				break;

			case 4:
				switch( i ){
				case 0: this.bullet.push( new SubBullet( this.x, this.y-10, 260 ) );	break;
				case 1: this.bullet.push( new SubBullet( this.x, this.y-10, 280 ) );	break;
				case 2: this.bullet.push( new SubBullet( this.x, this.y-10, 260 ) );	break;
				case 3: this.bullet.push( new SubBullet( this.x, this.y-10, 280 ) );	break;
				}
				break;
			}
		}
	}

	this.Draw = function( context ){
		context.save();
		context.beginPath();
		context.fillStyle = "rgba( 153, 102, 255, 0.9 )";
		context.translate( this.x, this.y );
		context.rotate( this.rot * (Math.PI / 180) );
		context.fillRect( -6, -6, 12, 12 );
		context.restore();
	}
}

// サブウェポンの弾
var SubBullet = function( x, y, rot ){
	// 座標
	this.x = x;
	this.y = y;
	// 移動量
	this.mx = 0;
	this.my = 0;
	// 半径
	this.r = 3;
	// 角度
	this.rot = rot;
	// 時間
	this.time = 0;

	// サブウェポン弾更新関数
	this.Update = function( enemy ){

		if( enemy.length && this.time < 100 ){

			// 目指す角度を求める
			var dx, dy, dist;
			dx = enemy[0].x - this.x;
			dy = enemy[0].y - this.y;
			dist = Math.sqrt( dx*dx + dy*dy );
			var rot = Math.atan2( dy, dx );

			// 現在の進行方向のベクトル
			var vx1 = Math.cos( this.rot * (Math.PI / 180) );
			var vy1 = Math.sin( this.rot * (Math.PI / 180) );
			// 目指すべき場所へのベクトル
			var vx2 = Math.cos( rot );
			var vy2 = Math.sin( rot );

			// 外積のzを求める
			var v = vx1 * vy2 - vy1 * vx2;

			// zの値によってどこに向かっていくか決定する
			if( v > 0 )	this.rot += this.time / 20;
			else		this.rot -= this.time / 20;

			// 移動量の決定
			this.mx = vx1 * 4; this.my = vy1 * 4;

		}else{
			this.mx = Math.cos( this.rot * (Math.PI / 180) ) * 4;
			this.my = Math.sin( this.rot * (Math.PI / 180) ) * 4;
		}

		this.x += this.mx; this.y += this.my;

		// 画面外判定
		if( this.x < -30 || this.x > 530 || this.y < -30 || this.y > 510 ) return false;

		// 時間更新
		this.time++;

		return true
	}

	// サブウェポン弾描画関数
	this.Draw = function( context ){
		context.save();
		context.beginPath();
		context.fillStyle = "rgba( 255, 255, 0, 0.9 )";
		context.translate( this.x, this.y );
		context.rotate( (this.rot+90) * (Math.PI / 180) );
		context.fillRect( -4, -6, 8, 12 );
		context.restore();
	}
}



