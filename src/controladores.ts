import express, { Request, Response } from 'express'
import bancoDeDados from '../bancoDeDados'
import { v4 as uuidv4 } from 'uuid';


export const darBoasVindas = (req: Request, res: Response) => {
    return res.send('API de exames de direção')
}

export const criarExame = (req: Request, res: Response) => {
    const { 
    examinador, 
    candidato, 
    quantidade_eliminatorias, 
    quantidade_graves, 
    quantidade_medias, 
    quantidade_leves } = req.body;

    const novoExame = {
    id: uuidv4(),
    examinador,
    candidato,
    quantidade_eliminatorias,
    quantidade_graves,
    quantidade_medias,
    quantidade_leves
    };

    return res.status(201).json(novoExame);
}

export const listarExames = (req: Request, res: Response) => {
    const { aprovado } = req.query

    if (aprovado) {
        const aprovados: boolean = aprovado === "true"
        const examesAprovados = bancoDeDados.exames.filter((resultado) =>
        resultado.aprovado === aprovados
        )
        return res.status(200).json(examesAprovados)
    }
    return res.status(200).json(bancoDeDados.exames)
}

export const editarExame = (req: Request, res: Response) => {
    const { id } = req.params

    const { 
        examinador, 
        candidato, 
        quantidade_eliminatorias, 
        quantidade_graves, 
        quantidade_medias, 
        quantidade_leves } = req.body

    const exameExiste = bancoDeDados.exames.find((exame) =>
    exame.id === id
    )
    if (!exameExiste) {
        return res.status(404).json({
        "mensagem": "Não existe nenhum exame"
        })
    }

    exameExiste.examinador = examinador
    exameExiste.candidato = candidato
    exameExiste.quantidadeEliminatorias = quantidade_eliminatorias
    exameExiste.quantidadeGraves = quantidade_graves
    exameExiste.quantidadeLeves = quantidade_leves
    exameExiste.quantidadeMedias = quantidade_medias

    let situacao = true

    if (quantidade_eliminatorias > 0) {
        return false
    }

    const percaPontuacao =
    quantidade_graves * 3 + quantidade_medias * 2 + quantidade_leves * 1

    if (percaPontuacao > 3) {
        return false
    }

    exameExiste.aprovado = situacao

    return res.status(204).json()
}

export const deletarExame = (req: Request, res: Response) => {
    const { id } = req.params

    const exameEncontrado = bancoDeDados.exames.find((exame) => {
        return exame.id === id
    })

    if (!exameEncontrado) {
        return res.status(404).json({"mensagem": "O exame não foi encontrado"})
    }

    const indiceExame = bancoDeDados.exames.indexOf((exameEncontrado))

    bancoDeDados.exames.splice(indiceExame, 1)

    return res.status(204).json()
}
