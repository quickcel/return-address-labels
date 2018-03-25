var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var returnAddressLabelSchema = new Schema(
  {
    created: { type: Date, default: Date.now },
    modified: { type: Date, default: Date.now },
    disable: {type: Boolean, default: false},
    address1: {type: String, trim: true},
    address2: {type: String, trim: true},
    address3: {type: String, trim: true},
    address4: {type: String, trim: true},
    template: {type: String, required: true, enum: ['Avery 15667', 'Custom'], default: 'Avery 15667'},
    templateLocation: {type: String},
    templateDownloadURL: {type: String},
  }
);

//Export model
module.exports = mongoose.model('returnAddressLabel', returnAddressLabelSchema);