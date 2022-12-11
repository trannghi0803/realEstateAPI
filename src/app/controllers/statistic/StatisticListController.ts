import { render } from '@testing-library/react';
import moment from 'moment';
import Helpers from '../../../commons/utils/Helpers';
import { StatisticModel } from "../../models";
import { StatisticService } from "../../services";
import { BaseController } from "../base";


class StatisticListController extends BaseController<StatisticModel, StatisticService> {
    constructor(props: any) {
        super(props, StatisticModel, StatisticService);
    }

    async onStarted() {
        try {
            this.showPageLoading();
            this.setModel({
                realEstateByCategoryTimeStart: Date.now(),
                realEstateByCategoryTimeEnd: Date.now(),

                // realEstateByRentCategoryTimeStart: Date.now(),
                // realEstateByRentCategoryTimeEnd: Date.now(),

                realEstateByRegionTimeStart: Date.now(),
                realEstateByRegionTimeEnd: Date.now(),

                areaByCategoryTimeStart: Date.now(),
                areaByCategoryTimeEnd: Date.now(),
            })
            await this.countByMonthCreateTime();
            await this.countAreaByCategory();
            await this.countByCategory();
            await this.countByRegion();
            // await this.countByRentCategory();
            this.hidePageLoading();
        } catch (error) {

        }
    }

    countByCategory = async () => {
        try {
            this.showPageLoading();
            let request = {
                startTime: moment(this.model.realEstateByCategoryTimeStart).unix() || moment(Date.now()).startOf('month').unix(),
                endTime: moment(this.model.realEstateByCategoryTimeEnd).unix() || moment(Date.now()).endOf('month').unix()
            }
            const sell = await this.service.countRealEstateByCategory(request);
            const rent = await this.service.countRealEstateByRentCategory(request);
            let realEstateByRentCategoryList: any[] = [
                ["category", "Count by rent category"]
            ];
            rent?.map((el: any) => {
                realEstateByRentCategoryList.push([
                    el.name, el.count
                ]);
            })
            let realEstateByCategoryList: any[] = [
                ["category", "Count by sell category"]
            ];
            sell?.map((el: any) => {
                realEstateByCategoryList.push([
                    el.name, el.count
                ]);
            })
            this.setModel({
                realEstateByCategoryList,
                realEstateByRentCategoryList
            })
            // console.log("realEstateByCategoryList", realEstateByCategoryList)
            this.hidePageLoading();
        } catch (error) {
            this.hidePageLoading();
            console.log("error", error)
            this.handleException(error)
        }
    }

    // countByRentCategory = async () => {
    //     try {
    //         this.showPageLoading();
    //         let request = {
    //             startTime: moment(this.model.realEstateByCategoryTimeStart).unix() || moment(Date.now()).startOf('month').unix(),
    //             endTime: moment(this.model.realEstateByCategoryTimeEnd).unix() || moment(Date.now()).endOf('month').unix()
    //         }
    //         const result = await this.service.countRealEstateByRentCategory(request);
    //         let realEstateByRentCategoryList: any[] = [
    //             ["category", "Count by category"]
    //         ];
    //         result?.map((el: any) => {
    //             realEstateByRentCategoryList.push([
    //                 el.name, el.count
    //             ]);
    //         })
    //         this.setModel({
    //             realEstateByRentCategoryList
    //         })
    //         // console.log("realEstateByCategoryList", realEstateByCategoryList)
    //         this.hidePageLoading();
    //     } catch (error) {
    //         this.hidePageLoading();
    //         console.log("error", error)
    //         this.handleException(error)
    //     }
    // }

    countByRegion = async () => {
        try {
            this.showPageLoading();
            let request = {
                startTime: moment(this.model.realEstateByRegionTimeStart).unix() || moment(Date.now()).startOf('month').unix(),
                endTime: moment(this.model.realEstateByRegionTimeEnd).unix() || moment(Date.now()).endOf('month').unix(),
            }
            const result = await this.service.countRealEstateByRegion(request);
            let realEstateByRegionList: any[] = [
                ["Region", "Số bài đăng"]
            ];
            result?.map((el: any) => {
                realEstateByRegionList.push([
                    el._id, el.count
                ]);
            })
            this.setModel({
                realEstateByRegionList
            })
            // console.log("realEstateByRegionList", realEstateByRegionList)
            this.hidePageLoading();
        } catch(error) {
            this.hidePageLoading();
            console.log("error", error)
            this.handleException(error)
        }
    }

    countAreaByCategory = async () => {
        try {
            this.showPageLoading();
            let request = {
                startTime: moment(this.model.areaByCategoryTimeStart).unix() || moment(Date.now()).startOf('month').unix(),
                endTime: moment(this.model.areaByCategoryTimeEnd).unix() || moment(Date.now()).endOf('month').unix(),
            }
            const sell = await this.service.countAreaByCategory(request);
            const rent = await this.service.countAreaByRentCategory(request);
            let areaByCategoryList: any[] = [
                ["area", "Count by category"]
            ];
            sell?.map((el: any) => {
                areaByCategoryList.push([
                    el.name, el.count
                ]);
            })
            let areaByRentCategoryList: any[] = [
                ["area", "Count by category"]
            ];
            rent?.map((el: any) => {
                areaByRentCategoryList.push([
                    el.name, el.count
                ]);
            })
            this.setModel({
                areaByCategoryList,
                areaByRentCategoryList
            })
            // console.log("areaByCategoryList", areaByCategoryList)
            this.hidePageLoading();
        } catch (error) {
            this.hidePageLoading();
            console.log("error", error)
            this.handleException(error)
        }
    }

    countByMonthCreateTime = async () => {
        try {
            this.showPageLoading();
            const result = await this.service.countByMonthCreateTime();
            let realEstateByMonthList: any[] = [
                ["Bài đăng theo tháng(T: Tháng)", ""],
                ["T1", result?.find((el: any) => Number(el._id) === 1)?.count || 0],
                ["T2", result?.find((el: any) => Number(el._id) === 2)?.count || 0],
                ["T3", result?.find((el: any) => Number(el._id) === 3)?.count || 0],
                ["T4", result?.find((el: any) => Number(el._id) === 4)?.count || 0],
                ["T5", result?.find((el: any) => Number(el._id) === 5)?.count || 0],
                ["T6", result?.find((el: any) => Number(el._id) === 6)?.count || 0],
                ["T7", result?.find((el: any) => Number(el._id) === 7)?.count || 0],
                ["T8", result?.find((el: any) => Number(el._id) === 8)?.count || 0],
                ["T9", result?.find((el: any) => Number(el._id) === 9)?.count || 0],
                ["T10", result?.find((el: any) => Number(el._id) === 10)?.count || 0],
                ["T11", result?.find((el: any) => Number(el._id) === 11)?.count || 0],
                ["T12", result?.find((el: any) => Number(el._id) === 12)?.count || 0],
            ];
            // result?.map((el: any) => {
                // realEstateByMonthList.push([
                //     el._id, el.count
                // ]);
               
            // })
            this.setModel({
                realEstateByMonthList
            })
            // console.log("realEstateByMonthList", realEstateByMonthList)
            this.hidePageLoading();
        } catch (error) {
            this.hidePageLoading();
            console.log("error", error)
            this.handleException(error)
        }
    }

    
}
export default StatisticListController;