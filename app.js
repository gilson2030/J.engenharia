// Armazena os itens do orçamento
let itens = [];

// Modal para adicionar item
function abrirModalItem() {
    document.getElementById('modal-item').style.display = 'block';
}
function fecharModalItem() {
    document.getElementById('modal-item').style.display = 'none';
    document.getElementById('item-produto').value = '';
    document.getElementById('item-qtd').value = 1;
    document.getElementById('item-valor').value = '';
}

// Adiciona um item à lista
function adicionarItem() {
    const produto = document.getElementById('item-produto').value.trim();
    const qtd = parseInt(document.getElementById('item-qtd').value);
    const valor = parseFloat(document.getElementById('item-valor').value);

    if(produto && qtd > 0 && valor > 0) {
        itens.push({ produto, qtd, valor });
        atualizarTabelaItens();
        fecharModalItem();
    } else {
        alert("Preencha todos os campos do item corretamente!");
    }
}

// Remove item pelo índice
function removerItem(index) {
    itens.splice(index, 1);
    atualizarTabelaItens();
}

// Atualiza a tabela de itens e valor total
function atualizarTabelaItens() {
    const tabela = document.getElementById('tabela-itens');
    tabela.innerHTML = '';
    let total = 0;

    itens.forEach((item, i) => {
        let linha = `<tr>
            <td>-</td>
            <td>${i + 1}</td>
            <td>${item.produto}</td>
            <td>${item.qtd}</td>
            <td>R$ ${item.valor.toFixed(2)}</td>
            <td>R$ ${(item.valor * item.qtd).toFixed(2)}</td>
            <td><button type="button" onclick="removerItem(${i})" style="background:#c20000;">Excluir</button></td>
        </tr>`;
        tabela.innerHTML += linha;
        total += item.valor * item.qtd;
    });

    // Atualiza o valor total no campo resumo
    document.getElementById('valor-total').value = total.toFixed(2);
}

// Fecha o modal ao clicar fora do conteúdo
window.onclick = function(event) {
    const modal = document.getElementById('modal-item');
    if (event.target === modal) {
        fecharModalItem();
    }
};

// Atualização automática do valor total se editar itens direto no JS
document.addEventListener('DOMContentLoaded', () => {
    atualizarTabelaItens();

    // Ajusta valor total caso tente digitar manualmente (só para manter interface amigável)
    document.getElementById('valor-total').addEventListener('input', function(e) {
        // Não deixa o usuário editar manualmente
        e.target.value = itens.reduce((acc, it) => acc + it.qtd * it.valor, 0).toFixed(2);
    });
});

// (Opcional) Futuro: Salvar no firebase ao clicar em "Salvar Orçamento"
// document.getElementById('form-orcamento').addEventListener('submit', (e) => {
//     e.preventDefault();
//     // Coletar todos os dados do formulário e dos itens
//     // Salvar no Firebase
// });

