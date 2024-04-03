document.addEventListener("DOMContentLoaded",() => {
    calendarInit();
})


const calendarInit = () => {
    const date = new Date();
    const utc = date.getTime() + (date.getTimezoneOffset() * 60 * 1000); // utp 표준시 도출
    const kstGap = 9 * 60 * 60 * 1000; // 한국 kst 기준시간 더하기
    const today = new Date(utc + kstGap); // 한국 시간으로 date 객체 생성

    let thisMonth = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    console.log(today)
    console.log(thisMonth)
    let currentYear = thisMonth.getFullYear();
    let currentMonth = thisMonth.getMonth();
    let currentDate = thisMonth.getDate();
    
    // 렌더링
    const render = (thisMonth) => {
        currentYear = thisMonth.getFullYear();
        currentMonth = thisMonth.getMonth();
        currentDate = thisMonth.getDate();
        // 이전 달의 마지막 날 날짜와 요일 구하기
        const startDay = new Date(currentYear, currentMonth, 0);
        const prevDate = startDay.getDate();
        const prevDay = startDay.getDay();
        
        // 현재 달의 마지막날 날짜와 요일 구하기
        const endDay = new Date(currentYear, currentMonth + 1,0);
        const nextDate = endDay.getDate();
        const nextDay = endDay.getDay();
        
        const calendar = document.querySelector('.dates')
        calendar.innerHTML = '';
        // 현재 월 표기하기
        const $yearMonth = document.querySelector('.year-month');
        $yearMonth.innerHTML = `${currentYear}.${currentMonth+1}`
        // 지난 달
        for(let i = prevDate - prevDay; i<=prevDate; i++) {
            calendar.innerHTML = calendar.innerHTML +  `<div class = "day prev disable">${i}</div>`;
        }
        
        // 이번 달
        for(let i = 1; i<=nextDate; i++) {
            calendar.innerHTML = calendar.innerHTML +  `<div class = "day current">${i}</div>`;
        }
        
        // 다음 달
        for(let i = 1; i<=(7 - nextDay == 7 ? 0 : 6 - nextDay); i++) {
            calendar.innerHTML = calendar.innerHTML +  `<div class = "day next disable">${i}</div>`;
        }
        // 오늘 날짜 표시하기
        if(today.getMonth() == currentMonth){
            const todayDate = today.getDate();
            const currentMonthDate = document.querySelectorAll('.dates .current');
            currentMonthDate[todayDate-1].classList.add('today');
        }
    }
    render(thisMonth);

    // 이전 달로 이동
    const $prev = document.querySelector('.go-prev');
    $prev.onclick = () => {
        console.log('prev')
        thisMonth = new Date(currentYear, currentMonth - 1, 1);
        console.log(thisMonth)
        render(thisMonth);
    } ;
    
    // 다음 달 이동
    const $next = document.querySelector('.go-next');
    $next.onclick = () => {
        console.log('next')
        thisMonth = new Date(currentYear, currentMonth + 1, 1);
        console.log(thisMonth)
        render(thisMonth);
    } ;

    const $today = document.querySelector('.year-month');
    $today.onclick = () => {
        render(today);
    }
    
}