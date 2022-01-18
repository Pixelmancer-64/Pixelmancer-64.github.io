class Livro {
	static listaLivros = [];
	static fahrenheit451 = [];

	constructor(titulo, descricao, genero, autor) {
		this.titulo = titulo;
		this.descricao = descricao;
		this.genero = genero;
		this.autor = autor;
	}

	// Esse if aqui é bem feio, mas como a quantidade não vai mudar então tudo bem
	static checkIfSame(aux) {
		if(aux.titulo == fahrenheit451[0] && aux.descricao == fahrenheit451[1] &&
			aux.genero == fahrenheit451[2] && aux.autor == fahrenheit451[3]) {
				return true;
		}
	}
}

function limpar(){
	$("#titulo").val("");
	$("#descricao").val("");
	$("#autores").val("");
	$("#estilo").val("");
}
		
$(function(){
	$("#adicionar").click(function(){
		var tituloLivro = $("#titulo").val();
		var autores = $("#autores").val();
		var estilo = $("#estilo").val();
		var descricao = $("#descricao").val();

		$("#acervo").append(
				$("<tr>")
					.append($("<td>").text(tituloLivro))
					.append($("<td>").text(autores))
					.append($("<td>").text(estilo))
					.append($("<td>").text(descricao))
					.append($("<td>")
						.append($("<a>")
								.attr("href", "#")
								.text("Apagar"))
					)
		)

		let book = new Livro(tituloLivro, autores, estilo, descricao);
		Livro.listaLivros.push(book)
		limpar()
	});

	$("#acervo").on("click", "a", function(){
		$(this).parents("tr").remove();
		Livro.fahrenheit451 = [];
		for(let i =0; i < $(this).parents("tr").find('td').length-1; i++){
			Livro.fahrenheit451.push($(this).parents("tr").find('td')[i].innerHTML);
		}

		let index = Livro.listaLivros.findIndex(Livro.checkIfSame)
		Livro.listaLivros.splice(index,1)
	})

	$("#excluir").click(limpar)

	$("#apagarAcervo").click(function(){
		Livro.listaLivros = [];
		$("#acervo").empty();
		$("#acervo")
			.append($("<tr>")
						.append($("<th>").text("Título"))
						.append($("<th>").text("Autores"))
						.append($("<th>").text("Estilo"))
						.append($("<th>").text("Descrição"))
					)
	})

	$("#enviar").click(function(){
		let url = "http://httpbin.org/post";
		console.log(Livro.listaLivros)
		$.post(url, Livro.listaLivros, function(data,status){
			console.log(data)
			alert("Data: " + data + "\nStatus: " + status);
		  }
		);
	})
});