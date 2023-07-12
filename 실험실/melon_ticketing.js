// 새로고침 버튼
let reloadBtn = document.querySelector('#btnReloadSchedule');
// 좌석 정보 확인
let list = document.querySelectorAll('#divGradeSummary > tr.box_list_area > td > div > ul > li');
// 좌석 선택 완료 버튼
let vv = document.querySelector('#nextTicketSelection');


// 빈 좌석 찾기(안씀)
const fn = ()=> {
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


// 새로고침 자동화
let autoReload = ()=> {
    let rect = document.querySelectorAll('#scroller > #ez_canvas > svg > rect');

    for(let i=0;i<rect.length;i++){
        //console.log('rect >> ',rect[i])
        let fill = rect[i].getAttribute('fill');
        console.log('fill >> ',fill);
        // 빈 좌석 있을 때 새로고침 멈추고 클릭
        if(fill === '#bea886') {
            clearInterval(startInterval);
            console.log('rect[i] >> ',rect[i]);
            //rect[i].click();
            vv.click();
        }
    }

    reloadBtn.click();
}


// 그냥 새로고침 버튼 누르기
let startInterval = setInterval(autoReload,800);
clearInterval(startInterval);


// 새로고침 돌림(안씀)
const interval = setInterval(()=>{fn()},1500);