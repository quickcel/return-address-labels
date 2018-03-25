var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var labelTemplateSchema = new Schema(
  {
    created:            {type: Date, default: Date.now },
    modified:           {type: Date, default: Date.now },
    disable:            {type: Boolean, default: false},
    templateName:       {type: String, trim: true},
    rowStartY:          {type: Number},
    labelWidth:         {type: Number},
    labelWidthText:     {type: Number},
    labelHeight:        {type: Number},
    labelPadding:       {type: Number},
    rowsPerTemplate:    {type: Number},
    columnsPerTemplate: {type: Number},
  }
);

//Export model
module.exports = mongoose.model('labelTemplate', labelTemplateSchema);