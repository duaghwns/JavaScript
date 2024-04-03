/**
 * VMSUtil
 * 
 * */
class VMSUtil {
    constructor() {}

    /**
     * Flex에서 ClassFactory를 경로 위치를 확인할 수 없음
    */
    factoryCreater (renderer) {
        let factoryInstance;
        return factoryInstance = new ClassFactory(renderer);
    }

    fixTextSize(inval, char, totalsize) {
        let rtval = '';
        if (inval == null) inval = '';

        if ((inval+'').length > totalsize) {
            rtval = inval;

        } else {

            for (let i = 0; i < (totalsize - (inval+'').length); i++) {
                rtval = rtval + char;
            }

            rtval = rtval + inval;
        }

        return rtval;
    }


}