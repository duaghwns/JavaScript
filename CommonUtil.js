class CommonUtil {
    constructor() {}
    
   /**
    * String값이 null일 경우에 "" 값을 돌려줍니다.
    * @param {*} val 
    * @returns 
    */
    NVL(val) {
        return (val == null || StringUtil.trim(val) == "null") ? "" : val;
    }
    
   /**
    * String값이 null일 경우에 'rep'에 지정된 값을 돌려줍니다. 
    * @param {*} val 
    * @param {*} rep 
    * @returns 
    */
    NVL2(val, rep) {
        return (val == null || StringUtil.trim(val) == "null") ? rep : val;
    }
    
    LPAD(val, delimeter, len) {
        let ret;
        
        ret = val;
        
        while(ret.length < len)
        {
            ret = delimeter + ret;
        }
        
        return ret;
    }
    
    RPAD(val, delimeter, len) {
        let ret;
        ret = val + '';
        
        while(ret.length < len)
        {
            ret = ret + delimeter;
        }
        
        return ret;
    }
    
   /**
    * 그리드의 컬럼 이름을 가지고 컬럼 Index를 찾아 리턴해줍니다.
    * @param {*} grid 
    * @param {*} colName 
    * @returns 
    */
    GetColumnIndexToColName(grid, colName) {
        let i = 0;
        let retVal = 0;
        
        foreach(col in grid.columns) {
            if(col.headerText == colName) {
                retVal = i;
                break;
            }
            
            if(col.visible)
                i++;
        }
        return retVal;
    }
    
   /**
    * 그리드의 DataField를 가지고 컬럼 Index를 찾아 리턴해줍니다.
    * @param {*} grid 
    * @param {*} dataField 
    */
    GetColumnIndexToDataField(grid, dataField)
    {
        let i = 0;
        let retVal = 0;
        
        let group;
        let col;
        
        foreach(obj in grid.groupedColumns) {
            
            if(obj is AdvancedDataGridColumnGroup)
            {
                group = obj as AdvancedDataGridColumnGroup;
                
                for each(let col in group.children)
                {
                    if(col.dataField == dataField) {
                        retVal = i;
                        break;
                    }
                    
                    if(group.visible && col.visible)
                        i++;
                }
            }
            else
            {
                col = obj as AdvancedZetDataGridColumn;
                
                if(col.dataField == dataField) {
                    retVal = i;
                    break;
                }
                
                if(col.visible)
                    i++;
            }
        }
        
        /* for each(let col in grid.columns) {
            if(col.dataField == dataField) {
                retVal = i;
                break;
            }
            
            if(col.visible)
                i++;
        } */
        return retVal;
    }
    
    GetColumnIndexToDataFieldIncludeHidden(grid, dataField)
    {
        let i = 0;
        let retVal = 0;
        
        foreach(let col in grid.columns) {
            if(col.dataField == dataField) {
                retVal = i;
                break;
            }
            
            i++;
        }
        return retVal;
    }
    
    GetFieldNameToIndex(grid, index)
    {
        let i = 0;
        let retVal = "";
        
        for each(let col in grid.columns) {
            if(i == index) {
                retVal = col.dataField;
                break;
            }
            
            if(col.visible)
                i++;
        }
        return retVal;
    }
    
    /*
    두 Object를 서로 교체합니다.
    */
    swapItems(fromObj, toObj)
    {
        let temp = new Object();
        objectCopy(fromObj, temp);
        objectCopy(toObj, fromObj);
        objectCopy(temp, toObj);
    }
    
    /*
    Object를 복사합니다.
    */
    objectCopy(fromObj, toObj)
    {
        let arr = cloneFields(fromObj);
        
        for each(let str in arr)
        {
            if(str != "mx_internal_uid")
                toObj[str] = fromObj[str];
        }
    }
    
    /*
    Object type의 모든 변수의 변수명을 Array로 돌려줍니다.
    */
    cloneFields(item) 
    {
        if (!item) return null;
        let fields = [];
        for (let prop in item) {
            fields.push(prop);
        }
        return fields;
    }
    
    /*
    GRID의 Renderer의 Show Event를 발생시켜 변경 사항을 적용시킴
    */
    RefreshGrid(paramGrid)
    {
        let curPos = paramGrid.verticalScrollPosition;
        let cnt = ArrayCollection(paramGrid.dataProvider).length;
        paramGrid.verticalScrollPosition = cnt - 1;
        paramGrid.verticalScrollPosition = 0;
        paramGrid.verticalScrollPosition = curPos;
    }
    
   /**
    * 모든 항목을 Replace 시켜줍니다.
    */
    replaceAll(sourceStr, toStr, fromStr)
    {
        let resultStr = sourceStr;
        
        do
        {
            resultStr = resultStr.replace(toStr, fromStr);
        } while(resultStr.indexOf(toStr) >= 0);
        
        return resultStr;
    }
    
   /**
    * 자동으로 사라지는 Alert창을 띄워줍니다.
    */
    Alert(paramStr) {
        let mc = new MovieClip();
        
    }
    
    BooleanYN(val)
    {
        if(val == null)
            return false;
            
        if(String(val) == "Y")
            return true;
            
        return false;	
    }
    
    GetComboIndex(stAC, value) {
        let cnt = stAC.length;
        let retVal = -1;
        let obj;
        
        for(let i; i < cnt; i++) {
            obj = stAC.getItemAt(i);
            if(obj.data == value) {
                retVal = i;
                break; 
            }
        }
        
        return retVal;
    }
    
    ArrayCollectionContains(ac, col, val)
    {
        for each(let obj in ac)
        {
            if(obj[col] == val)
                return true;
        }
        
        return false;
    }
    
    stringEndsWith(source, pattern)
    {
        if (source.length - 1 == source.lastIndexOf(pattern))
            return true;
        else
            return false;
    }
    
    isNumber(value) 
    {
        let vResult:ValidationResultEvent;
        let numVal:NumberValidator = new NumberValidator();
        
        vResult = numVal.validate(value);
        
        return vResult.type == ValidationResultEvent.VALID;
    }
    
    ContainToArrayCollection(ac, col, data)
    {
        for each(let obj in ac)
        {
            if(obj[col] == data)
                return true; 
        }
        
        return false;
    }
    
    FindObject(ac, col, data)
    {
        for each(let obj in ac)
        {
            if(obj[col] == data)
                return obj; 
        }
        
        return null;
    }
    
    StringToObject(str)
    {
        let obj = new Object;
            
        if(str != null && str != "" && str != "undefined")
        {
            let arr = str.split(',');
            
            for each(let str2 in arr)
            {
                obj[str2.split(':')[0]] = str2.split(':')[1]; 
            }
        }
        
        return obj;
    }
    
    GetIndex(ac, col, data)
    {
        let idx = 0;
        
        for each(let obj in ac)
        {
            if(obj[col] == data)
                return idx;	
                
            idx++;
        }
        
        return -1;
    }
}