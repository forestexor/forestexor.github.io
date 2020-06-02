
// 敵
var Enemy = function( type, bullet ){

	// HP
	this.hp = Math.floor(g_gamelv / 2) + 2;
	// 位置
	this.x = 0;
	this.y = 0;
	// 移動量
	this.mx = 0;
	this.my = 0;
	// 回転(画像の回転ではなく移動方向の決定に使用する)
	this.rot = 0;
	// 半径
	this.r = 20;
	// 時間
	this.time = 0;
	// 移動パターン
	this.type = type;
	// 弾
	this.bullet = bullet;

	// 敵更新関数
	this.Update = function(){
		// アニメーション更新
		this.count++;
		if( this.count >= 24 ) this.count = 0;
		this.anim = Math.floor(this.count / 6);

		// 敵のタイプごとによって移動パターンを分ける
		switch( this.type ){

		case 0:	// タイプ0 右から左へ少しずつ上昇しながら移動
			switch( this.time ){
			case 0:	this.x = 532; this.y = 100+Math.random()*140;	this.mx = -2; this.my = -0.25;	break;
			default:	this.x += this.mx; this.y += this.my;	break;
			}
			break;

		case 1:	// タイプ1 左から右へ少しずつ上昇しながら移動
			switch( this.time ){
			case 0:	this.x = -32; this.y = 100+Math.random()*140;	this.mx = 2; this.my = -0.25;	break;
			default:	this.x += this.mx; this.y += this.my;	break;
			}
			break;

		case 2:	// 上から下へゆっくり移動 Xはランダム
			switch( this.time ){
			case 0:	this.x = 32+Math.random() * 436; this.y = -32; this.my = 1;	break;
			default:	this.x += this.mx; this.y += this.my;	break;
			}
			break;

		case 3:	// 右上から右下へ弧を描く
			if( this.time < 130 ){
				this.rot -= 0.1;
				this.mx = Math.cos( this.rot*(Math.PI/180) ) * 1.5;
				this.my = Math.sin( this.rot*(Math.PI/180) ) * 1.5;
			}else if( this.time < 280 ){
				this.rot--;
				this.mx = Math.cos( this.rot*(Math.PI/180) ) * 1.5;
				this.my = Math.sin( this.rot*(Math.PI/180) ) * 1.5;
			}

			switch( this.time ){
			case 0:	this.x = 532; this.y = 30+Math.random()*30; this.rot = 180;	break;
			default:	this.x += this.mx; this.y += this.my;	break;
			}
			break;

		case 4:	// 左上から左下へ弧を描く
			if( this.time < 180 ){
				this.rot += 0.1;
				this.mx = Math.cos( this.rot*(Math.PI/180) ) * 1.5;
				this.my = Math.sin( this.rot*(Math.PI/180) ) * 1.5;
			}else if( this.time < 330 ){
				this.rot++;
				this.mx = Math.cos( this.rot*(Math.PI/180) ) * 1.5;
				this.my = Math.sin( this.rot*(Math.PI/180) ) * 1.5;
			}

			switch( this.time ){
			case 0:	this.x = -32; this.y = 30+Math.random()*30; this.rot = 0;	break;
			default:	this.x += this.mx; this.y += this.my;	break;
			}
			break;

		case 5:	// 上から時計回りに円を描く
			if( this.time < 60 ){
				this.my = 0.7;
			}else{
				this.rot += 0.8;
				this.mx = Math.cos( this.rot*(Math.PI/180) ) * 3;
				this.my = Math.sin( this.rot*(Math.PI/180) ) * 3;
			}

			switch( this.time ){
			case 0:	this.x = 250; this.y = -32; this.rot = 0;	break;
			default:	this.x += this.mx; this.y += this.my;	break;
			}
			break;

		case 6:	// 上から反時計回りに円を描く
			if( this.time < 60 ){
				this.my = 0.7;
			}else{
				this.rot -= 0.8;
				this.mx = Math.cos( this.rot*(Math.PI/180) ) * 3;
				this.my = Math.sin( this.rot*(Math.PI/180) ) * 3;
			}

			switch( this.time ){
			case 0:	this.x = 250; this.y = -32; this.rot = 180;	break;
			default:	this.x += this.mx; this.y += this.my;	break;
			}
			break;

		}	// switch( this.type ){

		// 画面外判定
		if( this.x < -50 || this.x > 550 || this.y < -50 || this.y > 530 ) return false;

		// 敵時間更新
		this.time++;

		if( this.time < 60 ) return true;

		// 弾発射
		var n = 80 - g_gamelv;
		if( n < 10 ) n = 10;
		if( this.time % n == 1 ){
			var b = Math.floor( Math.random()*100 );		// 弾の指定
			var rand = Math.floor( Math.random()*100 ) % 6	// 発射する弾を指定 今のところ6個
			var max = Math.floor( g_gamelv / 5 ) + 1;		// for文の回数の限界値をゲームレベルで変更

			switch( rand ){
			case 0:	// 自機狙い弾
				for( var i = 0 ; i < max ; i++ ){	//		x		y  spd  rot
					this.bullet.push( new EnemyBullet( this.x, this.y, 2+i, 0, b, rand ) );
				}
				break;

			case 1:	// 時計回り弾
				this.bullet.push( new EnemyBullet( this.x, this.y, 1*(1+g_gamelv/10), 0, b, rand ) );
				break;

			case 2:	// 反時計回り弾
				this.bullet.push( new EnemyBullet( this.x, this.y, 1*(1+g_gamelv/10), 0, b, rand ) );
				break;

			case 3:	// 角度指定弾
				for( var i = 0 ; i < max+3 ; i++ ){
					this.bullet.push( new EnemyBullet( this.x, this.y, 2, i*(360/(max+2)), b, rand ) );
				}
				break;

			case 4:	// 角度指定弾後自機狙いに変化
				for( var i = 0 ; i < max+4 ; i++ ){
					this.bullet.push( new EnemyBullet( this.x, this.y, 3, i*(360/(max+3)), b, rand ) );
				}
				break;

			case 5:	// 3WAY弾
				this.bullet.push( new EnemyBullet( this.x, this.y, 2+max, 0, b, 0 ) );
				this.bullet.push( new EnemyBullet( this.x, this.y, 2+max, 0, b, rand ) );
				this.bullet.push( new EnemyBullet( this.x, this.y, 2+max, 0, b, rand+1 ) );
			}
		}

		return true;
	}

	// 敵描画関数
	this.Draw = function( context ){
		context.save();
		context.beginPath();
		context.fillStyle = "rgba( 184, 0, 31, 1.0 )";
		context.translate( this.x, this.y );
		context.scale( 1.0, 0.75 );
		context.arc( 0, 0, 30, 0, Math.PI*2, false );
		context.fill();
		context.restore();
		
		context.save();
		context.beginPath();
		context.textAlign = "center";
		context.strokeStyle = "white";
		context.fillStyle = "white";
		context.translate( this.x, this.y );
		context.font = "15px 'ＭＳＰゴシック'";
		context.fillText( "敵", 0, 5 );
		context.restore();
	}
}