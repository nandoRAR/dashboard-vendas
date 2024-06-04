import { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { colorSchema } from "../../services/clienteHelp";

const ChartBar = ({ barLabel, barData, title }) => {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const [backgroundColorSchema, borderColorSchema] = colorSchema();
        const data = {
            labels: barLabel,
            datasets: [
                {
                    label: title,
                    data: barData,
                    backgroundColor: backgroundColorSchema,
                    borderColor: borderColorSchema,
                    borderWidth: 2,
                },
            ],
        };
        const options = {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        precision: 0,
                    },
                },
            },
        };

        setChartData(data);
        setChartOptions(options);
    }, [barLabel, barData, title]);

    return (
        <Chart
            type="bar"
            data={chartData}
            options={chartOptions}
            className="w-4/5"
        />
    );
};

export default ChartBar;
