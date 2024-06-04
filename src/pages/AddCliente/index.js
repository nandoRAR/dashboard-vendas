import { useState, useEffect, useRef } from "react";
import { api } from "../../services/api";
import { InputMask } from "primereact/inputmask";
//import { capitalizeLetter } from "../../services/capitalizeLetter";

const AddClient = () => {
    const [checkedState, setCheckedState] = useState([]);
    const [regioes, setRegioes] = useState([]);
    const [cidades, setCidades] = useState([]);
    const [representadas, setRepresentadas] = useState([]);
    const [regiaoField, setRegiaoField] = useState({});
    const [cidadeField, setCidadeField] = useState({});
    const [representadaField, setRepresentadaField] = useState([]);
    const [razaolField, setRazaoField] = useState("");
    const [fantasiaField, setFantasiaField] = useState("");
    const [cnpjField, setCnpjField] = useState("");
    const [emailField, setEmailField] = useState("");
    const [telefoneField, setTelefoneField] = useState("");
    const [enderecoField, setEnderecoField] = useState("");
    const [compradorField, setCompradorField] = useState("");
    const [estadualField, setEstadualField] = useState("");

    const refSelectCidade = useRef(null);
    const refSelectRegiao = useRef(null);

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
        } else {
            setCidades([]);
        }
        refSelectCidade.current.selectedIndex = "0";
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

    const handleAddCliente = async (e) => {
        e.preventDefault();
        let cliente = {
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
        const result = await api.addCliente(cliente);
        if (!result) {
            alert("Cadastrado com Sucesso");
            setCidadeField([]);
            setFantasiaField("");
            setRazaoField("");
            setRegiaoField({});
            setCnpjField("");
            setTelefoneField("");
            setEmailField("");
            setRepresentadaField([]);
            setEnderecoField("");
            setEstadualField("");
            setCompradorField("");
            setCheckedState(new Array(representadas.length).fill(false));
            refSelectCidade.current.selectedIndex = "0";
            refSelectRegiao.current.selectedIndex = "0";
        } else {
            alert("Erro ao cadastrar");
        }
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
            const representada = await api.getRepresentadas();
            setRepresentadas(representada);
            setCheckedState(new Array(representada.length).fill(false));
        };
        getRepresentadas();
    }, []);

    return (
        <div className="min-h-screen lg:p-20 pt-32 lg:mt-10 bg-gray-200 flex items-center justify-center">
            <div className="container max-w-screen-lg mx-auto">
                <div>
                    <h2 className="font-bold text-2xl text-black-600">
                        Cadastro de Cliente
                    </h2>
                    <p className="text-gray-500 mb-6">
                        Preencha todas as informações abaixo.
                    </p>

                    <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                            <div className="lg:col-span-2">
                                <form onSubmit={handleAddCliente}>
                                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                        {/* Razão Social */}
                                        <div className="md:col-span-5">
                                            <label
                                                htmlFor="razao_social"
                                                className="font-semibold text-gray-900"
                                            >
                                                Razão social
                                            </label>
                                            <input
                                                type="text"
                                                name="razao_social"
                                                id="razao_social"
                                                className="h-10 mt-1 px-4 w-full bg-gray-50 bg-white border hover:border-sky-300 shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1"
                                                value={razaolField}
                                                onChange={(e) =>
                                                    setRazaoField(
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            />
                                        </div>
                                        {/* Fantasia */}
                                        <div className="md:col-span-5">
                                            <label
                                                htmlFor="fantasia"
                                                className="font-semibold text-gray-900"
                                            >
                                                Fantasia
                                            </label>
                                            <input
                                                type="text"
                                                name="fantasia"
                                                id="fantasia"
                                                className="h-10 mt-1 px-4 w-full bg-gray-50 bg-white border hover:border-sky-300 shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1"
                                                value={fantasiaField}
                                                onChange={(e) =>
                                                    setFantasiaField(
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            />
                                        </div>
                                        {/* CNPJ */}
                                        <div className="md:col-span-3">
                                            <label
                                                htmlFor="cnpj"
                                                className="font-semibold text-gray-900"
                                            >
                                                CNPJ
                                            </label>
                                            <InputMask
                                                name="cnpj"
                                                id="cnpj"
                                                className="h-10 mt-1 px-4 w-full bg-gray-50 bg-white border hover:border-sky-300 shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1"
                                                value={cnpjField}
                                                onChange={(e) =>
                                                    setCnpjField(e.target.value)
                                                }
                                                mask="99.999.999/9999-99"
                                                required
                                            />
                                        </div>
                                        {/* Inscrição Estadual */}
                                        <div className="md:col-span-2">
                                            <label
                                                htmlFor="estadual"
                                                className="font-semibold text-gray-900"
                                            >
                                                Inscrição Estadual
                                            </label>
                                            <input
                                                name="estadual"
                                                id="estadual"
                                                type="number"
                                                className="h-10 mt-1 px-4 w-full bg-gray-50 bg-white border hover:border-sky-300 shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1"
                                                value={estadualField}
                                                onChange={(e) =>
                                                    setEstadualField(e.target.value)
                                                }
        
                                                required
                                            />
                                        </div>
                                        {/* Comprador */}
                                        <div className="md:col-span-5">
                                            <label
                                                htmlFor="comprador"
                                                className="font-semibold text-gray-900"
                                            >
                                                Comprador
                                            </label>
                                            <input
                                                type="text"
                                                name="comprador"
                                                id="comprador"
                                                className="h-10 mt-1 px-4 w-full bg-gray-50 bg-white border hover:border-sky-300 shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1"
                                                value={compradorField}
                                                onChange={(e) =>
                                                    setCompradorField(
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            />
                                        </div>
                                        {/* Email */}
                                        <div className="md:col-span-3">
                                            <label
                                                htmlFor="email"
                                                className="font-semibold text-gray-900"
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
                                                onChange={(e) =>
                                                    setEmailField(
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            />
                                        </div>
                                        {/* Telefone */}
                                        <div className="md:col-span-2">
                                            <label
                                                htmlFor="telefone"
                                                className="font-semibold text-gray-900"
                                            >
                                                Telefone
                                            </label>
                                            <InputMask
                                                name="telefone"
                                                id="telefone"
                                                className="h-10 mt-1 px-4 w-full bg-gray-50 bg-white border hover:border-sky-300 shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1"
                                                value={telefoneField}
                                                onChange={(e) =>
                                                    setTelefoneField(
                                                        e.target.value
                                                    )
                                                }
                                                mask="(99) 9999-9999"
                                                required
                                            />
                                        </div>
                                        {/* Endereço */}
                                        <div className="md:col-span-5">
                                            <label
                                                htmlFor="endereco"
                                                className="font-semibold text-gray-900"
                                            >
                                                Endereço
                                            </label>
                                            <input
                                                type="text"
                                                name="endereco"
                                                id="endereco"
                                                className="h-10 mt-1 px-4 w-full bg-gray-50 bg-white border hover:border-sky-300 shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1"
                                                value={enderecoField}
                                                onChange={(e) =>
                                                    setEnderecoField(
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            />
                                        </div>
                                        {/* Região */}
                                        <div className="md:col-span-2">
                                            <label
                                                htmlFor="regiao"
                                                className="font-semibold text-gray-900"
                                            >
                                                Seleciona uma Regiâo
                                            </label>
                                            <select
                                                ref={refSelectRegiao}
                                                id="regiao"
                                                name="regiao"
                                                className="h-10 mt-1 px-4 w-full bg-white border shadow-sm border-slate-300 hover:border-sky-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1"
                                                onChange={(e) =>
                                                    handleRegiaoSelect(
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            >
                                                <option></option>
                                                {regioes.map((i, k) => (
                                                    <option
                                                        key={k}
                                                        value={i.id}
                                                    >
                                                        {i.nome}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        {/* Cidade */}
                                        <div className="md:col-span-3">
                                            <label
                                                htmlFor="cidade"
                                                className="font-semibold text-gray-900"
                                            >
                                                Seleciona uma Cidade
                                            </label>
                                            <select
                                                ref={refSelectCidade}
                                                id="cidade"
                                                name="cidade"
                                                className="h-10 mt-1 px-4 w-full bg-white border shadow-sm border-slate-300 hover:border-sky-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1"
                                                onChange={(e) => {
                                                    handleCidadeSelect(
                                                        e.target.value
                                                    );
                                                }}
                                                required
                                            >
                                                <option></option>
                                                {cidades ? (
                                                    cidades.map((i, k) => (
                                                        <option
                                                            key={k}
                                                            value={i.id}
                                                        >
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
                                            <h3 className="mb-4 font-semibold text-gray-900">
                                                Representadas
                                            </h3>
                                            <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex flex-wrap">
                                                {representadas ? (
                                                    representadas.map(
                                                        (i, k) => {
                                                            return (
                                                                <li
                                                                    className=" border-b border-gray-200 sm:border-b-0"
                                                                    key={k}
                                                                >
                                                                    <div className="flex items-center ps-3">
                                                                        <input
                                                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                                                            id={
                                                                                i.id
                                                                            }
                                                                            type="checkbox"
                                                                            value={
                                                                                i.id
                                                                            }
                                                                            checked={
                                                                                checkedState[
                                                                                    k
                                                                                ]
                                                                            }
                                                                            onChange={() =>
                                                                                handleRepresentadaSelecet(
                                                                                    k
                                                                                )
                                                                            }
                                                                        />
                                                                        <label
                                                                            htmlFor={
                                                                                i.id
                                                                            }
                                                                            className="w-full py-3 ms-2 text-sm font-medium text-gray-900"
                                                                        >
                                                                            {
                                                                                i.nome
                                                                            }
                                                                        </label>
                                                                    </div>
                                                                </li>
                                                            );
                                                        }
                                                    )
                                                ) : (
                                                    <li></li>
                                                )}
                                            </ul>
                                        </div>

                                        <div className="md:col-span-5 text-right">
                                            <div className="inline-flex items-end">
                                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                                    Cadastrar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddClient;
