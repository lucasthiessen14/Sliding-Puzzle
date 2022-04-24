//Variables needed to create and update the board
//The size variable can be changed depending how big you want the puzzle to be
var board = $("<div></div>");
var size = 3;
var width = 375;
var height = 375;
var piece_height = height / size;
var piece_width = width / size;
var piece_num = size * size - 1;
var data = [];

//Function that creates all the pieces in the puzzle
function create_pieces() {
    //Adds i number of arrays to data array turning it into a matrix
    for(var i = 0; i < size ; i++){
        data.push([]);
    }
    //For loop that puts all the peices into there proper location
    //Loop also adds the position of each tile to the data array
    for(var j = 0; j < piece_num; j++){
        var value = j+1;
        var piece = $("<div>" + value + "</div>");
        var col = j % size;
        var row = Math.floor(j / size);
        piece.addClass("piece-style");
        board.append(piece);
        piece.width(piece_width).height(piece_height);
        piece.css("font-size", Math.floor(piece_height * 2 / 3) + "px");
        piece.css("line-height", piece_height + "px");
        var x_pos = col * piece.width();
        var y_pos = row * piece.height();
        piece.css("top", y_pos);
        piece.css("left", x_pos);
        data[row].push(value);
    }

    //Sets the last entry in the data array to zero for the empty piece
    data[size - 1].push(0);
    $(".piece-style").click(clicked);
    
}

//Function that moves the pieces after they are clicked
function clicked(event){
    var x_pos;
    var y_pos;
    var change_x = 0;
    var change_y = 0;
    var piece = $(event.currentTarget);
    var value = parseInt(piece.text());

    //Nested for loops that calculates the x and y positions of the piece being clicked
    loop1:
    for(y_pos = 0; y_pos < size; y_pos++){
        for(x_pos = 0; x_pos < size; x_pos++){
            if(data[y_pos][x_pos] == value) {
                break loop1;
            }
        }
    }

    if(x_pos > 0 && data[y_pos][x_pos - 1] == 0){
        change_x = -1;
    } else if(x_pos < size -1 && data[y_pos][x_pos+1] == 0){
        change_x = 1
    } else if (y_pos > 0 && data[y_pos - 1][x_pos] == 0){
        change_y = -1;
    } else if (y_pos < size - 1 && data[y_pos + 1][x_pos] == 0) {
        change_y = 1;
    } else {
        return;
    }

    //Sets the value entry of the place the piece is being moved to in data to the correct value
    //Sets the value of the old position to zero because it is not empty
    data[y_pos + change_y][x_pos + change_x] = value;
    data[y_pos][x_pos] = 0;

    x_pos = (x_pos +change_x)*piece.width();
    y_pos = (y_pos + change_y)*piece.height();
    piece.css("top", y_pos);
    piece.css("left", x_pos);

}

//Calls create_pieces function and creates the game board
board.addClass("board-style");
board.width(width).height(height);
$("h1").parent().append(board);
create_pieces();