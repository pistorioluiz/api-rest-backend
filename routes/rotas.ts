import { Router } from "express";
import { criarExame, darBoasVindas, deletarExame, editarExame, listarExames } from "../src/controladores";
import { validarCampoMensagem } from "../src/intermediarios";

const rotas = Router()

rotas.get('/', darBoasVindas)

// cadastrar o resultado de um exame
rotas.post('/exames', validarCampoMensagem, criarExame )

// listar os resultados dos exames
// filtrar os resultados pela sua situação (reprovado ou aprovado)
rotas.get('/exames', listarExames)

// editar o resultado de um exame
rotas.put('/exames/:id', editarExame)

// excluir o resultado de um exame
rotas.delete('/exames/:id', deletarExame)

export default rotas
