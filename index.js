const express = require('express');
const res = require('express/lib/response');
const { send } = require('express/lib/response');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded());

const pokedex = [
  {
    id: 1,
    nome: 'Pikachu',
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/025.png',
    tipo: 'raio',
  },
  {
    id: 2,
    nome: 'charmander',
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png',
    tipo: 'fire',
  },
  {
    id: 3,
    nome: 'squirtle',
    img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png',
    tipo: 'water',
  },
];
let pokemon = undefined;

app.get('/', (req, res) => {
  res.render('index', { pokedex, pokemon });
});
app.post('/add', (req, res) => {
  const pokemon = req.body;
  pokemon.id = pokedex.length + 1;
  pokedex.push(pokemon);
  res.redirect('/');
});
app.get('/detalhes/:id', (req, res) => {
  const id = +req.params.id;
  pokemon = pokedex.find((pokemon) => pokemon.id === id);
  res.redirect('/');
});

app.post('/update/:id', (req, res) => {
  const id = +req.params.id - 1;
  pokemon = pokedex.find((pokemon) => pokemon.id === id);

  const newPokemon = req.body;
  newPokemon.id = id + 1;
  pokedex[id] = newPokemon;
  pokemon = undefined;

  res.redirect('/');
});

app.listen(3000, () =>
  console.log('Servidor rodando em: http://localhost:3000'),
);
