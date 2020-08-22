// キーの状態
const STOP = 1 << 0;
const FREE = 1 << 1;
const PUSH = 1 << 2;
const HOLD = 1 << 2 | 1 << 3;
const PULL = 1 << 4;
//	STOP=000001=1
//	FREE=000010=2
//	PUSH=000100=4
//	HOLD=001100=12
//	PULL=010000=16


//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
// window.onload内に追加
/******************************************************************

// キーが押された時
document.onkeydown = (e) => {
	Input.onKeyDown( e );
}

// キーが離された時
document.onkeyup = (e) => {
	Input.onKeyUp( e );
}

// ゲームパッド接続時
window.addEventListener( "gamepadconnected", (e) => {
//	e.gamepad.index;	// パッド番号、大抵1個なので0番を使う
//	e.gamepad.id;		// 種類？ Xbox 360 Controller (XInput STANDARD GAMEPAD)
//	e.gamepad.mapping;	// 不明(standardが入ってた)

	Input.Pad.Initialize();
});
// ゲームパッド切断時
window.addEventListener( "gamepaddisconnected", (e) => {
	Input.Pad.Finalize();
});

//-----------------------------------------------------------------
// キャンバス取得後

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

//-----------------------------------------------------------------
// ループ内で使用
Input.Update();

******************************************************************/


class CInput{
	// キーボード
	#KEY = class CKey{
		constructor(){
			this.code = false;
			this.state = FREE;
		}
	}
	
	#Keys = new Map();
	
	#Enter	= new this.#KEY();
	#Shift	= new this.#KEY();
	#Ctrl	= new this.#KEY();
	#Alt	= new this.#KEY();
	#Space	= new this.#KEY();
	#Left	= new this.#KEY();
	#Up		= new this.#KEY();
	#Right	= new this.#KEY();
	#Down	= new this.#KEY();
	get Enter()	{ return this.#Enter.state;	}
	get Shift()	{ return this.#Shift.state;	}
	get Ctrl()	{ return this.#Ctrl.state;	}
	get Alt()	{ return this.#Alt.state;	}
	get Space()	{ return this.#Space.state;	}
	get Left()	{ return this.#Left.state;	}
	get Up()	{ return this.#Up.state;	}
	get Right()	{ return this.#Right.state;	}
	get Down()	{ return this.#Down.state;	}
	
	#_0 = new this.#KEY();
	#_1 = new this.#KEY();
	#_2 = new this.#KEY();
	#_3 = new this.#KEY();
	#_4 = new this.#KEY();
	#_5 = new this.#KEY();
	#_6 = new this.#KEY();
	#_7 = new this.#KEY();
	#_8 = new this.#KEY();
	#_9 = new this.#KEY();
	get _0(){ return this.#_0.state; }
	get _1(){ return this.#_1.state; }
	get _2(){ return this.#_2.state; }
	get _3(){ return this.#_3.state; }
	get _4(){ return this.#_4.state; }
	get _5(){ return this.#_5.state; }
	get _6(){ return this.#_6.state; }
	get _7(){ return this.#_7.state; }
	get _8(){ return this.#_8.state; }
	get _9(){ return this.#_9.state; }
	
	#A = new this.#KEY();
	#B = new this.#KEY();
	#C = new this.#KEY();
	#D = new this.#KEY();
	#E = new this.#KEY();
	#F = new this.#KEY();
	#G = new this.#KEY();
	#H = new this.#KEY();
	#I = new this.#KEY();
	#J = new this.#KEY();
	#K = new this.#KEY();
	#L = new this.#KEY();
	#M = new this.#KEY();
	#N = new this.#KEY();
	#O = new this.#KEY();
	#P = new this.#KEY();
	#Q = new this.#KEY();
	#R = new this.#KEY();
	#S = new this.#KEY();
	#T = new this.#KEY();
	#U = new this.#KEY();
	#V = new this.#KEY();
	#W = new this.#KEY();
	#X = new this.#KEY();
	#Y = new this.#KEY();
	#Z = new this.#KEY();
	get A(){ return this.#A.state; }
	get B(){ return this.#B.state; }
	get C(){ return this.#C.state; }
	get D(){ return this.#D.state; }
	get E(){ return this.#E.state; }
	get F(){ return this.#F.state; }
	get G(){ return this.#G.state; }
	get H(){ return this.#H.state; }
	get I(){ return this.#I.state; }
	get J(){ return this.#J.state; }
	get K(){ return this.#K.state; }
	get L(){ return this.#L.state; }
	get M(){ return this.#M.state; }
	get N(){ return this.#N.state; }
	get O(){ return this.#O.state; }
	get P(){ return this.#P.state; }
	get Q(){ return this.#Q.state; }
	get R(){ return this.#R.state; }
	get S(){ return this.#S.state; }
	get T(){ return this.#T.state; }
	get U(){ return this.#U.state; }
	get V(){ return this.#V.state; }
	get W(){ return this.#W.state; }
	get X(){ return this.#X.state; }
	get Y(){ return this.#Y.state; }
	get Z(){ return this.#Z.state; }
	
	#Ten0 = new this.#KEY();
	#Ten1 = new this.#KEY();
	#Ten2 = new this.#KEY();
	#Ten3 = new this.#KEY();
	#Ten4 = new this.#KEY();
	#Ten5 = new this.#KEY();
	#Ten6 = new this.#KEY();
	#Ten7 = new this.#KEY();
	#Ten8 = new this.#KEY();
	#Ten9 = new this.#KEY();
	get Ten0(){ return this.#Ten0.state; };
	get Ten1(){ return this.#Ten1.state; };
	get Ten2(){ return this.#Ten2.state; };
	get Ten3(){ return this.#Ten3.state; };
	get Ten4(){ return this.#Ten4.state; };
	get Ten5(){ return this.#Ten5.state; };
	get Ten6(){ return this.#Ten6.state; };
	get Ten7(){ return this.#Ten7.state; };
	get Ten8(){ return this.#Ten8.state; };
	get Ten9(){ return this.#Ten9.state; };
	
	// マウス
	#MOUSE = class CMouse{
		constructor(){
			this.L_Button = false;
			this.L = FREE;
			this.x = 0;
			this.y = 0;
		}
	}
	#Mouse = new this.#MOUSE();
	get Mouse(){ return this.#Mouse; }
	
	// ゲームパッド
	#GamePad = class CGamePad{
		#Button = [ null,null,null,null,
					null,null,null,null,
					null,null,null,null,
					null,null,null,null];
		#A = null;
		#B = null;
		#X = null;
		#Y = null;
		#L = null;
		#R = null;
		#LT = null;
		#RT = null;
		#Back = null;
		#Start = null;
		#LS = null;
		#RS = null;
		#Up = null;
		#Down = null;
		#Left = null;
		#Right = null;
		#LX = null;
		#LY = null;
		#RX = null;
		#RY = null;
		constructor(){
		}
		get Button(){ return this.#Button; }
		get A(){ if( null == this.#A ){ return 0; }else{ return this.#A; } }
		set A( val ){ this.#A = val; }
		get B(){ if( null == this.#B ){ return 0; }else{ return this.#B; } }
		set B( val ){ this.#B = val; }
		get X(){ if( null == this.#X ){ return 0; }else{ return this.#X; } }
		set X( val ){ this.#X = val; }
		get Y(){ if( null == this.#Y ){ return 0; }else{ return this.#Y; } }
		set Y( val ){ this.#Y = val; }
		
		get L(){ if( null == this.#L ){ return 0; }else{ return this.#L; } }
		set L( val ){ this.#L = val; }
		get R(){ if( null == this.#R ){ return 0; }else{ return this.#R; } }
		set R( val ){ this.#R = val; }
		get LT(){ if( null == this.#LT ){ return 0; }else{ return this.#LT; } }
		set LT( val ){ this.#LT = val; }
		get RT(){ if( null == this.#RT ){ return 0; }else{ return this.#RT; } }
		set RT( val ){ this.#RT = val; }
		
		get Back(){ if( null == this.#Back ){ return 0; }else{ return this.#Back; } }
		set Back( val ){ this.#Back = val; }
		get Start(){ if( null == this.#Start ){ return 0; }else{ return this.#Start; } }
		set Start( val ){ this.#Start = val; }
		get LS(){ if( null == this.#LS ){ return 0; }else{ return this.#LS; } }
		set LS( val ){ this.#LS = val; }
		get RS(){ if( null == this.#RS ){ return 0; }else{ return this.#RS; } }
		set RS( val ){ this.#RS = val; }
		
		get Up(){ if( null == this.#Up ){ return 0; }else{ return this.#Up; } }
		set Up( val ){ this.#Up = val; }
		get Down(){ if( null == this.#Down ){ return 0; }else{ return this.#Down; } }
		set Down( val ){ this.#Down = val; }
		get Left(){ if( null == this.#Left ){ return 0; }else{ return this.#Left; } }
		set Left( val ){ this.#Left = val; }
		get Right(){ if( null == this.#Right ){ return 0; }else{ return this.#Right; } }
		set Right( val ){ this.#Right = val; }
		
		get LX(){ if( null == this.#LX ){ return 0; }else{ return this.#LX; } }
		set LX( val ){ this.#LX = val; }
		get LY(){ if( null == this.#LY ){ return 0; }else{ return this.#LY; } }
		set LY( val ){ this.#LY = val; }
		get RX(){ if( null == this.#RX ){ return 0; }else{ return this.#RX; } }
		set RX( val ){ this.#RX = val; }
		get RY(){ if( null == this.#RY ){ return 0; }else{ return this.#RY; } }
		set RY( val ){ this.#RY = val; }
		
		Initialize(){
			for( let i = 0 ; i < this.#Button.length ; i++ ){
				this.#Button[i] = FREE;
			}
		}
		Finalize(){
			for( let i = 0 ; i < this.#Button.length ; i++ ){
				this.#Button[i] = null;
			}
			this.#LX = null;
			this.#LY = null;
			this.#RX = null;
			this.#RY = null;
		}
	}
	#Pad = new this.#GamePad();
	get Pad(){ return this.#Pad; }
	
	// コンストラクタ
	constructor(){
		this.#Keys.set( 13, this.#Enter	);
		this.#Keys.set( 16, this.#Shift	);
		this.#Keys.set( 17, this.#Ctrl	);
		this.#Keys.set( 18, this.#Alt	);
		this.#Keys.set( 32, this.#Space	);
		this.#Keys.set( 37, this.#Left	);
		this.#Keys.set( 38, this.#Up	);
		this.#Keys.set( 39, this.#Right	);
		this.#Keys.set( 40, this.#Down	);
		
		this.#Keys.set( 48, this.#_0 );
		this.#Keys.set( 49, this.#_1 );
		this.#Keys.set( 50, this.#_2 );
		this.#Keys.set( 51, this.#_3 );
		this.#Keys.set( 52, this.#_4 );
		this.#Keys.set( 53, this.#_5 );
		this.#Keys.set( 54, this.#_6 );
		this.#Keys.set( 55, this.#_7 );
		this.#Keys.set( 56, this.#_8 );
		this.#Keys.set( 57, this.#_9 );
		
		this.#Keys.set( 65, this.#A );
		this.#Keys.set( 66, this.#B );
		this.#Keys.set( 67, this.#C );
		this.#Keys.set( 68, this.#D );
		this.#Keys.set( 69, this.#E );
		this.#Keys.set( 70, this.#F );
		this.#Keys.set( 71, this.#G );
		this.#Keys.set( 72, this.#H );
		this.#Keys.set( 73, this.#I );
		this.#Keys.set( 74, this.#J );
		this.#Keys.set( 75, this.#K );
		this.#Keys.set( 76, this.#L );
		this.#Keys.set( 77, this.#M );
		this.#Keys.set( 78, this.#N );
		this.#Keys.set( 79, this.#O );
		this.#Keys.set( 80, this.#P );
		this.#Keys.set( 81, this.#Q );
		this.#Keys.set( 82, this.#R );
		this.#Keys.set( 83, this.#S );
		this.#Keys.set( 84, this.#T );
		this.#Keys.set( 85, this.#U );
		this.#Keys.set( 86, this.#V );
		this.#Keys.set( 87, this.#W );
		this.#Keys.set( 88, this.#X );
		this.#Keys.set( 89, this.#Y );
		this.#Keys.set( 90, this.#Z );
		
		this.#Keys.set(  96, this.#Ten0 );
		this.#Keys.set(  97, this.#Ten1 );
		this.#Keys.set(  98, this.#Ten2 );
		this.#Keys.set(  99, this.#Ten3 );
		this.#Keys.set( 100, this.#Ten4 );
		this.#Keys.set( 101, this.#Ten5 );
		this.#Keys.set( 102, this.#Ten6 );
		this.#Keys.set( 103, this.#Ten7 );
		this.#Keys.set( 104, this.#Ten8 );
		this.#Keys.set( 105, this.#Ten9 );
	}
	
	onKeyDown( e ){
		if( this.#Keys.has( e.keyCode ) ){
			this.#Keys.get( e.keyCode ).code = true;
		}
	}
	
	onKeyUp( e ){
		if( this.#Keys.has( e.keyCode ) ){
			this.#Keys.get( e.keyCode ).code = false;
		}
	}
	
	Update(){
		// キーボード
		for( let v of this.#Keys.values() ){
			if( v.code ){
				switch( v.state ){
				case STOP:	break;
				case FREE:	v.state = PUSH;	break;
				case PUSH:	v.state = HOLD;	break;
				case HOLD:	break;
				case PULL:	v.state = PUSH;	break;
				}
			}else{
				switch( v.state ){
				case STOP:	break;
				case FREE:	break;
				case PUSH:	v.state = PULL;	break;
				case HOLD:	v.state = PULL;	break;
				case PULL:	v.state = FREE;	break;
				}
			}
		}
		
		// マウス
		if( this.#Mouse.L_Button ){
			switch( this.#Mouse.L ){
			case STOP:	break;
			case FREE:	this.#Mouse.L = PUSH;	break;
			case PUSH:	this.#Mouse.L = HOLD;	break;
			case HOLD:	break;
			case PULL:	this.#Mouse.L = PUSH;	break;
			}
		}else{
			switch( this.#Mouse.L ){
			case STOP:	break;
			case FREE:	break;
			case PUSH:	this.#Mouse.L = PULL;	break;
			case HOLD:	this.#Mouse.L = PULL;	break;
			case PULL:	this.#Mouse.L = FREE;	break;
			}
		}
		
		// ゲームパッド
		let pad = navigator.getGamepads()[0];
		if( null != pad ){
			for( let i = 0 ; i < pad.buttons.length ; i++ ){
				if( true == pad.buttons[i].pressed ){
					switch( this.#Pad.Button[i] ){
					case STOP:	break;
					case FREE:	this.#Pad.Button[i] = PUSH;	break;
					case PUSH:	this.#Pad.Button[i] = HOLD;	break;
					case HOLD:	break;
					case PULL:	this.#Pad.Button[i] = PUSH;	break;
					}
				}else{
					switch( this.#Pad.Button[i] ){
					case STOP:	break;
					case FREE:	break;
					case PUSH:	this.#Pad.Button[i] = PULL;	break;
					case HOLD:	this.#Pad.Button[i] = PULL;	break;
					case PULL:	this.#Pad.Button[i] = FREE;	break;
					}
				}
			}
			this.#Pad.A		= this.#Pad.Button[0];
			this.#Pad.B		= this.#Pad.Button[1];
			this.#Pad.X		= this.#Pad.Button[2];
			this.#Pad.Y		= this.#Pad.Button[3];
			this.#Pad.L		= this.#Pad.Button[4];
			this.#Pad.R		= this.#Pad.Button[5];
			this.#Pad.LT	= this.#Pad.Button[6];
			this.#Pad.RT	= this.#Pad.Button[7];
			this.#Pad.Back	= this.#Pad.Button[8];
			this.#Pad.Start	= this.#Pad.Button[9];
			this.#Pad.LS	= this.#Pad.Button[10];
			this.#Pad.RS	= this.#Pad.Button[11];
			this.#Pad.Up	= this.#Pad.Button[12];
			this.#Pad.Down	= this.#Pad.Button[13];
			this.#Pad.Left	= this.#Pad.Button[14];
			this.#Pad.Right	= this.#Pad.Button[15];
			
			this.#Pad.LX = pad.axes[0];
			this.#Pad.LY = pad.axes[1];
			this.#Pad.RX = pad.axes[2];
			this.#Pad.RY = pad.axes[3];
		}
	}// Update()
}
const Input = new CInput();
