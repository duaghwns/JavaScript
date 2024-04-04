/**
 * Time Util.
 */
class TimeUtil {
    constructor() { }

    currentDate = new Date();
    curDate = new Date();
    plant;
    currentDateStr = "";

    MTIME = 8;
    ATIME = 16
    NTIME = 0;

    MTIME_STR = "08:00";		//오전조 시작 시간
    ATIME_STR = "16:00";		//오후조 시작 시간
    NTIME_STR = "00:00";		//야간조 시작 시간

    _timeArr = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "00", "01", "02", "03", "04", "05", "06", "07", "08"];
    _shift = new Array(10);
    _nextShift = new Array(10);
    _curTabIndex = 1;

    // factory = VMSUtil.factoryCreator(ChartHeaderRenderer);
    // nextFactory = VMSUtil.factoryCreator(NextChartHeaderRenderer);

    getTimeIndex(shift) {
        let findStr;

        switch (shift) {
            case '1':
                findStr = this.MTIME_STR.substring(0, 2);
                break;
            case '2':
                findStr = this.ATIME_STR.substring(0, 2);
                break;
            case '3':
                findStr = this.NTIME_STR.substring(0, 2);
                break;
        }

        return _timeArr.indexOf(findStr);
    }

    timeLineInit() {
        // this.factory = VMSUtil.factoryCreator(ChartHeaderRenderer);
        // this.nextFactory = VMSUtil.factoryCreator(NextChartHeaderRenderer);
    }

    getNextShift(shift) {
        if (this.plant == 'TP') {
            shift = (shift == '1') ? '2' : '1';
        } else {
            shift = (shift == '1') ? '2' : (shift == "2" ? "3" : "1");
        }

        return shift;
    }

    /**
     * 현재 공장의 날짜를 String값으로 돌려줍니다. ex)20100617
     * @returns 
     */
    getTargetDateToString() {
        const currentDate = this.currentDate;

        let nowYear = currentDate.getFullYear();
        let nowMonth = currentDate.getMonth();
        let nowDate = currentDate.getDate();

        let retDt = (currentDate.getHours() < this.MTIME) ? new Date(nowYear, nowMonth, nowDate - 1, this.NTIME >= 24 ? 0 : this.NTIME, 0, 0, 0) : new Date(nowYear, nowMonth, nowDate, this.NTIME >= 24 ? 0 : this.NTIME, 0, 0, 0);

        let df = new DateFormatter();

        df.formatString = "YYYYMMDD";

        return df.format(retDt);
    }

    /**
     * 현재 공장의 날짜에서 이전조의 날짜를 String값으로 돌려줍니다. ex)20100617 
     * @returns 
     */
    getPrevTargetDateToString() {
        const currentDate = this.currentDate;
        
        let nowYear = currentDate.getFullYear();
        let nowMonth = currentDate.getMonth();
        let nowDate = currentDate.getDate();
        
        let retDt = ((  currentDate.getHours()-8) < this.MTIME) ? new Date(nowYear,nowMonth,nowDate - 1,NTIME>=24?0:NTIME,0,0,0) : new Date(nowYear,nowMonth,nowDate,NTIME>=24?0:NTIME,0,0,0);
        
        let df = new DateFormatter();
        
        df.formatString = "YYYYMMDD";
        
        return df.format(retDt);
    }

	/**
	 * 현재 공장의 날짜에서 다음조의 날짜를 String값으로 돌려줍니다. ex)20100617 
	 * @returns 
	 */
    getNextStartDateToString() {
        const currentDate = this.currentDate;
		const NTIME = this.NTIME;
        
        let nowYear = currentDate.getFullYear();
        let nowMonth = currentDate.getMonth();
        let nowDate = currentDate.getDate();
        
        //let retDt = (currentDate.getHours() >= NTIME) ? new Date(nowYear,nowMonth,nowDate + 1,NTIME,0,0,0) : new Date(nowYear,nowMonth,nowDate,NTIME,0,0,0);
        let retDt;

        if(plant == "IP") {
            retDt = new Date(nowYear,nowMonth,nowDate,0,0,0,0);	
        } else if(plant == "TP") {
            let nextDate = nowDate;
            nextDate = (currentDate.hours >= 6) ? nextDate + 1 : nextDate;
            retDt = new Date(nowYear,nowMonth,nextDate,6,0,0,0);
        } else {
            retDt = (currentDate.getHours() >= NTIME) ? new Date(nowYear,nowMonth,nowDate + 1,NTIME,0,0,0) : new Date(nowYear,nowMonth,nowDate,NTIME,0,0,0);
            //retDt = (currentDate.getHours() <= NTIME && currentDate.getHours() >= ATIME) ? new Date(nowYear,nowMonth,nowDate + 1,0,0,0,0) : new Date(nowYear,nowMonth,nowDate,0,0,0,0);
        }
        
        return retDt;
    }


	/**
	 * 현재 공장의 날짜에서 다음조의 날짜를 String값으로 돌려줍니다. ex)20100617 
	 * @returns 
	 */
    getNextTargetDateToString() {
        const currentDate = this.currentDate;
		const NTIME = this.NTIME;
		const ATIME = this.ATIME;
        
        let nowYear = currentDate.getFullYear();
        let nowMonth = currentDate.getMonth();
        let nowDate = currentDate.getDate();
        
        //let retDt = (currentDate.getHours() >= NTIME) ? new Date(nowYear,nowMonth,nowDate + 1,NTIME,0,0,0) : new Date(nowYear,nowMonth,nowDate,NTIME,0,0,0);
        let retDt;

        if(plant == "IP" || plant == "CP") {
            retDt = new Date(nowYear,nowMonth,nowDate,0,0,0,0);	
        } else if(plant == "TP") {
            retDt = (currentDate.getHours() >= ATIME) ? new Date(nowYear,nowMonth,nowDate + 1,ATIME,0,0,0) : new Date(nowYear,nowMonth,nowDate,ATIME,0,0,0);
        } else {
            retDt = (currentDate.getHours() >= NTIME) ? new Date(nowYear,nowMonth,nowDate + 1,NTIME,0,0,0) : new Date(nowYear,nowMonth,nowDate,NTIME,0,0,0);
            //retDt = (currentTime.getHours() <= NTIME && currentTime.getHours() >= ATIME) ? new Date(nowYear,nowMonth,nowDate + 1,0,0,0,0) : new Date(nowYear,nowMonth,nowDate,0,0,0,0);
        }
        
        let df = new DateFormatter();
        
        df.formatString = "YYYYMMDD";
        
        return df.format(retDt);
    }

    /**
     * 현재 공장의 날짜에서 다다음조의 날짜를 String값으로 돌려줍니다. ex)20100617 
     * @returns 
     */
    get3rdTargetDateToString() {
        const currentDate = this.currentDate;
		const NTIME = this.NTIME;
		const ATIME = this.ATIME;
        
        let nowYear = currentDate.getFullYear();
        let nowMonth = currentDate.getMonth();
        let nowDate = currentDate.getDate();
        
        let retDt = (currentDate.getHours() >= ATIME) ? new Date(nowYear,nowMonth,nowDate + 1,NTIME,0,0,0) : new Date(nowYear,nowMonth,nowDate,NTIME,0,0,0);
        
        let df = new DateFormatter();
        
        df.formatString = "YYYYMMDD";
        
        return df.format(retDt);
    }
		
		/*
		현재 공장의 날짜를 String값으로 돌려줍니다. ex)20100617 
		*/
		getTargetDateToDate() {
			const currentDate = this.currentDate;
			const MTIME = this.MTIME;
			const NTIME = this.NTIME;
			
			let nowYear = currentDate.getFullYear();
			let nowMonth = currentDate.getMonth();
			let nowDate = currentDate.getDate();
			
			let retDt = (currentDate.getHours() < MTIME) ? new Date(nowYear,nowMonth,nowDate - 1,NTIME,0,0,0) : new Date(nowYear,nowMonth,nowDate,NTIME,0,0,0);
			
			return retDt;
		}
		
		/*
		현재 시간이 오전조인지 오후조인지 야간조인지를 리턴해줍니다.
		*/
		getCurrentTimeSlotString() {			
			const currentDate = this.currentDate;
			const MTIME = this.MTIME;
			const NTIME = this.NTIME;
			const ATIME = this.ATIME;

			let nowYear = currentTime.getFullYear();
			let nowMonth = currentTime.getMonth();
			let nowDate = currentTime.getDate();
			
			let mStartTime = new Date(nowYear,nowMonth,nowDate,MTIME,0,0,0);
			let aStartTime = new Date(nowYear,nowMonth,nowDate,ATIME,0,0,0);
			let nStartTime = (currentTime.getHours() < MTIME) ? new Date(nowYear,nowMonth,nowDate - 1,NTIME,0,0,0) : new Date(nowYear,nowMonth,nowDate,NTIME,0,0,0);
			
			let mEndTime = new Date(nowYear,nowMonth,nowDate,ATIME,0,0,0);
			let aEndTime = (NTIME != 0) ? new Date(nowYear,nowMonth,nowDate,NTIME,0,0,0) :  new Date(nowYear,nowMonth,nowDate + 1,NTIME,0,0,0);
			let nEndTime = (currentTime.getHours() < MTIME) ? new Date(nowYear,nowMonth,nowDate,MTIME,0,0,0) : new Date(nowYear,nowMonth,nowDate + 1,MTIME,0,0,0);
			
			//Alert.show(aStartTime.toString() + "\n" + aEndTime.toString() + "\n" + currentDate.toString());
			
			if(plant == "TP") {
				if(currentDate >= mStartTime && currentDate < mEndTime) {
					return [Application.application.resource.bundle.Morning,1];
				} else {
					return [Application.application.resource.bundle.Afternoon,2];
				}
			} else {				
				if(currentDate >= mStartTime && currentDate < mEndTime) {
					return [Application.application.resource.bundle.Morning,1];
				} else if (currentDate >= aStartTime && currentDate < aEndTime) {
					return [Application.application.resource.bundle.Afternoon,2];
				} else if (currentDate >= nStartTime && currentDate < nEndTime) {
					return [Application.application.resource.bundle.Night,3];
				}
			}
			
			return ["Error","Error"];
		}
		
		/*
		현재 시간이 오전조인지 오후조인지 야간조인지를 코드로 리턴해줍니다.
		*/
		getCurrentTimeSlotCode() {
			const currentDate = this.currentDate;
			const MTIME = this.MTIME;
			const NTIME = this.NTIME;
			const ATIME = this.ATIME;

			let nowYear = currentDate.getFullYear();
			let nowMonth = currentDate.getMonth();
			let nowDate = currentDate.getDate();
			
			let mStartTime = new Date(nowYear,nowMonth,nowDate,MTIME,0,0,0);
			let aStartTime = new Date(nowYear,nowMonth,nowDate,ATIME,0,0,0);
			let nStartTime = (currentDate.getHours() < MTIME) ? new Date(nowYear,nowMonth,nowDate - 1,NTIME,0,0,0) : new Date(nowYear,nowMonth,nowDate,NTIME,0,0,0);
			
			let mEndTime = new Date(nowYear,nowMonth,nowDate,ATIME,0,0,0);
			let aEndTime;
			
			if(plant == "TP") {
				aEndTime = new Date(nowYear,nowMonth,nowDate + 1,NTIME,0,0,0);
			} else {
				aEndTime = (NTIME != 0) ? new Date(nowYear,nowMonth,nowDate,NTIME,0,0,0) :  new Date(nowYear,nowMonth,nowDate + 1,NTIME,0,0,0);
			}

			let nEndTime = (currentDate.getHours() < MTIME) ? new Date(nowYear,nowMonth,nowDate,MTIME,0,0,0) : new Date(nowYear,nowMonth,nowDate + 1,MTIME,0,0,0);
			
			if(plant == "TP") {				
				if(currentDate >= mStartTime && currentDate < mEndTime) {
					return "1";
				} else {
					return "2";			
				}
			} else {	
				if(currentDate >= mStartTime && currentDate < mEndTime) {
					return "1";
				} else if (currentDate >= aStartTime && currentDate < aEndTime) {
					return "2";
				} else if (currentDate >= nStartTime && currentDate < nEndTime) {
					return "3";
				}
			}
			
			return "Error";
		}
		
		/*
		현재 시간에서 다음조가 오전조인지 오후조인지 야간조인지를 리턴해줍니다.
		*/
		getNextTimeSlotString() {
			const currentDate = this.currentDate;
			const MTIME = this.MTIME;
			const NTIME = this.NTIME;
			const ATIME = this.ATIME;

			let nowYear = currentDate.getFullYear();
			let nowMonth = currentDate.getMonth();
			let nowDate = currentDate.getDate();
			
			let mStartTime = new Date(nowYear,nowMonth,nowDate,MTIME,0,0,0);
			let aStartTime = new Date(nowYear,nowMonth,nowDate,ATIME,0,0,0);
			let nStartTime = (currentDate.getHours() < MTIME) ? new Date(nowYear,nowMonth,nowDate - 1,NTIME,0,0,0) : new Date(nowYear,nowMonth,nowDate,NTIME,0,0,0);
			
			let mEndTime = new Date(nowYear,nowMonth,nowDate,ATIME,0,0,0);
			let aEndTime = (NTIME != 0) ? new Date(nowYear,nowMonth,nowDate,NTIME,0,0,0) :  new Date(nowYear,nowMonth,nowDate + 1,NTIME,0,0,0);
			let nEndTime = (currentDate.getHours() < MTIME) ? new Date(nowYear,nowMonth,nowDate,MTIME,0,0,0) : new Date(nowYear,nowMonth,nowDate + 1,MTIME,0,0,0);
			
			if(plant == "TP") {
				if(currentDate >= mStartTime && currentDate < mEndTime) {
					return [Application.application.resource.bundle.Afternoon,2];
				} else {
					return [Application.application.resource.bundle.Morning,1];	
				}
			} else {	
				if(currentDate >= mStartTime && currentDate < mEndTime) {
					return [Application.application.resource.bundle.Afternoon,2];
				} else if (currentDate >= aStartTime && currentDate < aEndTime) {
					return [Application.application.resource.bundle.Night,3];
				} else if (currentDate >= nStartTime && currentDate < nEndTime) {
					return [Application.application.resource.bundle.Morning,1];
				}
			}
			
			return ["Error","Error"];
		}
		
		/*
		현재 시간에서 다다음조가 오전조인지 오후조인지 야간조인지를 리턴해줍니다.
		*/
		get3rdTimeSlotString() {
			const currentDate = this.currentDate;
			const MTIME = this.MTIME;
			const NTIME = this.NTIME;
			const ATIME = this.ATIME;

			let nowYear = currentDate.getFullYear();
			let nowMonth = currentDate.getMonth();
			let nowDate = currentDate.getDate();
			
			let mStartTime = new Date(nowYear,nowMonth,nowDate,MTIME,0,0,0);
			let aStartTime = new Date(nowYear,nowMonth,nowDate,ATIME,0,0,0);
			let nStartTime = (currentDate.getHours() < MTIME) ? new Date(nowYear,nowMonth,nowDate - 1,NTIME,0,0,0) : new Date(nowYear,nowMonth,nowDate,NTIME,0,0,0);
			
			let mEndTime = new Date(nowYear,nowMonth,nowDate,ATIME,0,0,0);
			let aEndTime = (NTIME != 0) ? new Date(nowYear,nowMonth,nowDate,NTIME,0,0,0) :  new Date(nowYear,nowMonth,nowDate + 1,NTIME,0,0,0);
			let nEndTime = (currentDate.getHours() < MTIME) ? new Date(nowYear,nowMonth,nowDate,MTIME,0,0,0) : new Date(nowYear,nowMonth,nowDate + 1,MTIME,0,0,0);
			
			if(plant == "TP") {
				if(currentDate >= mStartTime && currentDate < mEndTime) {
					return [Application.application.resource.bundle.Morning,1];
				} else {
					return [Application.application.resource.bundle.Afternoon,2];		
				}
			} else {	
				if(currentDate >= mStartTime && currentDate < mEndTime) {
					return [Application.application.resource.bundle.Night,3];
				} else if (currentDate >= aStartTime && currentDate < aEndTime) {
					return [Application.application.resource.bundle.Morning,1];
				} else if (currentDate >= nStartTime && currentDate < nEndTime) {
					return [Application.application.resource.bundle.Afternoon,2];
				}
			}
			
			return ["Error","Error"];
		}
		
		/*
		현재 시간에서 다음조가 오전조인지 오후조인지 야간조인지를 코드로 리턴해줍니다.
		*/
		getNextTimeSlotCode() {
			const currentDate = this.currentDate;
			const MTIME = this.MTIME;
			const NTIME = this.NTIME;
			const ATIME = this.ATIME;

			let nowYear = currentDate.getFullYear();
			let nowMonth = currentDate.getMonth();
			let nowDate = currentDate.getDate();
			
			let mStartTime = new Date(nowYear,nowMonth,nowDate,MTIME,0,0,0);
			let aStartTime = new Date(nowYear,nowMonth,nowDate,ATIME,0,0,0);
			let nStartTime = (currentDate.getHours() < MTIME) ? new Date(nowYear,nowMonth,nowDate - 1,NTIME,0,0,0) : new Date(nowYear,nowMonth,nowDate,NTIME,0,0,0);
			
			let mEndTime = new Date(nowYear,nowMonth,nowDate,ATIME,0,0,0);
			let aEndTime = (NTIME != 0) ? new Date(nowYear,nowMonth,nowDate,NTIME,0,0,0) :  new Date(nowYear,nowMonth,nowDate + 1,NTIME,0,0,0);
			let nEndTime = (currentDate.getHours() < MTIME) ? new Date(nowYear,nowMonth,nowDate,MTIME,0,0,0) : new Date(nowYear,nowMonth,nowDate + 1,MTIME,0,0,0);
			
			if(plant == "TP") {
				if(currentDate >= mStartTime && currentDate < mEndTime) {
					return "2";
				} else {
					return "1";		
				}
			} else {	
				if(currentDate >= mStartTime && currentDate < mEndTime) {
					return "2";
				} else if (currentDate >= aStartTime && currentDate < aEndTime) {
					return "3";
				} else if (currentDate >= nStartTime && currentDate < nEndTime) {
					return "1";
				}
			}
			
			return "Error";
		}
		
		
		/*
		현재 시간에서 이전조가 오전조인지 오후조인지 야간조인지를 코드로 리턴해줍니다.
		*/
		getPrevTimeSlotCode() {
			const currentDate = this.currentDate;
			const MTIME = this.MTIME;
			const NTIME = this.NTIME;
			const ATIME = this.ATIME;

			let nowYear = currentDate.getFullYear();
			let nowMonth = currentDate.getMonth();
			let nowDate = currentDate.getDate();
			
			let mStartTime = new Date(nowYear,nowMonth,nowDate,MTIME,0,0,0);
			let aStartTime = new Date(nowYear,nowMonth,nowDate,ATIME,0,0,0);
			let nStartTime = (currentDate.getHours() < MTIME) ? new Date(nowYear,nowMonth,nowDate - 1,NTIME,0,0,0) : new Date(nowYear,nowMonth,nowDate,NTIME,0,0,0);
			
			let mEndTime = new Date(nowYear,nowMonth,nowDate,ATIME,0,0,0);
			let aEndTime = (NTIME != 0) ? new Date(nowYear,nowMonth,nowDate,NTIME,0,0,0) :  new Date(nowYear,nowMonth,nowDate + 1,NTIME,0,0,0);
			let nEndTime = (currentDate.getHours() < MTIME) ? new Date(nowYear,nowMonth,nowDate,MTIME,0,0,0) : new Date(nowYear,nowMonth,nowDate + 1,MTIME,0,0,0);
			
			if(plant == "TP") {
				if(currentDate >= mStartTime && currentDate < mEndTime) {
					return "2";
				} else  {
					return "1";		
				}
			} else {	
				if(currentDate >= mStartTime && currentDate < mEndTime) {
					return "3";
				} else if (currentDate >= aStartTime && currentDate < aEndTime) {
					return "1";
				} else if (currentDate >= nStartTime && currentDate < nEndTime) {
					return "2";
				}
			}
			
			return "Error";
		}
		
		/*
			지원포맷 20100303000000
		*/
		stringToFormatString(date, len)
		{
			if(len == 4) {
				return date.substring(0,4) + "년";
			} else if(len == 6) {
				return date.substring(0,4) + "년 " + date.substring(4,2) + "월";
			} else if(len == 8) {
				return date.substring(0,4) + "년 " + date.substring(4,2) + "월 " + date.substring(6,2) + "일";  
			} else if(len == 10) {
				return date.substring(0,4) + "년 " + date.substring(4,2) + "월 " + date.substring(6,2) + "일 " + date.substring(8,2) + "시";
			} else if(len == 12) {
				return date.substring(0,4) + "년 " + date.substring(4,2) + "월 " + date.substring(6,2) + "일 " + date.substring(8,2) + "시 " + date.substring(10,2) + "분";
			} else if(len == 14) {
				return date.substring(0,4) + "년 " + date.substring(4,2) + "월 " + date.substring(6,2) + "일 " + date.substring(8,2) + "시 " + date.substring(10,2) + "분 " + date.substring(12,2) + "초";
			}
			
			return "";
		}
		
		/*
		String값인 date를 Date 값으로 변환하여 줍니다.
		#param
		date : 지원 포맷 
			1. YYYY-MM-DD H:NN:SS ex) 2010-03-03 05:16:30
			2. YYYY/MM/DD H:NN:SS ex) 2010/03/03 05:16:30
			3. YYYYMMDDHNNSS ex) 20100303051630
			4. YYYY-MM-DD A H:NN:SS ex) 2010-03-03 PM 5:16:30  (참조) A 가 한글(오전, 오후)로 나와도 
		*/
		stringToDate(date) {
			let dateArr;
			let timeArr;
			let err;
			let returnDate;
			let maStr;
			let hourNum;
			
			try{
				if(date.split(" ").length == 1) {
					if(date.length != 14) {
						err.message = "지원하는 날짜 포맷이 아닙니다!!";
						throw err;
					} else {
						returnDate = new Date(date.substring(0,4), 
											parseInt(date.substring(4,2)) - 1, 
											parseInt(date.substring(6,2)), 
											parseInt(date.substring(8,2)), 
											parseInt(date.substring(10,2)), 
											parseInt(date.substring(12,2)));	
					}
				} else if(date.split(" ").length == 2) {
					dateArr = date.split(" ")[0].split("-");
					timeArr = date.split(" ")[1].split(":");
					
					if(timeArr.length == 3) {
						if(dateArr.length != 3) {
							dateArr = date.split(" ")[0].split("/");
							if(dateArr.length != 3) {
								err.message = "지원하는 날짜 포맷이 아닙니다!!";
								throw err;
							}
						}
					} else {
						err.message = "지원하는 시간 포맷이 아닙니다!!";
						throw err;
					}
					
					returnDate = new Date(dateArr[0],dateArr[1] - 1,dateArr[2],timeArr[0],timeArr[1],parseInt(String(timeArr[2]).substring(0,2)));
				} else {
					dateArr = date.split(" ")[0].split("-");
					maStr = date.split(" ")[1]
					timeArr = date.split(" ")[2].split(":");
					
					if(timeArr.length == 3) {
						if(dateArr.length != 3) {
							err.message = "지원하는 날짜 포맷이 아닙니다!!";
							throw err;
						}
					} else {
						err.message = "지원하는 시간 포맷이 아닙니다!!";
						throw err;
					}
					
					hourNum = Number(timeArr[0]);
					
					if(maStr == "오후" || maStr == "PM")
						hourNum += 12;
					
					returnDate = new Date(dateArr[0],dateArr[1] - 1,dateArr[2],hourNum,timeArr[1],parseInt(String(timeArr[2]).substring(0,2)));
				}
				
			} catch(e) {
				Alert.show(e.message);
			}
			
			return returnDate;
		}
		
		/*
		발생시간을 현재시간과 비교하여 경과한 시간을 시,분,초 단위로 리턴해줍니다.
		*/
		getCompareToTimeString(strDate) {
			let date = TimeUtil.stringToDate(strDate);
			let currentDate = this.currentDate;
			
			//let hour = Math.floor((currentDate.getTime() - date.getTime())/1000/60/60);
			//let min = Math.floor((currentDate.getTime() - date.getTime())/1000/60)%60;
			//let sec = Math.floor((currentDate.getTime() - date.getTime())/1000)%60;
			
			let hour = Math.floor(TimeSpan.fromDates(date, currentDate).totalHours);
			let min = Math.floor(TimeSpan.fromDates(date, currentDate).totalMinutes)%60;
			
			let returnString;
			
			if(hour > 0) {
				returnString = hour.toString() + Application.application.resource.bundle.Time + min.toString() + Application.application.resource.bundle.P140;// + sec.toString() + "초";
			} else {
				returnString = min.toString() + Application.application.resource.bundle.P140;// + sec.toString() + "초";
				/*if(min > 0) {
				returnString = min.toString() + "분" + sec.toString() + "초";
				} else {
				returnString = sec.toString() + "초"
				}*/
			} 
			//returnString = min.toString() + Application.application.resource.bundle.P140;
			
			return returnString;
		}
		
		/*
		발생시간을 현재시간과 비교하여 경과한 시간을 분으로 환산하여 리턴해줍니다.
		*/
		getCompareToTimeNumber(strDate) {
			let date = TimeUtil.stringToDate(strDate);
			let currentDate = this.currentDate;
			
			let hour = Math.floor((currentDate.getTime() - date.getTime())/1000/60/60);
			let min = Math.floor((currentDate.getTime() - date.getTime())/1000/60)%60;
			//let sec = Math.floor((currentDate.getTime() - date.getTime())/1000)%60;
			
			return (hour * 60) + min;	
		}
		
		/*
		
		*/
		getUsingNextMonitoring() {
			let now = this.currentDate;
			let nowYear = now.getFullYear();
			let nowMonth = now.getMonth();
			let nowDate = now.getDate();
			
			let startTime1 = new Date(nowYear, nowMonth, nowDate, 5, 1);
			let startTime2 = new Date(nowYear, nowMonth, nowDate, 13, 1);
			let startTime3 = (now.getHours() < MTIME) ? new Date(nowYear, nowMonth, nowDate - 1, 21, 1) : new Date(nowYear, nowMonth, nowDate, 21, 1);
			let endTime1 = new Date(nowYear, nowMonth, nowDate, 6);
			let endTime2 = new Date(nowYear, nowMonth, nowDate, 14);
			let endTime3 = (now.getHours() < MTIME) ? new Date(nowYear, nowMonth, nowDate, 22) : new Date(nowYear, nowMonth, nowDate + 1, 22);
			
			if((now >= startTime1 && now < endTime1) ||
				(now >= startTime2 && now < endTime2) ||
				(now >= startTime3 && now < endTime3)) {
				return true;
			} else {
				return false;
			}
		}
		
		getWeekComboBoxItem() {
			let returnAC = new ArrayCollection();
			let now = currentDate;
			let itemDate;
			let nowYear = now.getFullYear();
			let nowMonth = now.getMonth();
			let nowDate = now.getDate();
			let df = new DateFormatter();
            df.formatString = "YYYYMMDD";
			
			for(let i = 0; i < 7; i++) {
				itemDate = new Date(nowYear, nowMonth, nowDate - i);
				returnAC.addItem([df.format(itemDate)]);
			}
			
			return returnAC;
		}
		
		/*
		날짜 콤보 박스 데이터를 현재부터 과거 한달 까지 채워준다.
		*/
		getMonthComboBoxItem() {
			let returnAC = new ArrayCollection();
			
			let now = new Date();
            let min = new Date();
            min.month -= 1;
			
			let df = new DateFormatter();
            df.formatString = "YYYYMMDD";
			
			for(; now >= min; now.date -= 1) {
				returnAC.addItem([df.format(now)]);
			}
			
			return returnAC;
		}
		
		/*
		현재조의 시작시간을 리턴해 줍니다.
		*/
		getCurShiftStartTime() {			
			const currentDate = this.currentDate;
			const MTIME = this.MTIME;
			const NTIME = this.NTIME;
			const ATIME = this.ATIME;

			let nowYear = currentDate.getFullYear();
			let nowMonth = currentDate.getMonth();
			let nowDate = currentDate.getDate();
			
			let mStartTime = new Date(nowYear,nowMonth,nowDate,MTIME,0,0,0);
			let aStartTime = new Date(nowYear,nowMonth,nowDate,ATIME,0,0,0);
			let nStartTime = (currentDate.getHours() < MTIME) ? new Date(nowYear,nowMonth,nowDate - 1,NTIME,0,0,0) : new Date(nowYear,nowMonth,nowDate,NTIME,0,0,0);
			
			let mEndTime = new Date(nowYear,nowMonth,nowDate,ATIME,0,0,0);
			let aEndTime = (NTIME != 0) ? new Date(nowYear,nowMonth,nowDate,NTIME,0,0,0) :  new Date(nowYear,nowMonth,nowDate + 1,NTIME,0,0,0);
			let nEndTime = (currentDate.getHours() < MTIME) ? new Date(nowYear,nowMonth,nowDate,MTIME,0,0,0) : new Date(nowYear,nowMonth,nowDate + 1,MTIME,0,0,0);
			
			if(plant == "TP") {
				if(currentDate >= mStartTime && currentDate < mEndTime) {
					return MTIME;
				} else  {
					return ATIME;
				}
			} else {
				if(currentDate >= mStartTime && currentDate < mEndTime) {
					return MTIME;
				} else if (currentDate >= aStartTime && currentDate < aEndTime) {
					return ATIME;
				} else if (currentDate >= nStartTime && currentDate < nEndTime) {
					return NTIME;
				}
			}
			
			return 0;
		}
		
		/*
		현재 시간에서 다음조의 조 시작시간을 리턴해줍니다.
		*/
		getNextShiftStartTime() {
			const currentDate = this.currentDate;
			const MTIME = this.MTIME;
			const NTIME = this.NTIME;
			const ATIME = this.ATIME;

			let nowYear = currentDate.getFullYear();
			let nowMonth = currentDate.getMonth();
			let nowDate = currentDate.getDate();
			
			let mStartTime = new Date(nowYear,nowMonth,nowDate,MTIME,0,0,0);
			let aStartTime = new Date(nowYear,nowMonth,nowDate,ATIME,0,0,0);
			let nStartTime = (currentDate.getHours() < MTIME) ? new Date(nowYear,nowMonth,nowDate - 1,NTIME,0,0,0) : new Date(nowYear,nowMonth,nowDate,NTIME,0,0,0);
			
			let mEndTime = new Date(nowYear,nowMonth,nowDate,ATIME,0,0,0);
			let aEndTime = (NTIME != 0) ? new Date(nowYear,nowMonth,nowDate,NTIME,0,0,0) :  new Date(nowYear,nowMonth,nowDate + 1,NTIME,0,0,0);
			let nEndTime = (currentDate.getHours() < MTIME) ? new Date(nowYear,nowMonth,nowDate,MTIME,0,0,0) : new Date(nowYear,nowMonth,nowDate + 1,MTIME,0,0,0);
			
			if(plant == "TP")
			{
				if(currentDate >= mStartTime && currentDate < mEndTime) {
					return ATIME;
				} else {
					return MTIME;
				}
			}
			else
			{
				if(currentDate >= mStartTime && currentDate < mEndTime) {
					return ATIME;
				} else if (currentDate >= aStartTime && currentDate < aEndTime) {
					return NTIME;
				} else if (currentDate >= nStartTime && currentDate < nEndTime) {
					return MTIME;
				}
			}
			
			return 0;
		}
		
		/*
		현재조의 시작시간을 데이트 형식으로 리턴해 줍니다.
		*/
		getCurShiftStartTimeToDate()
		{
			let currentTime = currentDate;

			let nowYear = currentDate.getFullYear();
			let nowMonth = currentDate.getMonth();
			let nowDate = currentDate.getDate();
			
			let mStartTime = new Date(nowYear,nowMonth,nowDate,MTIME,0,0,0);
			let aStartTime = new Date(nowYear,nowMonth,nowDate,ATIME,0,0,0);
			let nStartTime = (currentDate.getHours() < MTIME) ? new Date(nowYear,nowMonth,nowDate - 1,NTIME,0,0,0) : new Date(nowYear,nowMonth,nowDate,NTIME,0,0,0);
			
			let mEndTime = new Date(nowYear,nowMonth,nowDate,ATIME,0,0,0);
			let aEndTime = (NTIME != 0) ? new Date(nowYear,nowMonth,nowDate,NTIME,0,0,0) :  new Date(nowYear,nowMonth,nowDate + 1,NTIME,0,0,0);
			let nEndTime = (currentDate.getHours() < MTIME) ? new Date(nowYear,nowMonth,nowDate,MTIME,0,0,0) : new Date(nowYear,nowMonth,nowDate + 1,MTIME,0,0,0);
			
			if(plant == "TP")
			{
				if(currentDate >= mStartTime && currentDate < mEndTime) {
					return mStartTime;
				} else {
					return aStartTime;
				}
			}
			else
			{
				if(currentDate >= mStartTime && currentDate < mEndTime) {
					return mStartTime;
				} else if (currentDate >= aStartTime && currentDate < aEndTime) {
					return aStartTime;
				} else if (currentDate >= nStartTime && currentDate < nEndTime) {
					return nStartTime;
				}
			}
			
			return null;
		}
		
		/*
		현재시간을 기준으로 다음조의 시작시간을 데이트 형식으로 리턴해 줍니다.
		*/
		getNextShiftStartTimeToDate()
		{
			let currentTime = currentDate;

			let nowYear = currentDate.getFullYear();
			let nowMonth = currentDate.getMonth();
			let nowDate = currentDate.getDate();
			
			let mStartTime = new Date(nowYear,nowMonth,nowDate,MTIME,0,0,0);
			let aStartTime = new Date(nowYear,nowMonth,nowDate,ATIME,0,0,0);
			let nStartTime = (currentDate.getHours() < MTIME) ? new Date(nowYear,nowMonth,nowDate - 1,NTIME,0,0,0) : new Date(nowYear,nowMonth,nowDate,NTIME,0,0,0);
			
			let mEndTime = new Date(nowYear,nowMonth,nowDate,ATIME,0,0,0);
			let aEndTime = (NTIME != 0) ? new Date(nowYear,nowMonth,nowDate,NTIME,0,0,0) :  new Date(nowYear,nowMonth,nowDate + 1,NTIME,0,0,0);
			let nEndTime = (currentDate.getHours() < MTIME) ? new Date(nowYear,nowMonth,nowDate,MTIME,0,0,0) : new Date(nowYear,nowMonth,nowDate + 1,MTIME,0,0,0);
			
			if(plant == "TP")
			{
				if(currentDate >= mStartTime && currentDate < mEndTime) {
					return aStartTime;
				} else {
					return mStartTime;
				} 
			}
			else
			{
				if(currentDate >= mStartTime && currentDate < mEndTime) {
					return aStartTime;
				} else if (currentDate >= aStartTime && currentDate < aEndTime) {
					return nStartTime;
				} else if (currentDate >= nStartTime && currentDate < nEndTime) {
					return mStartTime;
				}
			}
			
			return null;
		}
		
		/*
		현재시간이 조시작 한시간 전인지 Boolean형식으로 리턴해 줍니다.
		*/
		isOneHourBefore()
		{
			let currentTime = currentDate;
			
			return (currentDate.getHours() == MTIME - 1 || currentDate.getHours() == ATIME - 1 || currentDate.getHours() == NTIME - 1);
			
			//return true;
		}
		
		/*
		현재시간을 다음과 같은 형식으로 리턴해준다. 2011-04-10 03:22
		*/
		getCurrentTimeToString()
		{
			let currentTime = currentDate;
			let dtFormatter = new DateFormatter();
			
			dt.formatString = "YYYY-MM-DD JJ:NN";
			
			return dt.format(currentDate);
		}
		
				/*
		현재시간을 다음과 같은 형식으로 리턴해준다. 03:22
		*/
		getCurrentTimeToString2()
		{
			let currentTime = currentDate;
			let dtFormatter = new DateFormatter();
			
			dt.formatString = "JJ:NN";
			
			return dt.format(currentDate);
		}
		
		/*
		현재시간을 다음과 같은 형식으로 리턴해준다. 03:22:00
		*/
		getInputTimeToString(time)
		{
			let dtFormatter = new DateFormatter();
			
			dt.formatString = "JJ:NN:SS";
			
			return dt.format(time);
		}
		
		getInitCurrentTimeToString()
		{
			let currentTime = currentDate;
			let dtFormatter = new DateFormatter();
			
			dt.formatString = "YYYY-MM-DD H:NN:SS";
			
			return dt.format(currentDate);
		}
		
		//두 날짜의 차이를 일 단위로 계산하여 준다.
		getDaysDifference(minDate, maxDate) 
		{			
			let millisecondsPerDay = 1000 * 60 * 60 * 24; 
			
			return Math.ceil(( maxDate.getTime() - minDate.getTime()) / millisecondsPerDay); 
		}
		
		//두 날짜의 차이를 일 단위로 계산하여 준다.
		getHoursDifference(minDate, maxDate) 
		{			
			let millisecondsPerHour = 1000 * 60 * 60;
			
			return Math.ceil(( maxDate.getTime() - minDate.getTime()) / millisecondsPerHour); 
		}
		
		//두 날짜의 차이를 일 단위로 계산하여 준다.
		getMinutesDifference(minDate, maxDate) 
		{
			let millisecondsPerMinute = 1000 * 60;
			
			return Math.ceil(( maxDate.getTime() - minDate.getTime()) / millisecondsPerMinute); 
		}
}
