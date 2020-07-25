// グローバル変数宣言部

let ballx = 320;	// ボールのX位置を保存する変数
let bally = 400;	// ボールのY位置を保存する変数
let movex = 5;		// X移動量
let movey = -5;		// Y移動量

let mainx = 270;	// メインバーのX位置

let block1 = true;	// ブロック生存フラグ true:ある false:ない
let block2 = true;

let gamemode = 0;	// ゲームモード 0:タイトル 1:メインゲーム 2:ゲームオーバー 3:ゲームクリア

function MainLoop( ctx ){
	
	// ゲームモードが0の時はタイトル画面用の処理
	if( gamemode == 0 ){
		// タイトル用文字列を表示する
		ctx.fillStyle = "white";
		ctx.textAlign = "center";
		ctx.font = "30px 'Arial'";
		ctx.fillText( "Hit Space Key!!", 320, 240 );
		
		// ゲームモードが0の間はボール移動量を0にする
		movex = 0;
		movey = 0;
		
		// スペースキーが押されたらゲーム開始(ゲームモードを1にする)
		if( Input.Space == PUSH ){
			gamemode = 1;	// ゲームモード変更
			movex = 5;		// ボール移動量Xセット
			movey = -5;		// ボール移動量Yセット
		}
		
		// ボールの移動
		if( Input.Left == HOLD ){	// 左キーが押されたら
			ballx -= 10;
		}
		if( Input.Right == HOLD ){	// 右キーが押されたら
			ballx += 10;
		}
	}
	
	////////////////////////////////////////////
	// ボール関係の処理
	//
	
	// ボールの表示
	ctx.fillStyle = "rgba( 255, 255, 255, 1.0 )";
	ctx.beginPath();
	// x, y, 半径, 角度1, 角度2
	ctx.arc( ballx, bally, 5, 0, Math.PI*2 );
	ctx.fill();
	
	// ボールの移動
	ballx += movex;	// X位置に移動量を追加
	bally += movey;	// Y位置に移動量を追加
	
	// 画面端でボールが反射する処理
	if( ballx < 0 ){	// ballxが0より小さくなったとき
		movex *= -1;
	}
	if( 640 < ballx ){	// ballxが640より大きくなったとき
		movex *= -1;
	}
	if( bally < 0 ){	// ballyが0より小さくなったとき
		movey *= -1;
	}
	if( 480 < bally ){	// ballyが480より大きくなったとき
		movey *= -1;
	}
	
	// 変数の値を表示する
	ctx.fillStyle = "white";
	ctx.textAlign = "left";
	ctx.font = "15px 'Arial'";
	
	ctx.fillText( "ballx=" + ballx + " bally=" + bally, 3, 15 );
	ctx.fillText( "movex=" + movex + " movey=" + movey, 3, 30 );
	
	////////////////////////////////////////////
	// メインバー関係の処理
	//
	
	// メインバーの表示
	ctx.fillStyle = "rgba( 255, 255, 255, 1.0 )";
	// x, y, Xサイズ, Yサイズ
	ctx.fillRect( mainx, 440, 100, 20 );
	
	// メインバーの移動
	if( Input.Left == HOLD ){	// 左キーが押されたら
		mainx -= 10;	// X位置を10減らす
	}
	if( Input.Right == HOLD ){	// 右キーが押されたら
		mainx += 10;	// X位置を10増やす
	}
	
	// メインバーとボールとの当たり判定
	if( mainx < ballx ){			// ballx が mainx よりも大きいか？
		if( ballx < mainx+100 ){	// ballx が mainx+100 よりも小さいか？
			if( 440 < bally ){		// bally が 440 より大きいか？
				if( bally < 460 ){	// bally が 460 より小さいか？
					// ボールの反射処理 今回はとりあえずY反射に限定する
					movey *= -1;
				}
			}
		}
	}
	
	////////////////////////////////////////////
	// ブロック関係の処理
	//
	
	// ブロック1の処理
	if( block1 == true ){	// ブロック生存フラグがtrueならば
		// ボックスの描画
		ctx.fillStyle = "rgba( 0, 255, 255, 1.0 )";
		// x, y, Xサイズ, Yサイズ
		ctx.fillRect( 100, 100, 100, 20 );
		
		// ボールとの当たり判定
		if( 100 < ballx ){				// ballx が 100 よりも大きいか？
			if( ballx < 200 ){			// ballx が 200 よりも小さいか？
				if( 100 < bally ){		// bally が 100 よりも大きいか？
					if( bally < 120 ){	// bally が 120 よりも小さいか？
						// ボールの反射処理 今回はとりあえずY反射に限定する
						movey *= -1;
						// ブロックの生存フラグをセット
						block1 = false;
					}
				}
			}
		}
	}
	
	// ブロック2の処理
	if( block2 == true ){
		// ボックスの描画
		ctx.fillStyle = "rgba( 0, 255, 255, 1.0 )";
		// x, y, Xサイズ, Yサイズ
		ctx.fillRect( 220, 100, 100, 20 );
		
		// ボールとの当たり判定
		if( 220 < ballx ){				// ballx が 220 よりも大きいか？
			if( ballx < 320 ){			// ballx が 320 よりも小さいか？
				if( 100 < bally ){		// bally が 100 よりも大きいか？
					if( bally < 120 ){	// bally が 120 よりも小さいか？
						movey *= -1;
						// ブロックの生存フラグをセット
						block2 = false;
					}
				}
			}
		}
	}
}
