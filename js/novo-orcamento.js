document.addEventListener("DOMContentLoaded", function () {

    const tipoCliente = document.getElementById("tipoCliente");
    const labelDocumento = document.getElementById("labelDocumento");
    const documento = document.getElementById("documento");


    tipoCliente.addEventListener("change", function () {

        if (this.value === "pj") {

            labelDocumento.textContent = "CNPJ";

            documento.placeholder = "00.000.000/0000-00";

            documento.maxLength = 18;

        } else {

            labelDocumento.textContent = "CPF";

            documento.placeholder = "000.000.000-00";

            documento.maxLength = 14;

        }

        documento.value = "";

    });


    const btnSalvar =
        document.getElementById("btnSalvarOrcamento");


    btnSalvar.addEventListener("click", function () {

        const camposObrigatorios =
            document.querySelectorAll("[required]");

        let formularioValido = true;


        camposObrigatorios.forEach(function (campo) {

            if (campo.value.trim() === "") {

                campo.style.borderColor =
                    "rgb(236, 78, 78)";

                formularioValido = false;

            } else {

                campo.style.borderColor =
                    "#dcdfe3";

            }

        });


        if (!formularioValido) {

            alert(
                "Preencha todos os campos obrigatórios."
            );

            return;
        }


        alert(
            "Orçamento cadastrado com sucesso!"
        );


        window.location.href =
            "orcamentos.html";

    });

});