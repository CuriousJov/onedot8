//Log-in form
//https://stackoverflow.com/questions/71001522/how-can-i-create-login-form-that-uses-data-from-google-sheet-database

function login(obj) {
  const ss = SpreadsheetApp.getActive();
  const sh = ss.getSheetByName('Users');
  const vs = sh.getRange(2,1,sh.getLastRow() - 1, 2).getValues();
  let robj = {loggedin:false};
  for(let i = 0;i<vs.length; i++) {
    if(vs[i][0] == obj.userid && vs[i][1] == obj.password) {
      robj.loggedin = true;
      break;
    }
  }
  return robj;
}

function launchLogin() {
  const ui = SpreadsheetApp.getUi();
  ui.showModelessDialog(HtmlService.createHtmlOutputFromFile("ah1"),"Login Form");
}





//https://www.labnol.org/file-uploads-folder-google-forms-201226
// Complete web app form input

function doGet() {
  return HtmlService.createTemplateFromFile('DataTable')
    .evaluate()
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
}

function doGet(e) {
    const userEmail = Session.getActiveUser().getEmail();
    var htmlOutput =  HtmlService.createTemplateFromFile('DataTable');
    htmlOutput.email = userEmail;
    return htmlOutput.evaluate()
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
}



function saveData(obj) {

  var folder = DriveApp.getFolderById("1ONAqcWXbM5CyePaVZfAqe64dBmiSsxlyj-RxHBPfv7kAlJvhuDkY7Bq3_cEm4CqJUt8p3YtZ"); //change to our folder id
  var file = ''
  if (obj.imagedata) {
    var datafile = Utilities.base64Decode(obj.imagedata)
    var blob = Utilities.newBlob(datafile, obj.filetype, obj.filename);
    file = folder.createFile(blob).getUrl()
  }


  const userEmail = Session.getActiveUser().getEmail();
  var ss= SpreadsheetApp.getActiveSpreadsheet();
  var dataSheet = ss.getSheetByName("rawData");
  dataSheet.appendRow([   
    obj.reference,
    obj.fileName,
    obj.fileDate,
    obj.unit,
    obj.category,
    obj.project,
    obj.activity,
    obj.tags,
    obj.url,
    file,
    userEmail,
    new Date(),
  ]);
  return true;

// var fdate = obj.fileDate.split("-")
// var filDate = LanguageApp.translate(Utilities.formatDate(new Date(fdate[0],parseInt(fdate[1])-1,parseInt(fdate[2])),'GMT+05:30','MM/dd/yyyy'),'en','in').split('-').map((a,i) =>{if(i != 2 || parseInt(a)>2100){return a}; a = parseInt(a)+0; return a}).join(' ')


// const userEmail = Session.getActiveUser().getEmail();

  // var rowData = [   
  //   obj.reference,
  //   obj.fileName,
  //   obj.fileDate,
  //   obj.unit,
  //   obj.category,
  //   obj.project,
  //   obj.activity,
  //   obj.tags,
  //   obj.url,
  //   file,
  //   userEmail,
  //   new Date(),
  // ];
//   SpreadsheetApp.getActive().getSheets()[0].appendRow(rowData);
//   return true
}


/**  INCLUDE HTML PARTS, EG. JAVASCRIPT, CSS, OTHER HTML FILES */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}



/**DataTable */
function getData() {
  var ss = SpreadsheetApp.getActiveSpreadsheet()
  var sheet = ss.getSheets()[0]
  var range = sheet.getDataRange()
  var values = range.getDisplayValues()
  Logger.log(values)
  return values
}
