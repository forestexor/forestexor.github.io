// 乱数(正数)0～maxまでを得る
function getRandomInt( max ){
	return Math.floor( Math.random() * (max+1) );
}

// 乱数0～maxまでを得る
function getRandom( max ){
	return (getRandomInt( 10000 ) * 0.0001) * max;
}

// 範囲内の乱数(正数)を得る
function getRandomMinMaxInt( min, max ){
	return min + getRandomInt( (max-min) );
}

// 範囲内の乱数を得る
function getRandomMinMax( min, max ){
	return min + (max-min) * getRandom(1);
}

// ランダムベクトルを得る
function getRandomVector(){
	let v = new CVector2();
	let r = getRandomMinMax( -1.0, 1.0 );
	let rad = Math.sqrt((1 - r * r));
	let t = getRandomMinMax( -Math.PI, Math.PI );
	v.x = Math.cos(t) * rad;
	v.y = Math.sin(t) * rad;
	
	return v;
}

// ベクトルクラス
class CVector2{
	// コンストラクタ
	constructor( x = 0, y = 0 ){
		this.x = x;
		this.y = y;
	}
}

// 色情報クラス
class CColor{
	// コンストラクタ
	constructor( r = 0, g = 0, b = 0, a = 1 ){
		this.r = r;	// 赤
		this.g = g;	// 緑
		this.b = b;	// 青
		this.a = a;	// 透過度
	}
	
	// 色情報を取得するメソッド
	GetColor(){
		return "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")";
	}
}

class CParticle{
	constructor(){
		this.pos = new CVector2();
		this.vec = new CVector2();
		this.size = 0;
		this.time = 0;
		this.color = new CColor();
	}
}

class CParticleSystem{
	constructor(){
		this.Particles = new Array();
		this.CurrentTime = 0;				// 時間
		this.LastUpdate = 0;				// 最後の更新時間
		this.NumToRelease = 0;				// 1回のパーティクルの発生数
		this.ReleaseInterval = 0;			// パーティクルの発生間隔
		this.Size = 0;						// パーティクルの大きさ
		this.SizeChange = 0;				// サイズの変化値
		this.LifeCycle = 0;					// パーティクルの持続時間
		this.VelocityVar = 0;				// 発生位置と移動力のブレの大きさ
		this.Color = new CColor();			// ベースカラー
		this.ColorChange = new CColor();	// 色の変化値
		this.Position = new CVector2();		// 発生位置
		this.Velocity = new CVector2();		// 移動力
		this.Gravity = new CVector2();		// 重力
		this.Wind = new CVector2();			// 風力
		this.AirResistence = false;			// 空気抵抗の有効フラグ
		this.Additive = false;				// 描画方法 true:加算合成
	}
	
	Update( ElapsedTime ){
		this.CurrentTime += ElapsedTime;
		
		for( let i = 0 ; i < this.Particles.length ; i++ ){
			// 生存時間を超えていないか確認
			let TimePassed = this.CurrentTime - this.Particles[i].time;
			if( TimePassed >= this.LifeCycle ){
				// 超えていたら消す
				this.Particles.splice( i, 1 );
				i--;
			}else{
				// 超えていなければ更新処理

				// 移動力の更新
				this.Particles[i].vec.x += (this.Gravity.x * ElapsedTime);
				this.Particles[i].vec.y += (this.Gravity.y * ElapsedTime);
				
				// 空気抵抗の更新
				if( this.AirResistence == true ){
					this.Particles[i].vec.x += ((this.Wind.x - this.Particles[i].vec.x) * ElapsedTime);
					this.Particles[i].vec.y += ((this.Wind.y - this.Particles[i].vec.y) * ElapsedTime);
				}
				
				// 位置の更新
				this.Particles[i].pos.x += this.Particles[i].vec.x;
				this.Particles[i].pos.y += this.Particles[i].vec.y;
				
				// サイズの更新
				this.Particles[i].size += this.SizeChange;
				if( this.Particles[i].size < 0.0 ){
					this.Particles[i].size = 0.0;
				}
				
				// 色の更新
				this.Particles[i].color.r += (this.ColorChange.r * ElapsedTime);
				this.Particles[i].color.g += (this.ColorChange.g * ElapsedTime);
				this.Particles[i].color.b += (this.ColorChange.b * ElapsedTime);
				this.Particles[i].color.a += (this.ColorChange.a * ElapsedTime);
				if( this.Particles[i].color.r < 0 ){ this.Particles[i].color.r = 0; }
				if( this.Particles[i].color.g < 0 ){ this.Particles[i].color.g = 0; }
				if( this.Particles[i].color.b < 0 ){ this.Particles[i].color.b = 0; }
				if( this.Particles[i].color.a < 0 ){ this.Particles[i].color.a = 0; }
				if( this.Particles[i].color.r > 255 ){ this.Particles[i].color.r = 255; }
				if( this.Particles[i].color.g > 255 ){ this.Particles[i].color.g = 255; }
				if( this.Particles[i].color.b > 255 ){ this.Particles[i].color.b = 255; }
				if( this.Particles[i].color.a > 1.0 ){ this.Particles[i].color.a = 1.0; }
			}
		}
		
		// パーティクルの発生処理
		if( (this.CurrentTime - this.LastUpdate) > this.ReleaseInterval ){
			this.LastUpdate = this.CurrentTime;	// 最終更新時間の更新
			
			// 1回のパーティクルの発生数分アクティブリストに追加
			for( let i = 0 ; i < this.NumToRelease ; i++ ){
				let p = new CParticle();
				// 初期設定を行う
				p.vec.x = this.Velocity.x;
				p.vec.y = this.Velocity.y;
				if( this.VelocityVar != 0.0 ){
					let v = getRandomVector();
					p.vec.x += v.x * this.VelocityVar;
					p.vec.y += v.y * this.VelocityVar;
				}
				p.time = this.CurrentTime;
				p.pos.x = this.Position.x;
				p.pos.y = this.Position.y;
				p.size = this.Size;
				p.color.r = this.Color.r;
				p.color.g = this.Color.g;
				p.color.b = this.Color.b;
				p.color.a = this.Color.a;
				
				this.Particles.push( p );
			}
		}
	}
	
	Draw( ctx ){
		ctx.setTransform( 1, 0, 0, 1, 0, 0 );
		if( this.Additive == true ){
			ctx.globalCompositeOperation = "lighter";
		}
		for( let i = 0 ; i < this.Particles.length ; i++ ){
			ctx.beginPath();
			let grad = ctx.createRadialGradient( this.Particles[i].pos.x, this.Particles[i].pos.y, 0, this.Particles[i].pos.x, this.Particles[i].pos.y, this.Particles[i].size );
			let r = this.Particles[i].color.r;
			let g = this.Particles[i].color.g;
			let b = this.Particles[i].color.b;
			let a = this.Particles[i].color.a;
			grad.addColorStop(0.2, "rgba(" + r + "," + g + "," + b + "," + a + ")");
			a *= 0.7;
			grad.addColorStop(0.5, "rgba(" + r + "," + g + "," + b + "," + a + ")");
			a *= 0.5;
			grad.addColorStop(0.8, "rgba(" + r + "," + g + "," + b + "," + a + ")");
			a *= 0.1;
			grad.addColorStop(  1, "rgba(" + r + "," + g + "," + b + "," + a + ")");
			ctx.fillStyle = grad;
			ctx.arc( this.Particles[i].pos.x, this.Particles[i].pos.y, this.Particles[i].size, 0, (Math.PI*2) );
			ctx.fill();
		}
		ctx.globalCompositeOperation = "source-over";
	}
}

let NumToRelease = null;
let ReleaseInterval = null;
let LifeCycle = null;
let Size = null;
let SizeChange = null;
let VelocityVar = null;
let ColorR = null;
let ColorG = null;
let ColorB = null;
let ColorA = null;
let ColorChangeR = null;
let ColorChangeG = null;
let ColorChangeB = null;
let ColorChangeA = null;
let PositionX = null;
let PositionY = null;
let VelocityX = null;
let VelocityY = null;
let GravityX = null;
let GravityY = null;
let AirResistence = null;
let WindX = null;
let WindY = null;
let Additive = null;

let ParticleSystem = new CParticleSystem();

/*
ParticleSystem.NumToRelease = 15;
ParticleSystem.ReleaseInterval = 0.05;
ParticleSystem.LifeCycle = 4;
ParticleSystem.VelocityVar = 0.7;
ParticleSystem.Size = 5;
ParticleSystem.SizeChange = 0;
ParticleSystem.Color.r = 10;
ParticleSystem.Color.g = 100;
ParticleSystem.Color.b = 200;
ParticleSystem.Color.a = 1;
ParticleSystem.ColorChange.r = 100;
ParticleSystem.ColorChange.g = 150;
ParticleSystem.ColorChange.b = 200;
ParticleSystem.ColorChange.a = -0.4;
ParticleSystem.Position.x = 320;
ParticleSystem.Position.y = 300;
ParticleSystem.Velocity.x = 0;
ParticleSystem.Velocity.y = -4.0;
ParticleSystem.Gravity.x = 0;
ParticleSystem.Gravity.y = 2.5;
ParticleSystem.Wind.x = 0;
ParticleSystem.Wind.y = 0;
ParticleSystem.AirResistence = false;
ParticleSystem.Additive = true;
*/

/*
ParticleSystem.NumToRelease = 500;
ParticleSystem.ReleaseInterval = 3.0;
ParticleSystem.LifeCycle = 2.0;
ParticleSystem.VelocityVar = 3.0;
ParticleSystem.Size = 5;
ParticleSystem.SizeChange = 0;
ParticleSystem.Color.r = 255;
ParticleSystem.Color.g = 0;
ParticleSystem.Color.b = 255;
ParticleSystem.Color.a = 1;
ParticleSystem.ColorChange.r = -128;
ParticleSystem.ColorChange.g = 128;
ParticleSystem.ColorChange.b = 0;
ParticleSystem.ColorChange.a = -0.5;
ParticleSystem.Position.x = 320;
ParticleSystem.Position.y = 240;
ParticleSystem.Velocity.x = 0;
ParticleSystem.Velocity.y = 0;
ParticleSystem.Gravity.x = 0;
ParticleSystem.Gravity.y = 0;
ParticleSystem.Wind.x = 0;
ParticleSystem.Wind.y = 0;
ParticleSystem.AirResistence = true;
ParticleSystem.Additive = true;
ParticleSystem.Update( 2.9 );
*/

/*
ParticleSystem.NumToRelease = 10;
ParticleSystem.ReleaseInterval = 0.05;
ParticleSystem.LifeCycle = 4.0;
ParticleSystem.VelocityVar = 1.5;
ParticleSystem.Size = 25;
ParticleSystem.SizeChange = -0.05;
ParticleSystem.Color.r = 255;
ParticleSystem.Color.g = 0;
ParticleSystem.Color.b = 0;
ParticleSystem.Color.a = 1;
ParticleSystem.ColorChange.r = 0;
ParticleSystem.ColorChange.g = 50;
ParticleSystem.ColorChange.b = 15;
ParticleSystem.ColorChange.a = -0.5;
ParticleSystem.Position.x = 320;
ParticleSystem.Position.y = 300;
ParticleSystem.Velocity.x = 0;
ParticleSystem.Velocity.y = 0;
ParticleSystem.Gravity.x = 0;
ParticleSystem.Gravity.y = 1.0;
ParticleSystem.Wind.x = 0;
ParticleSystem.Wind.y = -3.0;
ParticleSystem.AirResistence = true;
ParticleSystem.Additive = true;
*/

// メインループ関数を定義
function MainLoop( ctx ){
	ParticleSystem.NumToRelease = Number( NumToRelease.value );
	ParticleSystem.ReleaseInterval = Number( ReleaseInterval.value );
	ParticleSystem.LifeCycle = Number( LifeCycle.value );
	ParticleSystem.VelocityVar = Number( VelocityVar.value );
	ParticleSystem.Size = Number( Size.value );
	ParticleSystem.SizeChange = Number( SizeChange.value );
	ParticleSystem.Color.r = Number( ColorR.value );
	ParticleSystem.Color.g = Number( ColorG.value );
	ParticleSystem.Color.b = Number( ColorB.value );
	ParticleSystem.Color.a = Number( ColorA.value );
	ParticleSystem.ColorChange.r = Number( ColorChangeR.value );
	ParticleSystem.ColorChange.g = Number( ColorChangeG.value );
	ParticleSystem.ColorChange.b = Number( ColorChangeB.value );
	ParticleSystem.ColorChange.a = Number( ColorChangeA.value );
	ParticleSystem.Position.x = Number( PositionX.value );
	ParticleSystem.Position.y = Number( PositionY.value );
	ParticleSystem.Velocity.x = Number( VelocityX.value );
	ParticleSystem.Velocity.y = Number( VelocityY.value );
	ParticleSystem.Gravity.x = Number( GravityX.value );
	ParticleSystem.Gravity.y = Number( GravityY.value );
	ParticleSystem.Wind.x = Number( WindX.value );
	ParticleSystem.Wind.y = Number( WindY.value );
	ParticleSystem.AirResistence = Number( AirResistence.checked );
	ParticleSystem.Additive = Number( Additive.checked );
	
	ParticleSystem.Update( (1.0/60.0));
	ParticleSystem.Draw( ctx );
	
}

window.onload = function(){
	
	NumToRelease = document.getElementById("NumToRelease");
	ReleaseInterval = document.getElementById("ReleaseInterval");
	LifeCycle = document.getElementById("LifeCycle");
	Size = document.getElementById("Size");
	SizeChange = document.getElementById("SizeChange");
	VelocityVar = document.getElementById("VelocityVar");
	ColorR = document.getElementById("ColorR");
	ColorG = document.getElementById("ColorG");
	ColorB = document.getElementById("ColorB");
	ColorA = document.getElementById("ColorA");
	ColorChangeR = document.getElementById("ColorChangeR");
	ColorChangeG = document.getElementById("ColorChangeG");
	ColorChangeB = document.getElementById("ColorChangeB");
	ColorChangeA = document.getElementById("ColorChangeA");
	PositionX = document.getElementById("PositionX");
	PositionY = document.getElementById("PositionY");
	VelocityX = document.getElementById("VelocityX");
	VelocityY = document.getElementById("VelocityY");
	GravityX = document.getElementById("GravityX");
	GravityY = document.getElementById("GravityY");
	AirResistence = document.getElementById("AirResistence");
	WindX = document.getElementById("WindX");
	WindY = document.getElementById("WindY");
	Additive = document.getElementById("Additive");

	ParticleSystem.NumToRelease = Number( NumToRelease.value );
	ParticleSystem.ReleaseInterval = Number( ReleaseInterval.value );
	ParticleSystem.LifeCycle = Number( LifeCycle.value );
	ParticleSystem.VelocityVar = Number( VelocityVar.value );
	ParticleSystem.Size = Number( Size.value );
	ParticleSystem.SizeChange = Number( SizeChange.value );
	ParticleSystem.Color.r = Number( ColorR.value );
	ParticleSystem.Color.g = Number( ColorG.value );
	ParticleSystem.Color.b = Number( ColorB.value );
	ParticleSystem.Color.a = Number( ColorA.value );
	ParticleSystem.ColorChange.r = Number( ColorChangeR.value );
	ParticleSystem.ColorChange.g = Number( ColorChangeG.value );
	ParticleSystem.ColorChange.b = Number( ColorChangeB.value );
	ParticleSystem.ColorChange.a = Number( ColorChangeA.value );
	ParticleSystem.Position.x = Number( PositionX.value );
	ParticleSystem.Position.y = Number( PositionY.value );
	ParticleSystem.Velocity.x = Number( VelocityX.value );
	ParticleSystem.Velocity.y = Number( VelocityY.value );
	ParticleSystem.Gravity.x = Number( GravityX.value );
	ParticleSystem.Gravity.y = Number( GravityY.value );
	ParticleSystem.Wind.x = Number( WindX.value );
	ParticleSystem.Wind.y = Number( WindY.value );
	ParticleSystem.AirResistence = Number( AirResistence.checked );
	ParticleSystem.Additive = Number( Additive.checked );
	
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
	
	// キャンバス取得
    let canvas = document.getElementById("myCanvas");
	if( !canvas.getContext ){ return; }
	
	// コンテキスト取得
	let context = canvas.getContext("2d");
	
	// fpsを設定
	let fps = 1000 / 60;
	
	// ループ開始
	setInterval( function(){
		context.setTransform( 1, 0, 0, 1, 0, 0 );
		context.clearRect( 0, 0, canvas.width, canvas.height );
		MainLoop( context );
	}, fps );
}
