"use strict";

const dbConn = require("../config/db.config");

const Employee = function (employee) {
  this.id = employee.id;
  this.name = employee.name;
  this.phone = employee.phone;
  this.email = employee.email;
  this.department = employee.department;
};

Employee.create = (newEmployee, result) => {
  dbConn.query("INSERT INTO employee SET ?", newEmployee, (err, res) => {
    if (err) {
      console.log("Error:", err);
      result(err, null);
      return;
    }

    console.log("Create Employee:", { ...newEmployee, id: res?.insertId });
    // console.log(res, res.insertId);
    result(null, { ...newEmployee, id: res?.insertId });
  });
};

Employee.imageUpload = (id, image, result) => {
  dbConn.query(
    "UPDATE employee SET image = ? WHERE id = ?",
    [image, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated employee: ", { id: id });
      result(null, { id: id });
    }
  );
};

Employee.findById = (id, result) => {
  dbConn.query(`SELECT * FROM employee WHERE id= ${id}`, (err, res) => {
    if (err) {
      console.log("Error:", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Found Employee:", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Employee.findByName = (name, result) => {
  dbConn.query(`SELECT * FROM employee WHERE name="${name}"`, (err, res) => {
    if (err) {
      console.log("Error:", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Found Employee:", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Employee.getAll = (result) => {
  let query = "SELECT * FROM employee";
  dbConn.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Employees: ", res);
    result(null, res);
  });
};

Employee.updateById = (id, employee, result) => {
  dbConn.query(
    "UPDATE employee SET name = ?, phone = ?, email = ? ,department = ? WHERE id = ?",
    [employee.name, employee.phone, employee.email, employee.department, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated employee: ", { ...employee, id: id });
      result(null, { ...employee, id: id });
    }
  );
};

Employee.remove = (id, result) => {
  dbConn.query("DELETE FROM employee WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted employee with id: ", id);
    result(null, res);
  });
};

Employee.removeAll = (result) => {
  dbConn.query("DELETE FROM employee", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} employee`);
    result(null, res);
  });
};

module.exports = Employee;
