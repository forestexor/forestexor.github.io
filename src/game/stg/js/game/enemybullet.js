
// 敵弾
var EnemyBullet = function( x, y, spd, rot, bullettype, move ){
	// 座標
	this.x = x;
	this.y = y;
	// 移動量
	this.mx = 0;
	this.my = 0;
	// 弾速
	this.spd = spd;
	// 角度
	this.rot = rot;
	// 時間
	this.time = 0;
	this.r = 7;

	// 移動パターン
	this.move = move;

	// 敵弾更新
	this.Update = function( tx, ty ){
		switch( this.move ){

		case 0:	// 自機狙い弾
			switch( this.time ){
			case 0:
				var dx, dy, dist;
				dx = tx - this.x;
				dy = ty - this.y;
				dist = Math.sqrt( dx*dx + dy*dy );
				this.mx = dx / dist * this.spd;
				this.my = dy / dist * this.spd;
				this.rot = Math.atan2( dy, dx );
				this.rot = this.rot * (180 / Math.PI);
				break;

			default: this.x += this.mx; this.y += this.my;	break;
			}
			break;

		case 1:	// 時計回り弾
			switch( this.time ){
			case 0: this.rot = 0;	break;
			default :
				if( 1 - (this.time/200) > 0 ) this.rot += 1 - (this.time/200);
				this.mx = Math.cos( this.rot*(Math.PI/180) ) * this.spd;
				this.my = Math.sin( this.rot*(Math.PI/180) ) * this.spd;

				this.x += this.mx; this.y += this.my;
				break;
			}
			break;

		case 2:	// 反時計回り弾
			switch( this.time ){
			case 0: this.rot = 180;	break;
			default :
				if( 1 - (this.time/200) > 0 ) this.rot -= 1 - (this.time/200);
				this.mx = Math.cos( this.rot*(Math.PI/180) ) * this.spd;
				this.my = Math.sin( this.rot*(Math.PI/180) ) * this.spd;

				this.x += this.mx; this.y += this.my;
				break;
			}
			break;

		case 3:	// 角度指定弾
			switch( this.time ){
			case 0:
				this.mx = Math.cos( this.rot*(Math.PI/180) ) * this.spd;
				this.my = Math.sin( this.rot*(Math.PI/180) ) * this.spd;
				break;

			default: this.x += this.mx; this.y += this.my;	break;
			}
			break;

		case 4:	// 角度指定弾後自機狙いに変化
			switch( this.time ){
			case 0:
				this.mx = Math.cos( this.rot*(Math.PI/180) ) * this.spd/2;
				this.my = Math.sin( this.rot*(Math.PI/180) ) * this.spd/2;
				break;

			case 60:
				var dx, dy, dist;
				dx = tx - this.x;
				dy = ty - this.y;
				dist = Math.sqrt( dx*dx + dy*dy );
				this.mx = dx / dist * this.spd;
				this.my = dy / dist * this.spd;
				this.rot = Math.atan2( dy, dx );
				this.rot = this.rot * (180 / Math.PI);
				break;

			default: this.x += this.mx; this.y += this.my;	break;
			}
			break;

		case 5:	// 3WAY用 自機の右狙い弾
			switch( this.time ){
			case 0:
				var dx, dy, dist;
				dx = tx - this.x;
				dy = ty - this.y;
				dist = Math.sqrt( dx*dx + dy*dy );
				this.rot = Math.atan2( dy, dx );

				this.mx = Math.cos( this.rot + 15 * (Math.PI / 180) ) * this.spd;
				this.my = Math.sin( this.rot + 15 * (Math.PI / 180) ) * this.spd;
				this.rot = this.rot * (180 / Math.PI);
				break;

			default: this.x += this.mx; this.y += this.my;	break;
			}
			break;

		case 6:	// 3WAY用 自機の左狙い弾
			switch( this.time ){
			case 0:
				var dx, dy, dist;
				dx = tx - this.x;
				dy = ty - this.y;
				dist = Math.sqrt( dx*dx + dy*dy );
				this.rot = Math.atan2( dy, dx );

				this.mx = Math.cos( this.rot - 15 * (Math.PI / 180) ) * this.spd;
				this.my = Math.sin( this.rot - 15 * (Math.PI / 180) ) * this.spd;
				this.rot = this.rot * (180 / Math.PI);
				break;

			default: this.x += this.mx; this.y += this.my;	break;
			}
			break;
		}

		// 画面外判定
		if( this.x < -100 || this.x > 600 || this.y < -100 || this.y > 580 ) return false;

		// 時間更新
		this.time++;

		return true;
	}

//--------------------------------------------------------------------------------------------------------------------

	// 敵弾描画
	this.Draw = function( context ){
		context.save();
		context.beginPath();
		context.fillStyle = "rgba( 255, 0, 0, 0.9 )";
		context.translate( this.x, this.y );
		context.rotate( (this.rot+90) * (Math.PI / 180) );
		context.scale( 0.5, 1.0 );
		context.arc( 0, 0, 7, 0, Math.PI*2, false );
		context.fill();
		context.restore();
	}
}


















