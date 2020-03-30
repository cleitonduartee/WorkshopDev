/**OBS: instalar o nodemon (npm i nodemon) e no package.js alterar o script 'Start'para iniciar com nodemon */


//usei o express para criar e configurar meu servidor

const express = require("express");
const server = express();

const ideas = [
    {
        img:"https://image.flaticon.com/icons/svg/2729/2729007.svg",
        title:"Cursos de Programação",
        category:"Estudo",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas",
        url:"http://rocketseat.com.br"
    },
    {
        img:"https://image.flaticon.com/icons/svg/2729/2729005.svg",
        title:"Exercícios",
        category:"Saude",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas",
        url:"http://rocketseat.com.br"
    },
    {
        img:"https://image.flaticon.com/icons/svg/2729/2729027.svg",
        title:"Meditação",
        category:"Mentalidade",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas",
        url:"http://rocketseat.com.br"
    },
    {
        img:"https://image.flaticon.com/icons/svg/2729/2729032.svg",
        title:"Karaokê",
        category:"Diversão em Familia",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas",
        url:"http://rocketseat.com.br"
    },
    {
        img:"https://image.flaticon.com/icons/svg/2729/2729038.svg",
        title:"Pintura",
        category:"Criatividade",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas",
        url:"http://rocketseat.com.br"
    },
    {
        img:"https://image.flaticon.com/icons/svg/2729/2729048.svg",
        title:"Recortes",
        category:"Criatividade",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas",
        url:"http://rocketseat.com.br"
    },
]

//configurar arquivos static 
server.use(express.static("front-end"));

//configuração do nunjucks (Instalado para ter a possibilidade de criar variavei que comunique com server e html)  --- npm i nunjucks
const nunjucks = require("nunjucks");
nunjucks.configure("views", {         //---Passado 2 parametros: 1-a pasta onde vai ficar os arquivos Html. 2- objeto de configuração (express vai ser o server)
    express: server,     
    noCache: true,               
});

//criei uma rota
server.get("/", function(request, response){
    
    const revertIdeas = [...ideas].reverse();

    const lastIdeas = []
    for(idea of revertIdeas){
        if(lastIdeas.length<2){
            lastIdeas.push(idea);
        }
    }
    
    return response.render("index.html", { ideas: lastIdeas });

});
server.get("/ideias", function(request, response){
    const revertIdeas = [...ideas].reverse();

    return response.render("ideias.html", {ideas: revertIdeas}); /**_dirname carrega a pasta */

});

//liguei o servidor na porta 3000
server.listen(3000)

console.log(__dirname + "/index.html")