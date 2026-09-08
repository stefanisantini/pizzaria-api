// import chalk from 'chalk';
// import { mensagem } from './aula.js';

// import { pedirPizzas } from './fazerPizza.js';


// mensagem('Sté')

// console.log(chalk.red('Hello world!'));

// pizzas.forEach(element => {
//     console.log(`${element.id}- ${element.sabor} = ${chalk.red(element.preco)})`)
// });

// pedirPizzas()

import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// import authRoutes from './routes/authRoutes.js';
// import clienteRoutes from './routes/cliente.Routes.js';
// import produtoRoutes from './routes/produtoRoutes.js';
// import pedidoRoutes from './routes/pedidoRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const corsOption = {
    origin: ['http://localhost:3333', 'https://meudominio.com'],
    methods: 'GET, POST, PUT, PACTH, DELETE',
    credential: true,
};

 const app= express();

 app.use(helmet());
 app.use(cors(corsOption));
 app.use(morgan('dev'));
 app.use(express.json());

 app.use(express.static(path.join(__dirname,'..','public')));

 app.get('/', (req, res) => {
    res. sendFile(path.join(__dirname,'..', 'pages', 'home.html'));
 });

 const apiPrefix= '/api';

//  app.use(`${apiPrefix}/cliente`, clienteRoutes);
//  app.use(`${apiPrefix}/login`, authRoutes);
//  app.use(`${apiPrefix}/produto`, produtoRoutes);
//  app.use(`${apiPrefix}/pedidos`, pedidoRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo deu errado no servidor');
});

const PORTA = process.env.PORT
app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}`)
})





// app.use(express.json())
// app.get('/', (req, rest) => {
//     rest.json({message:"Bem-vindo à API da Pizzaria do Senac!"});
// })
// app.get('/pizzas', (req, res) => {
//     res.json(pizzas);
// })

// app.get('/pizzas/:id', (req, res) => {
//     const id= parseInt(req.params.id);
//     const pizza= pizzas.find(p => p.id === id);

//     if(!pizza){
//         return res.status(404).json({error: 'Pizza não ENCONTRADA'});
//     }
//     res.json(pizza);
// });

;


