const express = require('express')

const db = require('./model/helper.js')

const routes = express.Router()

// get all the candidates 
routes.get('/candidates' , (req, res) => {
    db('SELECT mother_tongue, department, experience, relocation, remote FROM candidates;').then(results => {
      if(results.error) {
          res.status(400).send({ message: 'There was an error'})
      }
      
      res.send(results.data)
  })
        
}) 

// get candidates filtered by department
routes.get('/candidates/department/:department', (req, res) => {
    const { department } = req.params;
  
    db(`SELECT * FROM candidates WHERE department= '${department}';`)
      .then(results => {
        if (results.data[0]) {
          res.send(results.data[0]);
        }
        res.send(results.data);
      })
      .catch(err => res.status(500).send(err));
  });

routes.post("/candidates/", (req, res) => {
  const { firstname, lastname, email_address, mother_tongue, department, experience, relocation, remote, company_id, title, description } = req.body;
  db(
    `INSERT INTO candidates (firstname,lastname, email_address, mother_tongue, department, experience, relocation, remote, company_id) VALUES ('${firstname}', '${lastname}', '${email_address}', '${mother_tongue}', '${department}', '${experience}', '${relocation}', '${remote}', '${company_id}') SELECT LAST_INSERT_ID() INTO @candidatesId; INSERT INTO skills (title, description) VALUES ('${title}, '${description}') SELECT LAST_INSERT_ID() INTO @skilLsId; INSERT INTO candidates_skills (candidate_id, skills_id) VALUES (@candidatesId, @skillsId);`
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

//get only the companies listed
routes.get('/companies' , (req, res) => {
  db('SELECT * FROM companies;').then(results => {
      if(results.error) {
          res.status(400).send({ message: 'There was an error'})
      }
      
      res.send(results.data)
  })
}) 

//get candidates with the companies they belong
routes.get('/companies/candidates/:company' , (req, res) => {
  const { company } = req.params;

  db(`SELECT candidates.mother_tongue as mother_tongue, candidates.department as department, candidates.experience as experience, candidates.relocation as relocation, candidates.remote as remote, companies.name as company, companies.City as city FROM candidates INNER JOIN companies ON companies.id = candidates.company_id;`).then(results => {
      if(results.error) {
          res.status(400).send({ message: 'There was an error'})
      }
      
      res.send(results.data)
  })
}) 

routes.get('/candidates/skills' , (req, res) => {
  db('SELECT candidates.mother_tongue, candidates.department, candidates.experience, candidates.relocation, candidates.remote, skills.title FROM candidates INNER JOIN candidates_skills ON candidates_skills.candidate_id = candidates.id INNER JOIN skills ON skills.id = candidates_skills.skills_id;') 
    .then(results => {
      if(results.error) {
        res.status(400).send({ message: 'There was an error'})
    }
    
    res.send(results.data)
    })
}) 








module.exports = routes