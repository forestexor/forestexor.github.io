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
	}// Update()
}
const Input = new CInput();
