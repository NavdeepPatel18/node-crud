module.exports = (app) => {
  const employee = require("../controllers/employee.controller");
  const upload = require("../middleware/fileUpload");

  var router = require("express").Router();
  var image = require("express").Router();

  // Create a new Employee
  router.post("/", employee.create);

  // Retrieve all Employees
  router.get("/", employee.findAll);

  // Retrieve a single Employee with id
  router.get("/:id", employee.findOne);

  // Retrieve a single Employee with id
  image.post("/image/:id", upload.single("image"), employee.imageUpload);

  // Update a Employee with id
  router.put("/:id", employee.update);

  // Delete a Employee with id
  router.delete("/:id", employee.delete);

  // Delete all Employees
  router.delete("/", employee.deleteAll);

  app.use("/employee", router);
  app.use("/", image);
};
