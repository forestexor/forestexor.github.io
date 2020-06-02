class CMath{
	
	static #SeedX = 123456789;
	static #SeedY = 362436069;
	static #SeedZ = 521288629;
	static #SeedW = 88675123;
	
	// ラジアン角の1度
	static RADIAN = (Math.PI / 180);
	// 45度
	static PI_DIV4 = (Math.PI * 0.25);
	// 90度
	static PI_DIV2 = (Math.PI * 0.5);
	// 180度
	static PI = Math.PI;
	// 360度
	static PI_MUL2 = (Math.PI * 2.0);
	
	// ディグリー角からラジアン角に変換
	static DegToRad( d ){
		return ( d * this.RADIAN );
	}
	
	// ラジアン角からディグリー角に変換
	static RadToDeg( d ){
		return ( d / this.RADIAN );
	}
	
	// 乱数0～maxまで
	static GetRand( max ){
		let t = (this.#SeedX ^ (this.#SeedX << 11));
		this.#SeedX = this.#SeedY;
		this.#SeedY = this.#SeedW;
		this.#SeedZ = this.#SeedW;
		this.#SeedW = (this.#SeedW ^ (this.#SeedW >> 19)) ^ (t ^ (t >> 8));
		return (this.#SeedW % (max+1));
	}
	
	// 範囲指定乱数
	static GetRandMinMax( min, max ){
		return (min + CMath.GetRand( (max-min) ));
	}
	
	// 小数まで出る0～max
	static GetRandf( fmax ){
		return (fmax * (CMath.GetRand(10000) * 0.0001));
	}
	
	// 小数まで出る範囲指定乱数
	static GetRandMinMaxf( fmin, fmax ){
		return (fmin + ((fmax-fmin) * (CMath.GetRandf(1.0))));
	}
}






