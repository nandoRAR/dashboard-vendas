import { app } from "./firebase";
import {
    getFirestore,
    getDocs,
    getDoc,
    deleteDoc ,
    collection,
    doc,
    addDoc,
    updateDoc,
    query,
    where
} from "firebase/firestore";

const db = getFirestore(app);

export const api = {
    //região
    getRegiao: async () => {
        try {
            const regiaoRef = collection(db, "regiao");
            const regiaoSnap = await getDocs(regiaoRef);
            let regiao = [];
            regiaoSnap.forEach((doc) => {
                regiao.push({
                    id: doc.id,
                    nome: doc.data().nome,
                    cidades: doc.data().cidades,
                });
            });
            return regiao;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    //cidade
    getCidades: async (regiao_id) => {
        try {
            const cidadeRef = doc(db, "regiao", regiao_id);
            const cidadeSnap = await getDoc(cidadeRef);
            if (cidadeSnap.exists()) {
                return cidadeSnap.data().cidades;
            } else {
                return null;
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    //representada
    getRepresentadas: async () => {
        try {
            const representadasRef = collection(db, "representadas");
            const representadasSnap = await getDocs(representadasRef);
            let representadas = [];
            representadasSnap.forEach((doc) => {
                representadas.push({
                    id: doc.id,
                    nome: doc.data().nome,
                });
            });
            return representadas;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    //cliente
    addCliente: async (cliente) => {
        try {
            const docRef = await addDoc(collection(db, "cliente"), cliente);
            console.log("Document written with ID: ", docRef.id);
        } catch (error) {
            console.log(error);
            return error;
        }
    },
    updateCliente: async (id, cliente) => {
        try {
            const docRef = doc(db, "cliente", id);
            await updateDoc(docRef, cliente);
        } catch (error) {
            console.log(error);
            return error;
        }
    },
    getAllClientes: async () => {
        try {
            const clienteRef = collection(db, "cliente");
            const clienteSnap = await getDocs(clienteRef);
            let clientes = [];
            clienteSnap.forEach((doc) => {
                clientes.push({
                    id: doc.id,
                    razao: doc.data().razao,
                    fantasia: doc.data().fantasia,
                    cnpj: doc.data().cnpj,
                    telefone: doc.data().telefone,
                    email: doc.data().email,
                    representadas: doc.data().representadas,
                    regiao: doc.data().regiao,
                    ultimaVisita: doc.data().visita,
                    endereco: doc.data().endereco,
                    comprador: doc.data().comprador,
                    estadual: doc.data().estadual
                });
            });
            return clientes;
        } catch (error) {
            console.log(error);
            return error;
        }
    },
    getClienteById: async (id) => {
        try {
            const clienteRef = doc(db, "cliente", id);
            const clienteSnap = await getDoc(clienteRef);
            if (clienteSnap.exists()) {
                return clienteSnap.data();
            } else {
                return null;
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    addVisitaCliente: async (id, visitaData) => {
        try {
            const docRef = doc(db, "cliente", id);
            await updateDoc(docRef, {visita: visitaData});
        } catch (error) {
            console.log(error);
            return error;
        }
    },
    //visita
    getAllVisitas: async () => {
        try {
            const visitaRef = collection(db, "visita");
            const visitaSnap = await getDocs(visitaRef);
            let visitas = [];
            visitaSnap.forEach((doc) => {
                visitas.push({
                    id: doc.id,
                    valor: doc.data().valor,
                    dataVisita: doc.data().dataVisita,
                    representada: doc.data().representada,
                    tipoVisita: doc.data().tipoVisita,
                    cliente_id: doc.data().cliente_id,
                });
            });
            return visitas;
        } catch (error) {
            console.log(error);
            return error;
        }
    },
    getVisitaByCliente: async (clienteId) => {
        try {
            const q = query(
                collection(db, "visita"),
                where("cliente_id", "==", clienteId)
            );
            const querySnapshot = await getDocs(q);
            let visitas = [];
            querySnapshot.forEach((doc) => {
                visitas.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            return visitas;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    addVisita: async (visita) => {
        try {
            const docRef = await addDoc(collection(db, "visita"), visita);
            return docRef.id;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    editVisita : async (id, visita) => {
        try {
            const docRef = doc(db, "visita", id);
            await updateDoc(docRef, visita);
        } catch (error) {
            console.log(error);
            return error;
        }
    },
    deletetVisita : async (id, ) => {
        try {
            const docRef = doc(db, "visita", id);
            await deleteDoc(docRef);
        } catch (error) {
            console.log(error);
            return error;
        }
    }
};
