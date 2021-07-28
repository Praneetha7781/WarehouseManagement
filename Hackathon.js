var db = openDatabase("mydb", "1.0", "Store", 2 * 1024 * 1024);

function myfunction() {
    document.getElementById("Scan").innerText = "Scanned";
    var tableElement = document.getElementsByTagName("table")[0];
    var newrow = tableElement.insertRow(1);
    var cell1 = newrow.insertCell(0);
    var cell2 = newrow.insertCell(1);
    var name = document.getElementById("ProductEntry").value;
    cell1.innerHTML = name;
    cell2.innerHTML = "2";
}

function clearfunction() {
    var table = document.getElementById("table");
    var x = table.rows.length;
    var Quan;

    if (table.rows.length == 1) {
        alert("No rows");
    }
    else {
        for (i = 0; i < x - 1; i++) {
            table.deleteRow(1);
        }
        alert("Transaction Successful");
        db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS Shelf (Id, Quantity)');
            tx.executeSql('INSERT INTO Shelf (Id, Quantity) VALUES (1, 6)');
            tx.executeSql('INSERT INTO Shelf (Id, Quantity) VALUES (2, 50)');
        })
        
        db.transaction(function (tx) {
            tx.executeSql(
                'SELECT * FROM Shelf where Id=1',
                [],
                function (tx, results) {
                    Quan = results.rows.item(0).Quantity;
                    Quan=Quan - 2;
                    if (Quan<5)
                       alert("Hi Mark, There are only " + Quan + "Bread packets on Shelf. Please Refill") });


        });
    }

}

function Supervisor() {
    db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS Product (Id, ProductDescription, BatchNum, ExpiryDate)');
        tx.executeSql('INSERT INTO Product (Id, ProductDescription, BatchNum, ExpiryDate) VALUES (1, "Bread", "1234", "08-08-2021")');
        tx.executeSql('INSERT INTO Product (Id, ProductDescription, BatchNum, ExpiryDate) VALUES (2, "Butter", "1235", "07-07-2021")');
    })
   

    db.transaction(function (tx) {
        tx.executeSql(
            'SELECT * FROM Product where ExpiryDate="07-07-2021"',
         [],
            function (tx, results) {
                alert("Hi Mark, There are 12 " + results.rows.item(0).ProductDescription + " packets in lot " + results.rows.item(0).BatchNum+"  which will expire in 3 days. Here are few recommendations to sell them as soon as possible: Buy one Butter and Get a bread packet free or Buy a 1+1 Bread Packet.  ");
            });


    });
}
