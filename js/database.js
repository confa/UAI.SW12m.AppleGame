/**
 * Created with JetBrains WebStorm.
 * User: Kirill
 * Date: 04.12.12
 * Time: 20:53
 * To change this template use File | Settings | File Templates.
 */

function dbOpen()
{
    try {
        if (!window.openDatabase) {
            alert('not supported');
        } else {
            var shortName = 'GameDB';
            var version = '1.0';
            var displayName = 'Apple Mania Game DB';
            var maxSize = 65536; // in bytes
            db = openDatabase(shortName, version, displayName, maxSize);

        }
    } catch(e) {
        // Error handling code goes here.
        if (e == 2) {
            // Version number mismatch.
            alert("Invalid database version.");
        } else {
            alert("Unknown error "+e+".");
        }
        return;
    }
}

function nullDataHandler(transaction, results)
{
}
function errorHandler(transaction, results)
{
}

function createTables()
{
    db.transaction(function (transaction)
    {
        transaction.executeSql('CREATE TABLE awards(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL DEFAULT "Player", score INT NOT NULL DEFAULT "0");', [], nullDataHandler, errorHandler);
    });
}

function addNewScore(name, score)
{
    db.transaction(function (transaction)
    {
        transaction.executeSql('INSERT into awards (name, score) VALUES ("'+name+'", '+score+');', [], nullDataHandler, errorHandler);
    });
}

function dataHandler(transaction, results)
{
    for (var i=0; i<results.rows.length; i++) {
        var row = results.rows.item(i);
        $('#awardsTable').append('<tr><td>'+row['name']+'</td><td>'+row['score']+'</td></tr>');
    }

    $('#awardsTable tr').filter(':even').addClass('success');
    $('#awardsTable tr').filter(':odd').addClass('warning');
    $('#awardsTable tr').filter(':eq').addClass('error');
}

function selectAwardsList()
{
    db.transaction(
        function (transaction) {
            transaction.executeSql('SELECT * from awards t ORDER BY t.score;', [], dataHandler, errorHandler);
        }
    );
}

$(function(){
    dbOpen();
    createTables();
    selectAwardsList();
});