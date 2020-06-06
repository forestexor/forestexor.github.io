
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
	
	// ゲームパッド接続時
	window.addEventListener( "gamepadconnected", (e) => {
/*
		e.gamepad.index;	// パッド番号、大抵1個なので0番を使う
		e.gamepad.id;		// 種類？ Xbox 360 Controller (XInput STANDARD GAMEPAD)
		e.gamepad.mapping;	// 不明(standardが入ってた)
*/
		Input.Pad.Initialize();
	});
	// ゲームパッド切断時
	window.addEventListener( "gamepaddisconnected", (e) => {
		Input.Pad.Finalize();
	});
	
	// キャンバス取得
    let canvas = document.getElementById("myCanvas");
	if( !canvas.getContext ){ return; }
	
	// マウス左クリック取得
	canvas.onmousedown = function(){
		Input.Mouse.button = true;
	}
	canvas.onmouseup = function(){
		Input.Mouse.button = false;
	}
	// マウス座標取得
	canvas.addEventListener( "mousemove", (e) => {
		let rect = e.target.getBoundingClientRect();
		Input.Mouse.x = e.clientX - rect.left
		Input.Mouse.y = e.clientY - rect.top
	});
	
	// コンテキスト取得
	let context = canvas.getContext("2d");
	
	// ゲームクラスをインスタンス
    let game = new CGame( canvas, context );

	// メインループ
	setInterval( function(){
		// 入力機器更新
		Input.Update();
		
		game.Run();
		
	}, 16.666666 );	// (1000 / 60) = 16.66666 = 60fps
}
