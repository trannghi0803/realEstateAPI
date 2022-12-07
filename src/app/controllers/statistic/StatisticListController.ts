import { render } from '@testing-library/react';
import { StatisticModel } from "../../models";
import { StatisticService } from "../../services";
import { BaseController } from "../base";


class StatisticListController extends BaseController<StatisticModel, StatisticService> {
    constructor(props: any) {
        super(props, StatisticModel, StatisticService);
    }

    async onStarted() {
        try {
            const data: any = {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [
                    {
                        label: '# of Votes',
                        data: [12, 19, 3, 5, 2, 3],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                        ],
                        borderWidth: 1,
                    },
                ],
            };
            this.setModel({
                data,
            })
        } catch (error) {

        }
    }

}
export default StatisticListController;