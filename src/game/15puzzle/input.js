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

	// コンストラクタ
	constructor(){
	}
	
	Update(){
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
	}// Update()
}
const Input = new CInput();
