import { useState, useEffect } from "react";
import { countItems } from "../../services/clienteHelp";
import ChartBar from "./chartBar";

const ChartCliente = ({ clienteData }) => {
    const [repLabel, setRepLabel] = useState(null);
    const [repData, setRepData] = useState(null);
    const [regiaoLabel, setRegiaoLabel] = useState(null);
    const [regiaoData, setRegiaoData] = useState(null);

    useEffect(() => {
        //Cliente/Representada
        let arrayRep = [];
        clienteData.forEach((cliente) => {
            cliente.representadas.forEach((representada) => {
                arrayRep.push(representada.nome);
            });
        });
        const resultRep = countItems(arrayRep);
        setRepLabel(Object.keys(resultRep));
        setRepData(Object.values(resultRep));
         //Cliente/Região
        let arrayRegiao = [];
        clienteData.forEach((cliente) => {
            arrayRegiao.push(cliente.regiao.nome);
        });
        const resultRegiao = countItems(arrayRegiao);
        setRegiaoLabel(Object.keys(resultRegiao));
        setRegiaoData(Object.values(resultRegiao))
    }, [clienteData]);

    return (
        <div className="my-10 grid gap-4 gap-y-2 text-sm grid-cols-2">
            {repData && (
                <div className="col-span-1 flex justify-center">
                    <ChartBar
                        barLabel={repLabel}
                        barData={repData}
                        title="Números de cliente por representada"
                    />
                </div>
            )}
            {regiaoData && (
                <div className="col-span-1 flex justify-center">
                    <ChartBar
                        barLabel={regiaoLabel}
                        barData={regiaoData}
                        title="Números de cliente por região"
                    />
                </div>
            )}
        </div>
    );
};

export default ChartCliente;
