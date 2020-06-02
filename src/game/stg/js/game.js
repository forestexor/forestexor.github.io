// メインゲーム
Include("js/game/player.js");
Include("js/game/enemy.js");
Include("js/game/enemybullet.js");
Include("js/game/item.js");
Include("js/game/explosion.js");
Include("js/gameover.js");

var g_gamelv = 0;
var g_score = 0;
var g_scoresub = 0;

var game = function(){
	// ゲーム時間、色々な管理に使うと思う
	this.gametime = 0;

	// 自機
	this.pl = new Player();

	// 敵
	this.enemy = [];

	// 敵弾
	this.enemybullet = [];

	// アイテム
	this.item = [];

	// 爆発エフェクト
	this.explosion = [];

//----------------------------------------------------------------------------------------------------------

	// 複数オブジェクトの更新関数
	var ObjsUpdate = function( objs ){
		for( var i = 0 ; i < objs.length ; i++ ){
			if( !objs[i].Update() ){
				objs.splice( i, 1 );	// 移動の際falseが返ってきたらその要素を削除
				i--;
			}
		}
	}

	// 複数オブジェクトの描画関数
	var DrawObjs = function( objs, context ){
		for( var i = 0 ; i < objs.length ; i++ ){
			objs[i].Draw( context );
		}
	}

//----------------------------------------------------------------------------------------------------------

	// ゲームクラス更新関数
	this.FrameMove = function(){

		// 敵作成
		var n = 80 - g_gamelv;
		if( n < 10 ) n = 10;
		if( this.gametime % n == 1 ) this.enemy.push( new Enemy( Math.floor(Math.random()*7), this.enemybullet) );


		// 自機更新
		this.pl.Update();

		// 自機弾更新
		ObjsUpdate( this.pl.bullet );

		// 自機サブウェポン更新
		var p = Math.floor( this.pl.power );
		for( var i = 0 ; i < p ; i++ ){
			this.pl.sub[i].Update( this.pl.x, this.pl.y, p, i );
		}

		// 自機サブウェポンの弾更新
		for( var i = 0 ; i < p ; i++ ){
			for( var k = 0 ; k < this.pl.sub[i].bullet.length ; k++ ){
				if( !this.pl.sub[i].bullet[k].Update( this.enemy ) ){
					this.pl.sub[i].bullet[k] = null;
					this.pl.sub[i].bullet.splice( k, 1 );
					k--;
				}
			}
		}

		// 敵更新
		ObjsUpdate( this.enemy );

		// 敵弾更新
		for( var i = 0 ; i < this.enemybullet.length ; i++ ){
			if( !this.enemybullet[i].Update( this.pl.x, this.pl.y ) ){
				this.enemybullet[i] = null;
				this.enemybullet.splice( i, 1 );
				i--;
			}
		}

		// アイテム更新
		for( var i = 0 ; i < this.item.length ; i++ ){
			if( !this.item[i].Update( this.pl.x, this.pl.y ) ){
				this.item[i] = null
				this.item.splice( i, 1 );
				i--;
			}
		}

		// 自機弾と敵との当たり判定処理
		for( var i = 0 ; i < this.pl.bullet.length ; i++ ){
			for( var k = 0 ; k < this.enemy.length ; k++ ){
				// 2点間の距離の2乗を算出
				var mx = this.pl.bullet[i].x;
				var my = this.pl.bullet[i].y;
				var tx = this.enemy[k].x;
				var ty = this.enemy[k].y;
				var d2 = (mx - tx) * (mx - tx) + (my - ty) * (my - ty);
				// 2つの半径の和の2乗を算出
				var r2 = (this.pl.bullet[i].r + this.enemy[k].r) * (this.pl.bullet[i].r + this.enemy[k].r);
				if( d2 < r2 ){	// 半径の和の2乗より距離の2乗の方が短ければ当たっていると言える
					g_scoresub += g_gamelv;	// スコア加算

					this.enemy[k].hp -= this.pl.power;	// 敵のHPを減らす
					if( this.enemy[k].hp <= 0 ){
						g_scoresub += 30+g_gamelv;	// スコア加算
						this.explosion.push( new Explosion( this.enemy[k].x, this.enemy[k].y ) );	// 爆発エフェクト発生
						this.item.push( new Item( this.enemy[k].x, this.enemy[k].y ) );	// アイテム発生
						this.enemy[k] = null;
						this.enemy.splice( k, 1 );	// 敵HPが0以下で敵消滅
					}

					// 自機弾を消す
					this.pl.bullet[i] = null;
					this.pl.bullet.splice( i, 1 );
					i--;
					break;
				}
			}
		}

		// 自機サブウェポン弾と敵との当たり判定処理
		for( var i = 0 ; i < this.pl.sub.length ; i++ ){
			for( var k = 0 ; k < this.pl.sub[i].bullet.length ; k++ ){
				for( var j = 0 ; j < this.enemy.length ; j++ ){
					// 2点間の距離の2乗を算出
					var mx = this.pl.sub[i].bullet[k].x;
					var my = this.pl.sub[i].bullet[k].y;
					var tx = this.enemy[j].x;
					var ty = this.enemy[j].y;
					var d2 = (mx - tx) * (mx - tx) + (my - ty) * (my - ty);
					// 2つの半径の和の2乗を算出
					var r2 = (this.pl.sub[i].bullet[k].r + this.enemy[j].r) * (this.pl.sub[i].bullet[k].r + this.enemy[j].r);
					if( d2 < r2 ){	// 半径の和の2乗より距離の2乗の方が短ければ当たっていると言える
						g_scoresub += 1;	// スコア加算
						this.enemy[j].hp -= 0.5;	// 敵のHPを減らす
						if( this.enemy[j].hp <= 0 ){
							g_scoresub += g_gamelv;	// スコア加算
							this.explosion.push( new Explosion( this.enemy[j].x, this.enemy[j].y ) );	// 爆発エフェクト発生
							this.item.push( new Item( this.enemy[j].x, this.enemy[j].y ) );	// アイテム発生
							this.enemy[j] = null;
							this.enemy.splice( j, 1 );	// 敵HPが0以下で敵消滅
						}

						// 自機サブウェポン弾を消す
						this.pl.sub[i].bullet[k] = null;
						this.pl.sub[i].bullet.splice( k, 1 );
						k--;
						break;
					}
				}
			}
		}

		// 自機と敵弾との当たり判定処理
		for( var i = 0 ; i < this.enemybullet.length ; i++ ){
			// 2点間の距離の2乗を算出
			var d2 = (this.enemybullet[i].x - this.pl.x) * (this.enemybullet[i].x - this.pl.x) + (this.enemybullet[i].y - this.pl.y) * (this.enemybullet[i].y - this.pl.y);
			// 2つの半径の和の2乗を算出
			var r2 = (this.enemybullet[i].r + this.pl.r) * (this.enemybullet[i].r + this.pl.r);
			if( d2 < r2 ){	// 半径の和の2乗より距離の2乗の方が短ければ当たっていると言える
				this.enemybullet[i] = null;
				this.enemybullet.splice( i, 1 );	// 敵弾消滅
				i--;

				this.pl.hp--;	// 自機のHPが減る
				// 自機のHPが0以下になったらゲームオーバー
				if( this.pl.hp <= 0 ){
					return new gameover();
				}
			}
		}

		// 自機と敵との当たり判定処理
		for( var i = 0 ; i < this.enemy.length ; i++ ){
			// 2点間の距離の2乗を算出
			var d2 = (this.enemy[i].x - this.pl.x) * (this.enemy[i].x - this.pl.x) + (this.enemy[i].y - this.pl.y) * (this.enemy[i].y - this.pl.y);
			// 2つの半径の和の2乗を算出
			var r2 = (this.enemy[i].r + this.pl.r) * (this.enemy[i].r + this.pl.r);
			if( d2 < r2 ){	// 半径の和の2乗より距離の2乗の方が短ければ当たっていると言える
				this.explosion.push( new Explosion( this.enemy[i].x, this.enemy[i].y ) );	// 爆発エフェクト発生
				this.enemy[i] = null;
				this.enemy.splice( i, 1 );	// 敵消滅
				i--;

				this.pl.hp--;	// 自機のHPが減る
				// 自機のHPが0以下になったらゲームオーバー
				if( this.pl.hp <= 0 ){
					return new gameover();
				}
			}
		}

		// 自機とアイテムの当たり判定
		for( var i = 0 ; i < this.item.length ; i++ ){
			var d2 = (this.item[i].x - this.pl.x) * (this.item[i].x - this.pl.x) + (this.item[i].y - this.pl.y) * (this.item[i].y - this.pl.y);
			var r2 = (this.item[i].r + this.pl.r) * (this.item[i].r + this.pl.r);
			if( d2 < r2 ){	// 当たった場合の処理

				g_scoresub += 1 + g_gamelv * 2;	// スコア加算
				switch( Math.floor( Math.random() * 100) % 9 ){
				case 0: this.pl.power += 0.01;	break;
				case 1: this.pl.power += 0.02;	break;
				case 2: this.pl.power += 0.03;	break;
				case 3: this.pl.power += 0.04;	break;
				case 4: this.pl.power += 0.05;	break;
				case 5: this.pl.power += 0.06;	break;
				case 6: this.pl.power += 0.07;	break;
				case 7: this.pl.power += 0.08;	break;
				case 8: this.pl.power += 0.09;	break;
				}
				this.pl.power = Math.floor( this.pl.power*100 ) / 100;
				if( this.pl.power >= 4 ) this.pl.power = 4;
				this.item[i] = null;
				this.item.splice( i, 1 );
				i--;
			}
		}

		// 爆発エフェクト更新
		ObjsUpdate( this.explosion );

		// スコアカウント
		if( g_scoresub > g_score ){
			var n = g_scoresub - g_score;
			if( n > 1000 ) g_score += 50;
			if( n > 500  ) g_score += 30;
			if( n > 300  ) g_score += 10;
			if( n > 100  ) g_score += 5;
			if( n > 50   ) g_score += 2;
			g_score++;
		}


		// ゲーム時間更新
		this.gametime++;
		// ゲームレベル上昇
		if( this.gametime > 600 ){
			this.pl.hp++;	// HP回復
			g_gamelv++;
			this.gametime = 0;
		}

		return this;
	}

	// ゲームクラス描画関数
	this.FrameRender = function( context ){

		// 爆発エフェクト描画
		DrawObjs( this.explosion, context );

		// 自機弾描画
		DrawObjs( this.pl.bullet, context );

		// 自機描画
		this.pl.Draw( context );

		// 自機サブウェポン描画
		var p = Math.floor( this.pl.power );
		for( var i = 0 ; i < p ; i++ ){
			this.pl.sub[i].Draw( context );
		}

		// 自機サブウェポンの弾描画
		for( var i = 0 ; i < p ; i++ ){
			for( var k = 0 ; k < this.pl.sub[i].bullet.length ; k++ ){
				this.pl.sub[i].bullet[k].Draw( context );
			}
		}

		// アイテム描画
		DrawObjs( this.item, context );

		// 敵弾描画
		DrawObjs( this.enemybullet, context );

		// 敵描画
		DrawObjs( this.enemy, context );


		// 画面右側 情報の表示
		context.beginPath();
		// グラデーション領域をセット
		var grad  = context.createLinearGradient( 500, 0, CANVAS_X, CANVAS_Y );
		// グラデーション終点のオフセットと色をセット
		grad.addColorStop(   0, "rgb( 255,  0,   0 )" );	// 赤
		grad.addColorStop( 0.5, "rgb( 0,  255,   0 )" );	// 緑
		grad.addColorStop(   1, "rgb( 0,    0, 255 )" );	// 青
		// グラデーションをfillStyleプロパティにセット
		context.fillStyle = grad;
		// 矩形を描画
		context.rect( 500, 0, 140, CANVAS_Y );
		context.fill();

		// グラデーションの一部を残して矩形を描画して黒で塗りつぶし
		context.beginPath();
		context.fillStyle = "rgb( 0, 0, 0)";
		context.rect( 505, 5, 130, CANVAS_Y-10 );
		context.fill();

		context.textAlign = "left";
		// 情報表示
		context.strokeStyle = "white";
		context.fillStyle = "white";
		// スコア表示
		context.font = "30px 'ＭＳ Ｐゴシック'";
		context.strokeText( "SCORE", 510, 30 );
		context.textAlign = "right";
		context.font = "18px 'ＭＳ Ｐゴシック'";
		context.fillText( g_score, 630, 50 );

		// プレイヤー情報
		context.textAlign = "left";
		context.font = "25px 'ＭＳ Ｐゴシック'";
		context.strokeText( "Player", 510, 100 );
		// HP表示
		context.font = "17px 'ＭＳ Ｐゴシック'";
		context.fillText( "HP", 510, 130 );
		context.font = "15px 'ＭＳ Ｐゴシック'";
		context.fillText( this.pl.hp, 580, 130 );
		// パワー表示
		context.font = "17px 'ＭＳ Ｐゴシック'";
		context.fillText( "POWER", 510, 160 );
		context.font = "15px 'ＭＳ Ｐゴシック'";
		context.fillText( this.pl.power, 580, 160 );

		// ゲームレベル表示
		context.font = "30px 'ＭＳ Ｐゴシック'";
		context.strokeText( "GameLv", 510, 250 );
		context.textAlign = "center";
		context.font = "25px 'ＭＳ Ｐゴシック'";
		context.fillText( g_gamelv, 570, 280 );

	}
}






















