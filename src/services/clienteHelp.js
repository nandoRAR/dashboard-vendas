import moment from "moment";

export const diferenceInDays = (date) => {
    if (!date) return 9999;
    const newDate = date.toDate();
    const today = new Date();
    const Difference_In_Time = newDate.getTime() - today.getTime();
    const dias = Math.abs(Math.round(Difference_In_Time / (1000 * 3600 * 24)));
    return dias;
};

export const listRepresentadas = (representadas) => {
    const representadasString = representadas.map((item) => item.nome);
    return representadasString.join(", ");
};

export const maxDateVisita = (visitas) => {
    const maxDate = visitas.reduce((max, item) => {
        if (item.dataVisita) {
            const date = item.dataVisita;
            if (max) max = date > max ? date : max;
            else max = date;
        }

        return max;
    }, null);
    return maxDate;
};

export const betweenDate = (mes, visitas) => {
    const result = visitas.filter((o) =>
        moment(o.dataVisita).isBetween(
            moment().subtract(mes, "months"),
            moment(),
            "[]"
        )
    );
    return result;
};

export const datasetsBar = (visitaData) => {
    const [backgroundColorSchema, borderColorSchema] = colorSchema();
    const VisitaByRepData = visitaData.map((data) => ({
        nome: data.representada.nome,
        valor: data.valor,
        date: new Date(data.dataVisita).getMonth(),
    }));
    let month = [];
    const monthName = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
    ];
    let label = [];
    for (let i = 11; i >= 0; i--) {
        let x = new Date().getMonth() - i;
        if (x < 0) x = x + 12;
        month.push(x);
        label.push(monthName[x]);
    }
    const visitagroupBy = Object.groupBy(VisitaByRepData, ({ nome }) => nome);
    let dados = [];
    Object.keys(visitagroupBy).forEach((obj, i) => {
        let y = month.map((item) => {
            let x = visitagroupBy[obj].filter((f) => {
                return f.date === item;
            });
            if (x) {
                return x.reduce((accumulator, object) => {
                    return accumulator + object.valor;
                }, 0);
            }
            return 0;
        });
        dados.push({
            type: 'bar',
            label: obj,
            backgroundColor:borderColorSchema[i],
            data: y,
        });
    });  
    return [label, dados];
};

export const countItems = (arr) => {
    const countMap = Object.create(null);
    for (const element of arr) {
        // Basicamente, estamos dizendo: atribua à `countMap[element]` o valor
        // atual (ou zero, caso não existir) somado ao número 1.
        countMap[element] = (countMap[element] || 0) + 1;
    }
    return countMap;
};

export const colorSchema = () => {
    const backgroundColorSchema = [
        "rgba(255, 195, 18, 0.6)",
        "rgba(96, 80, 220, 0.6)",
        "rgba(213, 45, 183, 0.6)",
        "rgba(255, 107, 69, 0.6)",
        "rgba(147, 240, 59, 0.6)",
        "rgba(60, 157, 78, 0.6)",
        "rgba(65, 116, 201, 0.6)",
        "rgba(0, 63, 92, 0.6)",
        "rgba(255, 0, 254, 0.6)",
        "rgba(41, 0, 165, 0.6)",
        "rgba(246, 227, 132, 0.6)",
        "rgba(0, 167, 250, 0.6)",
        "rgba(102, 4, 4, 0.6)",
    ];
    const borderColorSchema = [
        "rgb(255, 195, 18)",
        "rgb(96, 80, 220)",
        "rgb(213, 45, 183)",
        "rgb(255, 107, 69)",
        "rgb(147, 240, 59)",
        "rgb(60, 157, 78)",
        "rgb(65, 116, 201)",
        "rgb(0, 63, 92)",
        "rgb(255, 0, 254)",
        "rgb(41, 0, 165)",
        "rgb(246, 227, 132)",
        "rgb(0, 167, 250)",
        "rgb(102, 4, 4)",
    ];

    return [backgroundColorSchema, borderColorSchema];
};
