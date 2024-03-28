const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const cors = require('cors');
const port = 3000;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});
app.use(bodyParser.json())

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345',
  database: 'feastly_db',
  insecureAuth: true,
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados MySQL:', err);
  } else {
    console.log('Conectado ao banco de dados MySQL');
  }
});

// Operações CRUD, 

// Create (Criação de um novo usuário)
app.post('/usuario', (req, res) => {
    const { nome, sobrenome, data_nasc, tipo_usuario, cpf, endereco, cep, cidade, sexo, email, senha } = req.body;
    const query = 'INSERT INTO usuario (nome, sobrenome, data_nasc, tipo_usuario, cpf, endereco, cep, cidade, sexo, email, senha) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [nome, sobrenome, data_nasc, tipo_usuario, cpf, endereco, cep, cidade, sexo, email, senha], (err, result) => {
    if (err) {    
      switch(err.code){
        case 'ER_DUP_ENTRY':
          res.status(401).json({error: "Email já cadastrado"})
        default:
          console.error('Erro ao criar um novo usuário:', err.code);
          res.status(500).json({ error: 'Erro interno do servidor' });
      }
    } else {
      res.status(201).json({ message: 'Usuário criado com sucesso' });
    }
  });
});

// Read (Recuperação de todos os usuários)
app.get('/usuario/:id', (req, res) => {
  let query = 'SELECT * FROM usuario';
  const id = req.params.id
  if(id){
    query = `SELECT * FROM usuario WHERE usuario.id = ${id}`
  }
  db.query(query, (err, results) => {
    if (err) {
      // switch(err.code){
      //   case 
      // }
      console.error('Erro ao buscar usuários:', err);
      res.status(500).json({ error: 'Erro interno do servidor' });
    } else {
      res.status(200).json(results);
    }
  });
});


app.get('/home', (req, res) => {
  const email = req.query.email;

  let obj = {}

  if (!email) {
    res.status(400).json({ error: 'O parâmetro de consulta "email" é obrigatório' });
    return;
  }

  const otherRequests = () => {
    let queryEvento

    if(obj.isOrg){
      queryEvento = `SELECT evento.*, organizacao.sigla, organizacao.nome as org_nome FROM evento JOIN organizacao on evento.organizacao_id = organizacao.id WHERE evento.organizacao_id = ${obj.id} ;`;
      console.log(queryEvento)
    }else{
      queryEvento = 'SELECT evento.*, organizacao.sigla, organizacao.nome as org_nome FROM evento JOIN organizacao on evento.organizacao_id = organizacao.id;';
    }
    
    db.query(queryEvento, (err, results) => {
      if (err) {
        console.error('Erro ao buscar o nome do usuário:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
      } else {
          obj.evento = results;

          const queryOrgs = 'SELECT * FROM organizacao;';
          db.query(queryOrgs, (err, results) => {
            if (err) {
              console.error('Erro ao buscar o nome do usuário:', err);
              res.status(500).json({ error: 'Erro interno do servidor' });
            } else {
                obj.organizacoes = results;
                res.status(200).json(obj)
            }
          });
      }
    });
  
  }

  const query = 'SELECT nome, id FROM usuario WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error('Erro ao buscar o nome do usuário:', err);
      res.status(500).json({ error: 'Erro interno do servidor' });
    } else {
      if(results.length === 0){
        const queryOrg = 'SELECT nome, id FROM organizacao WHERE email = ?';
        db.query(queryOrg, [email], (err, results) => {
          if (err) {
            console.error('Erro ao buscar o nome do usuário:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
          } else {
            if (results.length === 0) {
              res.status(404).json({ error: 'Usuário não encontrado' });
            } else {
              obj.nome = results[0].nome
              obj.id = results[0].id
              obj.isOrg = true;
              otherRequests()
            }
          }
        });
      } else {
        obj.nome = results[0].nome
        obj.id = results[0].id
        otherRequests()
      }
    }
  })
});

// Update (Atualização de um usuário)
app.put('/usuario/:id', (req, res) => {
    const userId = req.params.id;
    const { nome, sobrenome, data_nasc, imagem, tipo_usuario, cpf, endereco, cep, cidade, sexo, email } = req.body;
    const query = 'UPDATE usuario SET nome=?, sobrenome=?, data_nasc=?, image=?, tipo_usuario=?, cpf=?, endereco=?, cep=?, cidade=?, sexo=?, email=? WHERE id=?';
    db.query(query, [nome, sobrenome, data_nasc, imagem, tipo_usuario, cpf, endereco, cep, cidade, sexo, email, userId], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar o usuário:', err);
      res.status(500).json({ error: 'Erro interno do servidor' });
    } else {
      res.status(200).json({ message: 'Usuário atualizado com sucesso' });
    }
  });
});

// Delete (Exclusão de um usuário)
app.delete('/usuario/:id', (req, res) => {
  const userId = req.params.id;
  const query = 'DELETE FROM usuario WHERE id=?';
  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error('Erro ao excluir o usuário:', err);
      res.status(500).json({ error: 'Erro interno do servidor' });
    } else {
      res.status(200).json({ message: 'Usuário excluído com sucesso' });
    }
  });
});


// Rota para obter todas as organizações
app.get('/organizacoes/:id', async (req, res) => {
  const { id } = req.params;
  let obj = {}

  const getEvents = () => {
    db.query("SELECT * FROM evento WHERE evento.organizacao_id = "+obj.data[0].id, (err, results) => {
      if (err) {
        console.error('Erro ao buscar organizacao:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
      } else {
        obj.data[0].eventos = results
        res.status(200).json(obj);
      }
    });
  }

  let query = `SELECT * FROM organizacao`;
  if(id){
    query = `SELECT * FROM organizacao WHERE organizacao.id = ${id}`;
  }
  console.log(query)
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar organizacao:', err);
      res.status(500).json({ error: 'Erro interno do servidor' });
    } else {
      obj.data = results
      getEvents()
    }
  });
});

app.get('/organizacoes', async (req, res) => {
  const query = 'SELECT * FROM organizacao';
  db.query(query, (err, results) => {
    if (err) {
      // switch(err.code){
      //   case 
      // }
      console.error('Erro ao buscar organizacao:', err);
      res.status(500).json({ error: 'Erro interno do servidor' });
    } else {
      res.status(200).json(results);
    }
  });
});


// Rota para criar uma nova organização
app.post('/organizacoes', async (req, res) => {
  const { nome, sigla, email, senha, cnpj, descricao } = req.body;
  const query = 'INSERT INTO organizacao (nome, sigla, email, senha, cnpj, descricao) VALUES (?, ?, ?, ?, ?, ?)'
  await db.query(query, [nome, sigla, email, senha, cnpj, descricao], (err, res) => {
    if(err){
      console.log(err)
    }

  });
  res.status(201).json({message: 'Organização criada com sucesso'})
});

// Rota para atualizar uma organização por ID
app.put('/organizacoes/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, sigla, email, senha, descricao, image, avaliacao } = req.body;
  await db.query('UPDATE organizacao SET nome = ?, sigla = ?, email = ?, senha = ?, descricao = ?, image = ?, avaliacao = ? WHERE id = ?', [nome, sigla, email, senha, descricao, image, avaliacao, id]);
  res.json({ message: 'Organização atualizada com sucesso' });
});

// Rota para excluir uma organização por ID
app.delete('/organizacoes/:id', async (req, res) => {
  const { id } = req.params;
  await db.query('DELETE FROM organizacao WHERE id = ?', [id]);
  res.status(201).json({ message: 'Organização excluída com sucesso' });
});

// Rota para fazer login
app.post('/login', (req, res) => {
    const { email, senha } = req.body;
    const query = 'SELECT 1 AS origem, nome, senha FROM usuario WHERE email = ? UNION SELECT 2 AS origem, nome, senha FROM organizacao WHERE email = ?';
    db.query(query, [email, email], (err, results) => {
      if (err) {
        console.error('Erro ao fazer login:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
      } else {
        if (results.length === 0) {
          res.status(401).json({ error: 'Nome de usuário não encontrado' });
        } else {
          const user = results[0];
          console.log(results)
          // Verificar a senha aqui (por exemplo, com bcrypt)
          if (senha === user.senha) {
            res.status(200).json({ message: 'Login bem-sucedido' });
          } else {
            res.status(401).json({ error: 'Senha incorreta' });
          }
        }
      }
    });
  });

// Create (Criação de um novo evento)
app.post('/eventos', (req, res) => {
  console.log("veio")
  const { nome, descricao, idade_minima, image, categoria, valor, organizacao_id } = req.body;
  const query = 'INSERT INTO evento (nome, descricao, idade_minima, image, categoria, valor, organizacao_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [nome, descricao, idade_minima, image, categoria, valor, organizacao_id], (err, result) => {
    if (err) {
      console.error('Erro ao criar um novo evento:', err);
      res.status(500).json({ error: 'Erro interno do servidor' });
    } else {
      console.log("auo")
      res.status(201).json({ message: 'Evento criado com sucesso' });
    }
  });
});

// Read (Recuperação de todos os eventos)
app.get('/eventos/:id', (req, res) => {
  const {id} = req.params
  const obj = {}
  const getEvents = () => {
    db.query(`SELECT * FROM organizacao WHERE organizacao.id = `+ obj.data.organizacao_id, (err, results) => {
      if (err) {
        console.error('Erro ao buscar eventos:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
      } else {
        console.log(results)
        obj.data.org = results[0]
        res.status(200).json(obj);
      }
    });
  }

  let query = 'SELECT evento.*, organizacao.sigla, organizacao.nome as org_nome FROM evento JOIN organizacao on evento.organizacao_id = organizacao.id;';
  if(id){
    query = 'SELECT * FROM evento WHERE evento.id = '+id
  }
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar eventos:', err);
      res.status(500).json({ error: 'Erro interno do servidor' });
    } else {
      if(id){
        obj.data = results[0]
        getEvents()
      }else{
        res.status(200).json(results);
      }
      }
    });
});

// Update (Atualização de um evento)
app.put('/eventos/:id', (req, res) => {
  const eventoId = req.params.id;
  const { nome, descricao, idade_minima, image, categoria, organizacao_id } = req.body;
  const query = 'UPDATE evento SET nome=?, descricao=?, idade_minima=?, image=?, categoria=?, organizacao_id=? WHERE id=?';
  db.query(query, [nome, descricao, idade_minima, image, categoria, organizacao_id, eventoId], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar o evento:', err);
      res.status(500).json({ error: 'Erro interno do servidor' });
    } else {
      res.status(200).json({ message: 'Evento atualizado com sucesso' });
    }
  });
});

// Delete (Exclusão de um evento)
app.delete('/eventos/:id', (req, res) => {
  const eventoId = req.params.id;
  const query = 'DELETE FROM evento WHERE id=?';
  db.query(query, [eventoId], (err, result) => {
    if (err) {
      console.error('Erro ao excluir o evento:', err);
      res.status(500).json({ error: 'Erro interno do servidor' });
    } else {
      res.status(200).json({ message: 'Evento excluído com sucesso' });
    }
  });
});


app.listen(port, () => {
  console.log(`Servidor Node.js em execução na porta ${port}`);
});
