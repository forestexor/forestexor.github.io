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

// 入力機器クラス
class CInput{
	// キーボード
	#Key = class CKey{
		constructor( code ){
			this.code = code;
			this.state = FREE;
		}
	}
	
	#codes = new Array();
	#keys = new Array();
	
	#Enter	= new this.#Key( 13 );
	#Shift	= new this.#Key( 16 );
	#Ctrl	= new this.#Key( 17 );
	#Alt	= new this.#Key( 18 );
	#Space	= new this.#Key( 32 );
	#Left	= new this.#Key( 37 );
	#Up		= new this.#Key( 38 );
	#Right	= new this.#Key( 39 );
	#Down	= new this.#Key( 40 );
	get Enter()	{ return this.#Enter.state;	}
	get Shift()	{ return this.#Shift.state;	}
	get Ctrl()	{ return this.#Ctrl.state;	}
	get Alt()	{ return this.#Alt.state;	}
	get Space()	{ return this.#Space.state;	}
	get Left()	{ return this.#Left.state;	}
	get Up()	{ return this.#Up.state;	}
	get Right()	{ return this.#Right.state;	}
	get Down()	{ return this.#Down.state;	}
	
	#_0 = new this.#Key( 48 );
	#_1 = new this.#Key( 49 );
	#_2 = new this.#Key( 50 );
	#_3 = new this.#Key( 51 );
	#_4 = new this.#Key( 52 );
	#_5 = new this.#Key( 53 );
	#_6 = new this.#Key( 54 );
	#_7 = new this.#Key( 55 );
	#_8 = new this.#Key( 56 );
	#_9 = new this.#Key( 57 );
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
	    
	#A = new this.#Key( 65 );
	#B = new this.#Key( 66 );
	#C = new this.#Key( 67 );
	#D = new this.#Key( 68 );
	#E = new this.#Key( 69 );
	#F = new this.#Key( 70 );
	#G = new this.#Key( 71 );
	#H = new this.#Key( 72 );
	#I = new this.#Key( 73 );
	#J = new this.#Key( 74 );
	#K = new this.#Key( 75 );
	#L = new this.#Key( 76 );
	#M = new this.#Key( 77 );
	#N = new this.#Key( 78 );
	#O = new this.#Key( 79 );
	#P = new this.#Key( 80 );
	#Q = new this.#Key( 81 );
	#R = new this.#Key( 82 );
	#S = new this.#Key( 83 );
	#T = new this.#Key( 84 );
	#U = new this.#Key( 85 );
	#V = new this.#Key( 86 );
	#W = new this.#Key( 87 );
	#X = new this.#Key( 88 );
	#Y = new this.#Key( 89 );
	#Z = new this.#Key( 90 );
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
	
	#Ten0 = new this.#Key( 96 );
	#Ten1 = new this.#Key( 97 );
	#Ten2 = new this.#Key( 98 );
	#Ten3 = new this.#Key( 99 );
	#Ten4 = new this.#Key( 100 );
	#Ten5 = new this.#Key( 101 );
	#Ten6 = new this.#Key( 102 );
	#Ten7 = new this.#Key( 103 );
	#Ten8 = new this.#Key( 104 );
	#Ten9 = new this.#Key( 105 );
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
			this.button = false;
			this.State = FREE;
			this.x = 0;
			this.y = 0;
		}
	}
	#Mouse = new this.#MOUSE();
	get Mouse(){ return this.#Mouse; }
	
	// ゲームパッド
/*
	XBOX360
	 0:A    /  1:B     /  2:X  /  3:Y
	 4:L    /  5:R     /  6:LT /  7:RT
	 8:BACK /  9:START / 10:LS / 11:RS
	12:↑   / 13:↓    / 14:← / 15:→
*/	
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
	
	constructor(){
		this.#keys.push( this.#Enter );
		this.#keys.push( this.#Shift );
		this.#keys.push( this.#Ctrl );
		this.#keys.push( this.#Alt );
		this.#keys.push( this.#Space );
		this.#keys.push( this.#Left );
		this.#keys.push( this.#Up );
		this.#keys.push( this.#Right );
		this.#keys.push( this.#Down );
		
		this.#keys.push( this.#_0 );
		this.#keys.push( this.#_1 );
		this.#keys.push( this.#_2 );
		this.#keys.push( this.#_3 );
		this.#keys.push( this.#_4 );
		this.#keys.push( this.#_5 );
		this.#keys.push( this.#_6 );
		this.#keys.push( this.#_7 );
		this.#keys.push( this.#_8 );
		this.#keys.push( this.#_9 );
		
		this.#keys.push( this.#A );
		this.#keys.push( this.#B );
		this.#keys.push( this.#C );
		this.#keys.push( this.#D );
		this.#keys.push( this.#E );
		this.#keys.push( this.#F );
		this.#keys.push( this.#G );
		this.#keys.push( this.#H );
		this.#keys.push( this.#I );
		this.#keys.push( this.#J );
		this.#keys.push( this.#K );
		this.#keys.push( this.#L );
		this.#keys.push( this.#M );
		this.#keys.push( this.#N );
		this.#keys.push( this.#O );
		this.#keys.push( this.#P );
		this.#keys.push( this.#Q );
		this.#keys.push( this.#R );
		this.#keys.push( this.#S );
		this.#keys.push( this.#T );
		this.#keys.push( this.#U );
		this.#keys.push( this.#V );
		this.#keys.push( this.#W );
		this.#keys.push( this.#X );
		this.#keys.push( this.#Y );
		this.#keys.push( this.#Z );
		
		this.#keys.push( this.#Ten0 );
		this.#keys.push( this.#Ten1 );
		this.#keys.push( this.#Ten2 );
		this.#keys.push( this.#Ten3 );
		this.#keys.push( this.#Ten4 );
		this.#keys.push( this.#Ten5 );
		this.#keys.push( this.#Ten6 );
		this.#keys.push( this.#Ten7 );
		this.#keys.push( this.#Ten8 );
		this.#keys.push( this.#Ten9 );
	}
	
	onKeyDown( code ){
		this.#codes[code] = true;
	}

	onKeyUp( code ){
		this.#codes[code] = false;
	}

	Update(){
		// キーボード
		for( let i = 0 ; i < this.#keys.length ; i++ ){
			if( this.#codes[this.#keys[i].code] ){
				switch( this.#keys[i].state ){
				case STOP:	break;
				case FREE:	this.#keys[i].state = PUSH;	break;
				case PUSH:	this.#keys[i].state = HOLD;	break;
				case HOLD:	break;
				case PULL:	this.#keys[i].state = PUSH;	break;
				}
			}else{
				switch( this.#keys[i].state ){
				case STOP:	break;
				case FREE:	break;
				case PUSH:	this.#keys[i].state = PULL;	break;
				case HOLD:	this.#keys[i].state = PULL;	break;
				case PULL:	this.#keys[i].state = FREE;	break;
				}
			}
		}
		
		// マウス
		if( this.#Mouse.button ){
			switch( this.#Mouse.State ){
			case STOP:	break;
			case FREE:	this.#Mouse.State = PUSH;	break;
			case PUSH:	this.#Mouse.State = HOLD;	break;
			case HOLD:	break;
			case PULL:	this.#Mouse.State = PUSH;	break;
			}
		}else{
			switch( this.#Mouse.State ){
			case STOP:	break;
			case FREE:	break;
			case PUSH:	this.#Mouse.State = PULL;	break;
			case HOLD:	this.#Mouse.State = PULL;	break;
			case PULL:	this.#Mouse.State = FREE;	break;
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
	}
}

const Input = new CInput();
