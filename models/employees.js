var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var EmployeeSchema   = new Schema({
id: String,
firstname: String,
lastname: String,
designation: String,
active: String
});

module.exports = mongoose.model('Employee', EmployeeSchema);
