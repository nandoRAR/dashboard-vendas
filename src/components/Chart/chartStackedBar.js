import { useState, useEffect } from "react";
import { Chart } from "primereact/chart";

const ChartStackedBar = ({ barLabel, barData, title }) => {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue("--text-color");
        const textColorSecondary = documentStyle.getPropertyValue(
            "--text-color-secondary"
        );
        const surfaceBorder =
            documentStyle.getPropertyValue("--surface-border");
        const data = {
            labels: barLabel,
            datasets: barData,
        };
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                tooltip: {
                    mode: "index",
                    intersect: false,
                    callbacks: {
                        label: function (context) {
                            let label = context.dataset.label || "";

                            if (label) {
                                label += ": ";
                            }
                            if (context.parsed.y !== null) {
                                label += new Intl.NumberFormat("pt-br", {
                                    style: "currency",
                                    currency: "BRL",
                                }).format(context.parsed.y);
                            }
                            return label;
                        },
                        footer: function (items) {
                            let sum = 0;

                            items.forEach(function (tooltipItem) {
                                sum += tooltipItem.parsed.y;
                            });
                            return (
                                "Total: " +
                                sum.toLocaleString("pt-br", {
                                    style: "currency",
                                    currency: "BRL",
                                })
                            );
                        },
                    },
                },
                legend: {
                    labels: {
                        color: textColor,
                    },
                },
            },
            scales: {
                x: {
                    stacked: true,
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                    },
                },
                y: {
                    stacked: true,
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
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

export default ChartStackedBar;
