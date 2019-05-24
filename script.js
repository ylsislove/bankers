// 重新开始
function reset(){
		document.getElementById('resourceA').value = '';
		document.getElementById('resourceB').value = '';
		document.getElementById('resourceC').value = '';
		for (var i=1; i<=5; i++) {
				for (var j=1; j<=3; j++) {
						document.getElementById('a'+i+j).value='';
						document.getElementById('m'+i+j).value='';
						document.getElementById('n'+i+j).value='';
				}
				document.getElementById('p'+i).value = '';
		}
		document.getElementById('av11').value = '';
		document.getElementById('av12').value = '';
		document.getElementById('av13').value = '';
		document.getElementById('status').innerHTML = '';
}

// 样例输入
function sample(){
  sam = [[0,1,0],
        [2,0,0],
        [3,0,2],
        [2,1,1],
        [0,0,2]];

  max = [[7,5,3],
        [3,2,2],
        [9,0,2],
        [2,2,2],
        [4,3,3]];
  for(var i=1; i<=5; i++){
    for(var j=1; j<=3; j++){
      document.getElementById('a'+i+j).value = sam[i-1][j-1];
      document.getElementById('m'+i+j).value = max[i-1][j-1];
    }
  }
  document.getElementById('resourceA').value = 10;
  document.getElementById('resourceB').value = 5;
  document.getElementById('resourceC').value = 7;
}

// 计算剩余资源总量
function find_avai(){
  var a = document.getElementById('resourceA').value;
  var b = document.getElementById('resourceB').value;
  var c = document.getElementById('resourceC').value;
  var x = 0;
  var y = 0;
  var z = 0;
  for(var i=1; i<=5; i++){
      var x = x + parseInt(document.getElementById('a'+i+'1').value);
      var y = y + parseInt(document.getElementById('a'+i+'2').value);
      var z = z + parseInt(document.getElementById('a'+i+'3').value);
  }
  document.getElementById('av11').value = a-x;
  document.getElementById('av12').value = b-y;
  document.getElementById('av13').value = c-z;
}

// 计算仍需资源数目
function find_need(){
	var m = 0;
	var a = 0;
  for(var i=1; i<=5; i++){
    for(var j=1; j<=3; j++){
			m = parseInt(document.getElementById('m'+i+j).value);
			a = parseInt(document.getElementById('a'+i+j).value);
      document.getElementById('n'+i+j).value = m - a;
    }
  }
}

// 查找安全序列
function find_sequence() {
	document.getElementById('status').innerHTML = '';
	for (var i = 1; i <= 5; i++) {
		document.getElementById('p'+i).value = '';
	}
		
  find_avai();
  find_need();
	var alloc = [[0, 0, 0],
							 [0, 0, 0],
							 [0, 0, 0],
							 [0, 0, 0],
							 [0, 0, 0]];
  var succNum = 0;			// 已归还资源的进程数目
	var isFail = false;		// 是否处于安全状态
	var index = 1;				// 安全序列的输出位置
	var resA = parseInt(document.getElementById('av11').value);
	var resB = parseInt(document.getElementById('av12').value);
	var resC = parseInt(document.getElementById('av13').value);
	
	for (i = 1; i <= 5; i++) {
		alloc[i-1][0] = parseInt(document.getElementById('a'+i+'1').value);
		alloc[i-1][1] = parseInt(document.getElementById('a'+i+'2').value);
		alloc[i-1][2] = parseInt(document.getElementById('a'+i+'3').value);
		if (alloc[i-1][0] == 0 && alloc[i-1][1] == 0 && alloc[i-1][2] == 0) {
			succNum ++;
		}
	}
	
	// 当已归还资源的进程数目等于5，或遍历一遍后仍没有能归还资源的进程，则退出循环
  while (succNum < 5 && !isFail) {
		isFail = true		// 初始化为不安全状态
    for (i = 1; i <= 5; i++) {
			// 如果当前进程没有归还资源
      if (alloc[i-1][0] != 0 || alloc[i-1][1] != 0 || alloc[i-1][2] != 0) {
				// 检查当前进程是否可归还资源
        if (resA >= parseInt(document.getElementById('n'+i+'1').value) && 
						resB >= parseInt(document.getElementById('n'+i+'2').value) && 
						resC >= parseInt(document.getElementById('n'+i+'3').value)) {
          // 可以归还进程
					document.getElementById('p' + index).value = 'P' + i;
					index ++;
					succNum ++;
					isFail = false;
					resA += alloc[i-1][0];
					resB += alloc[i-1][1];
					resC += alloc[i-1][2];
          alloc[i-1][0] = 0;
          alloc[i-1][1] = 0;
					alloc[i-1][2] = 0;
        }
      }
    }
  }
	
  if (succNum == 5) {
		document.getElementById('status').innerHTML = '安全状态！!';
    //alert("安全状态！！");
  }
	else {
		document.getElementById('status').innerHTML = '不安全状态！！';
		//alert("不安全状态！！");
	}
}
