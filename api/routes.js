const express = require('express')

const db = require('./model/helper.js')

const routes = express.Router()

// get all the candidates 
routes.get('/candidates' , (req, res) => {
    db('SELECT * FROM candidates;')
    .then(results => {
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
  const { firstname, lastname, email_address, mother_tongue, department, experience, relocation, remote, company_id, title, description, name, city } = req.body;
  db(
    `INSERT INTO candidates (firstname,lastname, email_address, mother_tongue, department, experience, relocation, remote, company_id) 
    VALUES ('${firstname}', '${lastname}', '${email_address}', '${mother_tongue}', '${department}', '${experience}', '${relocation}', '${remote}', '${company_id}'); 
    SELECT LAST_INSERT_ID() INTO @candidatesId; 
    INSERT INTO skills (title, description) VALUES ('${title}, '${description}');
    SELECT LAST_INSERT_ID() INTO @skilLsId;
    INSERT INTO companies (name, city) VALUES ('${name}', '${city});
    SELECT LAST_INSERT_ID() INTO @companyId; 
    INSERT INTO candidates_skills (candidate_id, skills_id) VALUES (@candidatesId, @skillsId);
    INSERT INTO companies_candidates (candidate_id, company_id) VALUES (@candidateId, @companyId)`
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
    //const { company } = req.query;
    //let comByName = [...companies];
    //if (company) {
      //comByName = comByName.filter(r => r.companies.name 
        //=== company);
      //}
      res.send(results.data)
  })
}) 

//get candidates with the companies they belong
routes.get('/companies/candidates/' , (req, res) => {
  db(`SELECT candidates.mother_tongue, 
             candidates.department, 
             candidates.experience, 
             companies.name, 
             companies.City
      FROM candidates 
      INNER JOIN companies_candidates 
        ON companies_candidates.candidate_id = candidates.id 
      INNER JOIN companies 
        ON companies.id = companies_candidates.company_id;`)
    .then(results => {
      if(results.error) {
          res.status(400).send({ message: 'There was an error'})
      }
 
      
      res.send(results.data)
  })
}) 



routes.get('/candidates/skills' , (req, res) => {
  db(`SELECT candidates.mother_tongue, 
             candidates.department, 
             candidates.experience, 
             candidates.relocation, 
             candidates.remote, 
             GROUP_CONCAT(skills.title)
      FROM candidates 
      INNER JOIN candidates_skills 
        ON candidates_skills.candidate_id = candidates.id 
      INNER JOIN skills 
        ON skills.id = candidates_skills.skills_id
      GROUP BY candidates.id;`) 
    .then(results => {
    
    res.send(results.data)
    })
}) 

routes.get('/search/:query' , (req, res) => {
  const query = req.params.query
  db(`SELECT department,
             experience,
             mother_tongue    
      FROM candidates WHERE department LIKE '%${query}%';`) 
    .then(results => {
    
    res.send(results.data)
    })
})








module.exports = routes