var fs = require('fs');
var ReturnAddressLabel = require('../models/returnAddressLabel');
var labelTemplate = require('../models/labelTemplate')
var Doc = require('pdfkit');

const {body,validationResult} = require('express-validator/check');
const {sanitizeBody} = require('express-validator/filter');

// Display list of all returnAddressLabels.
exports.reaturnAddressLabel_list = function (req, res) {
  res.send('NOT IMPLEMENTED: returnAddressLabels list');
};

// Display detail page for a specific returnAddressLabel.
exports.returnAddressLabels_detail = function (req, res) {
  res.send('NOT IMPLEMENTED: returnAddressLabels detail: ' + req.params.id);
};

// Display returnAddressLabel create form on GET.
exports.returnAddressLabels_create_get = function (req, res) {
  res.send('NOT IMPLEMENTED: returnAddressLabels create GET');
};

exports.index = function (req, res) {

  //get a list of eligible templates
  labelTemplate.find({
      'disable': 'false'
    })
    .exec(function (err, list_labelTemplates) {
      if (err) {
        console.log('There was an error retrieving labelTemplates')
        console.log(err);
        return next(err);
      }
      // Successful, so render.
      console.log(list_labelTemplates);
      res.render('index', {
        labelTemplates: list_labelTemplates
      });
    });
  //Test data you can use to insert into labeltemplate collection on page load
  
  /*var labelTemplate = new LabelTemplate({
        templateName: 'Avery 1000',
        rowStartY: 36,
        labelWidth: 126,
        labelWidthText: 122,
        labelHeight: 36,
        labelPadding: 2,
        rowsPerTemplate: 20,
        columnsPerTemplate: 4
      });
  labelTemplate.save(function (err) {
    if (err) {
      return next(err);
    }
    res.render('index');
  });*/
  


}

// Handle returnAddressLabel create on POST.
exports.returnAddressLabels_create_post = [

  //Validate Values
  body('addressLine1').isLength({min: 1}).trim().withMessage('Please enter a value for Address Line 1'),
  //body('addressLine2').isLength({min: 1}).trim().withMessage('Please enter a value for Address Line 2'),
  //body('addressLine3').isLength({min: 1}).trim().withMessage('Please enter a value for Address Line 3'),

  //Sanitize Values
  sanitizeBody('addressLine1').trim().escape(),
  sanitizeBody('addressLine2').trim().escape(),
  sanitizeBody('addressLine3').trim().escape(),


  (req, res, next) => {

    // Extract the validation errors from a request.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      console.log(req.body);
      //get a list of eligible templates
      labelTemplate.find({
          'disable': 'false'
        })
        .exec(function (err, list_labelTemplates) {
          if (err) {
            console.log('There was an error retrieving labelTemplates')
            console.log(err);
            return next(err);
          }
          // Successful, so render.
          //console.log(list_labelTemplates);
          //res.render('index', { labelTemplates:  list_labelTemplates});
          res.render('index', {
            label: req.body,
            labelTemplates: list_labelTemplates,
            errors: errors.array()
          });

        });
      //console.log(errors.mapped());
      return;
      //return res.status(422).json({ errors: errors.mapped() });
    } else {
      //populate schema model with data from request body	
      var returnAddressLabel = new ReturnAddressLabel({
        template: req.body.labelTemplate,
        address1: req.body.addressLine1,
        address2: req.body.addressLine2,
        address3: req.body.addressLine3
      });

      returnAddressLabel.save(function (err) {
        if (err) {
          return next(err);
        }
        //Create the PDF doc
        var doc = new Doc({
          margin: 0,
          info: {
            Title: 'Return Address Label 15667',
            Author: 'Steve Dykman',
          }
        });

        //Pipe output to file on the filesystem
        //doc.pipe(fs.createWriteStream('output.pdf'));

        //Pipe output as http response straight to browser
        doc.pipe(res);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=Avery-15667-Return-Address-Label.pdf');

        //Set the Global document styling settings        
        doc.fontSize(7);
        doc.font('fonts/Open_Sans/OpenSans-Regular.ttf')
          //doc.font('fonts/Roboto/Roboto-Light.ttf')

        //Settings that are specific to a template layout for how to position the input
        //Should be moved to a DB setup table
        var rowStartY = 36;
        var labelWidth = 126;
        var labelWidthText = 122;
        var labelHeight = 36;
        var labelPadding = 2;
        var rowsPerTemplate = 20;

        for (var i = 0; i < rowsPerTemplate; i++) {
          //Column 1
          doc.text(req.body.addressLine1, 19 + labelPadding, rowStartY + (labelHeight * i) + 5, {width: labelWidthText,align: 'center'});
          doc.text(req.body.addressLine2, {width: 120,align: 'center'});
          doc.text(req.body.addressLine3, {width: 120,align: 'center'});
          //Column 2
          doc.text(req.body.addressLine1, 167 + labelPadding, rowStartY + (labelHeight * i) + 5, {width: labelWidthText,align: 'center'});
          doc.text(req.body.addressLine2, {width: 120,align: 'center'});
          doc.text(req.body.addressLine3, {width: 120,align: 'center'});
          //Column 3
          doc.text(req.body.addressLine1, 315 + labelPadding, rowStartY + (labelHeight * i) + 5, {width: labelWidthText,align: 'center'});
          doc.text(req.body.addressLine2, {width: 120,align: 'center'});
          doc.text(req.body.addressLine3, {width: 120,align: 'center'});
          //Column 4
          doc.text(req.body.addressLine1, 463 + labelPadding, rowStartY + (labelHeight * i) + 5, {width: labelWidthText,align: 'center'});
          doc.text(req.body.addressLine2, {width: 120,align: 'center'});
          doc.text(req.body.addressLine3, {width: 120,align: 'center'});
        }
        doc.end();
        //res.redirect('/');
        //return;
      });


    };
  }
]

// Display Author delete form on GET.
exports.author_delete_get = function (req, res) {
  res.send('NOT IMPLEMENTED: Author delete GET');
};

// Handle Author delete on POST.
exports.author_delete_post = function (req, res) {
  res.send('NOT IMPLEMENTED: Author delete POST');
};

// Display Author update form on GET.
exports.author_update_get = function (req, res) {
  res.send('NOT IMPLEMENTED: Author update GET');
};

// Handle Author update on POST.
exports.author_update_post = function (req, res) {
  res.send('NOT IMPLEMENTED: Author update POST');
};
