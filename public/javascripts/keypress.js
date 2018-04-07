// JavaScript Document

$('#addressLine1').on('keyup change',function(event){
  var returnAddress = $(this).val();
  $('#addressLine1-preview').text(returnAddress);
});

$('#addressLine2').on('keyup change',function(event){
  var returnAddress = $(this).val();
  $('#addressLine2-preview').text(returnAddress);
});

$('#addressLine3').on('keyup change',function(event){
  var returnAddress = $(this).val();
  $('#addressLine3-preview').text(returnAddress);
});