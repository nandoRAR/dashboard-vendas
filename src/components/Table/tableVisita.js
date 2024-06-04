import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode, FilterService } from "primereact/api";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";
import { PencilSquareIcon } from "@heroicons/react/20/solid";
import { TrashIcon } from "@heroicons/react/20/solid";
import DialogConfirm from "../Dialog/dialogConfirm";

FilterService.register("custom_valor", (value, filters) => {
    const [from, to] = filters ?? [null, null];
    if (from === null && to === null) return true;
    if (from !== null && to === null) return from <= value;
    if (from === null && to !== null) return value <= to;
    return from <= value && value <= to;
});

const TableVisita = ({ visitas, handleVisitaSelect, handleDeleteVisita }) => {
    const [filters, setFilters] = useState({
        dataVisita: { value: null, matchMode: FilterMatchMode.DATE_BEFORE },
        tipoVisita: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        "representada.nome": {
            value: null,
            matchMode: FilterMatchMode.STARTS_WITH,
        },
        valor: { value: null, matchMode: FilterMatchMode.CUSTOM },
       
    });

    const [confirmDialog, setConfirmDialog] = useState(false);
    const [visitaId, setVisitaId] = useState("");

    const hideClienteDialog = () => setConfirmDialog(false);

    const HandleShowDialogDelete = (id) => {
        setVisitaId(id);
        setConfirmDialog(true);
    };

    const handleConfirmDelete = () => {
        setConfirmDialog(false);
        handleDeleteVisita(visitaId);
    };

    const formatDate = (value) => {
        return value.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    const dateBodyTemplate = (visita) => {
        return formatDate(visita.dataVisita);
    };

    const valorBodyTemplate = (visita) => {
        return visita.valor.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
        });
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded-lg mr-2"
                    onClick={() => handleVisitaSelect(rowData)}
                >
                    <PencilSquareIcon className="size-6" />
                </button>
                <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-lg"
                    onClick={() => HandleShowDialogDelete(rowData.id)}
                >
                    <TrashIcon className="size-6" />
                </button>
            </>
        );
    };

    const valorRowFilterTemplate = (options) => {
        const [from, to] = options.value ?? [null, null];

        return (
            <div className="flex gap-1">
                <InputNumber
                    value={from}
                    onChange={(e) => {
                        options.filterApplyCallback([e.value, to]);
                    }}
                    style={{ maxWidth: "100px" }}
                    mode="currency"
                    currency="BRL"
                    locale="pt-BR"
                    placeholder="from"
                />
                <InputNumber
                    value={to}
                    onChange={(e) =>
                        options.filterApplyCallback([from, e.value])
                    }
                    style={{ maxWidth: "100px" }}
                    mode="currency"
                    currency="BRL"
                    locale="pt-BR"
                    placeholder="to"
                />
            </div>
        );
    };

    const dateFilterTemplate = (options) => {
        return (
            <Calendar
                value={options.value}
                onChange={(e) => options.filterCallback(e.value, options.index)}
                dateFormat="dd/mm/yy"
                placeholder="dd/mm/yyyy"
                mask="99/99/9999"
            />
        );
    };

    return (
        <div>
            <DataTable
                value={visitas}
                removableSort
                paginator
                rows={10}
                rowsPerPageOptions={[10, 25, 50]}
                filters={filters}
                filterDisplay="row"
                emptyMessage="Visita não encontrada."
                tableStyle={{ minWidth: "50rem" }}
            >
                <Column
                    field="dataVisita"
                    header="Data"
                    body={dateBodyTemplate}
                    filterField="dataVisita"
                    dataType="date"
                    sortable
                    filter
                    filterElement={dateFilterTemplate}
                    style={{ maxWidth: "10rem" }}
                />
                <Column
                    field="tipoVisita"
                    header="Modo"
                    sortable
                    filter
                    filterPlaceholder="Procurar"
                    style={{ maxWidth: "12rem" }}
                />
                <Column
                    header="Valor"
                    field="valor"
                    sortable
                    body={valorBodyTemplate}
                    showFilterMenu={false}
                    showClearButton={false}
                    filter
                    filterElement={valorRowFilterTemplate}
                    style={{ maxWidth: "12rem" }}
                />
                <Column
                    field="representada.nome"
                    header="Representada"
                    sortable
                    filter
                    filterPlaceholder="Procurar"
                    style={{ maxWidth: "12rem" }}
                />
                <Column
                    field="descricao"
                    header="Descrição"
                    style={{ maxWidth: "15rem" }}
                />
                <Column
                    body={actionBodyTemplate}
                    style={{ minWidth: "9rem" }}
                />
            </DataTable>
            <DialogConfirm
                confirmDialog={confirmDialog}
                hideConfirmDialog={hideClienteDialog}
                handleConfirmOption={handleConfirmDelete}
                textConfirm={"Tem certeza de que deseja excluir este arquivo"}
            />
        </div>
    );
};

export default TableVisita;
