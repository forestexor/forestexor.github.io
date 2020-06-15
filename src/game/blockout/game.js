// ゲームクラス
class CGame{
	constructor( canvas, context ){
		this.canvas = canvas;
		this.ctx = context;
//		this.gamemode = new title();
//		this.gamemode = new CTitle();
		this.gamemode = new CHoge();
	}
	
	Run(){
		this.ctx.clearRect( 0, 0, this.canvas.width, this.canvas.height );
		
		this.gamemode.FrameRender( this.ctx );
		this.gamemode = this.gamemode.FrameMove();
	}
}

let title = function(){
	class CFuga{
		constructor( num ){
			this.hoge = new CHoge( num );
		}
	}
	
	class CHoge{
		constructor( num ){
			this.hoge = num;
		}
	}
	
	this.count = 0;
	
	this.hoge0 = new CHoge( 0 );
	this.fuga0 = new CFuga( 100 );
	
	let Initialize = function(){
		if( 120 > this.count ){
			this.count++;
		}else{
			this.FrameMove = Main;
		}
		return this;
	}
	
	let Main = function(){
		if( PUSH == Input.Z ){
			return new game();
		}
		this.hoge0.hoge++;
		this.fuga0.hoge.hoge++;
		return this;
	}
	this.FrameMove = Initialize;
	
	this.FrameRender = function( ctx ){
		ctx.save();
		ctx.beginPath();
		
		ctx.setTransform( 1, 0, 0, 1, 0, 0 );
		ctx.textAlign = "left";
		ctx.textBaseline = "top";
		ctx.fillStyle = "white";
		ctx.font = "15px 'Arial'";
		
		if( 120 > this.count ){
			ctx.fillText( "初期化中です。", 10, 10 );
		}else{
			ctx.fillText( "ここはタイトルです。", 10, 10 );
		}
		ctx.fillText( this.count, 20, 30 );
		
		ctx.fillText( "hoge0:" + this.hoge0.hoge, 20, 50 );
		ctx.fillText( "fuga0:" + this.fuga0.hoge.hoge, 20, 70 );
		
		ctx.closePath();
		ctx.restore();
	}
}

let game = function(){
	
	this.FrameMove = function(){
		if( PUSH == Input.Z ){
			return new title();
		}
		return this;
	}
	
	this.FrameRender = function( ctx ){
		ctx.save();
		ctx.beginPath();
		
		ctx.setTransform( 1, 0, 0, 1, 0, 0 );
		ctx.textAlign = "left";
		ctx.textBaseline = "top";
		ctx.fillStyle = "white";
		ctx.font = "15px 'Arial'";
		
		ctx.fillText( "ここはゲームです。", 10, 10 );
		
		ctx.closePath();
		ctx.restore();
	}
}

////////////////////////////////////////////////////////////

class CTitle{
	
	CHoge = class{
		constructor( num ){
			this.hoge = num;
		}
	}
	
	constructor(){
		this.count = 0;
		this.FrameMove = this.Initialize;
		
		this.hoge0 = new this.CHoge( 0 );
	}
	
	Initialize(){
		if( 120 > this.count ){
			this.count++;
		}else{
			this.FrameMove = this.Main;
		}
		return this;
	}
	
	Main(){
		if( PUSH == Input.Z ){
			return new CMainGame();
		}
		this.hoge0.hoge++;
		return this;
	}
	
	FrameRender( ctx ){
		ctx.save();
		ctx.beginPath();
		
		ctx.setTransform( 1, 0, 0, 1, 0, 0 );
		ctx.textAlign = "left";
		ctx.textBaseline = "top";
		ctx.fillStyle = "white";
		ctx.font = "15px 'Arial'";
		
		if( 120 > this.count ){
			ctx.fillText( "初期化中です。", 10, 10 );
		}else{
			ctx.fillText( "ここはタイトルです。", 10, 10 );
		}
		ctx.fillText( this.count, 20, 30 );
		
		ctx.fillText( "hoge0:" + this.hoge0.hoge, 20, 50 );
		
		ctx.closePath();
		ctx.restore();
	}
}

class CMainGame{
	constructor(){
	}
	
	FrameMove(){
		if( PUSH == Input.Z ){
			return new CTitle();
		}
		return this;
	}
	
	FrameRender( ctx ){
		ctx.save();
		ctx.beginPath();
		
		ctx.setTransform( 1, 0, 0, 1, 0, 0 );
		ctx.textAlign = "left";
		ctx.textBaseline = "top";
		ctx.fillStyle = "white";
		ctx.font = "15px 'Arial'";
		
		ctx.fillText( "ここはゲームです。", 10, 10 );
		
		ctx.closePath();
		ctx.restore();
	}
}

////////////////////////////////////////////////////////////
class CFuga{
	constructor( num ){
		this.num = num;
	}
}
class CPiyo{
	constructor(){
		this.fuga = new CFuga( 0 );
	}
}

class CHoge{
	constructor(){
		this.fuga = new CFuga( 0 );
		this.piyo = new CPiyo();
		
		this.count = 0;
		this.FrameMove = this.Initialize;
	}
	
	Initialize(){
		if( 120 > this.count ){
			this.count++;
		}else{
			this.FrameMove = this.Main;
		}
		return this;
	}
	
	Main(){
		this.fuga.num++;
		return this;
	}
	
	FrameRender( ctx ){
		ctx.save();
		ctx.beginPath();
		
		ctx.setTransform( 1, 0, 0, 1, 0, 0 );
		ctx.textAlign = "left";
		ctx.textBaseline = "top";
		ctx.fillStyle = "white";
		ctx.font = "15px 'Arial'";
		
		if( 120 > this.count ){
			ctx.fillText( "初期化中です。", 10, 10 );
		}else{
			ctx.fillText( "ここはタイトルです。", 10, 10 );
		}
		ctx.fillText( this.count, 20, 30 );
		
		ctx.fillText( "fuga:" + this.fuga.num, 20, 50 );
		
		ctx.closePath();
		ctx.restore();
	}
}
