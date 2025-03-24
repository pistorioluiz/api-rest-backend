import { NextFunction, Request, Response } from "express"
import bancoDeDados from "../bancoDeDados"

export const validarCampoMensagem = (req: Request, res: Response, next: NextFunction) => {

const { 
    examinador, 
    candidato, 
    quantidade_eliminatorias, 
    quantidade_graves, 
    quantidade_medias, 
    quantidade_leves } = req.body
    
    if (!examinador || !candidato || !quantidade_eliminatorias ||
        !quantidade_graves == undefined || !quantidade_medias == undefined || 
        !quantidade_leves == undefined) {
            return res.status(400).json({ "Mensagem": "Todos os campos são obrigatórios"})
        }
    next()
}
