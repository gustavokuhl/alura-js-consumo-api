async function buscaEndereco(cep) {
    const divErro = document.getElementById('erro')
    divErro.innerHTML = ""

    try {
        const consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        const resultadoCep = await consultaCep.json()
        if (resultadoCep.erro) {
            throw "CEP incorreto!"
        }

        var campoCidade = document.getElementById('cidade')
        var campoLogradouro = document.getElementById('endereco')
        var campoEstado = document.getElementById('estado')

        campoCidade.value = resultadoCep.localidade
        campoLogradouro.value = resultadoCep.logradouro
        campoEstado.value = resultadoCep.uf

        return resultadoCep
    } catch (erro) {    
        divErro.innerHTML = `<p>CEP inválido. Tente novamente!</p>`
        console.log(erro)
    }
}

const campoCep = document.getElementById('cep')
campoCep.addEventListener('focusout', () => buscaEndereco(campoCep.value))