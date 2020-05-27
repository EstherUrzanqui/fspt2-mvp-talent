const express = require('express')

const db = require('./model/helper.js')

const routes = express.Router()

// candidate table's routes
routes.get('/candidate' , (req, res) => {
    db('SELECT * FROM candidate;').then(results => {
        if(results.error) {
            res.status(400).send({ message: 'There was an error'})
        }
        
        res.send(results.data)
    })
}) 

routes.get('/candidate/:id', (req, res) => {
    const { id } = req.params;
  
    db(`SELECT * FROM candidate WHERE id=${id};`)
      .then(results => {
        if (results.data[0]) {
          res.send(results.data[0]);
        }
        res.send(results.data);
      })
      .catch(err => res.status(500).send(err));
  });

routes.post("/candidate/", (req, res) => {
  const { firstname, lastname, email_address, mother_tongue, department, experience, relocation, remote } = req.body;
  db(
    `INSERT INTO candidate (firstname,lastname, email_address, mother_tongue, department, experience, relocation, remote) VALUES ('${firstname}', '${lastname}', '${email_address}', '${mother_tongue}', '${department}', '${experience}', '${relocation}', '${remote}');`
  )
    .then(results => {
      if (!results.error) {
        res.status(201).send({});
      }
      res.send(results);
    })
    .catch(err => res.status(500).send(err));
});

routes.delete("/candidate/:id", (req, res) => {
  const { id } = req.params;

  db(`DELETE FROM candidate WHERE id=${id};`)
    .then(results => {
      if (!results.error) {
        res.status(201).send({});
      }
      res.send(results);
    })
    .catch(err => res.status(500).send(err));
});

//company table's routes
routes.get('/company' , (req, res) => {
  db('SELECT * FROM company;').then(results => {
      if(results.error) {
          res.status(400).send({ message: 'There was an error'})
      }
      
      res.send(results.data)
  })
}) 

routes.get('/company/:id', (req, res) => {
  const { id } = req.params;

  db(`SELECT * FROM company WHERE id=${id};`)
    .then(results => {
      if (results.data[0]) {
        res.send(results.data[0]);
      }
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

routes.post("/company/", (req, res) => {
const { name, city } = req.body;
db(
  `INSERT INTO company (name, city) VALUES ('${name}', '${city}');`
)
  .then(results => {
    if (!results.error) {
      res.status(201).send({});
    }
    res.send(results);
  })
  .catch(err => res.status(500).send(err));
});

routes.delete("/company/:id", (req, res) => {
const { id } = req.params;

db(`DELETE FROM company WHERE id=${id};`)
  .then(results => {
    if (!results.error) {
      res.status(201).send({});
    }
    res.send(results);
  })
  .catch(err => res.status(500).send(err));
});

//skills table's routes
routes.get('/skills' , (req, res) => {
  db('SELECT * FROM skills;').then(results => {
      if(results.error) {
          res.status(400).send({ message: 'There was an error'})
      }
      
      res.send(results.data)
  })
}) 

routes.get('/skills/:id', (req, res) => {
  const { id } = req.params;

  db(`SELECT * FROM skills WHERE id=${id};`)
    .then(results => {
      if (results.data[0]) {
        res.send(results.data[0]);
      }
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

routes.post("/skills/", (req, res) => {
const { title, description } = req.body;
db(
  `INSERT INTO skills (title, description) VALUES ('${title}', '${description}');`
)
  .then(results => {
    if (!results.error) {
      res.status(201).send({});
    }
    res.send(results);
  })
  .catch(err => res.status(500).send(err));
});

routes.delete("/skills/:id", (req, res) => {
const { id } = req.params;

db(`DELETE FROM skills WHERE id=${id};`)
  .then(results => {
    if (!results.error) {
      res.status(201).send({});
    }
    res.send(results);
  })
  .catch(err => res.status(500).send(err));
});

module.exports = routes