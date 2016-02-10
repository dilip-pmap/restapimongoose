var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var Employee     = require('./models/employees.js');
var mongoose   = require('mongoose');

mongoose.connect('mongodb://localhost:27017/documents');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();
router.use(function(req, res, next) {
    console.log('Something is happening.');
    next();
});

router.get('/', function(req, res) {
    res.json({ message: 'Welcome to graphql mongodb application demo' });
});

router.route('/employees')
    .post(function(req, res) {
        var employee = new Employee();      // create a new instance of the employee model
        employee.name = req.body.name;  // set the employee name (comes from the request)
        // save the employee and check for errors
        employee.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'employee created!' });
        });

    })
    .get(function(req, res) {
        Employee.find(function(err, employees) {
            if (err)
                res.send(err);
            res.json(employees);
        });
    });

    router.route('/employees/:employee_id')
        .get(function(req, res) {
            Employee.findById(req.params.employee_id, function(err, employee) {
                if (err)
                    res.send(err);
                res.json(employee);
            });
        })
        .put(function(req, res) {
        Employee.findById(req.params.employee_id, function(err, employee) {
            if (err)
                res.send(err);
                employee.name = req.body.name;
            employee.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'Employees updated!' });
            });
        });
    })
    // delete
    .delete(function(req, res) {
        Employee.remove({
            _id: req.params.employee_id
        }, function(err, employee) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

// all of our routes will be prefixed with /api
app.use('/api', router);

app.listen(port);
console.log('Mongodb Demo on loaclhost port :' + port);
