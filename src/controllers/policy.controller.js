const { HttpStatus } = require("../constants");
const { importData } = require("../services/import.service");

exports.importPolicies = async (req, res) => {
  try {
    if (!req.file)
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ success: false, message: "Please uploaded csv file" });
    const result = await importData(req.file.path);
    res
      .status(HttpStatus.CREATED)
      .json({ message: "Data Imported Successfully", result });
  } catch (err) {
    console.log("Error during import:", err);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message,
    });
  }
};
