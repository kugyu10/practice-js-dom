window.onload = function () {

  //全てのtdタグにイベントリスナをつける
  const trs = Array.prototype.slice.call(document.getElementsByTagName('tr'));

  trs.forEach(function (tr, y) {
    const tds = Array.prototype.slice.call(tr.getElementsByTagName('td'));

    tds.forEach(function (td, x) {
      td.addEventListener('click', function () {

        //置けるなら置く処理
        tryPutPiece(x, y)

      })
    })
  })
}

/** 置けるかどうか判定し、置けたらめくって相手手番へ */
function tryPutPiece(x, y) {
  if (canPutPiece(x, y)) {
    const myColor = document.getElementById('teban').innerText;
    const td = getTd(x, y)
    td.innerHTML = '<div class="Piece bg-' + myColor + '" />'

    turning(x, y, myColor);

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
function canPutPiece(x, y) {
  if (x < 0 || x > 7 || y < 0 || y > 7) {
    return null;
  }

  if (getColor(x, y) !== undefined) {
    return false;
  }
  const myColor = document.getElementById('teban').innerText;
  const opponent = (myColor == 'black') ? 'white' : 'black';

  const directions = [
    { xd: -1, yd: -1 },
    { xd: -1, yd: 0 },
    { xd: -1, yd: 1 },
    { xd: 0, yd: -1 },
    { xd: 0, yd: 1 },
    { xd: 1, yd: -1 },
    { xd: 1, yd: 0 },
    { xd: 1, yd: 1 },
  ];

  for (let d of directions) {
    if (getColor(x + d.xd, y + d.yd) == opponent) {
      if (findMyColor((x + d.xd + d.xd), d.xd, (y + d.yd + d.yd), d.yd, myColor)) {
        return true;
      }
    }
  }
  console.log("置けないです");
  return false;
}


function findMyColor(x, xd, y, yd, myColor) {

  const opponent = (myColor == 'black') ? 'white' : 'black';

  if (getColor(x, y) == opponent) {
    return findMyColor(x + xd, xd, y + yd, yd, myColor);
  } else if (getColor(x, y) == myColor) {
    return true;
  } else {
    return false;
  }

}

/** 駒を置いたあとめくる処理 */
function turning(x, y, myColor) {
  const opponent = (myColor == 'black') ? 'white' : 'black';

  const directions = [
    { xd: -1, yd: -1 },
    { xd: -1, yd: 0 },
    { xd: -1, yd: 1 },
    { xd: 0, yd: -1 },
    { xd: 0, yd: 1 },
    { xd: 1, yd: -1 },
    { xd: 1, yd: 0 },
    { xd: 1, yd: 1 },
  ];
  directions.forEach(d => {
    //隣が相手色なら、奥に自分の色を探す
    if (getColor(x + d.xd, y + d.yd) == opponent
      && findMyColor(x + d.xd, d.xd, y + d.yd, d.yd, myColor)) {
      //めくれるのでめくる
      turnUntilColor(x + d.xd, d.xd, y + d.yd, d.yd, myColor);
    }
  })
}

/** 指定方向の相手色をめくっていく */
function turnUntilMyColor(x, xd, y, yd, myColor) {
  console.log("x:" + x, " xd:" + xd + "  y:" + y + "  yd:" + yd + "  myColor:" + myColor)

  const opponent = (myColor == 'black') ? 'white' : 'black';

  if (getColor(x, y) == opponent) {
    turn(x, y);
    turnUntilColor(x + xd, xd, y + yd, yd, myColor);
  }
}

/** 白黒反転させるだけ */
function turn(x, y) {
  const td = getTd(x, y);
  const div = td.getElementsByTagName('div')[0];
  if (getColor(x, y) == 'black') {
    div.classList.remove('bg-black');
    div.classList.add('bg-white');
  } else if (getColor(x, y) == 'white') {
    div.classList.remove('bg-white');
    div.classList.add('bg-black');
  } else {
    throw error;
  }
}


/**
 * 色を取得
 * 'black' or 'white', 置かれてなかったらundefined、盤外ならnull
 */
function getColor(x, y) {

  const td = getTd(x, y);
  if (td == undefined) {
    return td;
  }

  const td_divs = td.getElementsByTagName('div');
  if (td_divs.length == 0) {
    return undefined;
  }
  const className = td_divs[0].className;
  if (className.match(/bg-black/)) {
    return 'black';
  } else {
    return 'white';
  }
}

function getTd(x, y) {
  if (x < 0 || x > 7 || y < 0 || y > 7) {
    return null;
  }
  const trs = document.getElementsByTagName('tr');
  const tr = trs[y];
  const tds = tr.getElementsByTagName('td');
  const td = tds[x];

  return td;
}