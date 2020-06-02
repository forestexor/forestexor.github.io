// アイテムクラス
var Item = function( x, y ){
	// 座標
	this.x = x;
	this.y = y;
	// 移動量
	this.mx = 0;
	this.my = -2;
	// 時間
	this.time = 0;
	// 半径
	this.r = 10;
	// 自動回収モード
	this.auto = false;

	// アイテム更新関数
	this.Update = function( x, y ){
		if( y  < 150 ) this.auto = true;

		if( this.auto ){	// 自動回収状態
			var dx, dy, dist;
			dx = x - this.x;
			dy = y - this.y;
			dist = Math.sqrt( dx*dx + dy*dy );
			this.mx = dx / dist * 7;
			this.my = dy / dist * 7;

			this.x += this.mx; this.y += this.my;
		}else{	// 通常移動
			this.my += 0.03;
			this.y += this.my;
		}

		if( this.y > 500 ) return false;

		return true;
	}

	// アイテム描画関数
	this.Draw = function( context ){
		context.save();
		context.beginPath();
		context.fillStyle = "rgba( 0, 255, 0, 1.0 )";
		context.translate( this.x, this.y );
		context.arc( 0, 0, 5, 0, Math.PI*2, false );
		context.fill();
		context.restore();
	}
}