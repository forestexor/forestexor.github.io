// 2次元ベクトルクラス
class CVector2{
	// コンストラクタ
	constructor( x = 0, y = 0 ){
		this.x = x;
		this.y = y;
	}
	
	Add( v ){
		this.x += v.x;
		this.y += v.y;
	}
	
	// 加算( CVector2, CVector2 )
	static Add( v0, v1 ){
		return new CVector2( (v0.x + v1.x), (v0.y + v1.y) );
	}
	// 減算( CVector2, CVector2 )
	static Sub( v0, v1 ){
		return new CVector2( (v0.x - v1.x), (v0.y - v1.y) );
	}
	// 乗算( CVector2, float )
	static Multiply( v, f ){
		return new CVector2( (v.x * f), (v.y * f) );
	}
	// 除算( CVector2, float )
	static Divide( v, f ){
		if( 0.0 == f ){ return v; }
		return new CVector2( (v.x / f), (v.y / f) );
	}
	// ベクトルを別オブジェクトとして複製する
	static Copy( v ){
		return new CVector2( v.x, v.y );
	}
	// ベクトルの長さを返す
	static Length( v ){
		return Math.sqrt( ((v.x * v.x) + (v.y * v.y)) );
	}
	// 正規化する
	static Normalize( v ){
		var L = CVector2.Length( v );
		v.x = v.x / L;
		v.y = v.y / L;
	}
	// 正規化したベクトルを返す
	static Unit( v ){
		var L = CVector2.Length( v );
		return new CVector2( (v.x / L), (v.y / L) );
	}
	// 内積を返す
	static Dot( v0, v1 ){
		return ((v0.x * v1.x) + (v0.y * v1.y));
	}
	// 外積を返す
	static Cross( v0, v1 ){
		return ((v0.x * v1.y) - (v0.y * v1.x));
	}
}

