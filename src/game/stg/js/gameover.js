// ゲームオーバー画面

var gameover = function(){

	// 文字明暗用
	this.alpha = 1.0;
	this.count = 0;

	this.FrameMove = function(){

		if( PUSH == Input.Enter ){
			return new title();
		}
		
		// 文字明暗
		this.alpha = Math.cos( this.count );
		this.alpha = this.alpha * this.alpha;
		this.count += 0.015;

		return this;
	}

	this.FrameRender = function( context ){

		context.textAlign = "center";
		
		context.strokeStyle = "red";
		context.fillStyle = "red";
		context.font = "70px 'ＭＳ Ｐゴシック'";
		context.strokeText( "ゲームオーバー", 320, 200 );

		context.fillStyle = "rgba( 255, 255, 255," + this.alpha + ")";
		context.font = "30px 'ＭＳ Ｐゴシック'";
		context.fillText( "Push Enter to Title", 320, 300 );
		

	}
}