/*Assignment: Using the jQuery Validation Plugin with Your Dynamic Table
 Name:      Zepeng Wang
 E-mail:    Zepeng_Wang@student.uml.edu
 Data:      8/5/2020
 Description: This web is creating an interactive dynamic multiplication table that accept userinput 
 and calculate from -50 to 50 multiplication
 write a fuction calulation() in js to calculate number in html and put result into table.
 https://stackoverflow.com/questions/39269353/multiplication-table-in-html-javascript
 how to print table
 https://stackoverflow.com/questions/49402954/how-to-print-multiplication-table-by-using-html-tables-code-is-in-javascript
 another studying resource youtube video how to create multiplication table using HTML,CSS, and JavaScript
 https://www.youtube.com/watch?v=5Oq6Eqy7Y_A
 91.61 GUI Programming 1 at UMASS Lowell
*/

/*
the introduction for validate() :https://jqueryvalidation.org/validate/
how to use rules() and messages(): https://stackoverflow.com/questions/14179417/jquery-validation-rules-and-messages

I used rules()first to define what the expected input should be, then use messages() to display the error to users 
starightly when they enter invalid input.
*/
$(document).ready(function() {

  $("form").validate({
      rules: {
          h_start: {
              number: true,
              required: true,
              min: -50,
              max: 50
          },
          h_end: {
              number: true,
              required: true,
              min: -50,
              max: 50
          },
          v_start: {
              number: true,
              required: true,
              min: -50,
              max: 50
          },
          v_end: {
              number: true,
              required: true,
              min: -50,
              max: 50
          },
      },
/*
   number: means the input has to be a number, 
   required: means the input box has to be filled 
    min and max mean the minimum and maximum value of valid numbers.
   validator will check if input is not satisfied with those conditions, it will show the error messages next to the input box.
 */

      messages: {
          h_start: {
              number: "&nbsp; Invalid input : not a number",
              required: "&nbsp; Invalid input : please enter a number",
              min: "&nbsp; Invalid input : number must be > -50",
              max: "&nbsp; Invalid input : number must be < 50" 
          },
          h_end: {
              number: "&nbsp; Invalid input : not a number",
              required: "&nbsp; Invalid input : please enter a number",
              min: "&nbsp; Invalid input : number must be > -50",
              max: "&nbsp; Invalid input : number must be < 50" 
          },
          v_start: {
              number: "&nbsp; Invalid input : not a number",
              required: "&nbsp; Invalid input : please enter a number",
              min: "&nbsp; Invalid input : number must be > -50",
              max: "&nbsp; Invalid input : number must be < 50" 
          },
          v_end: {
              number: "&nbsp; Invalid input : not a number",
              required: "&nbsp; Invalid input : please enter a number",
              min: "&nbsp; Invalid input : number must be > -50",
              max: "&nbsp; Invalid input : number must be < 50" 
          },
      },

 /*
 https://jqueryvalidation.org/validate/
 submitHandler (default: native form submit) Callback for handling the actual submit when the form is valid. 
 Gets the form and the submit event as the only arguments. Replaces the default submit. The right place to submit a 
 form via Ajax after it is validated.
 invalidHandler Callback for custom code when an invalid form is submitted. Called with an event object as the first 
 argument, and the validator as the second. 
 empty() is used for next form if there is more valid input then clean the last form data.
 */     
      submitHandler: function() {
          calculation();
          return false;
      },
      invalidHandler: function() {
          $("#mult_table").empty();
      }
  });
});

/*
 the following code is totally same as my HW5
 */
function calculation() 
{  
  //like what we did for inclass exercise, us get ElementById TO GET THE value for varibles
  var h_start = Number(document.getElementById('h_start').value);
  var h_end = Number(document.getElementById('h_end').value);
  var v_start = Number(document.getElementById('v_start').value);
  var v_end = Number(document.getElementById('v_end').value);

  // alert user input number range when they input something bigger or smaller.
  if ((h_start < -50 || h_start > 50) ||
        (h_end < -50 || h_end > 50) ||
        (v_start < -50 || v_start > 50) ||
        (v_end < -50 || v_end > 50)
    ) {
        alert("Please input number between -50 and 50.");
        return;
    }
  // this part is to make sure start number is small than end number, if not, swap them.
  if (h_start > h_end) 
  {
    var temp = h_start;
    h_start = h_end;
    h_end = temp;
  }
  if (v_start > v_end) 
  {
    var temp = v_start;
    v_start = v_end;
    v_end = temp;
  }

 // matrix structure is good for fill the table data and make sure the number are absulute because
 //rows and colunms can not be negative
 // and then initialize the number to new 2 vars for calulating.
  var matrix = {};
  var rows = Math.abs(h_end - h_start);
  var columns = Math.abs(v_end - v_start);
  var hor_number = h_start;
  var ver_number = v_start;

  // use an array to calculate each value in rows and columns and put result into object arr
   
  for (var x = 0; x <= columns; x++) 
  {
    var arr = [];
    for (var y = 0; y <= rows; y++) 
    {
      var calc = hor_number * ver_number;
      arr [y] = calc;
      hor_number++;
    }
    matrix["row" + x] = arr

//reset hor_number to start.
    hor_number = h_start;       
    ver_number++;
  }

// call fill fuction to put result into each box
    fill(matrix);
    return false;
}


function fill(matrix) 
{

  //those part are working as same as calculation fuctions.
  var h_start = Number(document.getElementById('h_start').value);
  var h_end = Number(document.getElementById('h_end').value);
  var v_start = Number(document.getElementById('v_start').value);
  var v_end = Number(document.getElementById('v_end').value);
  if (h_start > h_end)
  {
    var temp = h_start;
    h_start = h_end;
    h_end = temp;
  }
  if (v_start > v_end) 
  {
    var temp = v_start;
    v_start = v_end;
    v_end = temp;
  }
  var rows = Math.abs(h_end - h_start);
  var columns = Math.abs(v_end - v_start);


  var fill_number = "";

  // style the table and make sure table can aotumatically change its size for better readability
  fill_number += "<table style='width:" + (rows + 1) * 40 + "px'>";
  fill_number += "<tr><td></td>"; //create a empty space at top-left


  //use for loop to fill first row
  for (var r = h_start; r <= h_end; r++) 
  {
    fill_number += "<td>" + r + "</td>";
  }
    fill_number += "</tr>"; // end the fill for first row
    var ver_number = v_start;// fill the left columns

  // use for loop fill all the rest rows.
  for (var x = 0; x <= columns; x++) 
  {
    fill_number += "<tr><td>" + ver_number + "</td>";
    for (var y = 0; y <= rows; y++) 
    {
      fill_number += "<td>" + matrix["row" + x][y] + "</td>";
       // calculation happened here and fill into each rows
    }
     ver_number++;
  }

  $("#mult_table").html(fill_number);// let html load the multiplication_table 
  
}
