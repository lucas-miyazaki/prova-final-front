const url_server = "http://localhost:3000";

function validarCampos() {
    const campos = ['tipo', 'marca', 'categoria', 'combustivel', 'placa', 'cor', 'quantEixos', 'altura', 'peso'];

    for (const campo of campos) {
        const valorCampo = document.querySelector(`[name="${campo}"]`).value.trim();
        if (valorCampo === '') {
            alert(`Campo "${campo}" não pode ficar em branco. Preencha todos os campos.`);
            return false;
        }
    }

    return true;
}

function cadastrar() {

    if (!validarCampos()) {
        return;
    }



    console.log('Enviando dados ao servidor...');

    const dados = {
        tipo: document.querySelector('[name="tipo"]').value,
        marca: document.querySelector('[name="marca"]').value,
        categoria: document.querySelector('[name="categoria"]').value,
        combustivel: document.querySelector('[name="combustivel"]').value,
        placa: document.querySelector('[name="placa"]').value,
        cor: document.querySelector('[name="cor"]').value,
        quantEixos: document.querySelector('[name="quantEixos"]').value,
        altura: document.querySelector('[name="altura"]').value,
        peso: document.querySelector('[name="peso"]').value,
    };

    switch (dados.categoria) {
        case '1': dados.categoria = 'Oficial'; break;
        case '2': dados.categoria = 'De representação diplomática'; break;
        case '3': dados.categoria = 'Próprio'; break;
        case '4': dados.categoria = 'Alugado'; break;
        case '5': dados.categoria = 'Particular'; break;
        case '6': dados.categoria = 'De aprendizagem'; break;
        default: dados.categoria = 'Inválido'; break;
    }

    switch (dados.combustivel) {
        case '1': dados.combustivel = 'Gasolina'; break;
        case '2': dados.combustivel = 'Etanol'; break;
        case '3': dados.combustivel = 'Diesel'; break;
        case '4': dados.combustivel = 'Elétrico'; break;
        default: dados.combustivel = 'Inválido'; break;
    }

    fetch(`${url_server}/cadastro`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
        .then(response => response.json())
        .then(resposta => {
            console.log('Resposta do servidor:', resposta);
        })
        .catch(error => {
            console.error('Erro ao enviar dados para o servidor:', error);
        });
}

function listarVeiculo() {
    fetch(`${url_server}/veiculo`)
        .then(response => response.json())
        .then(data => {
            const tabela = document.querySelector('table');
            const contadorLinhas = tabela.rows.length;
            for (var i = contadorLinhas - 1; i > 0; i--) {
                tabela.deleteRow(i);
            }

            data.forEach(veiculo => {
                const elementTr = document.createElement('tr');
                const tdTipo = document.createElement('td');
                const tdMarca = document.createElement('td');
                const tdCategoria = document.createElement('td');
                const tdCombustivel = document.createElement('td');
                const tdPlaca = document.createElement('td');
                const tdCor = document.createElement('td');
                const tdQuantEixos = document.createElement('td');
                const tdAltura = document.createElement('td');
                const tdPeso = document.createElement('td');

                tdTipo.textContent = veiculo.tipo;
                tdMarca.textContent = veiculo.marca;
                tdCategoria.textContent = veiculo.categoria;
                tdCombustivel.textContent = veiculo.combustivel;
                tdPlaca.textContent = veiculo.placa;
                tdCor.textContent = veiculo.cor;
                tdQuantEixos.textContent = veiculo.quantEixos;
                tdAltura.textContent = veiculo.altura;
                tdPeso.textContent = veiculo.peso;

                elementTr.appendChild(tdTipo);
                elementTr.appendChild(tdMarca);
                elementTr.appendChild(tdCategoria);
                elementTr.appendChild(tdCombustivel);
                elementTr.appendChild(tdPlaca);
                elementTr.appendChild(tdCor);
                elementTr.appendChild(tdQuantEixos);
                elementTr.appendChild(tdAltura);
                elementTr.appendChild(tdPeso);

                tabela.appendChild(elementTr);
            });
        });
}
