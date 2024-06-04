import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Toolbar } from "primereact/toolbar";
import { api } from "../../services/api";
import { PencilSquareIcon } from "@heroicons/react/20/solid";
import { maxDateVisita, betweenDate } from "../../services/clienteHelp";
import TableVisita from "../../components/Table/tableVisita";
import DialogCliente from "../../components/Dialog/dialogCliente";
import DialogVisita from "../../components/Dialog/dialogVisita";
import ChartVisita from "../../components/Chart/chartVisita";

const Cliente = () => {
    const { id } = useParams();

    const [cliente, setCliente] = useState(null);
    const [visitasList, setVisitasList] = useState(null);
    const [visitaEdit, setVisitaEdit] = useState(null);
    const [visitaDialog, setVisitaDialog] = useState(false);
    const [clienteDialog, setClienteDialog] = useState(false);
    const [visitaChart, setVisitaChart] = useState(null);
    const [visitaChartStacked, setVisitaChartStacked] = useState(null);

    //cliente
    const openEditCliente = () => setClienteDialog(true);
    const hideClienteDialog = () => setClienteDialog(false);
    const editClienteInfo = (cliente) => setCliente(cliente);

    useEffect(() => {
        const getCliente = async () => {
            const clienteInfo = await api.getClienteById(id);
            setCliente(clienteInfo);
        };
        getCliente();
    }, [id]);

    // visitas
    const openNewVisita = () => {
        setVisitaDialog(true);
        setVisitaEdit(null);
    };

    const hideVisitaDialog = () => {
        setVisitaDialog(false);
        setVisitaEdit(null);
    };

    const handleVisitaSelect = (visita) => {
        setVisitaEdit(visita);
        setVisitaDialog(true);
    };

    const handlePeriodoVisita = (periodo) => {
        if (periodo === "all") {
            setVisitaChart(visitasList);
            return;
        }
        const result = betweenDate(periodo, visitasList);
        setVisitaChart(result);
    };

    const addVisitaList = (visita) => {
        visitasList.push(visita);
        handleClienteVisita(visitasList);
        setVisitaChartStacked(betweenDate(12, visitasList));
    };

    const editVisitaList = (id, visita) => {
        const newVisitaList = visitasList.filter((visita) => visita.id !== id);
        newVisitaList.push({ id: id, ...visita });
        setVisitasList(newVisitaList);
        handleClienteVisita(newVisitaList);
        setVisitaChartStacked(betweenDate(12, newVisitaList));
        setVisitaEdit(null);
    };

    const handleDeleteVisita = async (id) => {
        const result = await api.deletetVisita(id);
        if (!result) {
            const newVisitaList = visitasList.filter(
                (visita) => visita.id !== id
            );
            setVisitasList(newVisitaList);
            setVisitaChartStacked(betweenDate(12, newVisitaList));
            handleClienteVisita(newVisitaList);
        } else {
            alert("Erro ao Deletar");
        }
    };

    useEffect(() => {
        const getVisitas = async () => {
            const visitaInfo = await api.getVisitaByCliente(id);
            visitaInfo.map(
                (item) => (item.dataVisita = item.dataVisita.toDate())
            );
            setVisitasList(visitaInfo);
            setVisitaChart(visitaInfo);
            setVisitaChartStacked(betweenDate(12, visitaInfo));
        };
        getVisitas();
    }, [id]);

    //set Ultima Visita
    const handleClienteVisita = async (visitas) => {
        if (visitas.length === 0) return;
        const maxDate = maxDateVisita(visitas).toString();
        if (!cliente.visita || cliente.visita.toDate().toString() !== maxDate) {
            await api.addVisitaCliente(id, new Date(maxDate));
        }
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
                    onClick={openNewVisita}
                >
                    Nova Visita
                </button>
            </div>
        );
    };

    return (
        <div className="min-h-screen lg:p-20 pt-32 lg:mt-10 bg-gray-200">
            <div className="w-full lg:w-3/5 rounded-sm shadow-2xl bg-white opacity-75 mx-2s lg:mx-0 p-5 mb-4">
                {cliente && (
                    <div>
                        <div className="grid grid-cols-3 gap-6">
                            <div className="col-span-2">
                                <div className="mb-2">
                                    <span className="font-bold text-black-600">
                                        Razão Social:{" "}
                                    </span>
                                    {cliente.razao}
                                </div>
                                <div className="mb-2">
                                    <span className="font-bold text-black-600">
                                        Fantasia:{" "}
                                    </span>
                                    {cliente.fantasia}
                                </div>
                                <div className="mb-2">
                                    <span className="font-bold text-black-600">
                                        CNPJ:{" "}
                                    </span>
                                    {cliente.cnpj}
                                </div>
                                <div className="mb-2">
                                    <span className="font-bold text-black-600">
                                        Inscrição Estadual:{" "}
                                    </span>
                                    {cliente.estadual}
                                </div>
                                <div className="mb-2">
                                    <span className="font-bold text-black-600">
                                        Comprador:{" "}
                                    </span>
                                    {cliente.comprador}
                                </div>
                                <div className="mb-2">
                                    <span className="font-bold text-black-600">
                                        Telefone:{" "}
                                    </span>
                                    {cliente.telefone}
                                </div>
                                <div className="mb-2">
                                    <span className="font-bold text-black-600">
                                        Endereço:{" "}
                                    </span>
                                    {cliente.endereco}
                                </div>
                                <div className="mb-2">
                                    <span className="font-bold text-black-600">
                                        Região:{" "}
                                    </span>
                                    {cliente.regiao.nome}
                                </div>
                                <div className="mb-2">
                                    <span className="font-bold text-black-600">
                                        Cidade:{" "}
                                    </span>
                                    {cliente.regiao.cidades.nome}
                                </div>
                                <div>
                                    <span className="font-bold text-black-600">
                                        Representadas:
                                    </span>
                                    <ul className="p-2 flex flex-wrap no-scrollbar">
                                        {cliente.representadas.map(
                                            (representada, k) => {
                                                return (
                                                    <li
                                                        key={k}
                                                        className="w-auto mx-1 mb-2 p-2 px-3 border-gray-400 border rounded"
                                                    >
                                                        {representada.nome}
                                                    </li>
                                                );
                                            }
                                        )}
                                    </ul>
                                </div>
                            </div>
                            <div className="text-end">
                                <button
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
                                    onClick={openEditCliente}
                                >
                                    <PencilSquareIcon className="size-6" />
                                </button>
                            </div>
                        </div>
                        <DialogCliente
                            clienteDialog={clienteDialog}
                            hideClienteDialog={hideClienteDialog}
                            clienteInfo={cliente}
                            clienteId={id}
                            editClienteInfo={editClienteInfo}
                        />
                    </div>
                )}
            </div>
            {visitasList && visitaChart && visitasList.length > 0 && (
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
            <div className="">
                <Toolbar className="mb-4" left={leftToolbarTemplate} />
                <TableVisita
                    visitas={visitasList}
                    handleVisitaSelect={handleVisitaSelect}
                    handleDeleteVisita={handleDeleteVisita}
                />
                <DialogVisita
                    visitaDialog={visitaDialog}
                    hideVisitaDialog={hideVisitaDialog}
                    representadas={cliente?.representadas}
                    clienteId={id}
                    visitaEdit={visitaEdit}
                    addVisitaList={addVisitaList}
                    editVisitaList={editVisitaList}
                />
            </div>
        </div>
    );
};

export default Cliente;
