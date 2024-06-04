import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { FilterMatchMode, FilterService } from "primereact/api";
import { InputNumber } from "primereact/inputnumber";

FilterService.register("custom_ultimaVisita", (value, filters) => {
    const [from, to] = filters ?? [null, null];
    if (from === null && to === null) return true;
    if (from !== null && to === null) return from <= value;
    if (from === null && to !== null) return value <= to;
    return from <= value && value <= to;
});

const TableCliente = ({ clientes, pageCliente }) => {
    const [filters, setFilters] = useState({
        razao: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        fantasia: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        "regiao.nome": { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        "regiao.cidades.nome": {
            value: null,
            matchMode: FilterMatchMode.STARTS_WITH,
        },
        representadas: { value: null, matchMode: FilterMatchMode.CONTAINS },
        ultimaVisita: { value: null, matchMode: FilterMatchMode.CUSTOM },
    });
    const [selectedCliente, setSelectedCliente] = useState(null);

    const ultimaVisitaBodyTemplate = (cliente) => {
        if (cliente.ultimaVisita === 9999)
            return <Tag value={"Sem visita"} severity={"warning"} />;
        if (cliente.ultimaVisita >= 90)
            return <Tag value={cliente.ultimaVisita} severity={"danger"} />;
        return <Tag value={cliente.ultimaVisita} severity={"success"} />;
    };

    const visitaRowFilterTemplate = (options) => {
        const [from, to] = options.value ?? [null, null];

        return (
            <div className="flex gap-1">
                <InputNumber
                    value={from}
                    onChange={(e) => {
                        options.filterApplyCallback([e.value, to]);
                    }}
                    style={{ width: "50px" }}
                    placeholder="from"
                />
                <InputNumber
                    value={to}
                    onChange={(e) =>
                        options.filterApplyCallback([from, e.value])
                    }
                    style={{ width: "50px" }}
                    placeholder="to"
                />
            </div>
        );
    };

    const onRowSelect = (event) => {
        pageCliente(event.rowData.id);
    };

    return (
        <DataTable
            value={clientes}
            removableSort
            paginator
            rows={10}
            rowsPerPageOptions={[10, 25, 50]}
            cellSelection
            selectionMode="single"
            dataKey="id"
            selection={selectedCliente}
            onSelectionChange={(e) => setSelectedCliente(e.value)}
            onCellSelect={onRowSelect}
            filters={filters}
            filterDisplay="row"
            emptyMessage="Cliente não encontrado."
            tableStyle={{ minWidth: "50rem" }}
        >
            <Column
                field="razao"
                header="Razão Social"
                sortable
                filter
                filterPlaceholder="Procurar"
                style={{ maxWidth: "12rem" }}
            />
            <Column
                field="fantasia"
                header="Fantasia"
                sortable
                filter
                filterPlaceholder="Procurar"
                style={{ maxWidth: "12rem" }}
            />
            <Column field="cnpj" header="CNPJ" />
            <Column
                field="regiao.nome"
                header="Região"
                sortable
                filter
                filterPlaceholder="Procurar"
                style={{ maxWidth: "12rem" }}
            />
            <Column
                field="regiao.cidades.nome"
                header="Cidade"
                sortable
                filter
                filterPlaceholder="Procurar"
                style={{ maxWidth: "12rem" }}
            />
            <Column
                field="representadas"
                header="Representadas"
                filter
                filterPlaceholder="Procurar"
                style={{ maxWidth: "12rem" }}
            />
            <Column
                header="Visita (dias)"
                field="ultimaVisita"
                body={ultimaVisitaBodyTemplate}
                sortable
                showFilterMenu={false}
                showClearButton={false}
                filterField="ultimaVisita"
                filter
                filterElement={visitaRowFilterTemplate}
                style={{ minWidth: "12rem" }}
            />
        </DataTable>
    );
};

export default TableCliente;
