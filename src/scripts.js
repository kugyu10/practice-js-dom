window.onload = function () {

  //全てのtdタグにイベントリスナをつける
  const trs = Array.prototype.slice.call(document.getElementsByTagName('tr'));

  trs.forEach(function (tr, y) {
    const tds = Array.prototype.slice.call(tr.getElementsByTagName('td'));

    tds.forEach(function (td, x) {
      td.addEventListener('click', function () {
        console.log("x:" + x + ", y:" + y);

        //置けるなら置く処理
        tryPutPiece(x,y)

      })
    })
  })
}

/** 置けるかどうか判定し、置けたらめくって相手手番へ */
function tryPutPiece(x, y) {
  //TODO 置けるか判定判定
  if (canPut(x, y)) {

    console.log("tryPutPiece");

    if (getColor(x, y) === undefined) {
      const color = document.getElementById('teban').innerText;
      const td = getTd(x,y)
      td.innerHTML = '<div class="Piece bg-' + color + '" />'
    }

    turning();

    changeTeban();
  }
}

/** 手番を相手に変更する ボタン押下でパスも可能 */
function changeTeban() {
  const color = document.getElementById('teban').innerText;
  if (color == 'black') {
    document.getElementById('teban').innerText = 'white';
  } else {
    document.getElementById('teban').innerText = 'black';
  }
}

/** 駒を置けるかどうか */
function canPut(x, y) {
  if (x < 0 || x > 7 || y < 0 || y > 7) {
    return null;
  }
  const color = document.getElementById('teban').innerText;
  let opponent = (color == 'black') ? 'white' : 'black';

  //未実装
  return true;
}

/** 駒を置いたあとめくる処理 */
function turning() {
  console.log("turning"); //未実装
}

/**
 * 色を取得
 * 'black', 'white', 置かれてなかったらundefined、盤外ならnull
 */
function getColor(x, y) {

  const td = getTd(x,y);
  if(td == undefined){
    return td;
  }

  const td_divs = td.getElementsByTagName('div');
  if (td_divs.length == 0) {
    return undefined;
  }
  const className = td_divs[0].className;
  if (className.match(/black/)) {
    return 'black';
  } else {
    return 'white';
  }
}
function getTd(x,y){
  if (x < 0 || x > 7 || y < 0 || y > 7) {
    return null;
  }
  const trs = document.getElementsByTagName('tr');
  const tr = trs[y];
  const tds = tr.getElementsByTagName('td');
  const td = tds[x];

  return td;
}