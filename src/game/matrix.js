// 行列クラス
class CMatrix{
	// コンストラクタ
	constructor(){
		this._11 = 1; this._12 = 0; this._13 = 0; this._14 = 0;
		this._21 = 0; this._22 = 1; this._23 = 0; this._24 = 0;
		this._31 = 0; this._32 = 0; this._33 = 1; this._34 = 0;
		this._41 = 0; this._42 = 0; this._43 = 1; this._44 = 1;
	}
	// Z回転行列を作成
	static RotationZ( _m, _fRadian ){
		let fSinZ = Math.sin( _fRadian );
		let fCosZ = Math.cos( _fRadian );

		_m._11 = fCosZ;
		_m._12 = fSinZ;
		_m._13 = 0.0;
		_m._14 = 0.0;

		_m._21 = (-fSinZ);
		_m._22 = fCosZ;
		_m._23 = 0.0;
		_m._24 = 0.0;

		_m._31 = 0.0;
		_m._32 = 0.0;
		_m._33 = 1.0;
		_m._34 = 0.0;

		_m._41 = 0.0;
		_m._42 = 0.0;
		_m._43 = 0.0;
		_m._44 = 1.0;
	}
}

