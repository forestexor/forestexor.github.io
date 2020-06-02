// タイトル画面
var title = function(){

	// 文字明暗用
	this.alpha = 1.0;
	this.count = 0;

	this.FrameMove = function(){
		if( PUSH == Input.Enter ){
			g_gamelv = 0;
			g_score = 0;
			g_scoresub = 0;
			return new game();
		}
		
		// 文字明暗
		this.alpha = Math.cos( this.count );
		this.alpha = this.alpha * this.alpha;
		this.count += 0.015;
		
		return this;
	}

	this.FrameRender = function( context ){
	
		context.textAlign = "center";
		context.strokeStyle = "white";
		
		context.fillStyle = "white";
		context.font = "italic bold 100px 'Arial'"
		context.fillText( "S T G", 320, 200 );
		
		context.fillStyle = "rgba( 255, 255, 255," + this.alpha + ")";
		context.font = "30px 'ＭＳ Ｐゴシック'";
		context.fillText( "Push Enter to Start", 320, 300 );
	}
}
