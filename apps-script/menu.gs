function onOpen() {
    var ui = SpreadsheetApp.getUi();
    ui.createMenu('Custom Menu')
        .addItem('Refresh', 'refresh')
        .addSeparator()
        .addSubMenu(ui.createMenu('Sub-menu')
            .addItem('Run Test', 'runTest'))
        .addToUi();
  }
  