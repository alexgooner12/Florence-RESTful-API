process.env.NODE_ENV = 'test';

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
        });
        const issue = {
          title: '0 patient'
        }
        chai.request(server)
            .post('/issues')
            .send(issue)
            .end((err, res) => {
              done();
            })
    });

  describe('/GET issues', () => {
      it('it should GET all the issues', (done) => {
        chai.request(server)
            .get('/issues')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.have.property('issueList');
                  res.body.issueList.should.be.an('array');
                  res.body.issueList.length.should.be.eql(1);
                  res.body.issueList[0].should.have.property('title');
                  res.body.issueList[0].should.have.property('title').eql('0 patient');
              done();
            });
      });
  });


  describe('/GET an issue', () => {
    it('it should GET the requested issue', (done) => {
        let issue = new Issue({ title: "Lord of the Rings"});
        issue.save((err, issue) => {
           chai.request(server)
          .get('/issues/' + issue.id)
          .send(issue)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.issue.should.be.a('object');
                res.body.issue.should.have.property('title');
                res.body.issue.should.have.property('files');
                res.body.issue.should.have.property('comments');
                res.body.issue.should.have.property('status');
                res.body.issue.should.have.property('title').eql("Lord of the Rings");
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
              res.should.have.status(400);
              res.body.error.should.be.a('array');
              res.body.should.have.property('error');
          done();
        });
  });

  it('it should POST a new issue', done => {
    const issue = {
      title: "hi29"
    }
      chai.request(server)
      .post('/issues')
      .send(issue)
      .end((err, res) => {
            res.should.have.status(200);
            res.body.issue.should.be.a('object');
            res.body.issue.should.have.property('title').eql('hi29');
            res.body.issue.should.have.property('comments').eql([]);
            res.body.issue.should.have.property('status').eql('incomplete');
            res.body.issue.should.have.property('files').eql([]);
        done();
      });
  });

});

describe('/PATCH/:id book', () => {
  it('it should UPDATE an issue with the coresponding id', (done) => {
      const issue = new Issue({title: "The Chronicles of Narnia", status: 'in progress'})
      issue.save((err, issue) => {
            chai.request(server)
            .patch('/issues/' + issue.id)
            .send({ status: "undone"})
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.issue.should.be.a('object');
                  res.body.issue._id.should.be.eql(issue.id);
                  res.body.issue.should.have.property('status').eql('undone');
              done();
            });
      });
  });

  it('it should add comments', (done) => {
    let issue = new Issue({title: "The Chronicles of Narnia", status: 'in progress'})
    issue.save((err, issue) => {
          chai.request(server)
          .patch('/issues/' + issue.id)
          .send({ comment: "new comment"})
          .end((err, res) => {
                res.should.have.status(200);
                res.body.issue.should.be.a('object');
                res.body.issue.comments.length.should.be.eql(1);
                res.body.issue.comments[0].should.be.eql("new comment");
            done();
          });
    });
  });

});

describe('/DELETE/:id book', () => {
  it('it should DELETE a book given the id', (done) => {
      const issue = new Issue({title: "The Chronicles of Narnia"})
      issue.save((err, issue) => {
            chai.request(server)
            .delete('/issues/' + issue.id)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.issue._id.should.be.equal(issue.id);
                  res.body.issue.title.should.be.equal('The Chronicles of Narnia');
              done();
            });
      });
  });
});

});
