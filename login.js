// =========================================================
// LOGIN DE ADMINISTRADOR - SABINO GESSO
// =========================================================

function validarEmail(email) {

    const regex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regex.test(email);

}


function mostrarErro(mensagem, campo = null) {

    alert(mensagem);

    if (campo) {
        campo.focus();
    }

}


function autenticar(event) {

    event.preventDefault();

    const campoEmail =
        document.getElementById("email");

    const campoSenha =
        document.getElementById("senha");

    const emailValor =
        campoEmail.value.trim();

    const senhaValor =
        campoSenha.value;


    // =====================================================
    // E-MAIL
    // =====================================================

    if (emailValor === "") {

        mostrarErro(
            "Por favor, informe o e-mail.",
            campoEmail
        );

        return;

    }

    if (!validarEmail(emailValor)) {

        mostrarErro(
            "Informe um e-mail válido.",
            campoEmail
        );

        return;

    }


    // =====================================================
    // SENHA
    // =====================================================

    if (senhaValor === "") {

        mostrarErro(
            "Por favor, informe a senha.",
            campoSenha
        );

        return;

    }


    // =====================================================
    // AUTENTICAÇÃO
    //
    // Aqui é só validação de formulário (campos preenchidos
    // corretamente). A checagem real de usuário/senha deve
    // acontecer no backend antes de liberar o acesso -
    // nunca confie apenas na validação do navegador.
    // =====================================================

    window.location.href = "painel.html";

}


document.addEventListener("DOMContentLoaded", function () {

    const formulario =
        document.getElementById("formLogin");

    if (formulario) {

        formulario.addEventListener("submit", autenticar);

    }

});