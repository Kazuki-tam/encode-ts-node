import * as fs from "fs";
import * as iconv from "iconv-lite";

/**
 * 文字コード変換ヘルパー
 * @param { String } distPath - 出力先のパス
 * @param { String } charCode - 文字コード
 * @param { any } data - 読み込みファイルデータ
 */
function convertHelper(distPath: string, charCode: string, data: any) {
  const fd = fs.openSync(distPath, "w");
  const buf = iconv.encode(data, charCode);
  fs.write(fd, buf, 0, buf.length, (error, _written, _buffer) => {
    if (error) {
      throw error;
    }
    console.log(`${distPath} の書き出しに成功しました`);
  });
}

// 取り込み先
const targetPath = "./src/index.html";

// 出力内容
const distPath = {
  sjis: "./dist/index_sjis.html",
  euc: "./dist/index_euc.html",
};

// HTMLファイルを文字コード別に変換
fs.readFile(targetPath, (error, data) => {
  if (error) {
    throw error;
  }

  // Shift_JIS変換
  convertHelper(distPath.sjis, "Shift_JIS", data);
  // EUC-JP変換
  convertHelper(distPath.euc, "EUC-JP", data);
});
