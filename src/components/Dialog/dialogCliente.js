import React, { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { InputMask } from "primereact/inputmask";
import { api } from "../../services/api";

const DialogCliente = ({
    clienteDialog,
    hideClienteDialog,
    clienteInfo,
    clienteId,
    editClienteInfo
}) => {
    const [checkedState, setCheckedState] = useState([]);
    const [regioes, setRegioes] = useState([]);
    const [cidades, setCidades] = useState([]);
    const [representadas, setRepresentadas] = useState([]);
    const [regiaoField, setRegiaoField] = useState({
        id: clienteInfo.regiao.id,
        nome: clienteInfo.regiao.nome,
    });
    const [cidadeField, setCidadeField] = useState({
        id: clienteInfo.regiao.cidades.id,
        nome: clienteInfo.regiao.cidades.nome,
    });
    const [representadaField, setRepresentadaField] = useState(
        clienteInfo.representadas
    );
    const [razaolField, setRazaoField] = useState(clienteInfo.razao);
    const [fantasiaField, setFantasiaField] = useState(clienteInfo.fantasia);
    const [cnpjField, setCnpjField] = useState(clienteInfo.cnpj);
    const [emailField, setEmailField] = useState(clienteInfo.email);
    const [telefoneField, setTelefoneField] = useState(clienteInfo.telefone);
    const [enderecoField, setEnderecoField] = useState(clienteInfo.endereco);
    const [estadualField, setEstadualField] = useState(clienteInfo.estadual);  
    const [compradorField, setCompradorField] = useState(clienteInfo.comprador);

    const hideDialog = () => hideClienteDialog();

    const handleEditCliente = async (e) => {
        e.preventDefault();
        const clienteEdit = {
            fantasia: fantasiaField,
            razao: razaolField,
            cnpj: cnpjField,
            telefone: telefoneField,
            endereco: enderecoField,
            email: emailField,
            representadas: representadaField,
            regiao: {
                id: regiaoField.id,
                nome: regiaoField.nome,
                cidades: {
                    id: cidadeField.id,
                    nome: cidadeField.nome,
                },
            },
            comprador: compradorField,
            estadual: estadualField
        };
        const result = await api.updateCliente(clienteId, clienteEdit);
        if (result) {
            alert("Erro ao Salvar");
        }else{
            alert("Editado com sucesso");
            editClienteInfo(clienteEdit);
            hideClienteDialog();
        }
    };

    const handleRegiaoSelect = (e) => {
        if (e !== "") {
            let cidadesList = regioes.filter((item) => {
                if (item.id === e) return item;

                return null;
            });
            setRegiaoField({
                id: cidadesList[0].id,
                nome: cidadesList[0].nome,
            });
            setCidades(cidadesList[0].cidades);
        }
    };

    const handleCidadeSelect = (e) => {
        if (e !== "") {
            let cidadeSelect = cidades.filter((item) => {
                if (item.id === e) return item;
                return null;
            });
            setCidadeField(cidadeSelect[0]);
        }
    };

    const handleRepresentadaSelecet = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );
        setCheckedState(updatedCheckedState);
        const representadasList = representadas.filter((item, index) => {
            if (updatedCheckedState[index] === true) return item;
            return null;
        });
        setRepresentadaField(representadasList);
    };

    useEffect(() => {
        const getRegiao = async () => {
            const regiao = await api.getRegiao();
            setRegioes(regiao);
        };
        getRegiao();
    }, []);

    useEffect(() => {
        const getRepresentadas = async () => {
            const representadaList = await api.getRepresentadas();
            setRepresentadas(representadaList);
            let array = [];
            for (const rep of representadaList) {
                array.push(
                    clienteInfo.representadas.some((e) => e.id === rep.id)
                );
            }
            /* setCheckedState(new Array(representadaList.length).fill(false)); */
            setCheckedState(array);
        };
        getRepresentadas();
    }, [clienteInfo]);

    useEffect(() => {
        const getCidades = async () => {
            const cidades = await api.getCidades(regiaoField.id);
            setCidades(cidades);
        };
        getCidades();
    }, [regiaoField]);

    const clientDialogFooter = (
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
                form="formCliente"
            >
                Editar
            </button>
        </React.Fragment>
    );

    return (
        <Dialog
            visible={clienteDialog}
            style={{ width: "32rem" }}
            breakpoints={{ "960px": "75vw", "641px": "90vw" }}
            header="Editar Cliente"
            footer={clientDialogFooter}
            onHide={hideDialog}
        >
            <form onSubmit={handleEditCliente} id="formCliente">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-4">
                    {/* Razão Social */}
                    <div className="md:col-span-4">
                        <label
                            htmlFor="razao_social"
                            className="font-semibold text-Zinc-800"
                        >
                            Razão social
                        </label>
                        <input
                            type="text"
                            name="razao_social"
                            id="razao_social"
                            className="h-10 mt-1 px-4 w-full bg-gray-50 bg-white border hover:border-sky-300 shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1"
                            value={razaolField}
                            onChange={(e) => setRazaoField(e.target.value)}
                            required
                        />
                    </div>
                    {/* Fantasia */}
                    <div className="md:col-span-4">
                        <label
                            htmlFor="fantasia"
                            className="font-semibold text-Zinc-800"
                        >
                            Fantasia
                        </label>
                        <input
                            type="text"
                            name="fantasia"
                            id="fantasia"
                            className="h-10 mt-1 px-4 w-full bg-gray-50 bg-white border hover:border-sky-300 shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1"
                            value={fantasiaField}
                            onChange={(e) => setFantasiaField(e.target.value)}
                            required
                        />
                    </div>
                    {/* CNPJ */}
                    <div className="md:col-span-2">
                        <label
                            htmlFor="cnpj"
                            className="font-semibold text-Zinc-800"
                        >
                            CNPJ
                        </label>
                        <InputMask
                            name="cnpj"
                            id="cnpj"
                            className="h-10 mt-1 px-4 w-full bg-gray-50 bg-white border hover:border-sky-300 shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1"
                            value={cnpjField}
                            onChange={(e) => setCnpjField(e.target.value)}
                            mask="99.999.999/9999-99"
                            required
                        />
                    </div>
                    {/* Inscrição Estadual */}
                    <div className="md:col-span-2">
                        <label
                            htmlFor="estadual"
                            className="font-semibold text-Zinc-800"
                        >
                            Inscrição Estadual
                        </label>
                        <input
                            name="estadual"
                            id="estadual"
                            type="number"
                            className="h-10 mt-1 px-4 w-full bg-gray-50 bg-white border hover:border-sky-300 shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1"
                            value={estadualField}
                            onChange={(e) => setEstadualField(e.target.value)}
                            required
                        />
                    </div>
                     {/* Comprador */}
                     <div className="md:col-span-4">
                        <label
                            htmlFor="comprador"
                            className="font-semibold text-Zinc-800"
                        >
                            Comprador
                        </label>
                        <input
                            type="text"
                            name="comprador"
                            id="comprador"
                            className="h-10 mt-1 px-4 w-full bg-gray-50 bg-white border hover:border-sky-300 shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1"
                            value={compradorField}
                            onChange={(e) => setCompradorField(e.target.value)}
                            required
                        />
                    </div>
                    {/* Email */}
                    <div className="md:col-span-2">
                        <label
                            htmlFor="email"
                            className="font-semibold text-Zinc-800"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="h-10 mt-1 px-4 w-full bg-gray-50 bg-white border hover:border-sky-300 shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1"
                            value={emailField}
                            placeholder="email@domain.com"
                            onChange={(e) => setEmailField(e.target.value)}
                            required
                        />
                    </div>
                    {/* Telefone */}
                    <div className="md:col-span-2">
                        <label
                            htmlFor="telefone"
                            className="font-semibold text-Zinc-800"
                        >
                            Telefone
                        </label>
                        <InputMask
                            name="telefone"
                            id="telefone"
                            className="h-10 mt-1 px-4 w-full bg-gray-50 bg-white border hover:border-sky-300 shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1"
                            value={telefoneField}
                            onChange={(e) => setTelefoneField(e.target.value)}
                            mask="(99) 9999-9999"
                            required
                        />
                    </div>
                    {/* Endereço */}
                    <div className="md:col-span-4">
                        <label
                            htmlFor="endereco"
                            className="font-semibold text-Zinc-800"
                        >
                            Endereço
                        </label>
                        <input
                            type="text"
                            name="endereco"
                            id="endereco"
                            className="h-10 mt-1 px-4 w-full bg-gray-50 bg-white border hover:border-sky-300 shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1"
                            value={enderecoField}
                            onChange={(e) => setEnderecoField(e.target.value)}
                            required
                        />
                    </div>
                    {/* Região */}
                    <div className="md:col-span-2">
                        <label
                            htmlFor="regiao"
                            className="font-semibold text-Zinc-800"
                        >
                            Seleciona uma Região
                        </label>
                        <select
                            id="regiao"
                            name="regiao"
                            value={regiaoField.id}
                            className="h-10 mt-1 px-4 w-full bg-white border shadow-sm border-slate-300 hover:border-sky-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1"
                            onChange={(e) => handleRegiaoSelect(e.target.value)}
                            required
                        >
                            {regioes.map((i, k) => (
                                <option key={k} value={i.id}>
                                    {i.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* Cidade */}
                    <div className="md:col-span-2">
                        <label
                            htmlFor="cidade"
                            className="font-semibold text-Zinc-800"
                        >
                            Seleciona uma Cidade
                        </label>
                        <select
                            /*  ref={refSelectCidade} */
                            id="cidade"
                            name="cidade"
                            value={cidadeField.id}
                            className="h-10 mt-1 px-4 w-full bg-white border shadow-sm border-slate-300 hover:border-sky-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1"
                            onChange={(e) => handleCidadeSelect(e.target.value)}
                            required
                        >
                            <option></option>
                            {cidades ? (
                                cidades.map((i, k) => (
                                    <option key={k} value={i.id}>
                                        {i.nome}
                                    </option>
                                ))
                            ) : (
                                <option></option>
                            )}
                        </select>
                    </div>
                    {/* Representadas */}
                    <div className="md:col-span-5">
                        <h3 className="font-semibold text-Zinc-800">
                            Representadas
                        </h3>
                        <ul className="items-center w-full text-sm text-Zinc-800 bg-white border border-gray-200 rounded-lg sm:flex flex-wrap">
                            {representadas ? (
                                representadas.map((i, k) => {
                                    return (
                                        <li
                                            className=" border-b border-gray-200 sm:border-b-0"
                                            key={k}
                                        >
                                            <div className="flex items-center ps-3">
                                                <input
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                                    id={i.id}
                                                    type="checkbox"
                                                    value={i.id}
                                                    checked={checkedState[k]}
                                                    onChange={() =>
                                                        handleRepresentadaSelecet(
                                                            k
                                                        )
                                                    }
                                                />
                                                <label
                                                    htmlFor={i.id}
                                                    className="w-full py-3 ms-2 text-sm text-Zinc-800"
                                                >
                                                    {i.nome}
                                                </label>
                                            </div>
                                        </li>
                                    );
                                })
                            ) : (
                                <li></li>
                            )}
                        </ul>
                    </div>
                </div>
            </form>
        </Dialog>
    );
};

export default DialogCliente;
