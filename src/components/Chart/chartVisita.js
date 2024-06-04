import { useState, useEffect } from "react";
import { datasetsBar } from "../../services/clienteHelp";
import ChartPie from "./chartPie";
import ChartStackedBar from "./chartStackedBar";

const ChartVisita = ({ visitaData, visitaDataStacked}) => {
    const [representadaLabel, setRepresentadaLabel] = useState(null);
    const [representadaData, setRepresentadaData] = useState(null);
    const [tipoLabel, setTipolabel] = useState(null);
    const [tipoData, setTipoData] = useState(null);
    const [stackedLabel, setStackedLabel] = useState(null);
    const [stackedData, setStackedData] = useState(null);
    useEffect(() => {
        //Representadas
        const VisitaByRepData = visitaData.map((data) => ({
            nome: data.representada.nome,
            valor: data.valor,
        }));
        const sumVisitaByRep = VisitaByRepData.reduce((acc, item) => {
            let existItem = acc.find(({ nome }) => item.nome === nome);
            if (existItem) {
                existItem.valor += item.valor;
            } else {
                acc.push(item);
            }
            return acc;
        }, []);
        setRepresentadaLabel(sumVisitaByRep.map((data) => data.nome));
        setRepresentadaData(sumVisitaByRep.map((data) => data.valor));
        //Tpo de visita
        const VisitaByTipoData = visitaData.map((data) => ({
            tipo: data.tipoVisita,
            valor: data.valor,
        }));
        const sumVisitaByTipo = VisitaByTipoData.reduce((acc, item) => {
            let existItem = acc.find(({ tipo }) => item.tipo === tipo);
            if (existItem) {
                existItem.valor += item.valor;
            } else {
                acc.push(item);
            }
            return acc;
        }, []);
        setTipolabel(sumVisitaByTipo.map((data) => data.tipo));
        setTipoData(sumVisitaByTipo.map((data) => data.valor));
        // Stacked bar
        const [label, dados] = datasetsBar(visitaDataStacked);
        setStackedLabel(label);
        setStackedData(dados);
    }, [visitaData, visitaDataStacked]);

    return (
        <div className="my-10 grid gap-2 gap-y-2 text-sm grid-cols-2  xl:grid-cols-4 ">
            {representadaLabel && representadaData && (
                <div className="col-span-1 flex justify-center">
                    <ChartPie
                        pieLabel={representadaLabel}
                        pieData={representadaData}
                    />
                </div>
            )}
            {tipoLabel && tipoData && (
                <div className="col-span-1 flex justify-center">
                    <ChartPie pieLabel={tipoLabel} pieData={tipoData} />
                </div>
            )}
            {stackedLabel && stackedData && (
                <div className="col-span-4 flex justify-center">
                    <ChartStackedBar barLabel={stackedLabel} barData={stackedData} />
                </div>
            )}
        </div>
    );
};

export default ChartVisita;
