import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import TableCliente from "../../components/Table/tableCliente";
import { api } from "../../services/api";
import { diferenceInDays, listRepresentadas } from "../../services/clienteHelp";

const Dasboard = () => {

  const [clienteList, setClienteList] = useState([]);

  const navigate = useNavigate();

  const handlePageCliente = (id) => {
    navigate(`/cliente/${id}`);
  };

  useEffect(() => {
    const getClientes = async () => {
      const clientes = await api.getAllClientes();
      clientes.map(
        (item) => (item.ultimaVisita = diferenceInDays(item.ultimaVisita))
      );
      clientes.map(
        (item) => (item.representadas = listRepresentadas(item.representadas))
      );
      setClienteList(clientes);
    };
    getClientes();
  }, []);

  return (
    <div className="min-h-screen lg:p-20 pt-32 lg:mt-10 bg-gray-200">
      <TableCliente clientes={clienteList} pageCliente={handlePageCliente} />
    </div>
  );
};

export default Dasboard;
