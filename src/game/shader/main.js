const RADIAN = (Math.PI/180.0);
function DtoR( deg ){
	return (deg * RADIAN);
}


// シェーダー
let BasicShader = new CBasicShader();
let HLShader = new CHLShader();
let PhongShader = new CPhongShader();

// モデル
let Earth = new CEarthMesh();
let Light = new CLightMesh();

// カメラ
let cameraPos = [0.0, 0.0, 0.0];
let cameraRot = [-0.35, -0.75, 0.0];
let cameraLen = 5.0;
let cameraMat = new CMatrix();
let cameraLenM = new CMatrix();
let cameraRotM = new CMatrix();

// 地球
let earthPos = [0.0, 0.0, 0.0];
let earthRot = 0.0;
let animFlag = false;

// ライト
let lightCount = 0;
let lightPos = [0.0, 0.0, 0.0];
let lightRot = [-1.0, (-RADIAN*90.0)-0.75, 0.0];
let lightLen = 2.1;
let lightMat = new CMatrix();
let lightLenM = new CMatrix();
let lightRotM = new CMatrix();
let lightDir = [0.0, 0.0, 0.0]

// 視線
let eyeDir = [0.0, 0.0, 0.0];

// 各種行列の生成と初期化
let m = new CMatrix();
let w = new CMatrix();
let v = new CMatrix();
let p = new CMatrix();
let tmpMat = new CMatrix();
let tmpTrans = new CMatrix();
let tmpRot = new CMatrix();

// サイドメニュー
let shader_type = null;
// フォン
let phong_range = null;
let phong_power = null;

function Initialize( gl ){
	let result = false;
	
	result = BasicShader.Initialize( gl );
	if( false == result ){
		console.log( "ベーシックシェーダー初期化失敗" );
		return false;
	}
	
	result = HLShader.Initialize( gl );
	if( false == result ){
		console.log( "HLシェーダー初期化失敗" );
		return false;
	}
	
	result = PhongShader.Initialize( gl );
	if( false == result ){
		console.log( "フォンシェーダー初期化失敗" );
		return false;
	}
	
	//--------------------------------------------------
	
	result = Earth.Initialize( gl );
	if( false == result ){
		console.log( "地球メッシュ初期化失敗" );
		return false;
	}
	
	result = Light.Initialize( gl );
	if( false == result ){
		console.log( "ライトメッシュ初期化失敗" );
		return false;
	}
	
	//---------------------------------------------------
	
	// 右メニューの値取得
	shader_type = document.getElementById("type");
	phong_range = document.getElementById("Range");
	phong_power = document.getElementById("Power");
	
	return true;
}


// メインループ関数を定義
function MainLoop( gl ){
	
	// カメラ操作
	if( (Input.L == FREE) && (Input.Left & HOLD) ){
		cameraRot[1] -= RADIAN;
	}
	if( (Input.L == FREE) && (Input.Right & HOLD) ){
		cameraRot[1] += RADIAN;
	}
	if( (Input.L == FREE) && (Input.Up & HOLD) && (-Math.PI*0.49 < cameraRot[0]) ){
		cameraRot[0] -= RADIAN;
	}
	if( (Input.L == FREE) && Input.Down & HOLD && (Math.PI*0.49 > cameraRot[0]) ){
		cameraRot[0] += RADIAN;
	}
	if( (Input.Z & HOLD) && (3.0 < cameraLen) ){
		cameraLen -= 0.1;
	}
	if( (Input.X & HOLD) && (10.0 > cameraLen) ){
		cameraLen += 0.1;
	}
	
	CMatrix.Translation( cameraLenM, [0.0, 0.0, cameraLen] );
	CMatrix.RotationQ( cameraRotM, cameraRot );
	CMatrix.Multiply( cameraMat, cameraRotM, cameraLenM );
	cameraPos[0] = cameraMat._41;
	cameraPos[1] = cameraMat._42;
	cameraPos[2] = cameraMat._43;
	
	// カメラ
	// ビュー座標変換行列
	CMatrix.LookAtRH( v, cameraPos, [0.0, 0.0, 0.0], [0, 1, 0] );
	// プロジェクション座標変換行列
	CMatrix.PerspectiveFovRH( p, (Math.PI*0.25), (4.0/3.0), 0.1, 100.0 );
	
	//------------------------------------------------------------------------
	
	// ライト操作
	if( (Input.L & HOLD) && (Input.Left & HOLD) ){
		lightRot[1] -= RADIAN;
	}
	if( (Input.L & HOLD) && (Input.Right & HOLD) ){
		lightRot[1] += RADIAN;
	}
	if( (Input.L & HOLD) && (Input.Up & HOLD) && (-Math.PI*0.49 < lightRot[0]) ){
		lightRot[0] -= RADIAN;
	}
	if( (Input.L & HOLD) && Input.Down & HOLD && (Math.PI*0.49 > lightRot[0]) ){
		lightRot[0] += RADIAN;
	}
	
	CMatrix.Translation( lightLenM, [0.0, 0.0, lightLen] );
	CMatrix.RotationQ( lightRotM, lightRot );
	CMatrix.Multiply( lightMat, lightRotM, lightLenM );
	lightPos[0] = lightMat._41;
	lightPos[1] = lightMat._42;
	lightPos[2] = lightMat._43;
	
	CMatrix.LookAt( lightMat, lightPos, earthPos, [0, 1, 0] );
	lightMat._41 = lightPos[0];
	lightMat._42 = lightPos[1];
	lightMat._43 = lightPos[2];
	
	// ライト描画
	CMatrix.WVP( m, lightMat, v, p );
	BasicShader.Render( gl, Light, m );
	
	//---------------------------------------------------------------------------------
	
	// 地球操作
	if( true == animFlag ){
		earthRot += 0.01;
	}
	if( Input.A == PUSH ){
		animFlag = animFlag ? false : true;
	}
	
	// ライトの位置を地球の0行列視点に補正する
	let tmpPos = [0,0,0];
	tmpPos[0] = lightPos[0] - earthPos[0];
	tmpPos[1] = lightPos[1] - earthPos[1];
	tmpPos[2] = lightPos[2] - earthPos[2];
	
	CMatrix.Translation( tmpTrans, tmpPos );
	CMatrix.RotationY( tmpRot, -earthRot );
	CMatrix.Multiply( tmpMat, tmpRot, tmpTrans );
	
	// ライトベクトル作成
	lightDir[0] = (earthPos[0]-tmpMat._41);
	lightDir[1] = (earthPos[1]-tmpMat._42);
	lightDir[2] = (earthPos[2]-tmpMat._43);
	let len = Math.hypot( lightDir[0], lightDir[1], lightDir[2] );
	len = 1.0 / len;
	lightDir[0] *= len;
	lightDir[1] *= len;
	lightDir[2] *= len;
	
	// 視線の位置を地球の0行列視点に補正する
	
	tmpPos[0] = (earthPos[0] - cameraPos[0]);
	tmpPos[1] = (earthPos[1] - cameraPos[1]);
	tmpPos[2] = (earthPos[2] - cameraPos[2]);
	CMatrix.Translation( tmpTrans, tmpPos );
	CMatrix.RotationY( tmpRot, -earthRot );
	CMatrix.Multiply( tmpMat, tmpRot, tmpTrans );
	
	// 視線ベクトル作成
	eyeDir[0] = (earthPos[0] - tmpMat._41);
	eyeDir[1] = (earthPos[1] - tmpMat._42);
	eyeDir[2] = (earthPos[2] - tmpMat._43);
	
	//--------------------------------------------------------------------
	
	// 各行列を掛け合わせ座標変換行列を完成させる
	w.Identity();
	CMatrix.RotationY( w, earthRot );
	CMatrix.WVP( m, w, v, p );
	
	// 描画
	switch( shader_type.value ){
	case "Basic":
		BasicShader.Render( gl, Earth, m );
		break;
	case "HL":
		HLShader.Render( gl, Earth, m, lightDir );
		break;
	case "Phong":
		PhongShader.Render( gl, Earth, m, eyeDir, lightDir, phong_range.value, phong_power.value );
		break;
	}
}

window.onload = function(){
	// ページスクロール抑制
	window.addEventListener( "keydown", (e) => {
		switch( e.keyCode ){
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
	
	// キャンバス取得
    let canvas = document.getElementById("myCanvas");
	if( !canvas.getContext ){ return; }
	
	// マウス左クリック取得
	canvas.onmousedown = function(){
		Input.Mouse.L_Button = true;
	}
	canvas.onmouseup = () => {
		Input.Mouse.L_Button = false;
	}
	// マウス座標取得
	canvas.addEventListener( "mousemove", (e) => {
		let rect = e.target.getBoundingClientRect();
		Input.Mouse.x = e.clientX - rect.left;
		Input.Mouse.y = e.clientY - rect.top;
	});
	
	// WebGL取得
	let webgl = canvas.getContext("webgl");
	if( webgl == null ){
		alert( "WebGLに対応していません。" );
		return;
	}
	
	// fpsを設定
	let fps = 1000 / 60;
	
	// 初期化
	for( let i = 0 ; i < 1000 ; i++ ){
		// 画像読み込み用時間
	}
	if( false == Initialize( webgl ) ){
		return;
	}
	
	// クリアカラーを黒に設定
	webgl.clearColor( 0.1, 0.1, 0.1, 1.0 );
	// ブレンド有効
	webgl.enable( webgl.BLEND );
	// アルファブレンド
	webgl.blendFunc( webgl.SRC_ALPHA, webgl.ONE_MINUS_SRC_ALPHA );
	// 深度有効
	webgl.enable( webgl.DEPTH_TEST );
	webgl.depthFunc( webgl.LEQUAL );
	// canvasを初期化する際の深度を設定する
	webgl.clearDepth( 1.0 );
	// カリング有効
//	webgl.enable( webgl.CULL_FACE );
	
	// ループ開始
	setInterval( function(){
		webgl.clear( webgl.COLOR_BUFFER_BIT | webgl.DEPTH_BUFFER_BIT );
		Input.Update();
		MainLoop( webgl );
	}, fps );
}
