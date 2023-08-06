// 새로고침 버튼
let reloadBtn = document.querySelector('#btnReloadSchedule');
// 좌석 정보 확인(안씀)
let list = document.querySelectorAll('#divGradeSummary > tr.box_list_area > td > div > ul > li');
// 좌석 선택 완료 버튼
let nextTicketSelection = document.querySelector('#nextTicketSelection');

// 새로고침 자동화(실행)
let autoReload = interval => {
    let rect = document.querySelectorAll('#scroller > #ez_canvas > svg > rect');

    for(let i=1;i<rect.length;i++){
        let fill = rect[i].getAttribute('fill');
        if(fill!='none'){
            console.log('fill >> ',fill);
        }
        // 좌석 있을 때 새로고침 멈추고 클릭
        if(fill === '#bca888') {
            clearInterval(interval);
            console.log('rect[i] >> ',rect[i]);
            rect[i].click();
            nextTicketSelection.click();
            return;
        }
    }

    reloadBtn.click();
}


// 그냥 새로고침 버튼 누르기
let startInterval = setInterval(()=>{autoReload(this)},800);

// 인터벌 종료
clearInterval(startInterval);


// 빈 좌석 찾기(안씀)
let findInList = ()=> {
    list.forEach(li=> {
        let num = li.querySelectorAll('span')[1].querySelector('strong').innerText;
        
        if(num>0) {
            clearInterval(interval);
            // 좌석 클릭
            li.click();
        } else {
            reloadBtn.click();
        }
    });
}

// 새로고침 돌림(안씀)
const interval = setInterval(findInList,1500);
clearInterval(interval);