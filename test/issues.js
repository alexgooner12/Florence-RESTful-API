process.env.NODE_ENV = 'test';

const fs = require('fs');


let Issue = require('../models/Issue');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');

let mongoose = require("mongoose");
let should = chai.should();

chai.use(chaiHttp);

describe('Issues', () => {
    beforeEach((done) => {
        Issue.remove({}, (err) => {
           done();
        });
    });

  describe('/GET issues', () => {
      it('it should GET all the issues', (done) => {
        chai.request(server)
            .get('/issues')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.have.property('issueList');
                  res.body.issueList.should.be.an('array');
                  res.body.issueList.length.should.be.eql(0);
                  console.log(res.body, "bb get")
              done();
            });
      });
  });


  describe('/GET an issue', () => {
    it('it should GET the requested issue', (done) => {
        let issue = new Issue({ title: "Tqq the Rings"});
        issue.save((err, issue) => {
           chai.request(server)
          .get('/issues/' + issue.id)
          .send(issue)
          .end((err, res) => {
              console.log(res.body, "bbodu get /:id")
                res.should.have.status(200);
                res.body.issue.should.be.a('object');
                res.body.issue.should.have.property('title');
                res.body.issue.should.have.property('files');
                res.body.issue.should.have.property('comments');
                res.body.issue.should.have.property('status');
                res.body.issue.should.have.property('_id').eql(issue.id);
            done();
          });
        });
    });

    it('it should GET the comments', (done) => {
      let issue = new Issue({ title: "Tqq the Rings", comments: ['whohoho']});
      issue.save((err, issue) => {
         chai.request(server)
        .get('/issues/' + issue.id + '?comments')
        .send(issue)
        .end((err, res) => {
            console.log(res.body, "comments /:id")
              res.should.have.status(200);
              res.body.issue.should.be.a('object');
              res.body.issue.should.have.property('comments');
              res.body.issue.comments[0].should.be.eql('whohoho');
          done();
        });
      });
  });
});

describe('/POST issue', () => {
  it('it should not POST an issue without title', (done) => {
    const issue = new Issue({
      comments: [], 
      status: 'incomplete', 
      files: []
    })
    chai.request(server)
        .post('/issues')
        .send(issue)
        .end((err, res) => {
          console.log(res.text, "post issue");
              res.should.have.status(400);
              res.body.error.should.be.a('array');
              res.body.should.have.property('error');
          done();
        });
  });

  it('it should POST a new issue', done => {
    const issue = new Issue({
      title: "hi29", 
      comments: [], 
      status: 'incomplete', 
      files: []
    })

    // _id is not allowed ?
    issue.save((err, issue) => {
      console.log(issue, "saved !", err)
      chai.request(server)
      .post('/issues')
      .send(issue)
      .end((err, res) => {
          console.log(res, "post issue");
            // res.should.have.status(200);
            // res.body.issue.should.be.a('object');
            // res.body.issue.should.have.property('title').eql('hi');
            // res.body.issue.should.have.property('comments').eql(['ola']);
            // res.body.issue.should.have.property('files').eql([]);
            // res.body.issue.should.have.property('status').eql(['in progress']);
        done();
      });
    })
});

});

describe('/PATCH/:id book', () => {
  it('it should UPDATE an issue with the coresponding id', (done) => {
      let issue = new Issue({title: "The Chronicles of Narnia", status: 'in progress'})
      issue.save((err, issue) => {
            chai.request(server)
            .patch('/issues/' + issue.id)
            .send({ status: "undone"})
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.issue.should.be.a('object');
                  res.body.issue.should.have.property('n').eql(1);
                  res.body.issue.should.have.property('nModified').eql(1);
                  res.body.issue.should.have.property('ok').eql(1);
              done();
            });
      });
  });

  it('it should add comments', (done) => {
    let issue = new Issue({title: "The Chronicles of Narnia", status: 'in progress'})
    issue.save((err, issue) => {
          chai.request(server)
          .patch('/issues/' + issue.id)
          .send({ comments: "new comment"})
          .end((err, res) => {
                res.should.have.status(200);
                res.body.issue.should.be.a('object');
                res.body.issue.should.have.property('n').eql(1);
                res.body.issue.should.have.property('nModified').eql(1);
                res.body.issue.should.have.property('ok').eql(1);
            done();
          });
    });
  });

});

describe('/DELETE/:id book', () => {
  it('it should DELETE a book given the id', (done) => {
      let issue = new Issue({title: "The Chronicles of Narnia"})
      issue.save((err, issue) => {
            chai.request(server)
            .delete('/issues/' + issue.id)
            .end((err, res) => {
              console.log(res.body, "delete test");
                  res.should.have.status(200);
                  res.body.issue.should.be.a('object');
                  res.body.issue.should.have.property('ok').eql(1);
                  res.body.issue.should.have.property('n').eql(1);
              done();
            });
      });
  });
});

});
