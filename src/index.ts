import 'dotenv/config'
import express, { Application, Request, Response } from 'express'
import rotas from '../routes/rotas'

export const app: Application = express()

app.use(express.json())

app.use(rotas)

app.listen(process.env.PORT, () => console.log('API rodando'))
