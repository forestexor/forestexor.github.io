//=======================================================================

// 形状クラス
class IShape{
	static #Number = 1;
	#num;
	get Num(){ return this.#num }
	#type;
	get Type(){ return this.#type; }
	
	constructor( type, px=0, py=0, rot=0 ){
		this.#num = IShape.#Number++;
		this.#type = type;
		this.Body = IShape.GHOST;
		this.Pos = new CVector2( px, py );
		this.Rot = new CVector3( 0.0, 0.0, rot );
		this.Vec = new CVector2( 0.0, 0.0 );
	}
	
	Update(){}
	
	// ボディタイプ
	static get GHOST()	{ return 0; }
	static get STATIC()	{ return 1; }
	static get DYNAMIC(){ return 2; }
	// 形状
	static get CIRCLE()	{ return 0; }
	static get LINE()	{ return 1; }
	static get BOX()	{ return 2; }
	static get FBOX()	{ return 3; }
}

//=======================================================================

// 円形状クラス
class CCircle extends IShape{
	constructor( px = 0, py = 0, radius ){
		super( IShape.CIRCLE, px, py );
		this.Radius = radius;
	}
	// 更新
	Update(){
		this.Pos.x += this.Vec.x;
		this.Pos.y += this.Vec.y;
	}
	
	// デバッグ描画
	DebugRender( ctx, Camera = null ){
		ctx.beginPath();
			
		// 伸縮x, 傾斜y, 傾斜x, 伸縮y, 移動x, 移動y
		ctx.setTransform( 1, 0, 0, 1, 0, 0 );
		
		if( null != Camera ){
			ctx.translate( (this.Pos.x-Camera.x), (this.Pos.y-Camera.y) );
		}else{
			ctx.translate( this.Pos.x, this.Pos.y );
		}
		ctx.rotate( this.Rot.z );
		
		ctx.strokeStyle = "rgba( 255, 255, 255, 1.0 )";
		ctx.lineWidth = 1.0;
		// x, y, radius, startAngle, endAngle [, anticlockwise ]
		ctx.arc( 0, 0, this.Radius, 0, (Math.PI*2) );
		ctx.stroke()

		ctx.closePath();
	}
}

//=======================================================================

// 線分形状クラス
class CLine extends IShape{
	constructor( x0, y0, x1, y1, Slip = 0.0 ){
		super( IShape.LINE, x0, y0 );
		this.ePos = new CVector2( x1, y1 );
		let v = new CVector2( (x1 - x0), (y1 - y0) );
		this.Length = Math.sqrt((v.x * v.x) + (v.y * v.y));
		CVector2.Normalize( v );
		this.Rot.z = Math.atan2( v.y, v.x );
		this.Slip = Slip;
	}
	// 更新
	Update(){
		this.Pos.x += this.Vec.x;
		this.Pos.y += this.Vec.y;
		this.ePos.x = (this.Pos.x + (Math.cos(this.Rot.z) * this.Length));
		this.ePos.y = (this.Pos.y + (Math.sin(this.Rot.z) * this.Length));
	}
	// デバッグ描画
	DebugRender( ctx, Camera = null ){
		ctx.beginPath();
		
		ctx.strokeStyle = "rgba( 255, 255, 255, 1.0 )";
		ctx.lineWidth = 1;
		// 開始点
		ctx.setTransform( 1, 0, 0, 1, 0, 0 );
		if( null != Camera ){
			ctx.translate( (this.Pos.x-Camera.x), (this.Pos.y-Camera.y) );
		}else{
			ctx.translate( this.Pos.x, this.Pos.y );
		}
		ctx.moveTo( 0, 0 );
		// 終点
		ctx.setTransform( 1, 0, 0, 1, 0, 0 );
		if( null != Camera ){
			ctx.translate( (this.ePos.x-Camera.x), (this.ePos.y-Camera.y) );
		}else{
			ctx.translate( this.ePos.x, this.ePos.y );
		}

		ctx.lineTo( 0, 0 );
		ctx.stroke();
		
		ctx.closePath();
	}
}

//=======================================================================

// 回転ボックス（OBB）クラス
class CBox extends IShape{
	constructor( px, py, xrad, yrad, rot ){
		super( IShape.BOX, px, py, rot );
		this.XRadius = xrad;
		this.YRadius = yrad;
	}
	// 更新
	Update(){
		this.Pos.x += this.Vec.x;
		this.Pos.y += this.Vec.y;
	}
	// デバッグ描画
	DebugRender( ctx, Camera = null ){
		ctx.beginPath();
		
		// 伸縮x, 傾斜y, 傾斜x, 伸縮y, 移動x, 移動y
		ctx.setTransform( 1, 0, 0, 1, 0, 0 );
		if( null != Camera ){
			ctx.translate( (this.Pos.x-Camera.x), (this.Pos.y-Camera.y) );
		}else{
			ctx.translate( this.Pos.x, this.Pos.y );
		}
		ctx.rotate( this.Rot.z );
		
		ctx.strokeStyle = "rgba( 255, 255, 255, 1.0 )";
		ctx.lineWidth = 1.0;
		ctx.strokeRect( -this.XRadius, -this.YRadius, (this.XRadius*2), (this.YRadius*2) );
		ctx.stroke()

		ctx.closePath();
	}
}
// OBB用
class COBB_Interval{
	constructor( min = 0, max = 0 ){
		this.min = min;
		this.max = max;
	}
}
class COBB_Bool{
	constructor( flag = false ){
		this.flag = flag;
	}
}

//=======================================================================

// 無回転ボックス（AABB）クラス
class CFixedBox extends IShape{
	constructor( px, py, xrad, yrad ){
		super( IShape.FBOX, px, py, 0.0 );
		this.XRadius = xrad;
		this.YRadius = yrad;
	}
	// 更新
	Update(){
		this.Pos.x += this.Vec.x;
		this.Pos.y += this.Vec.y;
	}
	// デバッグ描画
	DebugRender( ctx, Camera = null ){
		ctx.beginPath();
		
		// 伸縮x, 傾斜y, 傾斜x, 伸縮y, 移動x, 移動y
		ctx.setTransform( 1, 0, 0, 1, 0, 0 );
		if( null != Camera ){
			ctx.translate( (this.Pos.x-Camera.x), (this.Pos.y-Camera.y) );
		}else{
			ctx.translate( this.Pos.x, this.Pos.y );
		}
//		ctx.scale( this.Scl.x, this.Scl.y );
		
		ctx.strokeStyle = "rgba( 255, 255, 255, 1.0 )";
		ctx.lineWidth = 1.0;
		ctx.strokeRect( -this.XRadius, -this.YRadius, (this.XRadius*2), (this.YRadius*2) );
		ctx.stroke()

		ctx.closePath();
	}
}

//========================================================================
//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
//========================================================================

// 衝突検出クラス
class Collision{
	
	//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
	// 衝突検出
	static Detect( s0, s1 ){
		switch( s0.Type ){
		case IShape.CIRCLE:
			switch( s1.Type ){
			case IShape.CIRCLE:
				return Collision.Detect_CIRCLE_CIRCLE( s0, s1 );break;
			case IShape.LINE:
				return Collision.Detect_CIRCLE_LINE( s0, s1 );break;
			case IShape.BOX:
				return Collision.Detect_CIRCLE_BOX( s0, s1 );break;
			case IShape.FBOX:
				return Collision.Detect_CIRCLE_FBOX( s0, s1 );break;
			}
			break;
		case IShape.LINE:
			switch( s1.Type ){
			case IShape.CIRCLE:
				return Collision.Detect_CIRCLE_LINE( s1, s0 );break;
			case IShape.LINE:
				return Collision.Detect_LINE_LINE( s0, s1 );break;
			case IShape.BOX:
				return Collision.Detect_LINE_BOX( s0, s1 );break;
			case IShape.FBOX:
				return Collision.Detect_LINE_FBOX( s0, s1 );break;
			}
			break;
		case IShape.BOX:
			switch( s1.Type ){
			case IShape.CIRCLE:
				return Collision.Detect_CIRCLE_BOX( s1, s0 );break;
			case IShape.LINE:
				return Collision.Detect_LINE_BOX( s1, s0 );break;
			case IShape.BOX:
				return Collision.Detect_BOX_BOX( s0, s1 );break;
			case IShape.FBOX:
				return Collision.Detect_BOX_FBOX( s0, s1 );break;
			}
			break;
		case IShape.FBOX:
			switch( s1.Type ){
			case IShape.CIRCLE:
				return Collision.Detect_CIRCLE_FBOX( s1, s0 );break;
			case IShape.LINE:
				return Collision.Detect_LINE_FBOX( s1, s0 );break;
			case IShape.BOX:
				return Collision.Detect_BOX_FBOX( s1, s0 );break;
			case IShape.FBOX:
				return Collision.Detect_FBOX_FBOX( s0, s1 );break;
			}
			break;
		}
		return false;
	}
	
	//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
	// 円と円
	static Detect_CIRCLE_CIRCLE( c0, c1 ){
		let v = new CVector2( (c1.Pos.x - c0.Pos.x), (c1.Pos.y - c0.Pos.y));
		let d = Math.sqrt( ((v.x*v.x) + (v.y*v.y)) );
		let r = c0.Radius + c1.Radius;
		if( r >= d ){
			return true;
		}
		return false;
	}
	
	//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
	// 円と線
	static Detect_CIRCLE_LINE( c, l ){
		// ベクトルを生成
		let vAB = new CVector2( (l.ePos.x-l.Pos.x), (l.ePos.y-l.Pos.y) );
		let vAP = new CVector2( (c.Pos.x-l.Pos.x), (c.Pos.y-l.Pos.y) );
		let vBP = new CVector2( (c.Pos.x-l.ePos.x), (c.Pos.y-l.ePos.y) );
		// ABの単位ベクトルを計算
		let nAB = CVector2.Unit( vAB );
		// AからXまでの距離を単位ベクトルABとベクトルAPの内積で求める
		let lenAX = CVector2.Dot( nAB, vAP );
		
		let shortestDistance = 0.0;	// 線分APとPの最短距離
		if( 0 > lenAX ){
			// AXが負ならAPが円の中心までの最短距離
			shortestDistance = CVector2.Length( vAP );
		}else if( CVector2.Length( vAB ) < lenAX ){
			// AXがAPよりも長い場合は、BPが円の中心
			// までの最短距離
			shortestDistance = CVector2.Length( vBP );
		}else{
			// PがAB上にあるので、PXが最短距離単位ベクトルABとベクトルAPの外積で求める
			shortestDistance = Math.abs( CVector2.Cross( nAB, vAP ) );
		}
		
		// Xの座標を求める(AXの長さより計算）
		let vX = new CVector2(l.Pos.x + (nAB.x * lenAX), l.Pos.y + (nAB.y * lenAX));
		
		// 最短距離が円の半径よりも小さい場合は、当たり
		if( shortestDistance < c.Radius ){
			return true;
		}
		return false;
	}
	
	//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
	// 線と線
	static Detect_LINE_LINE( l0, l1 ){
		let v = new CVector2((l1.Pos.x-l0.Pos.x), (l1.Pos.y-l0.Pos.y));
		let v0 = new CVector2((l0.ePos.x-l0.Pos.x), (l0.ePos.y-l0.Pos.y));
		let v1 = new CVector2((l1.ePos.x-l1.Pos.x), (l1.ePos.y-l1.Pos.y));
		let Crs_v0_v1 = CVector2.Cross( v0, v1 );
		if( 0.0 == Crs_v0_v1 ){
			return false;	// 平行
		}
		
		let Crs_v_v0 = CVector2.Cross( v, v0 );
		let Crs_v_v1 = CVector2.Cross( v, v1 );
		let t1 = Crs_v_v1 / Crs_v0_v1;
		let t2 = Crs_v_v0 / Crs_v0_v1;
		
		const eps = 0.00001;	// floatの誤差補正用
		if((0 > (t1+eps)) || (1 < (t1-eps)) || (0 > (t2+eps)) || (1 < (t2-eps))){
			return false;	// 交差していない
		}
/*		
		// 交点座標
		CVector2 pos = new CVector2();
		pos.x = (l0.Pos.x + (l0.ePos.x * t1));
		pos.y = (l0.Pos.y + (l0.ePos.y * t1));
*/		
		return true;
	}
	
	//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

	// OBB用分離軸に投影された軸成分から投影線分長を算出
	static _LenSegOnSeparateAxis( vSep, vE1, vE2 ){
		// 3つの内積の絶対値の和で投影線分長を計算
		// 分離軸Sepは標準化されていること
		let r1 = Math.abs( CVector2.Dot(vSep, vE1) );
		let r2 = Math.abs( CVector2.Dot(vSep, vE2) );
		return (r1 + r2);
	}
	
	// OBBとOBB
	static Detect_BOX_BOX( b0, b1 ){
		let m = new CMatrix();
		CMatrix.RotationZ( m, b0.Rot.z );
		let NAe1 = new CVector2( m._11, m._12 );
		let Ae1 = new CVector2(NAe1.x*b0.XRadius, NAe1.y*b0.XRadius);
		let NAe2 = new CVector2( m._21, m._22 );
		let Ae2 = new CVector2(NAe2.x*b0.YRadius, NAe2.y*b0.YRadius);
		
		CMatrix.RotationZ( m, b1.Rot.z );
		let NBe1 = new CVector2( m._11, m._12 );
		let Be1 = new CVector2(NBe1.x*b1.XRadius, NBe1.y*b1.XRadius);
		let NBe2 = new CVector2( m._21, m._22 );
		let Be2 = new CVector2(NBe2.x*b1.YRadius, NBe2.y*b1.YRadius);
		let Interval = new CVector2( (b0.Pos.x-b1.Pos.x), (b0.Pos.y-b1.Pos.y) );
		
		let len, temp;
		let n = new CVector2();
		
		// 分離軸 : Ae1
		let rA = CVector2.Length( Ae1 );
		let rB = Collision._LenSegOnSeparateAxis( NAe1, Be1, Be2 );
		let L = Math.abs( CVector2.Dot(Interval, NAe1) );
		if( L > (rA + rB) ){
			return false; // 衝突していない
		}
		
		// 分離軸 : Ae2
		rA = CVector2.Length( Ae2 );
		rB = Collision._LenSegOnSeparateAxis( NAe2, Be1, Be2 );
		L = Math.abs( CVector2.Dot(Interval, NAe2) );
		if( L > (rA + rB) ){
			return false;
		}
		
		// 分離軸 : Be1
		rA = Collision._LenSegOnSeparateAxis( NBe1, Ae1, Ae2 );
		rB = CVector2.Length( Be1 );
		L = Math.abs( CVector2.Dot(Interval, NBe1) );
		if( L > (rA + rB) ){
			return false;
		}
		
		// 分離軸 : Be2	
		rA = Collision._LenSegOnSeparateAxis( NBe2, Ae1, Ae2 );
		rB = CVector2.Length( Be2 );
		L = Math.abs( CVector2.Dot(Interval, NBe2) );
		if( L > (rA + rB) ){
			return false;
		}

		// 分離平面が存在しないので「衝突している」
		return true;
	}
	
	//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
	// 円とOBB
	static Detect_CIRCLE_BOX( c, b ){
		let m = new CMatrix();
		CMatrix.RotationZ( m, b.Rot.z );
		let vX = new CVector2( m._11, m._12 );
		let vY = new CVector2( m._21, m._22 );
		let vInterval = new CVector2((c.Pos.x - b.Pos.x), (c.Pos.y - b.Pos.y));

		let v = new CVector2( 0, 0 );
		if( b.XRadius > 0.0 ){
			let s = Math.abs((CVector2.Dot(vInterval,vX) / b.XRadius));
			if( s > 1.0 ){
				v.x += (vX.x * (1.0-s) * b.XRadius);
				v.y += (vX.y * (1.0-s) * b.XRadius);
			}
		}
		if( b.YRadius > 0.0 ){
			let s = Math.abs((CVector2.Dot(vInterval,vY) / b.YRadius));
			if( s > 1.0 ){
				v.x += (vY.x * (1.0-s) * b.YRadius);
				v.y += (vY.y * (1.0-s) * b.YRadius);
			}
		}

		// 球の中心座標から回転ボックスの最短距離が球の半径より短ければ当たっている
		let len = CVector2.Length( v );
		if( c.Radius >= len ){
			return true;
		}

		return false;
	}
	
	//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
	// 線とOBB
	static Detect_LINE_BOX( l, b ){
		let m = new CMatrix();
		CMatrix.RotationZ( m, b.Rot.z );
		let NAe1 = new CVector2( m._11, m._12 );
		let Ae1 = new CVector2(NAe1.x*b.XRadius, NAe1.y*b.XRadius);
		let NAe2 = new CVector2( m._21, m._22 );
		let Ae2 = new CVector2(NAe2.x*b.YRadius, NAe2.y*b.YRadius);
		
		CMatrix.RotationZ( m, l.Rot.z );
		let NBe1 = new CVector2( m._11, m._12 );
		let Be1 = new CVector2(NBe1.x*(l.Length*0.5), NBe1.y*(l.Length*0.5));
		let NBe2 = new CVector2( m._21, m._22 );
		let Be2 = new CVector2( 0, 0 );
		let lPos = new CVector2( ((l.ePos.x-l.Pos.x)*0.5), ((l.ePos.y-l.Pos.y)*0.5) );
		lPos.x += l.Pos.x;
		lPos.y += l.Pos.y;
		let Interval = new CVector2( (b.Pos.x-lPos.x), (b.Pos.y-lPos.y) );
		
		// 分離軸 : Ae1
		let rA = CVector2.Length( Ae1 );
		let rB = Collision._LenSegOnSeparateAxis( NAe1, Be1, Be2 );
		let L = Math.abs( CVector2.Dot(Interval, NAe1) );
		if( L > (rA + rB) ){
			return false; // 衝突していない
		}
		
		// 分離軸 : Ae2
		rA = CVector2.Length( Ae2 );
		rB = Collision._LenSegOnSeparateAxis( NAe2, Be1, Be2 );
		L = Math.abs( CVector2.Dot(Interval, NAe2) );
		if( L > (rA + rB) ){
			return false;
		}
		
		// 分離軸 : Be1
		rA = Collision._LenSegOnSeparateAxis( NBe1, Ae1, Ae2 );
		rB = CVector2.Length( Be1 );
		L = Math.abs( CVector2.Dot(Interval, NBe1) );
		if( L > (rA + rB) ){
			return false;
		}
		
		// 分離軸 : Be2
		rA = Collision._LenSegOnSeparateAxis( NBe2, Ae1, Ae2 );
		rB = CVector2.Length( Be2 );
		L = Math.abs( CVector2.Dot(Interval, NBe2) );
		if( L > (rA + rB) ){
			return false;
		}
		
		// 分離平面が存在しないので「衝突している」
		return true;
	}
	
	//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
	// 円とAABB
	static Detect_CIRCLE_FBOX( c, fb ){
/*
		let len = 0.0;
		let tmp0 = c.Pos.x;
		let tmp1 = (fb.Pos.x-fb.XRadius);
		if( tmp0 < tmp1 ){
			len += (tmp0 - tmp1) * (tmp0 - tmp1);
		}
		tmp1 = (fb.Pos.x+fb.XRadius);
		if( tmp0 > tmp1 ){
			len += (tmp0 - tmp1) * (tmp0 - tmp1);
		}
		tmp0 = c.Pos.y;
		tmp1 = (fb.Pos.y-fb.YRadius);
		if( tmp0 < tmp1 ){
			len += (tmp0 - tmp1) * (tmp0 - tmp1);
		}
		tmp1 = (fb.Pos.y+fb.YRadius);
		if( tmp0 > tmp1 ){
			len += (tmp0 - tmp1) * (tmp0 - tmp1);
		}
		len = Math.sqrt( len );
		
		if( c.Radius >= len ){
			return true;
		}
		return false;
*/
		// 矩形の4辺上で最も円に近い座標(nx, ny)を求める
		let nx = Math.max((fb.Pos.x-fb.XRadius), Math.min(c.Pos.x, (fb.Pos.x+fb.XRadius)));
		let ny = Math.max((fb.Pos.y-fb.YRadius), Math.min(c.Pos.y, (fb.Pos.y+fb.YRadius)));
		let d = new CVector2( (nx - c.Pos.x), (ny - c.Pos.y) );
		let len = CVector2.Length( d );
		if( c.Radius >= len ){
			return true;
		}
		return false;
	}
	
	//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
	// 線とAABB
	static Detect_LINE_FBOX( l, fb ){
		let tmp = new CBox( fb.Pos.x, fb.Pos.y, fb.XRadius, fb.YRadius, 0.0 );
		tmp.Pos = fb.Pos;
		tmp.Body = fb.Body;
		tmp.Rot = fb.Rot;
		tmp.Vec = fb.Vec;
		return Collision.Detect_LINE_BOX( l, tmp );
	}
	
	//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
	// OBBとAABB
	static Detect_BOX_FBOX( b, fb ){
		let tmp = new CBox( fb.Pos.x, fb.Pos.y, fb.XRadius, fb.YRadius, 0.0 );
		tmp.Pos = fb.Pos;
		tmp.Body = fb.Body;
		tmp.Rot = fb.Rot;
		tmp.Vec = fb.Vec;
		return Collision.Detect_BOX_BOX( b, tmp );
	}
	
	//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
	// AABBとAABB
	static Detect_FBOX_FBOX( fb0, fb1 ){
/*
		let x0 = (fb0.Pos.x - fb0.XRadius);
		let x1 = (fb0.Pos.x + fb0.XRadius);
		let y0 = (fb0.Pos.y - fb0.YRadius);
		let y1 = (fb0.Pos.y + fb0.YRadius);
		let tx0 = (fb1.Pos.x - fb1.XRadius);
		let tx1 = (fb1.Pos.x + fb1.XRadius);
		let ty0 = (fb1.Pos.y - fb1.YRadius);
		let ty1 = (fb1.Pos.y + fb1.YRadius);
		if( (x0 <= tx1) && (x1 >= tx0) && (y0 <= ty1) && (y1 >= ty0) ){
			return true;
		}
		return false;
*/
		let x = ((fb0.XRadius + fb1.XRadius) - Math.abs((fb1.Pos.x - fb0.Pos.x)));
		let y = ((fb0.YRadius + fb1.YRadius) - Math.abs((fb1.Pos.y - fb0.Pos.y)));
		if( (0.0 <= x) && (0.0 <= y) ){
			return true;
		}
		return false;
	}
}

//========================================================================
//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
//========================================================================

// 物理クラス（現在は衝突判定とめり込み戻しのみ）
class Physics{
	
	//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
	
	// 衝突検出
	static Detect( s0, s1 ){
		switch( s0.Type ){
		case IShape.CIRCLE:
			switch( s1.Type ){
			case IShape.CIRCLE:
				return Physics.Detect_CIRCLE_CIRCLE( s0, s1 );break;
			case IShape.LINE:
				return Physics.Detect_CIRCLE_LINE( s0, s1 );break;
			case IShape.BOX:
				return Physics.Detect_CIRCLE_BOX( s0, s1 );break;
			case IShape.FBOX:
				return Physics.Detect_CIRCLE_FBOX( s0, s1 );break;
			}
			break;
		case IShape.LINE:
			switch( s1.Type ){
			case IShape.CIRCLE:
				return Physics.Detect_CIRCLE_LINE( s1, s0 );break;
			case IShape.LINE:
				return Physics.Detect_LINE_LINE( s0, s1 );break;
			case IShape.BOX:
				return Physics.Detect_LINE_BOX( s0, s1 );break;
			case IShape.FBOX:
				return Physics.Detect_LINE_FBOX( s0, s1 );break;
			}
			break;
		case IShape.BOX:
			switch( s1.Type ){
			case IShape.CIRCLE:
				return Physics.Detect_CIRCLE_BOX( s1, s0 );break;
			case IShape.LINE:
				return Physics.Detect_LINE_BOX( s1, s0 );break;
			case IShape.BOX:
				return Physics.Detect_BOX_BOX( s0, s1 );break;
			case IShape.FBOX:
				return Physics.Detect_BOX_FBOX( s0, s1 );break;
			}
			break;
		case IShape.FBOX:
			switch( s1.Type ){
			case IShape.CIRCLE:
				return Physics.Detect_CIRCLE_FBOX( s1, s0 );break;
			case IShape.LINE:
				return Physics.Detect_LINE_FBOX( s1, s0 );break;
			case IShape.BOX:
				return Physics.Detect_BOX_FBOX( s1, s0 );break;
			case IShape.FBOX:
				return Physics.Detect_FBOX_FBOX( s0, s1 );break;
			}
			break;
		}
		return false;
	}
	
	//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
	
	// 円と円
	static Detect_CIRCLE_CIRCLE( c0, c1 ){
		let v = new CVector2( (c1.Pos.x - c0.Pos.x), (c1.Pos.y - c0.Pos.y));
		let d = Math.sqrt( ((v.x*v.x) + (v.y*v.y)) );
		let r = c0.Radius + c1.Radius;
		if( r >= d ){
			if( (IShape.GHOST != c0.Body) && (IShape.GHOST != c1.Body) ){
				CVector2.Normalize( v );
				let len = (r - d) + 1.0;
				let v0 = CVector2.Length( c0.Vec );
				let v1 = CVector2.Length( c1.Vec );
				
				switch( c0.Body ){
				case IShape.STATIC:
					switch( c1.Body ){
					case IShape.STATIC:
						if( v0 < v1 ){
							c1.Pos.x += (v.x * len);
							c1.Pos.y += (v.y * len);
						}else if( v0 > v1 ){
							c0.Pos.x -= (v.x * len);
							c0.Pos.y -= (v.y * len);
						}
						break;
					case IShape.DYNAMIC:
						c1.Pos.x += (v.x * len);
						c1.Pos.y += (v.y * len);
						break;
					}
					break;
				case IShape.DYNAMIC:
					switch( c1.Body ){
					case IShape.STATIC:
						c0.Pos.x -= (v.x * len);
						c0.Pos.y -= (v.y * len);
						break;
					case IShape.DYNAMIC:
						len = len * 0.5;
						c0.Pos.x -= (v.x * len);
						c0.Pos.y -= (v.y * len);
						c1.Pos.x += (v.x * len);
						c1.Pos.y += (v.y * len);
						break;
					}
					break;
				}
			}
			return true;
		}
		return false;
	}
	
	//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
	// 円と線
	static Detect_CIRCLE_LINE( c, l ){
		// ベクトルを生成
		let vAB = new CVector2( (l.ePos.x-l.Pos.x), (l.ePos.y-l.Pos.y) );
		let vAP = new CVector2( (c.Pos.x-l.Pos.x), (c.Pos.y-l.Pos.y) );
		let vBP = new CVector2( (c.Pos.x-l.ePos.x), (c.Pos.y-l.ePos.y) );
		// ABの単位ベクトルを計算
		let nAB = CVector2.Unit( vAB );
		// AからXまでの距離を単位ベクトルABとベクトルAPの内積で求める
		let lenAX = CVector2.Dot( nAB, vAP );
		
		let shortestDistance = 0.0;	// 線分APとPの最短距離
		if( 0 > lenAX ){
			// AXが負ならAPが円の中心までの最短距離
			shortestDistance = CVector2.Length( vAP );
		}else if( CVector2.Length( vAB ) < lenAX ){
			// AXがAPよりも長い場合は、BPが円の中心
			// までの最短距離
			shortestDistance = CVector2.Length( vBP );
		}else{
			// PがAB上にあるので、PXが最短距離単位ベクトルABとベクトルAPの外積で求める
			shortestDistance = Math.abs( CVector2.Cross( nAB, vAP ) );
		}
		
		// Xの座標を求める(AXの長さより計算）
		let vX = new CVector2(l.Pos.x + (nAB.x * lenAX), l.Pos.y + (nAB.y * lenAX));
		
		// 最短距離が円の半径よりも小さい場合は、当たり
		if( shortestDistance < c.Radius ){
			if( (IShape.GHOST != c.Body) && (IShape.GHOST != l.Body) ){
				let normal = new CVector2();
				let rot = (Math.PI * 0.5);
				if( 0 > CVector2.Cross( vAB, vAP ) ){
					rot *= -1.0;
				}
				normal.x = Math.cos( (l.Rot.z + rot) );
				normal.y = Math.sin( (l.Rot.z + rot) );
				let v0 = CVector2.Length( c.Vec );
				let v1 = CVector2.Length( l.Vec );
				let len = ((c.Radius - shortestDistance) + 1.0);
				
				switch( c.Body ){
				case IShape.STATIC:
					switch( l.Body ){
					case IShape.STATIC:
						if( v0 < v1 ){
							l.Pos.x -= (normal.x * len);
							l.Pos.y -= (normal.y * len);
							l.ePos.x -= (normal.x * len);
							l.ePos.y -= (normal.y * len);
						}else if( v0 > v1 ){
							if( 0.0 == l.Slip ){
								c.Pos.x += (normal.x * len);
							}else if( Math.abs(l.Rot.z) > l.Slip ){
								c.Pos.x += (normal.x * len);
							}
							c.Pos.y += (normal.y * len);
						}
						break;
					case IShape.DYNAMIC:
						l.Pos.x -= (normal.x * len);
						l.Pos.y -= (normal.y * len);
						l.ePos.x -= (normal.x * len);
						l.ePos.y -= (normal.y * len);
						break;
					}
					break;
				case IShape.DYNAMIC:
					switch( l.Body ){
					case IShape.STATIC:
						if( 0.0 == l.Slip ){
								c.Pos.x += (normal.x * len);
							}else if( Math.abs(l.Rot.z) > l.Slip ){
								c.Pos.x += (normal.x * len);
							}
						c.Pos.y += (normal.y * len);
						break;
					case IShape.DYNAMIC:
						len = len * 0.5;
						if( 0.0 == l.Slip ){
							c.Pos.x += (normal.x * len);
						}else if( Math.abs(l.Rot.z) > l.Slip ){
							c.Pos.x += (normal.x * len);
						}
						c.Pos.y += (normal.y * len);
						if( v0 > v1 ){
							l.ePos.x -= (normal.x * len);
							l.ePos.y -= (normal.y * len);
							let v = new CVector2( (l.ePos.x - l.Pos.x), (l.ePos.y - l.Pos.y) );
							CVector2.Normalize( v );
							l.Rot.z = Math.atan2( v.y, v.x );
						}
						break;
					}
					break;
				}
			}
			return true;
		}
		return false;
	}
	
	//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
	// 線と線
	static Detect_LINE_LINE( l0, l1 ){
		let v = new CVector2((l1.Pos.x-l0.Pos.x), (l1.Pos.y-l0.Pos.y));
		let v0 = new CVector2((l0.ePos.x-l0.Pos.x), (l0.ePos.y-l0.Pos.y));
		let v1 = new CVector2((l1.ePos.x-l1.Pos.x), (l1.ePos.y-l1.Pos.y));
		let Crs_v0_v1 = CVector2.Cross( v0, v1 );
		if( 0.0 == Crs_v0_v1 ){
			return false;	// 平行
		}
		
		let Crs_v_v0 = CVector2.Cross( v, v0 );
		let Crs_v_v1 = CVector2.Cross( v, v1 );
		let t1 = Crs_v_v1 / Crs_v0_v1;
		let t2 = Crs_v_v0 / Crs_v0_v1;
		
		const eps = 0.00001;	// floatの誤差補正用
		if((0 > (t1+eps)) || (1 < (t1-eps)) || (0 > (t2+eps)) || (1 < (t2-eps))){
			return false;	// 交差していない
		}
/*		
		// 交点座標
		CVector2 pos = new CVector2();
		pos.x = (l0.Pos.x + (l0.ePos.x * t1));
		pos.y = (l0.Pos.y + (l0.ePos.y * t1));
*/		
		return true;
	}
	
	//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

	// OBB用分離軸に投影された軸成分から投影線分長を算出
	static _LenSegOnSeparateAxis( vSep, vE1, vE2 ){
		// 3つの内積の絶対値の和で投影線分長を計算
		// 分離軸Sepは標準化されていること
		let r1 = Math.abs( CVector2.Dot(vSep, vE1) );
		let r2 = Math.abs( CVector2.Dot(vSep, vE2) );
		return (r1 + r2);
	}
	
	//-------------------------------------------------------------------
	
	static _Normalized( _v ){
		let v = new CVector2( _v.x, _v.y );
		let tmp = (1.0 / Math.sqrt(CVector2.Dot(_v, _v)))
		v.x *= tmp;
		v.y *= tmp;
		return v;
	}
	
	//-------------------------------------------------------------------
	
	static _GetInterval( obb, axis ){
		let vertex = [
			new CVector2(),
			new CVector2(),
			new CVector2(),
			new CVector2(),
			new CVector2(),
			new CVector2(),
			new CVector2(),
			new CVector2()
		];
		let C = obb.Pos;
		let E = new CVector2( obb.XRadius, obb.YRadius );
		let m = new CMatrix();
		CMatrix.RotationZ( m, obb.Rot.z );
		let A = [new CVector2(m._11, m._12), new CVector2(m._21, m._22)];
		vertex[0].x = C.x + A[0].x * E.x + A[1].x * E.y;
		vertex[1].x = C.x - A[0].x * E.x + A[1].x * E.y;
		vertex[2].x = C.x + A[0].x * E.x - A[1].x * E.y;
		vertex[3].x = C.x + A[0].x * E.x + A[1].x * E.y;
		vertex[4].x = C.x - A[0].x * E.x - A[1].x * E.y;
		vertex[5].x = C.x + A[0].x * E.x - A[1].x * E.y;
		vertex[6].x = C.x - A[0].x * E.x + A[1].x * E.y;
		vertex[7].x = C.x - A[0].x * E.x - A[1].x * E.y;
		
		vertex[0].y = C.y + A[0].y * E.x + A[1].y * E.y;
		vertex[1].y = C.y - A[0].y * E.x + A[1].y * E.y;
		vertex[2].y = C.y + A[0].y * E.x - A[1].y * E.y;
		vertex[3].y = C.y + A[0].y * E.x + A[1].y * E.y;
		vertex[4].y = C.y - A[0].y * E.x - A[1].y * E.y;
		vertex[5].y = C.y + A[0].y * E.x - A[1].y * E.y;
		vertex[6].y = C.y - A[0].y * E.x + A[1].y * E.y;
		vertex[7].y = C.y - A[0].y * E.x - A[1].y * E.y;
		
		let result = new COBB_Interval();;
		result.min = result.max = CVector2.Dot( axis, vertex[0] );
		for( let i = 1 ; i < 8 ; i++ ){
			let projection = CVector2.Dot( axis, vertex[i] );
			result.min = (projection < result.min) ? projection : result.min;
			result.max = (projection > result.max) ? projection : result.max;
		}
		return result;
	}
	
	//-------------------------------------------------------------------
	
	static _PenetrationDepth( o1, o2, axis, outShouldFlip ){
		let i1 = Physics._GetInterval( o1, Physics._Normalized(axis) );
		let i2 = Physics._GetInterval( o2, Physics._Normalized(axis) );
		
		if (!((i2.min <= i1.max) && (i1.min <= i2.max))) {
			return 0.0; // No penerattion
		}
		let len1 = i1.max - i1.min;
		let len2 = i2.max - i2.min;
		let min = Math.min( i1.min, i2.min );
		let max = Math.max( i1.max, i2.max );
		let length = max - min;
		
		outShouldFlip.flag = (i2.min < i1.min);
		
		return (len1 + len2) - length;
	}
	
	//-------------------------------------------------------------------
	
	// OBBとOBB
	static Detect_BOX_BOX( b0, b1 ){
/*
		let m = new CMatrix();
		CMatrix.RotationZ( m, b0.Rot.z );
		let NAe1 = new CVector2( m._11, m._12 );
		let Ae1 = new CVector2(NAe1.x*b0.XRadius, NAe1.y*b0.XRadius);
		let NAe2 = new CVector2( m._21, m._22 );
		let Ae2 = new CVector2(NAe2.x*b0.YRadius, NAe2.y*b0.YRadius);
		
		CMatrix.RotationZ( m, b1.Rot.z );
		let NBe1 = new CVector2( m._11, m._12 );
		let Be1 = new CVector2(NBe1.x*b1.XRadius, NBe1.y*b1.XRadius);
		let NBe2 = new CVector2( m._21, m._22 );
		let Be2 = new CVector2(NBe2.x*b1.YRadius, NBe2.y*b1.YRadius);
		let Interval = new CVector2( (b0.Pos.x-b1.Pos.x), (b0.Pos.y-b1.Pos.y) );
		
		let len, temp;
		let n = new CVector2();
		
		// 分離軸 : Ae1
		let rA = CVector2.Length( Ae1 );
		let rB = Collision._LenSegOnSeparateAxis( NAe1, Be1, Be2 );
		let L = Math.abs( CVector2.Dot(Interval, NAe1) );
		if( L > (rA + rB) ){
			return false; // 衝突していない
		}
		
		// 分離軸 : Ae2
		rA = CVector2.Length( Ae2 );
		rB = Collision._LenSegOnSeparateAxis( NAe2, Be1, Be2 );
		L = Math.abs( CVector2.Dot(Interval, NAe2) );
		if( L > (rA + rB) ){
			return false;
		}
		
		// 分離軸 : Be1
		rA = Collision._LenSegOnSeparateAxis( NBe1, Ae1, Ae2 );
		rB = CVector2.Length( Be1 );
		L = Math.abs( CVector2.Dot(Interval, NBe1) );
		if( L > (rA + rB) ){
			return false;
		}
		
		// 分離軸 : Be2	
		rA = Collision._LenSegOnSeparateAxis( NBe2, Ae1, Ae2 );
		rB = CVector2.Length( Be2 );
		L = Math.abs( CVector2.Dot(Interval, NBe2) );
		if( L > (rA + rB) ){
			return false;
		}

		// 分離平面が存在しないので「衝突している」
		return true;
*/

		let m = new CMatrix();
		CMatrix.RotationZ( m, b0.Rot.z );
		let NAe1 = new CVector2( m._11, m._12 );
		let Ae1 = new CVector2(NAe1.x*b0.XRadius, NAe1.y*b0.XRadius);
		let NAe2 = new CVector2( m._21, m._22 );
		let Ae2 = new CVector2(NAe2.x*b0.YRadius, NAe2.y*b0.YRadius);
		
		CMatrix.RotationZ( m, b1.Rot.z );
		let NBe1 = new CVector2( m._11, m._12 );
		let Be1 = new CVector2(NBe1.x*b1.XRadius, NBe1.y*b1.XRadius);
		let NBe2 = new CVector2( m._21, m._22 );
		let Be2 = new CVector2(NBe2.x*b1.YRadius, NBe2.y*b1.YRadius);
		let Interval = new CVector2( (b0.Pos.x-b1.Pos.x), (b0.Pos.y-b1.Pos.y) );
		
		let test = [NAe1, NAe2, NBe1, NBe2];
		let hitNormal = null;
		let shouldFlip = new COBB_Bool();
		let depth = Number.MAX_SAFE_INTEGER;
		for( let i = 0 ; i < test.length ; i++ ){
			let dep = Physics._PenetrationDepth( b0, b1, test[i], shouldFlip );
			if( dep <= 0.0 ){
				return false;
			}else if( dep < depth ){
				if( shouldFlip.flag ){
					test[i].x *= -1.0;
					test[i].y *= -1.0;
				}
				depth = dep;
				hitNormal = test[i];
			}
		}
		if( null == hitNormal ){
			return false;
		}

		if( (IShape.GHOST != b0.Body) && (IShape.GHOST != b1.Body) ){
			depth += 1.0;
			let axis = Physics._Normalized( hitNormal );
			let v0 = CVector2.Length( b0.Vec );
			let v1 = CVector2.Length( b1.Vec );
			
			switch( b0.Body ){
			case IShape.STATIC:
				switch( b1.Body ){
				case IShape.STATIC:
					if( v0 < v1 ){
						b1.Pos.x += (axis.x * depth);
						b1.Pos.y += (axis.y * depth);
					}else if( v0 > v1 ){
						b0.Pos.x -= (axis.x * depth);
						b0.Pos.y -= (axis.y * depth);
					}
					break;
				case IShape.DYNAMIC:
					b1.Pos.x += (axis.x * depth);
					b1.Pos.y += (axis.y * depth);
					break;
				}
				break;
			case IShape.DYNAMIC:
				switch( b1.Body ){
				case IShape.STATIC:
					b0.Pos.x -= (axis.x * depth);
					b0.Pos.y -= (axis.y * depth);
					break;
				case IShape.DYNAMIC:
					depth *= 0.5;
					b0.Pos.x -= (axis.x * depth);
					b0.Pos.y -= (axis.y * depth);
					b1.Pos.x += (axis.x * depth);
					b1.Pos.y += (axis.y * depth);
					break;
				}
				break;
			}
		}
		return true;
	}
	
	//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
	// 円とOBB
	static Detect_CIRCLE_BOX( c, b ){
		let m = new CMatrix();
		CMatrix.RotationZ( m, b.Rot.z );
		let vX = new CVector2( m._11, m._12 );
		let vY = new CVector2( m._21, m._22 );
		let vInterval = new CVector2((c.Pos.x - b.Pos.x), (c.Pos.y - b.Pos.y));

		let v = new CVector2( 0, 0 );
		if( b.XRadius > 0.0 ){
			let s = Math.abs((CVector2.Dot(vInterval,vX) / b.XRadius));
			if( s > 1.0 ){
				v.x += (vX.x * (1.0-s) * b.XRadius);
				v.y += (vX.y * (1.0-s) * b.XRadius);
			}
		}
		if( b.YRadius > 0.0 ){
			let s = Math.abs((CVector2.Dot(vInterval,vY) / b.YRadius));
			if( s > 1.0 ){
				v.x += (vY.x * (1.0-s) * b.YRadius);
				v.y += (vY.y * (1.0-s) * b.YRadius);
			}
		}

		// 球の中心座標から回転ボックスの最短距離が球の半径より短ければ当たっている
		let len = CVector2.Length( v );
		if( c.Radius >= len ){
			if( (IShape.GHOST != c.Body) && (IShape.GHOST != b.Body) ){
				len = ((c.Radius - len) + 1.0);
				let n = CVector2.Unit( vInterval );
				let v0 = CVector2.Length( c.Vec );
				let v1 = CVector2.Length( b.Vec );
				
				switch( c.Body ){
				case IShape.STATIC:
					switch(b.Body ){
					case IShape.STATIC:
						if( v0 < v1 ){
							b.Pos.x -= (n.x * len);
							b.Pos.y -= (n.y * len);
						}else if( v0 > v1 ){
							c.Pos.x += (n.x * len);
							c.Pos.y += (n.y * len);
						}
						break;
					case IShape.DYNAMIC:
						b.Pos.x -= (n.x * len);
						b.Pos.y -= (n.y * len);
						break;
					}
					break;
				case IShape.DYNAMIC:
					switch( b.Body ){
					case IShape.STATIC:
						c.Pos.x += (n.x * len);
						c.Pos.y += (n.y * len);
						break;
					case IShape.DYNAMIC:
						len *= 0.5;
						c.Pos.x += (n.x * len);
						c.Pos.y += (n.y * len);
						b.Pos.x -= (n.x * len);
						b.Pos.y -= (n.y * len);
						break;
					}
					break;
				}
			}
			return true;
		}

		return false;
	}
	
	//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
	// 線とOBB
	static Detect_LINE_BOX( l, b ){
		let m = new CMatrix();
		CMatrix.RotationZ( m, b.Rot.z );
		let NAe1 = new CVector2( m._11, m._12 );
		let Ae1 = new CVector2(NAe1.x*b.XRadius, NAe1.y*b.XRadius);
		let NAe2 = new CVector2( m._21, m._22 );
		let Ae2 = new CVector2(NAe2.x*b.YRadius, NAe2.y*b.YRadius);
		
		CMatrix.RotationZ( m, l.Rot.z );
		let NBe1 = new CVector2( m._11, m._12 );
		let Be1 = new CVector2(NBe1.x*(l.Length*0.5), NBe1.y*(l.Length*0.5));
		let NBe2 = new CVector2( m._21, m._22 );
		let Be2 = new CVector2( 0, 0 );
		let lPos = new CVector2( ((l.ePos.x-l.Pos.x)*0.5), ((l.ePos.y-l.Pos.y)*0.5) );
		lPos.x += l.Pos.x;
		lPos.y += l.Pos.y;
		let Interval = new CVector2( (b.Pos.x-lPos.x), (b.Pos.y-lPos.y) );
		
		// 分離軸 : Ae1
		let rA = CVector2.Length( Ae1 );
		let rB = Collision._LenSegOnSeparateAxis( NAe1, Be1, Be2 );
		let L = Math.abs( CVector2.Dot(Interval, NAe1) );
		if( L > (rA + rB) ){
			return false; // 衝突していない
		}
		
		// 分離軸 : Ae2
		rA = CVector2.Length( Ae2 );
		rB = Collision._LenSegOnSeparateAxis( NAe2, Be1, Be2 );
		L = Math.abs( CVector2.Dot(Interval, NAe2) );
		if( L > (rA + rB) ){
			return false;
		}
		
		// 分離軸 : Be1
		rA = Collision._LenSegOnSeparateAxis( NBe1, Ae1, Ae2 );
		rB = CVector2.Length( Be1 );
		L = Math.abs( CVector2.Dot(Interval, NBe1) );
		if( L > (rA + rB) ){
			return false;
		}
		
		// 分離軸 : Be2
		rA = Collision._LenSegOnSeparateAxis( NBe2, Ae1, Ae2 );
		rB = CVector2.Length( Be2 );
		L = Math.abs( CVector2.Dot(Interval, NBe2) );
		if( L > (rA + rB) ){
			return false;
		}
		
		if( (IShape.GHOST != b.Body) && (IShape.GHOST != l.Body) ){
			////////////////////////////////////////////////////////
			// 平面の法線に対するOBBの射影線の長さを算出
			let r = 0.0;          // 近接距離
			let normal = new CVector2();
			let rot = (Math.PI * 0.5);
			let vAB = new CVector2( (l.ePos.x-l.Pos.x), (l.ePos.y-l.Pos.y) );
			if( 0 > CVector2.Cross( vAB, Interval ) ){
				rot *= -1.0;
			}
			normal.x = Math.cos( (l.Rot.z + rot) );
			normal.y = Math.sin( (l.Rot.z + rot) );
			
			CMatrix.RotationZ( m, b.Rot.z );
			let v = new CVector2( (m._11 * b.XRadius), (m._12 * b.XRadius) );
			r += Math.abs( CVector2.Dot( v, normal ) );
			v = new CVector2( (m._21 * b.YRadius), (m._22 * b.YRadius) );
			r += Math.abs( CVector2.Dot( v, normal ) );

			// 平面とOBBの距離を算出
			let s = CVector2.Dot( Interval, normal );

			// 戻し距離を算出
			let len = 0.0;
			if( 0.0 < s ){
				len = (r - Math.abs( s ) + 1.0);
			}else{
				len = (r + Math.abs( s ) + 1.0);
			}

			let v0 = CVector2.Length( b.Vec );
			let v1 = CVector2.Length( l.Vec );
			
			switch( b.Body ){
			case IShape.STATIC:
				switch( l.Body ){
				case IShape.STATIC:
					if( v0 < v1 ){
						l.Pos.x -= (normal.x * len);
						l.Pos.y -= (normal.y * len);
						l.ePos.x -= (normal.x * len);
						l.ePos.y -= (normal.y * len);
					}else if( v0 > v1 ){
						if( 0.0 == l.Slip ){
							b.Pos.x += (normal.x * len);
						}else if( Math.abs(l.Rot.z) > l.Slip ){
							b.Pos.x += (normal.x * len);
						}
						b.Pos.y += (normal.y * len);
					}
					break;
				case IShape.DYNAMIC:
					l.Pos.x -= (normal.x * len);
					l.Pos.y -= (normal.y * len);
					l.ePos.x -= (normal.x * len);
					l.ePos.y -= (normal.y * len);
					break;
				}
				break;
			case IShape.DYNAMIC:
				switch( l.Body ){
				case IShape.STATIC:
					if( 0.0 == l.Slip ){
						b.Pos.x += (normal.x * len);
					}else if( Math.abs(l.Rot.z) > l.Slip ){
						b.Pos.x += (normal.x * len);
					}
					b.Pos.y += (normal.y * len);
					break;
				case IShape.DYNAMIC:
					len = len * 0.5;
					if( 0.0 == l.Slip ){
						b.Pos.x += (normal.x * len);
					}else if( Math.abs(l.Rot.z) > l.Slip ){
						b.Pos.x += (normal.x * len);
					}
					b.Pos.y += (normal.y * len);
					if( v0 > v1 ){
						l.ePos.x -= (normal.x * len);
						l.ePos.y -= (normal.y * len);
						let v = new CVector2( (l.ePos.x - l.Pos.x), (l.ePos.y - l.Pos.y) );
						CVector2.Normalize( v );
						l.Rot.z = Math.atan2( v.y, v.x );
					}
					break;
				}
				break;
			}
		}
		
		// 分離平面が存在しないので「衝突している」
		return true;
	}
	
	//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
	// 円とAABB
	static Detect_CIRCLE_FBOX( c, fb ){
/*
		let len = 0.0;
		let tmp0 = c.Pos.x;
		let tmp1 = (fb.Pos.x-fb.XRadius);
		if( tmp0 < tmp1 ){
			len += (tmp0 - tmp1) * (tmp0 - tmp1);
		}
		tmp1 = (fb.Pos.x+fb.XRadius);
		if( tmp0 > tmp1 ){
			len += (tmp0 - tmp1) * (tmp0 - tmp1);
		}
		tmp0 = c.Pos.y;
		tmp1 = (fb.Pos.y-fb.YRadius);
		if( tmp0 < tmp1 ){
			len += (tmp0 - tmp1) * (tmp0 - tmp1);
		}
		tmp1 = (fb.Pos.y+fb.YRadius);
		if( tmp0 > tmp1 ){
			len += (tmp0 - tmp1) * (tmp0 - tmp1);
		}
		len = Math.sqrt( len );
		
		if( c.Radius >= len ){
			return true;
		}
		return false;
*/
		// 矩形の4辺上で最も円に近い座標(nx, ny)を求める
		let nx = Math.max((fb.Pos.x-fb.XRadius), Math.min(c.Pos.x, (fb.Pos.x+fb.XRadius)));
		let ny = Math.max((fb.Pos.y-fb.YRadius), Math.min(c.Pos.y, (fb.Pos.y+fb.YRadius)));
		let d = new CVector2( (nx - c.Pos.x), (ny - c.Pos.y) );
		let len = CVector2.Length( d );
		if( c.Radius >= len ){
			if( (IShape.GHOST != c.Body) && (IShape.GHOST != fb.Body) ){
				len = ((c.Radius - len) + 1.0);
				let v = new CVector2();
				let v0 = CVector2.Length( c.Vec );
				let v1 = CVector2.Length( fb.Vec );
				
				// 上辺衝突
				if( ny == (fb.Pos.y - fb.YRadius) ){
					v.y -= len;
					
				// 下辺衝突
				}else if( ny == (fb.Pos.y + fb.YRadius) ){
					v.y = len;
					
				// 左辺衝突
				}else if( nx == (fb.Pos.x - fb.XRadius) ){
					v.x -= len;
					
				// 右辺衝突
				}else if( nx == (fb.Pos.x + fb.XRadius) ){
					v.x = len;
					
				// 矩形の中
				}else{
				}
				
				switch( c.Body ){
				case IShape.STATIC:
					switch( fb.Body ){
					case IShape.STATIC:
						if( v0 < v1 ){
							fb.Pos.x -= v.x;
							fb.Pos.y -= v.y;
						}else if( v0 > v1 ){
							c.Pos.x += v.x;
							c.Pos.y += v.y;
						}
						break;
					case IShape.DYNAMIC:
						fb.Pos.x -= v.x;
						fb.Pos.y -= v.y;
						break;
					}
					break;
				case IShape.DYNAMIC:
					switch( fb.Body ){
					case IShape.STATIC:
						c.Pos.x += v.x;
						c.Pos.y += v.y;
						break;
					case IShape.DYNAMIC:
						v.x *= 0.5;
						v.y *= 0.5;
						c.Pos.x += v.x;
						c.Pos.y += v.y;
						fb.Pos.x -= v.x;
						fb.Pos.y -= v.y;
						break;
					}
					break;
				}
			}
			return true;
		}
		return false;
	}
	
	//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
	// 線とAABB
	static Detect_LINE_FBOX( l, fb ){
		let tmp = new CBox( fb.Pos.x, fb.Pos.y, fb.XRadius, fb.YRadius, 0.0 );
		tmp.Pos = fb.Pos;
		tmp.Body = fb.Body;
		tmp.Rot = fb.Rot;
		tmp.Vec = fb.Vec;
		return Collision.Detect_LINE_BOX( l, tmp );
	}
	
	//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
	// OBBとAABB
	static Detect_BOX_FBOX( b, fb ){
		let tmp = new CBox( fb.Pos.x, fb.Pos.y, fb.XRadius, fb.YRadius, 0.0 );
		tmp.Pos = fb.Pos;
		tmp.Body = fb.Body;
		tmp.Rot = fb.Rot;
		tmp.Vec = fb.Vec;
		return Collision.Detect_BOX_BOX( b, tmp );
	}
	
	//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
	// AABBとAABB
	static Detect_FBOX_FBOX( fb0, fb1 ){
/*
		let x0 = (fb0.Pos.x - fb0.XRadius);
		let x1 = (fb0.Pos.x + fb0.XRadius);
		let y0 = (fb0.Pos.y - fb0.YRadius);
		let y1 = (fb0.Pos.y + fb0.YRadius);
		let tx0 = (fb1.Pos.x - fb1.XRadius);
		let tx1 = (fb1.Pos.x + fb1.XRadius);
		let ty0 = (fb1.Pos.y - fb1.YRadius);
		let ty1 = (fb1.Pos.y + fb1.YRadius);
		if( (x0 <= tx1) && (x1 >= tx0) && (y0 <= ty1) && (y1 >= ty0) ){
			return true;
		}
		return false;
*/
		let x = ((fb0.XRadius + fb1.XRadius) - Math.abs((fb1.Pos.x - fb0.Pos.x)));
		let y = ((fb0.YRadius + fb1.YRadius) - Math.abs((fb1.Pos.y - fb0.Pos.y)));
		if( (0.0 <= x) && (0.0 <= y) ){
			if( (IShape.GHOST != fb0.Body) && (IShape.GHOST != fb1.Body) ){
				let n = new CVector2( (fb1.Pos.x - fb0.Pos.x), (fb1.Pos.y - fb0.Pos.y) );
				CVector2.Normalize( n );
				let v0 = CVector2.Length( fb0.Vec );
				let v1 = CVector2.Length( fb1.Vec );
				if( x < y ){
					x += 1.0;
					if( 0 > n.x ){
						x *= -1.0;
					}
					switch( fb0.Body ){
					case IShape.STATIC:
						switch( fb1.Body ){
						case IShape.STATIC:
							if( v0 < v1 ){
								fb1.Pos.x += x;
							}else if( v0 > v1 ){
								fb0.Pos.x -= x;
							}
							break;
						case IShape.DYNAMIC:
							fb1.Pos.x += x;
							break;
						}
						break;
					case IShape.DYNAMIC:
						switch( fb1.Body ){
						case IShape.STATIC:
							fb0.Pos.x -= x;
							break;
						case IShape.DYNAMIC:
							x *= 0.5;
							fb0.Pos.x -= x;
							fb1.Pos.x += x;
							break;
						}
						break;
					}
				}else if( x > y ){
					y += 1.0;
					if( 0 > n.y ){
						y *= -1.0;
					}
					switch( fb0.Body ){
					case IShape.STATIC:
						switch( fb1.Body ){
						case IShape.STATIC:
							if( v0 < v1 ){
								fb1.Pos.y += y;
							}else if( v0 > v1 ){
								fb0.Pos.y -= y;
							}
							break;
						case IShape.DYNAMIC:
							fb1.Pos.y += y;
							break;
						}
						break;
					case IShape.DYNAMIC:
						switch( fb1.Body ){
						case IShape.STATIC:
							fb0.Pos.y -= y;
							break;
						case IShape.DYNAMIC:
							y *= 0.5;
							fb0.Pos.y -= y;
							fb1.Pos.y += y;
							break;
						}
						break;
					}
				}else{
				}
			}
			return true;
		}
		return false;
	}
}
