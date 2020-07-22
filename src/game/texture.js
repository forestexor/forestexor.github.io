// レクトクラス
class CRect{
	constructor( left = 0, top = 0, width = 0, height = 0 ){
		this.left = left;
		this.top = top;
		this.width = width;
		this.height = height;
	}
}

// テクスチャクラス
class CTexture{
	constructor(){
		this.isLoad = false;
		this.image = null;
		this.rect = null;
		this.hWidth = 0;
		this.hHeight = 0;
	};
	
	Load( path ){
		this.image = new Image();
		this.image.addEventListener( "load", () => {
			this.hWidth = this.image.width * 0.5;
			this.hHeight = this.image.height * 0.5;
			this.isLoad = true;
		}, false);
		this.image.src = path;
	}
	
	Slice( xSize, xNum, ySize, yNum ){
		this.rect = [];
		for( let y = 0 ; y < yNum ; y++ ){
			let yRect = [];
			for( let x = 0 ; x < xNum ; x++ ){
				let xRect = new CRect();
				xRect.left = x * xSize;
				xRect.width =  xSize;
				xRect.top = y * ySize;
				xRect.height = ySize;
				
				yRect.push( xRect );
			}
			this.rect.push( yRect );
		}
		this.hWidth = xSize * 0.5;
		this.hHeight = ySize * 0.5;
	}
	
	Draw( ctx ){
		ctx.drawImage(	this.image,
						0,
						0,
						this.image.width,
						this.image.height,
						-this.hWidth,
						-this.hHeight,
						this.image.width,
						this.image.height
		);
	}
	
	DrawRect( ctx, x, y ){
		ctx.drawImage(	this.image,
						this.rect[y][x].left,
						this.rect[y][x].top,
						this.rect[y][x].width,
						this.rect[y][x].height,
						-this.hWidth,
						-this.hHeight,
						this.rect[y][x].width,
						this.rect[y][x].height
		);
	}
}

