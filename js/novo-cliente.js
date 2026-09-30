document.addEventListener("DOMContentLoaded", function () {
    const tipoCliente = document.getElementById("tipoCliente");
    const labelDocumento = document.getElementById("labelDocumento");
    const documento = document.getElementById("documento");
    const btnSalvar = document.getElementById("btnSalvarCliente");

    if (tipoCliente && labelDocumento && documento) {
        tipoCliente.addEventListener("change", function () {
            documento.value = "";
            if (this.value === "pj") {
                labelDocumento.textContent = "CNPJ";
                documento.placeholder = "00.000.000/0000-00";
                documento.maxLength = 18;
            } else {
                labelDocumento.textContent = "CPF";
                documento.placeholder = "000.000.000-00";
                documento.maxLength = 14;
            }
        });
    }

    if (!btnSalvar) return;

    btnSalvar.addEventListener("click", function () {
        let valido = true;

        document.querySelectorAll("[required]").forEach(function (campo) {
            if (!campo.value.trim()) {
                campo.classList.add("campo-erro");
                valido = false;
            } else {
                campo.classList.remove("campo-erro");
            }
        });

        if (!valido) {
            alert("Preencha todos os campos obrigatórios.");
            return;
        }

        const clientes = JSON.parse(localStorage.getItem("clientes")) || [];
        const codigo = gerarCodigoCliente();

        const cliente = {
            codigo: codigo,
            tipoCliente: document.getElementById("tipoCliente")?.value || "",
            nome: document.getElementById("nome")?.value.trim() || "",
            documento: document.getElementById("documento")?.value.trim() || "",
            telefone: document.getElementById("telefone")?.value.trim() || "",
            email: document.getElementById("email")?.value.trim() || "",
            endereco: {
                cep: document.getElementById("cep")?.value.trim() || "",
                estado: document.getElementById("estado")?.value.trim() || "",
                cidade: document.getElementById("cidade")?.value.trim() || "",
                bairro: document.getElementById("bairro")?.value.trim() || "",
                logradouro: document.getElementById("logradouro")?.value.trim() || "",
                numero: document.getElementById("numero")?.value.trim() || "",
                complemento: document.getElementById("complemento")?.value.trim() || ""
            },
            observacoes: document.getElementById("observacoes")?.value.trim() || "",
            criadoEm: new Date().toISOString()
        };

        clientes.push(cliente);
        localStorage.setItem("clientes", JSON.stringify(clientes));

        alert("Cliente cadastrado com sucesso!\n\nCódigo do cliente: " + codigo);
        window.location.href = "clientes.html";
    });
});

function gerarCodigoCliente() {
    const clientes = JSON.parse(localStorage.getItem("clientes")) || [];
    let maiorNumero = 0;

    clientes.forEach(function (cliente) {
        const numero = parseInt(String(cliente.codigo || "").replace("CLI-", ""), 10);
        if (!isNaN(numero) && numero > maiorNumero) maiorNumero = numero;
    });

    return "CLI-" + String(maiorNumero + 1).padStart(4, "0");
}
