/**
 * 그리드 컬럼 색상 변경.
 * @param {any} code
 */

var comUtil = {
    GetLabelCodeBgColor: function (code) {
        if (code == "DF1")	//고장 수리
            return { color: '#FFFFFF', 'background-color': '#660058' };
        else if (code == "FB1")	//계획 정지
            return { color: '#000000', 'background-color': '#86E57F' };
        else if (code == "FC1")	//규격 교체
            return { color: '#FF0000', 'background-color': '#00D8FF' };
        else if (code == "FD1")	//기타 정지
            return { color: '#FFFFFF', 'background-color': '#8C8C8C' };
        else if (code == "FG1")	//부적합 발생
            return { color: '#0000FF', 'background-color': '#F361A6' };
        else if (code == "FH1")	//불명 불가동
            return { color: '#FFFFFF', 'background-color': '#000000' };
        else if (code == "FL1")	//설비 고장
            return { color: '#FF0000', 'background-color': '#FFE400' };
        else if (code == "FM1")	//운반용구 부족
            return { color: '#0000FF', 'background-color': '#BCE55C' };
        else if (code == "FN9")	//작업 완료
            return { color: '#0000FF', 'background-color': '#EAEAEA' };
        else if (code == "FO1")	//재료 교체
            return { color: '#000000', 'background-color': '#6799FF' };
        else if (code == "FP1")	//재료 부족
            return { color: '#FFFFFF', 'background-color': '#FF0000' };
        else if (code == "FQ1")	//정도 점검
            return { color: '#008000', 'background-color': '#FAED7D' };
        else if (code == "FR1")	//정지보전(PM/CM)
            return { color: '#FFFFFF', 'background-color': '#998A00' };
        else if (code == "FU1")	//휴식/식사
            return { color: '#000000', 'background-color': '#FFB2F5' };
        else if (code == "FV1")	//재료 부적합
            return { color: '#FFFFFF', 'background-color': '#FF00DD' };
        else if (code == "FW1")	//반송설비 고장
            return { color: '#FFFFFF', 'background-color': '#665C00' };
        else
            return { color: '#000000', 'background-color': '#FFFFFF' };
    },
    
    GetCodeBgColor: function(code) {
        if (code == "DF1")	//고장 수리
            return { 'color': '#FFFFFF', 'background-color': '#660058', textAlign: "center" };
        else if (code == "FB1")	//계획 정지
            return { 'color': '#000000', 'background-color': '#86E57F', textAlign: "center" };
        else if (code == "FC1")	//규격 교체
            return { 'color': '#FF0000', 'background-color': '#00D8FF', textAlign: "center" };
        else if (code == "FD1")	//기타 정지
            return { 'color': '#FFFFFF', 'background-color': '#8C8C8C', textAlign: "center" };
        else if (code == "FG1")	//부적합 발생
            return { 'color': '#0000FF', 'background-color': '#F361A6', textAlign: "center" };
        else if (code == "FH1")	//불명 불가동
            return { 'color': '#FFFFFF', 'background-color': '#000000', textAlign: "center" };
        else if (code == "FL1")	//설비 고장
            return { 'color': '#FF0000', 'background-color': '#FFE400', textAlign: "center" };
        else if (code == "FM1")	//운반용구 부족
            return { 'color': '#0000FF', 'background-color': '#BCE55C', textAlign: "center" };
        else if (code == "FN9")	//작업 완료
            return { 'color': '#0000FF', 'background-color': '#EAEAEA', textAlign: "center" };
        else if (code == "FO1")	//재료 교체
            return { 'color': '#000000', 'background-color': '#6799FF', textAlign: "center" };
        else if (code == "FP1")	//재료 부족
            return { 'color': '#FFFFFF', 'background-color': '#FF0000', textAlign: "center" };
        else if (code == "FQ1")	//정도 점검
            return { 'color': '#008000', 'background-color': '#FAED7D', textAlign: "center" };
        else if (code == "FR1")	//정지보전(PM/CM)
            return { 'color': '#FFFFFF', 'background-color': '#998A00', textAlign: "center" };
        else if (code == "FU1")	//휴식/식사
            return { 'color': '#000000', 'background-color': '#FFB2F5', textAlign: "center" };
        else if (code == "FV1")	//재료 부적합
            return { 'color': '#FFFFFF', 'background-color': '#FF00DD', textAlign: "center" };
        else if (code == "FW1")	//반송설비 고장
            return { 'color': '#FFFFFF', 'background-color': '#665C00', textAlign: "center" };
        else
            return { 'color': '#000000', 'background-color': '#FFFFFF', textAlign: "center" };
    },

    GetProcBgColor: function(au, ao) {
        if (au == "Y" && ao == "Y") {
            return { 'color': '#FFFFFF', 'background-color': '#0000FF', textAlign: "center", fontWeight: "bold" };
        }
        else if (au == "Y" && ao == "N") {
            return { 'color': '#FFFFFF', 'background-color': '#0000FF', textAlign: "center", fontWeight: "bold" };
        }
        else if (au == "N" && ao == "Y") {
            return { 'color': '#FFFFFF', 'background-color': '#0000FF', textAlign: "center", fontWeight: "bold" };
        }
        else {
            return { 'color': '#000000', 'background-color': '#FFFFFF', textAlign: "center", fontWeight: "bold" };
        }
    },

    /*
	발생시간을 현재시간과 비교하여 경과한 시간을 시,분,초 단위로 리턴해줍니다.
	*/
    getCompareToTimeString: function(strDate)
	{
        var date = new Date(comUtil.getStrFormatDateTime(strDate));
        var currentDate = new Date();
        currentDate = new Date(Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), currentDate.getHours(), currentDate.getMinutes(), currentDate.getSeconds()));

        //var hour:Number = Math.floor((currentDate.getTime() - date.getTime())/1000/60/60);
        //var min:Number = Math.floor((currentDate.getTime() - date.getTime())/1000/60)%60;
        //var sec:Number = Math.floor((currentDate.getTime() - date.getTime())/1000)%60;
        const timeDifferenceInMilliseconds = currentDate - date;
        console.log(strDate);
        console.log(date);
        console.log(currentDate);
        console.log(timeDifferenceInMilliseconds);
        // 밀리초를 시, 분, 초로 변환
        const millisecondsInOneSecond = 1000;
        const millisecondsInOneMinute = 60 * millisecondsInOneSecond;
        const millisecondsInOneHour = 60 * millisecondsInOneMinute;

        var hour = Math.floor(timeDifferenceInMilliseconds / millisecondsInOneHour);
        var min = Math.floor((timeDifferenceInMilliseconds % millisecondsInOneHour) / millisecondsInOneMinute);

        var returnString;

        if(hour > 0) {
            returnString = hour.toString() + "hours " + min.toString() + "minutes";// + sec.toString() + "초";
		} else {
            returnString = min.toString() + "minutes";// + sec.toString() + "초";
        }

        return returnString;
    },

    getStrFormatDateTime: function(strDate) {
        var year = strDate.substring(0, 4);
        var month = strDate.substring(4, 6);
        var date = strDate.substring(6, 8);

        var hour = strDate.substring(8, 10);
        var min = strDate.substring(10, 12);
        var sec = strDate.substring(12, 14);

        return [year, month, date].join('-') + " " + [hour, min, sec].join(':');
	}

    , getStrFormatDate: function (strDate) {
        var year = strDate.substring(0, 4);
        var month = strDate.substring(4, 6);
        var date = strDate.substring(6, 8);

        return [year, month, date].join('-');
    }
    , getStrFormatDateTime: function (strDate) {
        var year = strDate.substring(0, 4);
        var month = strDate.substring(4, 6);
        var date = strDate.substring(6, 8);

        var hour = strDate.substring(8, 10);
        var min = strDate.substring(10, 12);
        var sec = strDate.substring(12, 14);

        return [year, month, date].join('-') + " " + [hour, min, sec].join(':');
    }
    , leadingZeros: function (n, digits) {
        var zero = '';
        n = n.toString();

        if (n.length < digits) {
            for (i = 0; i < digits - n.length; i++)
                zero += '0';
        }
        return zero + n;
    }
    , getTimeStampAddSec: function (tempDate, sec) {
        var d = new Date(tempDate.substr(0, 4) + '/' + tempDate.substr(4, 2) + '/' + tempDate.substr(6, 2) + ' ' + tempDate.substr(8, 2) + ':' + tempDate.substr(10, 2) + ':' + tempDate.substr(12, 2));
        d.setSeconds(Number(d.getSeconds()) + Number(sec));
        var s =
            comUtil.leadingZeros(d.getFullYear(), 4) +
            comUtil.leadingZeros(d.getMonth() + 1, 2) +
            comUtil.leadingZeros(d.getDate(), 2) +
            comUtil.leadingZeros(d.getHours(), 2) +
            comUtil.leadingZeros(d.getMinutes(), 2) +
            comUtil.leadingZeros(d.getSeconds(), 2);
        return s;
    }
    , getTimeStampAddMin: function (tempDate, min) {
        var d = new Date(tempDate.substr(0, 4) + '/' + tempDate.substr(4, 2) + '/' + tempDate.substr(6, 2) + ' ' + tempDate.substr(8, 2) + ':' + tempDate.substr(10, 2) + ':' + tempDate.substr(12, 2));
        d.setMinutes(Number(d.getMinutes()) + Number(min));
        var s =
            comUtil.leadingZeros(d.getFullYear(), 4) +
            comUtil.leadingZeros(d.getMonth() + 1, 2) +
            comUtil.leadingZeros(d.getDate(), 2) +
            comUtil.leadingZeros(d.getHours(), 2) +
            comUtil.leadingZeros(d.getMinutes(), 2) +
            comUtil.leadingZeros(d.getSeconds(), 2);
        return s;
    }
    , getTimeStampAddHour: function (tempDate, hour) {
        var d = new Date(tempDate.substr(0, 4) + '/' + tempDate.substr(4, 2) + '/' + tempDate.substr(6, 2) + ' ' + tempDate.substr(8, 2) + ':' + tempDate.substr(10, 2) + ':' + tempDate.substr(12, 2));
        d.setHours(Number(d.getHours()) + Number(hour));
        var s =
            comUtil.leadingZeros(d.getFullYear(), 4) +
            comUtil.leadingZeros(d.getMonth() + 1, 2) +
            comUtil.leadingZeros(d.getDate(), 2) +
            comUtil.leadingZeros(d.getHours(), 2) +
            comUtil.leadingZeros(d.getMinutes(), 2) +
            comUtil.leadingZeros(d.getSeconds(), 2);
        return s;
    }
    , getFormatDate: function (date, affix = '') {
        var year = date.getFullYear();			  //yyyy
        var month = (1 + date.getMonth());		  //M
        month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
        var day = date.getDate();				   //d
        day = day >= 10 ? day : '0' + day;		  //day 두자리로 저장
        return [year, month, day].join(affix); // affix(접사)가 없으면 공백으로 연결
    }

    , nvl: function (pStr) {
        return this.nvl2(pStr, '');
    }
    , nvl2: function (pStr, pDefault) {
        var vResult = '';
        if (pStr == undefined || pStr == null || pStr == '') {
            if (pDefault == undefined || pDefault == null) {
                vResult = '';
            } else {
                vResult = pDefault;
            }
        } else {
            vResult = pStr;
        }
        return vResult;
    }
    , isNull: function (sValue) {
        var v_ChkStr = new String(sValue);

        if (sValue == undefined) return true;
        if (new String(sValue).valueOf() == "undefined") return true;
        if (sValue == null) return true;
        if (sValue == "null") return true;
        if (("x" + sValue == "xNaN") && (new String(sValue.length).valueOf() == "undefined")) return true;
        if (v_ChkStr == null) return true;
        if (v_ChkStr.toString().length == 0) return true;
        return false;
    }
    , allTrim: function (strText) {
        var tStr = new String(strText);
        var tReturnStr = "";
        var i;

        if (strText != null) {
            for (var i = 0; i < tStr.length; i++) {
                if (tStr.charAt(i) != " ") {
                    tReturnStr = tReturnStr + tStr.charAt(i);
                }
            }
        } else {
            return -1;
        }

        return tReturnStr;
    }

    , gfn_IsNull: function (sValue) {
        var v_ChkStr = new String(sValue);

        if (sValue == undefined) return true;
        if (new String(sValue).valueOf() == "undefined") return true;
        if (sValue == null) return true;
        if (sValue == "null") return true;
        if (("x" + sValue == "xNaN") && (new String(sValue.length).valueOf() == "undefined")) return true;
        if (v_ChkStr == null) return true;
        if (v_ChkStr.toString().length == 0) return true;

        return false;
    }
    , gfn_Right: function (sOrg, nSize) {
        if (comUtil.gfn_IsNull(sOrg) || comUtil.gfn_IsNull(nSize)) return "";

        if (sOrg.length < nSize)
            return sOrg;
        else
            return sOrg.substr(sOrg.length - nSize, nSize);
    }
    , gfn_Today: function () {
        var sToday = "";
        var objDate = new Date();
        objDate = new Date(Date.UTC(objDate.getFullYear(), objDate.getMonth(), objDate.getDate()));

        sToday = objDate.getUTCFullYear().toString();
        sToday += comUtil.gfn_Right("0" + (objDate.getUTCMonth() + 1), 2);
        sToday += comUtil.gfn_Right("0" + objDate.getUTCDate(), 2);
        return sToday;
    }
    , gfn_TodayTime: function () {
        var strToday = "";
        var objDate = new Date();
        var sToday = objDate.getFullYear().toString();
        sToday += comUtil.gfn_Right("0" + (objDate.getMonth() + 1), 2);
        sToday += comUtil.gfn_Right("0" + objDate.getDate(), 2);
        sToday += comUtil.gfn_Right("0" + objDate.getHours(), 2);
        sToday += comUtil.gfn_Right("0" + objDate.getMinutes(), 2);
        sToday += comUtil.gfn_Right("0" + objDate.getSeconds(), 2);

        if (pltCd == "TP") {
            objDate = new Date(Date.UTC(objDate.getFullYear(), objDate.getMonth(), objDate.getDate(), objDate.getHours(), objDate.getMinutes(), objDate.getSeconds()));
            sToday = objDate.getUTCFullYear().toString();
            sToday += comUtil.gfn_Right("0" + (objDate.getUTCMonth() + 1), 2);
            sToday += comUtil.gfn_Right("0" + objDate.getUTCDate(), 2);
            sToday += comUtil.gfn_Right("0" + objDate.getUTCHours(), 2);
            sToday += comUtil.gfn_Right("0" + objDate.getUTCMinutes(), 2);
            sToday += comUtil.gfn_Right("0" + objDate.getUTCSeconds(), 2);
        }
        //strToday += objDate.getMilliseconds();
        return sToday;
    }
    , gfn_IsLeapYear: function (sDate) {
        var ret;
        var nY;

        if (comUtil.gfn_IsNull(sDate)) {
            return false;
        }

        nY = parseInt(sDate.substring(0, 4), 10);

        if ((nY % 4) == 0) {
            if ((nY % 100) != 0 || (nY % 400) == 0) {
                ret = true;
            } else {
                ret = false;
            }
        } else {
            ret = false;
        }

        return ret;
    }
    , gfn_LastDateNum: function (sDate) {
        var nMonth, nLastDate;

        if (comUtil.gfn_IsNull(sDate)) {
            return -1;
        }
        nMonth = parseInt(sDate.substr(4, 2), 10);
        if (nMonth == 1 || nMonth == 3 || nMonth == 5 || nMonth == 7 || nMonth == 8 || nMonth == 10 || nMonth == 12) {
            nLastDate = 31;
        } else if (nMonth == 2) {
            if (comUtil.gfn_IsLeapYear(sDate) == true) {
                nLastDate = 29;
            } else {
                nLastDate = 28;
            }
        } else {
            nLastDate = 30;
        }

        return nLastDate;
    }
    , gfn_AllTrim: function (strText) {
        var tStr = new String(strText);
        var tReturnStr = "";
        var i;

        if (strText != null) {
            for (var i = 0; i < tStr.length; i++) {
                if (tStr.charAt(i) != " ") {
                    tReturnStr = tReturnStr + tStr.charAt(i);
                }
            }
        } else {
            return -1;
        }

        return tReturnStr;
    }

    , gfn_LTrim: function (sOrg, sTrim) {
        var chk, pos;

        if (comUtil.gfn_IsNull(sOrg)) return "";
        if (comUtil.gfn_IsNull(sTrim)) sTrim = " ";

        for (pos = 0; pos < sOrg.length; pos += sTrim.length) {
            if (sOrg.substr(pos, sTrim.length) != sTrim)
                break;
        }

        return sOrg.substr(pos);
    }

    , gfn_NVL: function (sValue, rValue) {
        if (new String(sValue).valueOf() == "undefined")
            return rValue;
        if (sValue == null)
            return rValue;
        if (sValue == "null")
            return rValue;
        if (("x" + sValue == "xNaN") && (new String(sValue.length).valueOf() == "undefined"))
            return rValue;
        if (sValue.length == 0)
            return rValue;
        return sValue;
    }
    , gfn_AddDate: function (sDate, nOffset) {
        if (comUtil.gfn_IsNull(sDate) || comUtil.gfn_IsNull(nOffset)) return "";

        var nYear = parseInt(sDate.substr(0, 4));
        var nMonth = parseInt(sDate.substr(4, 2));
        var nDate = parseInt(sDate.substr(6, 2)) + nOffset;

        return comUtil.gfn_MakeDate(nYear, nMonth, nDate);
    }
    , gfn_AddMonth: function (sDate, nOffset) {
        if (comUtil.gfn_IsNull(sDate) || comUtil.gfn_IsNull(nOffset)) return "";

        var nYear = parseInt(sDate.substr(0, 4));
        var nMonth = parseInt(sDate.substr(4, 2)) + nOffset;
        var nDate = parseInt(sDate.substr(6, 2));
        var nLastDate, sRet;
        if (nDate.toString().length == 1) {
            nDate = "0" + nDate;
        }
        sRet = comUtil.gfn_MakeDate(nYear, nMonth, 1);
        nLastDate = comUtil.gfn_LastDateNum(sRet);
        sRet = sRet.substr(0, 6);
        if (nDate > nLastDate)
            sRet += nLastDate.toString();
        else
            sRet += nDate.toString();
        return sRet;
    }
    , gfn_MakeDate: function (nYear, nMonth, nDate) {
        if (comUtil.gfn_IsNull(nYear) || comUtil.gfn_IsNull(nMonth) || comUtil.gfn_IsNull(nDate)) return "";

        var objDate = new Date(Date.UTC(nYear, nMonth - 1, nDate));

        var sYear = objDate.getUTCFullYear().toString();
        var sMonth = comUtil.gfn_Right("0" + (objDate.getUTCMonth() + 1), 2);
        var sDate = comUtil.gfn_Right("0" + objDate.getUTCDate(), 2);

        return sYear + sMonth + sDate;
    }
    , gfn_GetLastDate: function (sDate) {
        var nMonth, nLastDate;

        if (comUtil.gfn_IsNull(sDate)) return -1;

        nMonth = parseInt(sDate.substr(4, 2), 10);
        if (nMonth == 1 || nMonth == 3 || nMonth == 5 || nMonth == 7 || nMonth == 8 || nMonth == 10 || nMonth == 12)
            nLastDate = 31;
        else if (nMonth == 2) {
            if (comUtil.gfn_IsLeapYear(sDate) == true)
                nLastDate = 29;
            else
                nLastDate = 28;
        }
        else
            nLastDate = 30;

        return nLastDate;
    }
    , gfn_GetLastDayInfo: function (strDate) {
        var s = "";

        if (strDate == null) {
            var date = new Date();
            s = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        }
        else {
            var date = new Date(parseInt(strDate.substr(0, 4)), parseInt(strDate.substr(4, 2)) + 1, 0);
            s = (new Date(date)).getFullYear() + "-"
                + (((new Date(date)).getMonth() + 1) + "").padStart(2, '0') + "-"
                + ((new Date(date)).getDate() + "").padStart(2, '0');
        }
        return (s);
    }
    , gfn_GetFirstDate: function (pltCd, strDate) {
        var s = "";

        if (strDate == null) {
            s = (new Date()).getFullYear() + "-"
                + (((new Date()).getMonth() + 1) + "").padStart(2, '0') + "-"
                + "01";
        }
        else {
            var date = new Date(parseInt(strDate.substr(0, 4)), parseInt(strDate.substr(4, 2)) - 1, 1);
            s = (new Date(date)).getFullYear() + "-"
                + (((new Date(date)).getMonth() + 1) + "").padStart(2, '0') + "-"
                + ((new Date(date)).getDate() + "").padStart(2, '0');

            if (pltCd == "TP") {
                date = new Date(Date.UTC(parseInt(strDate.substr(0, 4)), parseInt(strDate.substr(4, 2)) - 1, 1));
                s = (new Date(date)).getUTCFullYear() + "-"
                    + (((new Date(date)).getUTCMonth() + 1) + "").padStart(2, '0') + "-"
                    + ((new Date(date)).getUTCDate() + "").padStart(2, '0');
            }
        }
        return (s);
    }
    , gfn_GetBeforeMonth: function (strDate) {
        var s = "";
        if (strDate == null) {
            s = comUtil.gfn_AddMonth(comUtil.gfn_Today(), -1);
        }
        else {
            s = comUtil.gfn_AddMonth(strDate, -1);
        }
        return (s);
    }
    /*
    발생시간을 현재시간과 비교하여 경과한 시간을 분으로 환산하여 리턴해줍니다.
    */
    //public static function getCompareToTimeNumber(strDate: String): Number {
    //    var date: Date = TimeUtil.stringToDate(strDate);
    //    var currentDate: Date = currentDate;

    //    var hour: Number = Math.floor((currentDate.getTime() - date.getTime()) / 1000 / 60 / 60);
    //    var min: Number = Math.floor((currentDate.getTime() - date.getTime()) / 1000 / 60) % 60;
    //    //var sec:Number = Math.floor((currentDate.getTime() - date.getTime())/1000)%60;

    //    return (hour * 60) + min;
    //}
}