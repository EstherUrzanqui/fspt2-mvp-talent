const express = require('express')

const db = require('./model/helper.js')

const routes = express.Router()

// candidate table's routes
routes.get('/candidates' , (req, res) => {
    db('SELECT mother_tongue, department, experience, relocation, remote FROM candidates;').then(results => {
      if(results.error) {
          res.status(400).send({ message: 'There was an error'})
      }
      
      res.send(results.data)
  })
        
}) 

routes.get('/candidates/:id', (req, res) => {
    const { id } = req.params;
  
    db(`SELECT * FROM candidates WHERE id=${id};`)
      .then(results => {
        if (results.data[0]) {
          res.send(results.data[0]);
        }
        res.send(results.data);
      })
      .catch(err => res.status(500).send(err));
  });

routes.post("/candidates/", (req, res) => {
  const { firstname, lastname, email_address, mother_tongue, department, experience, relocation, remote } = req.body;
  db(
    `INSERT INTO candidates (firstname,lastname, email_address, mother_tongue, department, experience, relocation, remote) VALUES ('${firstname}', '${lastname}', '${email_address}', '${mother_tongue}', '${department}', '${experience}', '${relocation}', '${remote}');`
  )
    .then(results => {
      if (!results.error) {
        res.status(201).send({});
      }
      res.send(results);
    })
    .catch(err => res.status(500).send(err));
});

routes.delete("/candidates/:id", (req, res) => {
  const { id } = req.params;

  db(`DELETE FROM candidates WHERE id=${id};`)
    .then(results => {
      if (!results.error) {
        res.status(201).send({});
      }
      res.send(results);
    })
    .catch(err => res.status(500).send(err));
});

//companies table's routes
routes.get('/companies' , (req, res) => {
  db('SELECT * FROM companies;').then(results => {
      if(results.error) {
          res.status(400).send({ message: 'There was an error'})
      }
      
      res.send(results.data)
  })
}) 

routes.get('/companies/:id', (req, res) => {
  const { id } = req.params;

  db(`SELECT * FROM companies WHERE id=${id};`)
    .then(results => {
      if (results.data[0]) {
        res.send(results.data[0]);
      }
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

routes.post("/companies/", (req, res) => {
const { name, city } = req.body;
db(
  `INSERT INTO companies (name, city) VALUES ('${name}', '${city}');`
)
  .then(results => {
    if (!results.error) {
      res.status(201).send({});
    }
    res.send(results);
  })
  .catch(err => res.status(500).send(err));
});

routes.delete("/companies/:id", (req, res) => {
const { id } = req.params;

db(`DELETE FROM companies WHERE id=${id};`)
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



//companies_candidates table route

routes.get('/companies_candidates' , (req, res) => {
  db('SELECT candidates.mother_tongue as mother_tongue, candidates.department as department, candidates.experience as experience, candidates.relocation as relocation, candidates.remote as remote, companies.name as company, companies.City as city FROM candidates INNER JOIN companies on candidates.id = companies.id;').then(results => {
      if(results.error) {
          res.status(400).send({ message: 'There was an error'})
      }
      
      res.send(results.data)
  })
}) 



module.exports = routes