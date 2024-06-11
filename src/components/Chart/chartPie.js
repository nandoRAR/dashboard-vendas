import { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { colorSchema } from "../../services/clienteHelp";

const ChartPie = ({ pieLabel, pieData }) => {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const [backgroundColorSchema, borderColorSchema] = colorSchema();
        const data = {
            labels: pieLabel,
            datasets: [
                {
                    data: pieData,
                    backgroundColor: borderColorSchema ,
                    hoverBackgroundColor:backgroundColorSchema ,
                },
            ],
        };
        const options = {
            plugins: {
                tooltip:{
                    callbacks:{
                        label: function (context) {
                            let label = context.dataset.label || "";

                            if (label) {
                                label += ": ";
                            }
                            if (context.parsed !== null) {
                                label += new Intl.NumberFormat("pt-br", {
                                    style: "currency",
                                    currency: "BRL",
                                }).format(context.parsed);
                            }
                            return label;
                        }
                    }
                },
                legend: {
                    labels: {
                        usePointStyle: true,
                    },
                },
            },
        };

        setChartData(data);
        setChartOptions(options);
    }, [pieLabel, pieData]);

    return (
        <Chart
            type="pie"
            data={chartData}
            options={chartOptions}
            className="w-4/5 my-10"
        />
    );
};

export default ChartPie;