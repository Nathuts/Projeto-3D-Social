$(document).ready(function() {

    function limpa_formulário_cep() {
        // Limpa valores do formulário de cep.
        $(".valida-rua").val("");
        $(".valida-bairro").val("");
        $(".valida-cidade").val("");
        $(".valida-uf").val("");
        $(".valida-cep").val("");
    }
    
    //Quando o campo cep perde o foco.
    $(".valida-cep").blur(function() {

        //Nova variável "cep" somente com dígitos.
        var cep = $(this).val().replace(/\D/g, '');

        //Verifica se campo cep possui valor informado.
        if (cep != "") {

            //Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;

            //Valida o formato do CEP.
            if(validacep.test(cep)) {

                //Preenche os campos com "..." enquanto consulta webservice.
                $(".valida-rua").val("...")
                $(".valida-bairro").val("...")
                $(".valida-cidade").val("...")
                $(".valida-uf").val("...")

                //Consulta o webservice viacep.com.br/
                $.getJSON("https://viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {

                    if (!("erro" in dados)) {
                        //Atualiza os campos com os valores da consulta.
                        $(".valida-rua").val(dados.logradouro);
                        $(".valida-bairro").val(dados.bairro);
                        $(".valida-cidade").val(dados.localidade);
                        $(".valida-uf").val(dados.uf);
                    } //end if.
                    else {
                        //CEP pesquisado não foi encontrado.
                        limpa_formulário_cep();
                        $(".valida-cep").focus();
                        swal("CEP não encontrado.");
                    }
                });
            } //end if.
            else {
                //cep é inválido.
                limpa_formulário_cep();
                $(".valida-cep").focus();
                swal("Formato de CEP inválido.");
            }
        } //end if.
        else {
            //cep sem valor, limpa formulário.
            limpa_formulário_cep();
        }
    });
});