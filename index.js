require('dotenv').config;
const express = require('express');
const res = require('express/lib/response');
const { send } = require('express/lib/response');
const path = require('path');
const app = express();

const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded());

const pokedex = [
  {
    id: 1,
    nome: 'Zoroark',
    img: 'img/zoroark.png',
    tipo: 'Dark',
    descricao:
      'This Pokémon cares deeply about others of its kind, and it will conjure terrifying illusions to keep its den and pack safe.',
    altura: '1.6 m',
    peso: '81.1 kg',
    categoria: 'Illusion Fox',
    habilidade: 'Illusion',
  },
  {
    id: 2,
    nome: 'Zarude',
    img: 'img/zarude.png',
    tipo: 'Dark',
    descricao:
      "Within dense forests, this Pokémon lives in a pack with others of its kind. It's incredibly aggressive, and the other Pokémon of the forest fear it.",
    altura: '1.8 m',
    peso: '70.0 kg',
    categoria: 'Rogue Monkey',
    habilidade: 'Leaf Guard',
  },
  {
    id: 3,
    nome: 'Urshifu',
    img: 'img/urshifu.png',
    tipo: 'Dark',
    descricao:
      'This form of Urshifu is a strong believer in the one-hit KO. Its strategy is to leap in close to foes and land a devastating blow with a hardened fist.',
    altura: '1.9 m',
    peso: '105.0 kg',
    categoria: 'Wushu',
    habilidade: 'Unseen Fist',
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

app.listen(port, () =>
  console.log(`Servidor rodando em: http://localhost:${port}`),
);
