// 爆発エフェクトクラス
var Explosion = function( x, y ){
	// 座標
	this.x = x;
	this.y = y;

	// 時間
	this.time = 0;

	this.limit = 20;	// エフェクトが消えるまでの時間

	this.Update = function(){
		if (this.limit < ++this.time) return false;
		return true;
	}

	this.Draw = function( context ){
		var radius = this.time * 3;
		var alpha = 1 - ( this.time / this.limit );

		context.save();
		context.translate( this.x, this.y );
		context.beginPath();
		context.arc( 0, 0, radius, 0, Math.PI * 2, false )
		var grad  = context.createRadialGradient( 0, 0, 0, 0, 0, radius );
		grad.addColorStop(  0, "rgba( 255, 255, 255," + alpha + ")");
		grad.addColorStop(0.5, "rgba( 255, 255, 255," + alpha + ")");
		grad.addColorStop(0.8, "rgba( 255, 255,   0," + alpha + ")");
		grad.addColorStop(  1, "rgba( 255,   0,   0," + alpha + ")");
		context.fillStyle = grad;
		context.fill();
		context.restore();
	}
}