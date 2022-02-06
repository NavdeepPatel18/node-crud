const Employee = require("../models/employee.model");
const Upload = require("../middleware/fileUpload");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Employee
  const employee = new Employee({
    id: req.body.id,
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    department: req.body.department,
  });

  // Save Employee in the database
  Employee.create(employee, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Employee.",
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  Employee.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Employees.",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Employee.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Employee with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Employee with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.findName = (req, res) => {
  Employee.findByName(req.query.name, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Employee with name ${req.query.name}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Employee with name " + req.query.name,
        });
      }
    } else res.send(data);
  });
};

exports.imageUpload = async (req, res) => {
  if (!req.params || !req.file) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  console.log(req.file);

  Employee.imageUpload(
    req.params.id,
    "http://localhost:4000/" + req.file.path,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Employee with id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            message: "Error updating Employee with id " + req.params.id,
          });
        }
      } else res.send(data);
    }
  );
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  console.log(req.body);

  Employee.updateById(req.params.id, new Employee(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Employee with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Employee with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  Employee.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Employee with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Employee with id " + req.params.id,
        });
      }
    } else res.send({ message: `Employee was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  Employee.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Employees.",
      });
    else res.send({ message: `All Employees were deleted successfully!` });
  });
};
