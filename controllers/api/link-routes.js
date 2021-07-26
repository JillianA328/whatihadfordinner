const router = require('express').Router();

const linkPreviewGenerator = require("link-preview-generator");

const previewData = await linkPreviewGenerator(
  ""
);
console.log(previewData);

module.exports = router;