import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { diferenceInDays, betweenDate } from "../../services/clienteHelp";
import ChartCliente from "../../components/Chart/chartCliente";
import ChartVisita from "../../components/Chart/chartVisita";

const ChartPage = () => {
    const [clientesList, setClientesList] = useState([]);
    const [visitasList, setVisitasList] = useState([]);
    const [visitaChart, setVisitaChart] = useState(null);
    const [visitaChartStacked, setVisitaChartStacked] = useState(null);

    const handlePeriodoVisita = (periodo) => {
        if (periodo === "all") {
            setVisitaChart(visitasList);
            return;
        }
        const result = betweenDate(periodo, visitasList);
        setVisitaChart(result);
    };

    //get clientes
    useEffect(() => {
        const getClientes = async () => {
            const clientes = await api.getAllClientes();
            clientes.map(
                (item) =>
                    (item.ultimaVisita = diferenceInDays(item.ultimaVisita))
            );
            setClientesList(clientes);
        };
        getClientes();
    }, []);
    //get Visitas
    useEffect(() => {
        const getVisitas = async () => {
            const visitas = await api.getAllVisitas();
            visitas.map((item) => (item.dataVisita = item.dataVisita.toDate()));
            setVisitasList(visitas);
            setVisitaChart(visitas);
            setVisitaChartStacked(betweenDate(12, visitas));
        };
        getVisitas();
    }, []);
    return (
        <div className="min-h-screen lg:p-20 pt-32 lg:mt-10 bg-gray-200">
            {clientesList && clientesList.length > 0 && (
                <div className="w-full rounded-sm mx-2s lg:mx-0 p-5 mb-4 shadow-2xl bg-white opacity-75grid">
                    <ChartCliente clienteData={clientesList} />
                </div>
            )}
            {visitasList && visitasList.length > 0 && (
                <div className="w-full rounded-sm mx-2s lg:mx-0 p-5 mb-4 shadow-2xl bg-white opacity-75grid">
                    <div className="flex flex-wrap">
                        <button
                            className="mx-1 mb-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                            onClick={() => handlePeriodoVisita("all")}
                        >
                            Todos os anos
                        </button>
                        <button
                            className="mx-1 mb-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                            onClick={() => handlePeriodoVisita(3)}
                        >
                            Período de 3 meses
                        </button>
                        <button
                            className="mx-1 mb-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                            onClick={() => handlePeriodoVisita(6)}
                        >
                            Período de 6 meses
                        </button>
                        <button
                            className="mx-1 mb-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                            onClick={() => handlePeriodoVisita(12)}
                        >
                            Período de 1 ano
                        </button>
                    </div>
                    <ChartVisita
                        visitaData={visitaChart}
                        visitaDataStacked={visitaChartStacked}
                    />
                </div>
            )}
        </div>
    );
};

export default ChartPage;
