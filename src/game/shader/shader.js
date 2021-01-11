// 基本シェーダー
class CBasicShader{
	constructor(){
		this.VScode = "\
			uniform mat4 mWVP;\
			\
			attribute vec3 pos;\
			attribute vec3 normal;\
			attribute vec2 uv;\
			\
			varying vec3 vNormal;\
			varying vec2 texCoord;\
			\
			void main(void){\
				gl_Position = mWVP * vec4( pos, 1.0 );\
				vNormal = normal;\
				texCoord = uv;\
			}\
		";
		
		this.FScode = "\
			precision mediump float;\
			\
			uniform sampler2D texture;\
			varying vec3 vNormal;\
			varying vec2 texCoord;\
			\
			void main(void){\
				vec4 smpColor = texture2D( texture, texCoord );\
				vec3 N = vNormal;\
				vec3 L = normalize( vec3( 0, 1, 0) );\
				\
				float d = dot( L, N );\
				float p = (d * 0.15 + 0.85);\
				p = p * p;\
				\
				vec4 color = p * smpColor;\
				color.w = smpColor.w;\
				\
				gl_FragColor = color;\
			}\
		";
		
		this.VS = null;
		this.FS = null;
		this.PO = null;
		this.attrPos = null;
		this.attrNormal = null;
		this.attrUV = null;
		this.uniWVP = null;
		this.uniTex = null;
	}
	
	Initialize( gl ){
		// 頂点シェーダ
		this.VS = gl.createShader( gl.VERTEX_SHADER );
		// 生成されたシェーダにソースを割り当てる
		gl.shaderSource( this.VS, this.VScode );
		// シェーダをコンパイルする
		gl.compileShader( this.VS );
		// シェーダが正しくコンパイルされたかチェック
		if( !gl.getShaderParameter( this.VS, gl.COMPILE_STATUS ) ){
			console.log( "VertexShaderコンパイル失敗" );
			return false;
		}
		this.VScode = null;
		
		// フラグメントシェーダ
		this.FS = gl.createShader( gl.FRAGMENT_SHADER );
		// 生成されたシェーダにソースを割り当てる
		gl.shaderSource( this.FS, this.FScode );
		// シェーダをコンパイルする
		gl.compileShader( this.FS );
		// シェーダが正しくコンパイルされたかチェック
		if( !gl.getShaderParameter( this.FS, gl.COMPILE_STATUS ) ){
			console.log( "FragmentShaderコンパイル失敗" );
			return false;
		}
		this.FScode = null;
		
		// プログラムオブジェクト
		this.PO = gl.createProgram();
		// プログラムオブジェクトにシェーダを割り当てる
		gl.attachShader( this.PO, this.VS );
		gl.attachShader( this.PO, this.FS );
		// シェーダをリンク
		gl.linkProgram( this.PO );
		// シェーダのリンクが正しく行なわれたかチェック
		if( !gl.getProgramParameter( this.PO, gl.LINK_STATUS ) ){
			console.log( "シェーダーリンク失敗" );
			return false;
		}
		// 成功していたらプログラムオブジェクトを有効にする
		gl.useProgram( this.PO );
		
		// attributeLocationの取得
		this.attrPos = gl.getAttribLocation( this.PO, 'pos' );
		this.attrNormal = gl.getAttribLocation( this.PO, 'normal' );
		this.attrUV = gl.getAttribLocation( this.PO, 'uv' );
		
		// attribute属性を有効にする
		gl.enableVertexAttribArray( this.attrPos );
		gl.enableVertexAttribArray( this.attrNormal );
		gl.enableVertexAttribArray( this.attrUV );
		
		// uniformLocationを取得
		this.uniWVP = gl.getUniformLocation( this.PO, 'mWVP' );
		this.uniTex = gl.getUniformLocation( this.PO, 'texture' );
		
		return true;
	}
	
	Render( gl, mesh, m ){
		gl.useProgram( this.PO );
		// VBをバインド
		gl.bindBuffer( gl.ARRAY_BUFFER, mesh.VB );
		// attribute属性を登録
		const byteStride = (4*(3+3+2));
		gl.vertexAttribPointer( this.attrPos, 3, gl.FLOAT, false, byteStride, 0 );
		gl.vertexAttribPointer( this.attrNormal, 3, gl.FLOAT, false, byteStride, 12 );
		gl.vertexAttribPointer( this.attrUV, 2, gl.FLOAT, false, byteStride, 24 );
		
		// 行列をバインド
		gl.uniformMatrix4fv( this.uniWVP, false, m.f );
		
		// テクスチャをバインドする
		gl.bindTexture( gl.TEXTURE_2D, mesh.Tex );
		// uniform変数にテクスチャを登録
		gl.uniform1i( this.uniTex, 0 );
		
		// モデルの描画
		gl.drawArrays( gl.TRIANGLES, 0, mesh.numVerteces );
		
		// コンテキストの再描画
		gl.flush();
	}
}

//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

// ハーフランバート
class CHLShader{
	constructor(){
		this.VScode = "\
			uniform mat4 mWVP;\
			\
			attribute vec3 pos;\
			attribute vec3 normal;\
			attribute vec2 uv;\
			\
			varying vec3 vNormal;\
			varying vec2 texCoord;\
			\
			void main(void){\
				gl_Position = mWVP * vec4( pos, 1.0 );\
				vNormal = normal;\
				texCoord = uv;\
			}\
		";
		
		this.FScode = "\
			precision mediump float;\
			\
			uniform sampler2D texture;\
			uniform vec3 LightDir;\
			\
			varying vec3 vNormal;\
			varying vec2 texCoord;\
			\
			void main(void){\
				vec4 smpColor = texture2D( texture, texCoord );\
				vec3 N = vNormal.xyz;\
				vec3 L = -LightDir;\
				\
				float d = dot( L, N );\
				float p = (d * 0.3 + 0.7);\
				p = p * p;\
				\
				vec4 color = p * smpColor;\
				color.w = smpColor.w;\
				\
				gl_FragColor = color;\
			}\
		";
		
		this.VS = null;
		this.FS = null;
		this.PO = null;
		this.attrPos = null;
		this.attrNormal = null;
		this.attrUV = null;
		this.uniWVP = null;
		this.uniLightDir = null;
		this.uniTex = null;
	}
	
	Initialize( gl ){
		// 頂点シェーダ
		this.VS = gl.createShader( gl.VERTEX_SHADER );
		// 生成されたシェーダにソースを割り当てる
		gl.shaderSource( this.VS, this.VScode );
		// シェーダをコンパイルする
		gl.compileShader( this.VS );
		// シェーダが正しくコンパイルされたかチェック
		if( !gl.getShaderParameter( this.VS, gl.COMPILE_STATUS ) ){
			console.log( "VertexShaderコンパイル失敗" );
			return false;
		}
		this.VScode = null;
		
		// フラグメントシェーダ
		this.FS = gl.createShader( gl.FRAGMENT_SHADER );
		// 生成されたシェーダにソースを割り当てる
		gl.shaderSource( this.FS, this.FScode );
		// シェーダをコンパイルする
		gl.compileShader( this.FS );
		// シェーダが正しくコンパイルされたかチェック
		if( !gl.getShaderParameter( this.FS, gl.COMPILE_STATUS ) ){
			console.log( "FragmentShaderコンパイル失敗" );
			return false;
		}
		this.FScode = null;
		
		// プログラムオブジェクト
		this.PO = gl.createProgram();
		// プログラムオブジェクトにシェーダを割り当てる
		gl.attachShader( this.PO, this.VS );
		gl.attachShader( this.PO, this.FS );
		// シェーダをリンク
		gl.linkProgram( this.PO );
		// シェーダのリンクが正しく行なわれたかチェック
		if( !gl.getProgramParameter( this.PO, gl.LINK_STATUS ) ){
			console.log( "シェーダーリンク失敗" );
			return false;
		}
		// 成功していたらプログラムオブジェクトを有効にする
		gl.useProgram( this.PO );
		
		// attributeLocationの取得
		this.attrPos = gl.getAttribLocation( this.PO, 'pos' );
		this.attrNormal = gl.getAttribLocation( this.PO, 'normal' );
		this.attrUV = gl.getAttribLocation( this.PO, 'uv' );
		
		// attribute属性を有効にする
		gl.enableVertexAttribArray( this.attrPos );
		gl.enableVertexAttribArray( this.attrNormal );
		gl.enableVertexAttribArray( this.attrUV );
		
		// uniformLocationを取得
		this.uniWVP = gl.getUniformLocation( this.PO, 'mWVP' );
		this.uniLightDir = gl.getUniformLocation( this.PO, 'LightDir' );
		this.uniTex = gl.getUniformLocation( this.PO, 'texture' );
		
		return true;
	}
	
	Render( gl, mesh, m, light ){
		gl.useProgram( this.PO );
		// VBをバインド
		gl.bindBuffer( gl.ARRAY_BUFFER, mesh.VB );
		// attribute属性を登録
		const byteStride = (4*(3+3+2));
		gl.vertexAttribPointer( this.attrPos, 3, gl.FLOAT, false, byteStride, 0 );
		gl.vertexAttribPointer( this.attrNormal, 3, gl.FLOAT, false, byteStride, 12 );
		gl.vertexAttribPointer( this.attrUV, 2, gl.FLOAT, false, byteStride, 24 );
		
		// 行列をバインド
		gl.uniformMatrix4fv( this.uniWVP, false, m.f );
		// ディレクショナルライト
		gl.uniform3fv( this.uniLightDir, light );
		
		// テクスチャをバインドする
		gl.bindTexture( gl.TEXTURE_2D, mesh.Tex );
		// uniform変数にテクスチャを登録
		gl.uniform1i( this.uniTex, 0 );
		
		// モデルの描画
		gl.drawArrays( gl.TRIANGLES, 0, mesh.numVerteces );
		
		// コンテキストの再描画
		gl.flush();
	}
}

//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

// フォン
class CPhongShader{
	constructor(){
		this.VScode = "\
			uniform mat4 mWVP;\
			uniform vec3 EyeDir;\
			\
			attribute vec3 pos;\
			attribute vec3 normal;\
			attribute vec2 uv;\
			\
			varying vec3 vNormal;\
			varying vec3 vEye;\
			varying vec2 texCoord;\
			\
			void main(void){\
				gl_Position = mWVP * vec4( pos, 1.0 );\
				vNormal = normal;\
				vEye = normalize( EyeDir - pos );\
				texCoord = uv;\
			}\
		";
		
		this.FScode = "\
			precision mediump float;\
			\
			uniform sampler2D texture;\
			uniform vec3 LightDir;\
			uniform float Range;\
			uniform float Power;\
			\
			varying vec3 vNormal;\
			varying vec3 vEye;\
			varying vec2 texCoord;\
			\
			void main(void){\
				vec4 smpColor = texture2D( texture, texCoord );\
				vec3 N = vNormal.xyz;\
				vec3 L = -LightDir;\
				\
				float d = dot( L, N );\
				float p = (d * 0.4 + 0.6);\
				p = p * p;\
				\
				vec3 H = normalize( L + vEye );\
				float fPhong = pow( max( 0.0, dot(N, H) ), Range ) * Power;\
				\
				vec4 color = p * smpColor + fPhong;\
				color.w = smpColor.w;\
				\
				gl_FragColor = color;\
			}\
		";
		
		this.VS = null;
		this.FS = null;
		this.PO = null;
		this.attrPos = null;
		this.attrNormal = null;
		this.attrUV = null;
		this.uniWVP = null;
		this.uniEyeDir= null;
		this.uniLightDir = null;
		this.uniRange= null;
		this.uniPower= null;
		this.uniTex = null;
	}
	
	Initialize( gl ){
		// 頂点シェーダ
		this.VS = gl.createShader( gl.VERTEX_SHADER );
		// 生成されたシェーダにソースを割り当てる
		gl.shaderSource( this.VS, this.VScode );
		// シェーダをコンパイルする
		gl.compileShader( this.VS );
		// シェーダが正しくコンパイルされたかチェック
		if( !gl.getShaderParameter( this.VS, gl.COMPILE_STATUS ) ){
			console.log( "VertexShaderコンパイル失敗" );
			return false;
		}
		this.VScode = null;
		
		// フラグメントシェーダ
		this.FS = gl.createShader( gl.FRAGMENT_SHADER );
		// 生成されたシェーダにソースを割り当てる
		gl.shaderSource( this.FS, this.FScode );
		// シェーダをコンパイルする
		gl.compileShader( this.FS );
		// シェーダが正しくコンパイルされたかチェック
		if( !gl.getShaderParameter( this.FS, gl.COMPILE_STATUS ) ){
			console.log( "FragmentShaderコンパイル失敗" );
			return false;
		}
		this.FScode = null;
		
		// プログラムオブジェクト
		this.PO = gl.createProgram();
		// プログラムオブジェクトにシェーダを割り当てる
		gl.attachShader( this.PO, this.VS );
		gl.attachShader( this.PO, this.FS );
		// シェーダをリンク
		gl.linkProgram( this.PO );
		// シェーダのリンクが正しく行なわれたかチェック
		if( !gl.getProgramParameter( this.PO, gl.LINK_STATUS ) ){
			console.log( "シェーダーリンク失敗" );
			return false;
		}
		// 成功していたらプログラムオブジェクトを有効にする
		gl.useProgram( this.PO );
		
		// attributeLocationの取得
		this.attrPos = gl.getAttribLocation( this.PO, 'pos' );
		this.attrNormal = gl.getAttribLocation( this.PO, 'normal' );
		this.attrUV = gl.getAttribLocation( this.PO, 'uv' );
		
		// attribute属性を有効にする
		gl.enableVertexAttribArray( this.attrPos );
		gl.enableVertexAttribArray( this.attrNormal );
		gl.enableVertexAttribArray( this.attrUV );
		
		// uniformLocationを取得
		this.uniWVP = gl.getUniformLocation( this.PO, 'mWVP' );
		this.uniEyeDir = gl.getUniformLocation( this.PO, 'EyeDir' );
		this.uniLightDir = gl.getUniformLocation( this.PO, 'LightDir' );
		this.uniRange = gl.getUniformLocation( this.PO, 'Range' );
		this.uniPower = gl.getUniformLocation( this.PO, 'Power' );
		this.uniTex = gl.getUniformLocation( this.PO, 'texture' );
		
		return true;
	}
	
	Render( gl, mesh, m, eye, light, range, power ){
		gl.useProgram( this.PO );
		// VBをバインド
		gl.bindBuffer( gl.ARRAY_BUFFER, mesh.VB );
		// attribute属性を登録
		const byteStride = (4*(3+3+2));
		gl.vertexAttribPointer( this.attrPos, 3, gl.FLOAT, false, byteStride, 0 );
		gl.vertexAttribPointer( this.attrNormal, 3, gl.FLOAT, false, byteStride, 12 );
		gl.vertexAttribPointer( this.attrUV, 2, gl.FLOAT, false, byteStride, 24 );
		
		// 行列をバインド
		gl.uniformMatrix4fv( this.uniWVP, false, m.f );
		// 視線ベクトル
		gl.uniform3fv( this.uniEyeDir, eye );
		// ディレクショナルライト
		gl.uniform3fv( this.uniLightDir, light );
		// フォン範囲
		gl.uniform1f( this.uniRange, range );
		// フォン強さ
		gl.uniform1f( this.uniPower, power );
		
		// テクスチャをバインドする
		gl.bindTexture( gl.TEXTURE_2D, mesh.Tex );
		// uniform変数にテクスチャを登録
		gl.uniform1i( this.uniTex, 0 );
		
		// モデルの描画
		gl.drawArrays( gl.TRIANGLES, 0, mesh.numVerteces );
		
		// コンテキストの再描画
		gl.flush();
	}
}

//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
