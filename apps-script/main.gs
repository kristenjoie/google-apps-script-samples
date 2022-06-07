const ss = SpreadsheetApp.getActive();
const sheet = ss.getSheetByName('Sample Sheet');

function refresh() {
  const cellCurrentTime = sheet.getRange("A3");
  const cellIP = sheet.getRange("B3");

  cellCurrentTime.setValue(apiGETtime());
  cellIP.setValue(JSON.parse(apiGETIP()).ip);
}

function runTest() {

  const testCellRange = { firstRow: "8", leftColumn: "1", rightColumn: "8" }
  var testRange = sheet.getRange(testCellRange.firstRow, testCellRange.leftColumn, sheet.getLastRow() - 1, testCellRange.rightColumn)
  var testValues = testRange.getValues()

  for (var i = 0; i < testValues.length; i++) {

    var toRun = testValues[i][0]
    var time = testValues[i][1]
    var type = testValues[i][2]
    var years = testValues[i][3]
    var months = testValues[i][4]
    var days = testValues[i][5]

    var expected = testValues[i][6]

    if (toRun === 'yes') { // so we can, in the sheet, only select the test case to run
      if (type === 'add') {
        var response = JSON.parse(apiAddTime(time, years, months, days)).sum
      } else if (type === 'subtract') {
        var response = JSON.parse(apiSubtractTime(time, years, months, days)).difference
      } else {
        console.error('Incorrect Operation type: must be "add" or "subtract"')
      }

      // format response
      var cellResult = testRange.getCell(i + 1, testCellRange.rightColumn)
      var response_date = new Date(response)

      var year = response_date.getUTCFullYear()
      var month = response_date.getUTCMonth() + 1
      var dt = response_date.getUTCDate()
      if (dt < 10) dt = '0' + dt;
      if (month < 10) month = '0' + month;
      // write response in the sheet
      cellResult.setValue(`${year}-${month}-${dt}`)

      if (expected != '') { // do comparaison
        var expected_date = new Date(expected)
        if (expected_date.getTime() === response_date.getTime()) {
          cellResult.setBackgroundRGB(0, 255, 0)
        } else {
          cellResult.setBackgroundRGB(255, 0, 0)
        }
      } else {
        cellResult.setBackgroundRGB(255, 255, 255)
      }
    }
  }
}