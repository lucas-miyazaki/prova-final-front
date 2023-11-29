const url_server = "http://localhost:3000";

function cadastrar() {
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

    }

    fetch(`${url_server}/cadastro`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
        .then(response => response.json())
        .then(dados => {
            console.log('Resposta do servidor:', dados);
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
