$(document).ready(function() {

    function clearForm() {
        // CEP Clear.
        $(".valida-rua").val("");
        $(".valida-bairro").val("");
        $(".valida-cidade").val("");
        $(".valida-uf").val("");
        $(".valida-cep").val("");
    }
    
    //CEP Blur.
    $(".valida-cep").blur(function() {

        var cep = $(this).val().replace(/\D/g, '');

        if (cep != "") {
            var validacep = /^[0-9]{8}$/;

            if(validacep.test(cep)) {
                $(".valida-rua").val("...")
                $(".valida-bairro").val("...")
                $(".valida-cidade").val("...")
                $(".valida-uf").val("...")
                //Webservice viacep.com.br/
                $.getJSON("https://viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {
                    if (!("erro" in dados)) {
                        $(".valida-rua").val(dados.logradouro);
                        $(".valida-bairro").val(dados.bairro);
                        $(".valida-cidade").val(dados.localidade);
                        $(".valida-uf").val(dados.uf);
                    } 
                    else {
                        clearForm();
                        $(".valida-cep").focus();
                        swal("CEP não encontrado.");
                    }
                });
            } 

            else {
                clearForm();
                $(".valida-cep").focus();
                swal("CEP inválido.");
            }
        } 
        
        else {
            clearForm();
        }
    });
});