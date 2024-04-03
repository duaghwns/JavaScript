/**
 * 날짜관련 함수 클래스
 * @author : yhj
 * @copyright: Copyright (c) 2024
 * @Title: DateUtil
 * @Version: 1.0
 * */
class DateUtil {
    constructor() { }
    /*******************************************************************
    * 공백, 포멧문자 제거
    ******************************************************************/
    removeFormat(strTarget) {
        strTarget += ''
        strTarget = strTarget.replace(/:/g, "");
        strTarget = strTarget.replace(/-/g, "");
        strTarget = strTarget.replace(/\//g, "");
        // trim : 앞 뒤 공백만 제거
        strTarget = strTarget.replace(/(^\s*)|(\s*$)/g, "");

        return strTarget;
    }
    
    /**
     * 유효한 월(月) 체크
     * @param {string} strMonth
     */
    isMonth(strMonth) {
        if (strMonth.length == 0) return false;

        let nMonth = parseInf(strMonth, 10);

        return (nMonth >= 1 && nMonth <= 12) ? true : false;
    }

    /**
     * 유효한 일자 (日) 체크
     * @param {string} strYYYYMMDD
     */
    isDay(strYYYYMMDD) {
        strYYYYMMDD = this.removeFormat(strYYYYMMDD);

        if (strYYYYMMDD.length != 8) return false;

        let nYear = parseInt(strYYYYMMDD.substring(0, 4), 10);
        let nMonth = parseInt(strYYYYMMDD.substring(4, 6), 10) - 1;
        let nDay = parseInt(strYYYYMMDD.substring(6, 8), 10);

        let arrLastDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        // 윤년일 경우
        if (isLeapYear(nYear)) {
            arrLastDay[1] = 29; // 2월
        }

        return (nDay >= 1 && nDay <= arrLastDay[nMonth]) ? true : false;
    }

    /**
     * 유효성 년월일 체크
     * @param { string } strYYYYMMDD
     */
    isDate(strYYYYMMDD) {
        if (strYYYYMMDD.length == 0) return false;

        strYYYYMMDD = this.removeFormat(strYYYYMMDD);

        let nYear = parseInt(strYYYYMMDD.substring(0, 4), 10);
        let strMonth = strYYYYMMDD.substring(4, 6);

        // 1900 ~ 9999 년도 유효성
        if (nYear >= 1900 && nYear <= 9999) {
            // 월에 대한 유효성
            if (isMonth(strMonth) == true) {
                // 일에 대한 유효성(윤년 채크)
                if (isDay(strYYYYMMDD) == true) return true;
            }
        }
        return false;
    }

    /**
     * 윤년 체크
     * @param {string} nYYYY
     */
    isLeapYear(nYYYY) {
        return (((nYYYY % 4 == 0) && (nYYYY % 100 != 0)) || (nYYYY % 400 == 0)) ? true : false;
    }


    /**
     * 설정한 날짜가 미래인지
     * @param {string} strYYYYMMDD
     */
    isFutureDate(strYYYYMMDD) {
        return (getObjDate(strYYYYMMDD) > getObjDate()) ? true : false;
    }


    /**
     * 설정한 날짜가 과거인지
     * @param {string} strYYYYMMDD
     */
    isPostDate(strYYYYMMDD) {
        return (getObjDate(strYYYYMMDD) < getObjDate()) ? true : false;
}

    /**
     * 설정한 날짜 오프젝트 리턴
     * ( 인자값을 설정하지 않을 경우 현재 날짜 리턴 )
     * @param {any} strYYYYMMDD
     */
    getObjDate(strYYYYMMDD) {
        // 인자값이 입력되지 않았을 경우
        if (strYYYYMMDD.length == 0) {
            return new Date();

        } else {
            strYYYYMMDD = this.removeFormat(strYYYYMMDD);

            if (strYYYYMMDD.length == 8) {
                let strYear = strYYYYMMDD.substring(0, 4);
                let strMonth = parseInt(strYYYYMMDD.substring(4, 6), 10) - 1;
                let strDay = parseInt(strYYYYMMDD.substring(6, 8), 10);

                return new Date(strYear, strMonth, strDay);
            } else {
                return null;
            }
        }
}

    /**
     * 해당 월에 마지막 날
     * @param {string} strYYYYMMDD
     * @param {boolean} bFullDate
     */
    getLastDay(strYYYYMMDD, bFullDate) {
        strYYYYMMDD += ''
        strYYYYMMDD = this.removeFormat(strYYYYMMDD);

        if (strYYYYMMDD.length != 8) {
            // YYYYMM 으로 들어왔을 경우
            if (strYYYYMMDD.length == 6) {
                strYYYYMMDD = strYYYYMMDD + "01"
            }
        }

        let nYear = parseInt(strYYYYMMDD.substring(0, 4), 10);
        let nMonth = parseInt(strYYYYMMDD.substring(4, 6), 10);

        // 마지막 일수(임시로 입력된 일수 설정)
        let nDay = parseInt(strYYYYMMDD.substring(6, 8), 10);

        let arrLastDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        // 윤년일 경우
        if (this.isLeapYear(nYear)) {
            arrLastDay[1] = 29;     // 윤년 2월
        }

        nDay = arrLastDay[nMonth - 1];

        let strDay = nDay + '';

        if (bFullDate == true) {
            if (nDay < 10) strDay = "0" + strDay;

            return strYYYYMMDD.substring(0, 6) + strDay;
        }
        return strDay;
}

    /**
     * 현재 날짜(년월일) 리턴
     * 인자 : strDelimiter - 년월일 구분자
     * @param {string} strDelimiter
     */
    getCurDate(strDelimiter) {
        let objCurDate = getObjDate();

        let strYear = objCurDate.getFullYear().toString();
        let strMonth = (objCurDate.getMonth() + 1).toString();
        let strDay = objCurDate.getDate().toString();

        if (parseInt(strMonth, 10) < 10) strMonth = "0" + strMonth;
        if (parseInt(strDay, 10) < 10) strDay = "0" + strDay;

        return strYear + strDelimiter + strMonth + strDelimiter + strDay;
    }


    /**
     * 현재 시간(시분초밀리) 리턴
     * 인자 : strDelimiter - 시분초 구분자
     * bMilliseconds - 밀리세컨즈 표시 여부
     * @param {string} strDelimiter
     * @param {boolean} bMilliseconds
     */
    getCurTime(strDelimiter, bMilliseconds) {
        let retValue = '';
        let objCurDate = getObjDate();

        let strHours = objCurDate.getHours().toString();
        let strMinutes = objCurDate.getMinutes().toString();
        let strSeconds = objCurDate.getSeconds().toString();
        let strMillsec = objCurDate.getMilliseconds().toString();

        if (parseInt(strHours, 10) < 10) strHours = "0" + strHours;
        if (parseInt(strMinutes, 10) < 10) strMinutes = "0" + strMinutes;
        if (parseInt(strSeconds, 10) < 10) strSeconds = "0" + strSeconds;
        if (parseInt(strMillsec, 10) < 10) strMillsec = "0" + strMillsec;

        retValue = strHours + strDelimiter + strMinutes + strDelimiter + strSeconds;

        if (bMilliseconds == true) {
            retValue += '.' + strMillsec;
        }
        return retValue;
    }

    /**
     * 설정한 날짜형 오브젝트를 문자형으로 리턴
     * 인자 : objDate - 날짜형 오브젝트
     * strDelimiter - 날짜 구분자
     * @param {object} objDate
     * @param {string} strDelimiter
     */
    getDateString(objDate, strDelimiter) {
        let strYear = objDate.getFullYear().toString();
        let strMonth = (objDate.getMonth() + 1).toString();
        let strDay = objDate.getDate().toString();

        if (parseInt(strMonth, 10) < 10) strMonth = "0" + strMonth;
        if (parseInt(strDay, 10) < 10) strDay = "0" + strDay;

        return strYear + strDelimiter + strMonth + strDelimiter + strDay;
    }

    /**
     * 요일 구하기
     * @param {string} strYYYYMMDD
     * @param {int} nType
     */
    getDay(strYYYYMMDD, nType) {
        let arrDay = [];
        let objDate = getObjDate(strYYYYMMDD);
        let nDay = objDate.getDay();

        switch (nType) {
            case 0:
                arrDay = ['일', '월', '화', '수', '목', '금', '토'];
                break;
            case 1:
                arrDay = ['日', '月', '火', '水', '木', '金', '土'];
                break;
            case 2:
                arrDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                break;
            default:
                arrDay = ['0', '1', '2', '3', '4', '5', '6'];
                break;
        }
        return arrDay[nDay];
    }


    /**
     * 초를 시분초로 변환
     * @param {string} strSeconds
     */
    getTime2Second(strSeconds) {
        let nSeconds = parseInt(strSeconds);
        let nDays = nSeconds / (60 * 60 * 24);      // 86400으로 나눈 몫이 일수
        let nHours = int(nSeconds / (60 * 60));     // 3600으로 나눈 몫이 시간
        nSeconds = int(nSeconds % (60 * 60));       // 3600으로 나눈 나머지가 초
        let nMinutes = int(nSeconds / 60);          // 60으로 나눈 몫이 분

        nSeconds = int(nSeconds % 60);              // 60으로 나눈 나머지가 초

        let strHours = (nHours < 10) ? "0" + nHours : nHours.toString();
        let strMinutes = (nMinutes < 10) ? "0" + nMinutes : nMinutes.toString();
        strSeconds = (nSeconds < 10) ? "0" + nSeconds : nSeconds.toString();

        return strHours + ":" + strMinutes + ":" + strSeconds;
    }

    /**
     * 설정한 두 날짜 값의 달수 차 리턴
     * 인자 : strFromDate - 설정한 일로부터
     *      : strToDate   - 설정한 일까지 뺀 값
     * @param {string} strFromDate
     * @param {string} strToDate
     */
    getIntervalMonth(strFromDate, strToDate) {
        let objFromDate = getObjDate(strFromDate);
        let objToDate = getObjDate(strToDate);

        let nYear = objToDate.getFullYear() - objFromDate.getFullYear();
        let nMonth = objToDate.getMonth() - objFromDate.getMonth();
        let nDay = objToDate.getDate() - objFromDate.getDate();

        // nYear * 12 : 년수를 달로 환산
        // 일수 계산 값이 마이너스일 경우 한달을 뺌.
        return (nYear * 12 + nMonth + (nDay >= 0 ? 0 : -1));
    }

    /**
     * 설정한 두 날짜들의 시간 차 리턴
     * @param {date} strFromDate
     * @param {date} strToDate
     */
    getIntervalHour(strFromDate, strToDate) {
        // MilliSconds * Sconds * Minutes * Hours
        let nHour = 1000 * 60 * 60;

        return parseInt((strToDate.getTime() - strFromDate.getTime()) / nHour);
    }

    /**
     * 설정한 두 날짜들의 일수 차 리턴
     * @param {string} strFromDate
     * @param {string} strToDate
     */
    getIntervalDay(strFromDate, strToDate) {
        let objFromDate = getObjDate(strFromDate);
        let objToDate = getObjDate(strToDate);

        // MilliSconds * Sconds * Minutes * Hours
        let nDay = 1000 * 60 * 60 * 24;

        return parseInt((objToDate.getTime() - objFromDate.getTime()) / nDay);
    }

    /**
     * 설정한 날짜(YYYYMMDD)에 년수 연산
     * @param {string} strYYYYMMDD
     * @param {object} objYears
     */
    addYears(strYYYYMMDD, objYears) {
        let objDate = getObjDate(strYYYYMMDD);
        let nYears = 0;
        trace(typeof objYears === number);

        if (typeof objYears === number) {
            nYears = Number(objYears);
        } else {
            if (String(objYears).length > 0) {
                nYears = Number(objYears);
            }
        }

        let nYear = objDate.getFullYear() + nYears;
        let nMonth = objDate.getMonth();
        let nDate = objDate.getDate();

        objDate.setFullYear(nYear, nMonth, nDate);

        return getDateString(objDate);
    }

    /**
     * 설정한 날짜(YYYYMMDD)에 달수 연산
     * @param {any} strYYYYMMDD
     * @param {any} objMonths
     */
    addMonths(strYYYYMMDD, objMonths) {
        let objDate = getObjDate(strYYYYMMDD);
        let nMonths = 0;


        if (typeof objMonths === number) {
            nMonths = Number(objMonths);
        } else {
            if (String(objMonths).length > 0) {
                nMonths = Number(objMonths);
            }
        }

        let nMonth = objDate.getMonth() + nMonths;
        let nDate = objDate.getDate();

        objDate.setMonth(nMonth, nDate);

        return getDateString(objDate);
    }

    /**
     * 설정한 날짜(YYYYMMDD)에 날수 연산
     * @param {String} strYYYYMMDD
     * @param {Object} objDays
     */
    addDays(strYYYYMMDD, objDays) {
        let objDate = getObjDate(strYYYYMMDD);
        let nDays = 0;

        if (typeof objDays === number)
        {
            nDays = Number(objDays);
        }
                     else
        {
            if (String(objDays).length > 0) {
                nDays = Number(objDays);
            }
        }
        objDate.setDate(objDate.getDate() + nDays);

        return getDateString(objDate);
    }

    /**
     * 날짜 비교
     * ret = 0  if date1 == date2
     * ret = 1  if date1 >  date2
     * ret = -1 if date1 <  date2
     * @param {String} strYYYYMMDD1
     * @param {String} strYYYYMMDD2
     */
    compareToDate(strYYYYMMDD1, strYYYYMMDD2) {
        let retValue = -2;

        if (strYYYYMMDD1 == strYYYYMMDD2)
            retValue = 0;
        else if (strYYYYMMDD1 > strYYYYMMDD2)
            retValue = 1;
        else if (strYYYYMMDD1 < strYYYYMMDD2)
            retValue = -1;
        else
            retValue = -2;

        return retValue;
    }


    
}