import React, { useState, useEffect, useRef} from "react";
import { Dialog } from "primereact/dialog";
import { api } from "../../services/api";

const DialogVisita = ({
    visitaDialog,
    hideVisitaDialog,
    representadas,
    clienteId,
    visitaEdit,
    addVisitaList,
    editVisitaList
}) => {
    const [valorField, setValorField] = useState();
    const [dataField, setDataField] = useState("");
    const [modoField, setModoField] = useState("");
    const [representadaField, setRepresentadaField] = useState("");
    const [descricaoField, setDescricaoField] = useState("");

    const refSelectModo = useRef(null);
    const refSelectRepresentada = useRef(null);

    const hideDialog = () => {
        clearFieldVisita();
        hideVisitaDialog()
    };

    const handleAddVisita = async (e) => {
        e.preventDefault();
        let visita = {
            cliente_id: clienteId,
            tipoVisita: modoField,
            valor: parseFloat(valorField),
            dataVisita: new Date(dataField + "T00:00"),
            representada: representadaField,
            descricao: descricaoField,
        };
        const result = await api.addVisita(visita);
        if (!result) {
            alert("Erro ao salvar");
        }else {
            visita.id = result;
            alert("Sucesso");
            addVisitaList(visita);
            clearFieldVisita();
            hideDialog();
        }
    };

    const handleEditVisita = async (e) => {
        e.preventDefault();
        let visita = {
            cliente_id: clienteId,
            tipoVisita: modoField,
            valor: parseFloat(valorField),
            dataVisita: new Date(dataField + "T00:00"),
            representada: representadaField,
            descricao: descricaoField,
        };
        const result = await api.editVisita(visitaEdit.id, visita);
        if (result) {
            alert("Erro ao Editar");
        }else {
            alert("Sucesso");
            editVisitaList(visitaEdit.id, visita);
            clearFieldVisita();
            hideDialog();
        }
    };

    const handleReprsentadaSelect = (e) => {
        if (e !== "") {
            let select = representadas.filter((item) => {
                if (item.id === e) return item;
                return null;
            });
            setRepresentadaField({
                id: select[0].id,
                nome: select[0].nome,
            });
        }
    };

    const clearFieldVisita = () => {
        setValorField("");
        setDataField("");
        setDescricaoField("");
        setRepresentadaField("");
        setModoField("");
        refSelectModo.current.selectedIndex = "0";
        refSelectRepresentada.current.selectedIndex = "0";
    }

    useEffect(() => {
        setValorField(visitaEdit ? visitaEdit.valor : "");
        setDescricaoField(visitaEdit ? visitaEdit.descricao : "");
        setModoField(visitaEdit ? visitaEdit.tipoVisita : "");
        setRepresentadaField(
            visitaEdit
                ? {
                      id: visitaEdit.representada.id,
                      nome: visitaEdit.representada.nome,
                  }
                : ""
        );
        setDataField(visitaEdit ? visitaEdit.dataVisita.toISOString().split('T')[0] : "");
    }, [visitaEdit]);

    const visitaDialogFooter = (
        <React.Fragment>
            <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg mr-2"
                onClick={hideDialog}
            >
                Cancelar
            </button>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                type="submit"
                form={visitaEdit ? `formEditVisita` : `formAddVisita`}
            >
                {visitaEdit ? `Editar` : `Salvar`}
            </button>
        </React.Fragment>
    );

    return (
        <Dialog
            visible={visitaDialog}
            style={{ width: "32rem" }}
            breakpoints={{ "960px": "75vw", "641px": "90vw" }}
            header={visitaEdit ? `Editar Visita` : `Adicionar Visita`}
            footer={visitaDialogFooter}
            onHide={hideDialog}
        >
            <form
                onSubmit={visitaEdit ? handleEditVisita : handleAddVisita}
                id={visitaEdit ? `formEditVisita` : `formAddVisita`}
            >
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                    {/* valor da venda */}
                    <div className="md:col-span-2">
                        <label
                            htmlFor="valor"
                            className="font-semibold text-Zinc-800"
                        >
                            Valor da Venda
                        </label>
                        <input
                            type="number"
                            name="valor"
                            id="valor"
                            className="h-10 mt-1 px-4 w-full bg-white border shadow-sm border-slate-300 hover:border-sky-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1"
                            placeholder="R$ 00.00"
                            value={valorField}
                            onChange={(e) => setValorField(e.target.value)}
                            required
                        />
                    </div>
                    {/* Modo da visita */}
                    <div className="md:col-span-1">
                        <label
                            htmlFor="modo"
                            className="font-semibold text-Zinc-800"
                        >
                            Modo
                        </label>
                        <select
                            ref={refSelectModo}
                            id="modo"
                            name="modo"
                            value={modoField}
                            className="h-10 mt-1 px-4 w-full bg-white border shadow-sm border-slate-300 hover:border-sky-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1"
                            onChange={(e) => setModoField(e.target.value)}
                            required
                        >
                            <option></option>
                            <option value={"Online"}>Online</option>
                            <option value={"Presencial"}>Presencial</option>
                        </select>
                    </div>
                    {/* Data*/}
                    <div className="md:col-span-2">
                        <label
                            htmlFor="date"
                            className="font-semibold text-Zinc-800"
                        >
                            Data da visita
                        </label>
                        <input
                            type="date"
                            name="date"
                            id="date"
                            className="h-10 mt-1 px-4 w-full bg-white border shadow-sm border-slate-300 hover:border-sky-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1"
                            value={dataField}
                            onChange={(e) => setDataField(e.target.value)}
                            required
                        />
                    </div>
                    {/* Representada*/}
                    <div className="md:col-span-1">
                        <label
                            htmlFor="representada"
                            className="font-semibold text-Zinc-800"
                        >
                            Representada
                        </label>
                        <select
                            ref={refSelectRepresentada}
                            id="representada"
                            name="representada"
                            value={representadaField ? representadaField.id : ""}
                            className="h-10 mt-1 px-4 w-full bg-white border shadow-sm border-slate-300 hover:border-sky-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1"
                            onChange={(e) =>
                                handleReprsentadaSelect(e.target.value)
                            }
                            required
                        >
                            <option></option>
                            {representadas ? (
                                representadas.map((i, k) => (
                                    <option key={k} value={i.id}>
                                        {i.nome}
                                    </option>
                                ))
                            ) : (
                                <option></option>
                            )}
                        </select>
                    </div>
                    {/* Descrição*/}
                    <div className="md:col-span-4">
                        <label
                            htmlFor="descricao"
                            className="font-semibold text-Zinc-800"
                        >
                            Descrição
                        </label>
                        <textarea
                            id="descricao"
                            rows="3"
                            className="mt-1 p-2.5 w-full bg-white border shadow-sm border-slate-300 hover:border-sky-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1"
                            value={descricaoField}
                            onChange={(e) => setDescricaoField(e.target.value)}
                        />
                    </div>
                </div>
            </form>
        </Dialog>
    );
};

export default DialogVisita;
