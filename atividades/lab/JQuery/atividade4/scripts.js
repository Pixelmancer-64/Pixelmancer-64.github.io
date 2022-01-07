$(function(){
    
    $("#buscaEndereco").click(function(){
        var url = "https://viacep.com.br/ws/";
        var cep = $("#cep").val()
        url += cep + "/json/";
        $.get(url, function(data, status){
            //programa para carregar o endereço na página;
            console.log(data)
            console.log(status)
            
            $(".endereco-logradouro").text(data.logradouro);
            $(".endereco-bairro").text(data.bairro);
            $(".endereco-cidade").text(data.localidade);
            $(".endereco-estado").text(data.uf);

            
        })
    })
    
});