// Simples armazenamento local temporário
let itens = [];

function abrirModalItem() {
    document.getElementById('modal-item').style.display = 'block';
}
function fecharModalItem() {
    document.getElementById('modal-item').style.display = 'none';
}

function adicionarItem() {
    const produto = document.getElementById('item-produto').value;
    const qtd = parseInt(document.getElementById('item-qtd').value);
    const valor = parseFloat(document.getElementById('item-valor').value);

    if(produto && qtd && valor) {
        itens.push({ produto, qtd, valor });
        atualizarTabelaItens();
        fecharModalItem();
        document.getElementById('item-produto').value = '';
        document.getElementById('item-qtd').value = 1;
        document.getElementById('item-valor').value = '';
    }
}

function atualizarTabelaItens() {
    const tabela = document.getElementById('tabela-itens');
    tabela.innerHTML = '';
    let total = 0;

    itens.forEach((item, i) => {
        let linha = `<tr>
            <td>-</td>
            <td>${i+1}</td>
            <td>${item.produto}</td>
            <td>${item.qtd}</td>
            <td>R$ ${item.valor.toFixed(2)}</td>
            <td>R$ ${(item.valor * item.qtd).toFixed(2)}</td>
        </tr>`;
        tabela.innerHTML += linha;
        total += item.valor * item.qtd;
    });

    document.getElementById('valor-total').textContent = total.toFixed(2);
}

// Dados fictícios de exemplo
window.onload = () => {
    document.getElementById('cliente-nome').textContent = 'CONSUMIDOR';
    document.getElementById('cliente-contato').textContent = '';
    document.getElementById('obra-endereco').textContent = 'A Definir';
    document.getElementById('obra-responsavel').textContent = 'JOILSON';
    document.getElementById('obra-telefone').textContent = '(65)98446-7919';
    document.getElementById('data-vencimento').textContent = '04/07/2025';
    document.getElementById('forma-pagamento').textContent = 'PIX';
    document.getElementById('periodo-locacao').textContent = '04/07/2025 até 03/08/2025';
    atualizarTabelaItens();
}

// PWA: Manifest e registro do service worker depois!
