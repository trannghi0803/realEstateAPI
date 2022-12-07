import moment from "moment";
import swal from "@sweetalert/with-react";
import { Constants, Screens, Strings } from "../../constants";
import { ICodename } from "./Interface";
/**
 * Helpers.ts
 *
 * Common function for app.
 */
const Helpers = {

    /**
     * Check value is string or non.
     *
     * @param {any} value: The value to be tested.
     * @returns {boolean} If data type is string true. Otherwise it returns false.
     */
    isString: (value: any): value is string => {
        return typeof value === "string";
    },

    /**
     * Check value is object or non.
     *
     * @param {any} value: The value to be tested.
     * @returns {boolean} If data type is object true. Otherwise it returns false.
     */
    isObject: (value: any): value is object => {
        return typeof value === "object";
    },

    /**
     * Determine if the argument passed is a JavaScript function object.
     *
     * @param {any} obj: Object to test whether or not it is an array.
     * @returns {boolean} returns a Boolean indicating whether the object is a JavaScript function
     */
    isFunction: (value: any): value is (...args: any) => void => {
        return typeof value === "function";
    },

    /**
     * Check a value is number or non, if number then return true, otherwise return false.
     *
     * @param {string} value: Value can check number
     * @returns {boolean} if number then return true, otherwise return false.
     */
    isNumber: (value: any): value is number => {
        return typeof value === "number";
    },

    /**
     * Check Object is null or String null or empty.
     *
     * @param {object | string} value Object or String
     * @returns {boolean} if null or empty return true, otherwise return false.
     */
    isNullOrEmpty: (value: any): value is undefined | boolean => {
        return value === undefined || value === null || value === "";
    },

    /**
     * Trim space character (start, end) of input string.
     *
     * @param {string} value: Value for trim
     * @returns {string} String after trim, space start & end is removed
     */
    trim: (value: string): string => {
        return Helpers.isString(value) ? value.trim() : "";
    },

    /**
     * If value is string return value, otherwise return value.toString
     *
     * @param {string} value: Value
     * @returns {string} String or convert of value to string
     */
    ensureString: (value: any): string => {
        try {
            if (!Helpers.isNullOrEmpty(value)) {
                if (Helpers.isString(value)) {
                    return value;
                } else if (Helpers.isObject(value)) {
                    return JSON.stringify(value);
                } else {
                    return `${value}`;
                }
            }
        } catch (error) {
            return "";
        }
        return "";
    },

    /**
     * Check if a string is vietnamese or not
     *
     * @param {string} str given string
     * @returns {boolean} return true if string is vietnamese, otherwise return false
     */
    isVietnamese: (str: string): boolean => {
        const scope = "g";
        const regrexes = [
            /A-z/,
            /à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/,
            /è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/,
            /ì|í|ị|ỉ|ĩ/,
            /ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/,
            /ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/,
            /ỳ|ý|ỵ|ỷ|ỹ/,
            /đ/,
            /À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/,
            /È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/,
            /Ì|Í|Ị|Ỉ|Ĩ/,
            /Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/,
            /Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/,
            /Ỳ|Ý|Ỵ|Ỷ|Ỹ/,
            /Đ/
        ];

        const totalRegrex = regrexes.length;
        let concatenatedRegrex = "";
        for (let index = 0; index < totalRegrex; index++) {
            concatenatedRegrex = concatenatedRegrex + regrexes[index].source + "|";
        }

        const finalRegrex = new RegExp(`^([(${concatenatedRegrex})\\s\\.]){1,}$`, scope);
        const valid = str.match(finalRegrex) ? true : false;

        return valid;
    },

    /**
     * Convert size in bytes to KB, MB, GB or TB
     *
     * @param {number} bytes: Size convert
     * @returns {string} Value formatted include unit.
     */
    bytesToSize: (bytes: number): string => {
        const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
        if (Helpers.isNullOrEmpty(bytes) || (bytes === 0)) {
            return "0 Byte";
        }
        const i = Math.floor(Math.floor(Math.log(bytes) / Math.log(1024)));
        return `${Math.round(bytes / Math.pow(1024, i))} ${sizes[i]}`;
    },

    /**
     * Convert date to string with custom format.
     *
     * @param {number | Date} date Date or Timestamp
     * @param {string} format Format string output
     */
    dateToString: (date: number | Date | undefined, format: string): string => {
        if (Helpers.isNullOrEmpty(date)) {
            return "";
        } else if (Helpers.isNumber(date) && (`${date}`.length === 10)) {
            return moment.unix(date).format(format);
        } else {
            return moment(date).format(format);
        }
    },

    /**
     * Convert string to date.
     *
     * @param {string} dateString string
     */
    stringToDate: (dateString: string): Date => {
        return new Date(dateString);
    },

    /**
     * Convert date to unix time.
     *
     * @param {Date} date Date
     */
    dateToUnixTime: (date?: Date): number => {
        if (!Helpers.isNullOrEmpty(date)) {
            return moment(date).unix();
        }
        return 0;
    },

    fromNow: (date: number | Date): string => {
        return moment(date).fromNow();
    },


    countDays: (dateFrom: any, dateTo: any): any => {
        if (dateTo.diff(dateFrom, "days") >= 4) {
            // if (dateTo.diff(dateFrom, "weeks") <= 0) {
            //     return "Chưa đến hạn"
            // }
            // return `${dateFrom.diff(dateFrom, "weeks")} tuần`
            return "Chưa đến hạn"
        } else if (dateTo.diff(dateFrom, "days") >= 1 && dateTo.diff(dateFrom, "days") <= 3) {
            return `Còn ${dateTo.diff(dateFrom, "days")} ngày`
        } else {
            return `Trễ ${dateTo.diff(dateFrom, "days") < 0 ? dateTo.diff(dateFrom, "days") * -1 : dateTo.diff(dateFrom, "days")} ngày`
        }
        // else {
        //     if (dateTo.diff(dateFrom, "days") <= 0) {
        //         return "Chưa đến hạn"
        //     }
        //     return `${dateFrom.diff(dateFrom, "days")} ngày`
        // }
    },

    /**
     * Get protocal from url.
     * e.g. URL is https://google.com, protocal output is [https:]
     *
     * @param {string} url URL
     * @returns {string} Protocal of URL, if not a URL return empty string
     */
    getProtocolFromURL: (url: string): string => {
        const urlTrim = Helpers.trim(url);
        const index = urlTrim.indexOf("//");
        if (index > -1) {
            return urlTrim.substring(0, index);
        }
        return "";
    },

    /**
     * Format numbers with leading zeros
     *
     * @param {number} num A number
     * @param {number} size Sring output length
     * @returns {string} String format with leading zero
     */
    zeroPad: (num: number, size: number): string => {
        let result = `${num}`;
        while (result.length < size) {
            result = "0" + result;
        }
        return result;
    },

    /**
     * Copy object properties to another object
     *
     * @param {any} sourceObj Object
     * @param {any} distObj Object
     */
    copyProperties: (sourceObj: any, distObj: any) => {
        for (const key in sourceObj) {
            if (!sourceObj.hasOwnProperty(key)) {
                continue;
            }
            const sourceObjData: any = sourceObj[key];
            if (!Helpers.isNullOrEmpty(sourceObjData)) {
                if (Array.isArray(sourceObjData)) {
                    const distObjData: any = [];
                    Helpers.copyProperties(sourceObjData, distObjData);
                    distObj[key] = distObjData;
                    continue;
                }
                if (Helpers.isObject(sourceObjData)) {
                    const distObjData: any = {};
                    Helpers.copyProperties(sourceObjData, distObjData);
                    distObj[key] = distObjData;
                    continue;
                }
            }
            distObj[key] = sourceObjData;
        }
    },

    /**
     * Clone object
     *
     * @param {T} sourceObj Object
     */
    cloneObject: <T>(sourceObj: T): T => {
        const cloneObj: T = {} as T;
        Helpers.copyProperties(sourceObj, cloneObj);
        return cloneObj;
    },

    /**
     * Get last date of month
     *
     * @param {number} month A number
     * @param {number} year A number
     */
    getLastDateOfMonth: (month: number, year: number): number => {
        const startOfMonth = moment([year, month - 1]);
        const lastOfMonth = moment(startOfMonth).endOf("month");
        return lastOfMonth.toDate().getDate();
    },

    /**
     * Show alert
     *
     * @param {string} message message for display
     * @param {"warning" | "success" | "error" | "info" | undefined} type type of alert
     */
    showAlert: async (message: string, type?: "warning" | "success" | "error" | "info", okCallback?: any) => {
        const msg = message;
        const okPress = await swal(msg, { icon: type });
        if (okPress && okCallback && Helpers.isFunction(okCallback)) {
            okCallback();
        }
    },

    /**
     * Show confirm alert
     *
     * @param {string} message message for display
     * @param {function} okCallback callback handle when click ok
     * @param {function} cancelCallback callback handle when click cancel
     */
    showConfirmAlert: async (message: string, okCallback: any, cancelCallback?: any, textButtonOk?: string) => {
        var span = document.createElement("span");
        span.innerHTML = message
        const okPress = await swal(
            {
                content: span,
                buttons: [Strings.Message.CANCEL, textButtonOk || Strings.Message.OK],
                icon: "warning",
            });
        if (okPress && okCallback && Helpers.isFunction(okCallback)) {
            okCallback();
        } else {
            if (cancelCallback && Helpers.isFunction(cancelCallback)) {
                cancelCallback();
            }
        }
    },

    getBase64: (file: Blob, callback: (result: any) => void) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            let result = reader.result;
            if (Helpers.isString(reader.result)) {
                const base64Data = reader.result.split(",");
                result = base64Data.length > 0 ? base64Data[1] : "";
            }
            callback(result);
        }
        reader.onerror = (error) => {
        }
    },

    formatCurrency: (money: string | number): string => {
        const temp = Number.parseFloat(`${money}`).toFixed();
        let format = '$1,';
        if (Strings.getLanguage() === Constants.Language.VI) {
            format = '$1.';
        }
        if (Helpers.isString(temp)) {
            return temp.replace(/(\d)(?=(\d{3})+(?!\d))/g, format);
        }
        return (+temp).toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, format);
    },

    checkValidatePhone: (phone: string) => {
        if (!phone) { return true }
        const re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4,5})$/;
        return re.test(phone);
    },
    checkValidateEmail: (email: string) => {
        if (!email) { return true }
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    },
    checkValidateUsername: (username: string) => {
        if (!username) { return true }
        const re = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
        const pa = /^\S+$/
        if (re.test(String(username).toLowerCase()) && pa.test(String(username).toLowerCase())) {
            return true
        } else {
            return false
        }
    },
    checkValidateDate: (date: string) => {
        if (!date) { return true }
        const re = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
        console.log("ss", re.test(String(date).toLowerCase()))
        return re.test(String(date).toLowerCase());
    },
    getLanguageTabs: (): string[] => {
        return [
            Strings.Languages.VIETNAM,
        ];
    },

    handleNumberString: (numberValue: number, toFixed?: number) => {
        if (numberValue >= 1000000 && numberValue < 1000000000) {
            return (numberValue / 1000000).toFixed(toFixed ? toFixed : 3) + ' ' + `${Strings.Common.MILLION}`
        }
        if (numberValue >= 1000000000) {
            if (numberValue === Infinity) {
                return Helpers.formatCurrency(0);
            }
            return (numberValue / 1000000000).toFixed(toFixed ? toFixed : 3) + ' ' + `${Strings.Common.BILLION}`
        }
        return Helpers.formatCurrency(numberValue);
    },

    getTitle: () => {
        const screens = window.location.pathname;
        let title = "";
        switch (screens) {
            case Screens.PROFILE: {
                title = Strings.ProfileInfo.TITLE;
                break;
            }
            case Screens.ADMIN_USER: {
                title = Strings.User.TITLE;
                break;
            }
            case Screens.CREATE_UPDATE_USER: {
                title = Strings.User.TITLE;
                break;
            }
            case Screens.ADMIN_CATEGORY: {
                title = Strings.Category.TITLE;
                break;
            }
            case Screens.CREATE_UPDATE_CATEGORY: {
                title = Strings.Category.TITLE;
                break;
            }
            case Screens.ADMIN_REAL_ESTATE: {
                title = Strings.RealEstate.TITLE;
                break;
            }
            case Screens.CREATE_UPDATE_REAL_ESTATE: {
                title = Strings.RealEstate.TITLE;
                break;
            }
            case Screens.ADMIN_NEWS: {
                title = Strings.News.TITLE;
                break;
            }
            case Screens.CREATE_UPDATE_NEWS: {
                title = Strings.News.TITLE;
                break;
            }

        }
        return title;
    },

    getUrlParams: (keys: string[]): any => {
        const params = new URLSearchParams(window.location.search);
        let datas: { [key: string]: string | undefined } = {};
        keys.forEach((key) => {
            datas[key] = params.get(key) || ""
        });
        return datas;
    },

    //get lits region & zoneCode from data response
    getRegionParentAndChild: (data: any[]) => {
        let regionCodes: ICodename[] = [];
        let allZoneChildCodes: ICodename[] = [];
        data.map((item) => {
            regionCodes.push({
                id: item.regionId,
                code: item.regionCode,
                group: item.type,
                name: item.regionName
            });
            item.regionChild.map((child: any) => {
                allZoneChildCodes.push({
                    id: child.regionId,
                    code: child.regionCode,
                    group: child.parentRegion,
                    name: child.regionName
                });
            });
        })
        return { regionCodes, allZoneChildCodes };
    },

    //get zoneCodeList by regionCode 
    //listParent: danh sách các region được chọn từ autoComplete
    //listChild: tất cả zoneCodes
    getChildByParent: (listParent: any[], listChild: ICodename[]) => {
        let zoneChildCodes: ICodename[] = [];
        listParent.map(item => {
            let child = listChild.filter(el => el.group == item);
            if (child) zoneChildCodes.push(...child);
        })
        return zoneChildCodes;
    },

    //get regionCodeList by zoneCode
    //zondeCodes: danh sách zondeCode con được chọn
    //listChild: tất cả các zoneCodes
    //listParent: tất cả regionCOde
    getParentByChild: (zondeCodes: any[], listChild: ICodename[], listParent: ICodename[]) => {
        let regionCodes: any[] = [];
        let parentList: ICodename[] = [];
        zondeCodes.map(item => {
            let child = listChild.find(el => el.code === item)?.group;
            if (child) {
                let parentData = listParent.find(el => el.code === child);
                if (parentData) {
                    let isExits = parentList.find(el => el.code === parentData?.code)
                    if (isExits === undefined) {
                        regionCodes.push(parentData?.code);
                        parentList.push(parentData);
                    }
                }
            }
        })
        return { regionCodes, parentList };
    },

    handleSearchValue: (data: any) => {
        const params = new URLSearchParams()

        Object.entries(data).forEach(([key, values]) => {
            if (values !== undefined) {
                if (Array.isArray(values)) {
                    if (values.length > 0) {
                        values.forEach(value => {
                            if (!Helpers.isNullOrEmpty(value)) {
                                params.append(key, value.toString())
                            }
                        })
                    }
                } else {
                    params.append(key, `${values}`)
                }
            }
        });

        return params.toString()
    },

    formatMoney: (amount: number, currency?: string): string => {
        return amount.toLocaleString('it-IT', currency ? { style: 'currency', currency: currency } : {});
    },
};

export default Helpers;
