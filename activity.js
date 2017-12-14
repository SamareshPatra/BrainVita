/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function () {
    marked = 0;
    dataVal = 0;
    newDataVale = 0;
    $("td").each(function (index) {
        $(this).on("click", function () {
            var className = $(this).attr('class');

            if (className == "ball") {
                if (marked == 0) {
                    marked = index;
                    dataVal = $('td:eq(' + marked + ')').attr('data');
                    $(this).css("background-color", "red");
                } else {
                    var markedBlock = $('td:eq(' + marked + ')');
                    marked = index;
                    dataVal = $('td:eq(' + marked + ')').attr('data');
                    markedBlock.css("background-color", "aquamarine");
                    $(this).css("background-color", "red");
                }
            }

            if (className == "normal") {

                if (marked == 0) {
                    alert("Please select a marbel first");

                } else {
                    newDataVal = $('td:eq(' + index + ')').attr('data');
                    if (checkDiff(dataVal, newDataVal)) {

                        var midPos = getMiddlePos(dataVal, newDataVal);
                        if (getMiddleId(midPos)) {        //check if middle cell is there or not
                            emptyMiddleCell(midPos);    //make the middle cell empty

                            var markedBlock = $('td:eq(' + marked + ')');
                            markedBlock.css("background-color", "aquamarine");
                            markedBlock.find('div').remove('circle');
                            markedBlock.find('div').remove('div');
                            markedBlock.removeClass('ball');
                            markedBlock.addClass('normal');
                            markedBlock.css("background-color", "beige");

                            marked = index;
                            newDataVal = $('td:eq(' + marked + ')').attr('data');
                            $(this).css("background-color", "aquamarine");
                            $(this).find('div').remove('div');
                            $(this).append("<div class='circle'></div>");
                            $(this).removeClass('normal');
                            $(this).addClass('ball');
                        } else {
                            alert("Invalide Move !");
                        }
                    } else {
                        alert("Invalide Move !");
                    }
                }
            }
        });
    });
    //function to check the difference
    function checkDiff(d, nd) {
        var d = d.split("_");
        var nd = nd.split("_");
        if (d[0] == nd[0]) {
            if (d[1] != nd[1]) {
                if (getDiff(d[1], nd[1]) == 2) {
                    return true;
                } else {
                    return false;
                }
            }
        } else if (d[1] == nd[1]) {
            if (d[0] != nd[0]) {
                if (getDiff(d[0], nd[0]) == 2) {
                    return true;
                } else {
                    return false;
                }
            }
        } else {
            return false;
        }
    }
    //function to get difference value
    function getDiff(a, b) {
        return Math.abs(a - b);
    }

    //function to get middle position
    function getMiddlePos(oldIndex, newIndex) {
        var d = oldIndex.split("_");
        var nd = newIndex.split("_");
        if (d[0] == nd[0]) {
            if (d[1] != nd[1]) {
                var diff = getMiddleCoOrdinate(d[1], nd[1]);
                var midCO = d[0] + '_' + diff;
            }
        } else if (d[1] == nd[1]) {
            if (d[0] != nd[0]) {
                var diff = getMiddleCoOrdinate(d[0], nd[0]);
                var midCO = diff + '_' + d[1];
            }
        }
        return midCO.toString();
    }

    //function to get middle co-ordinate Id
    function getMiddleId(dataVal) {
        className = false;
        $('.ball').each(function (index) {
            var data = $(this).attr('data');
            if (data == dataVal) {
                var id = this.id;
                if ($('#' + id).find('div').attr('class') == 'circle') {
                    className = true;
                }
            }
        });
        return className;
    }

    //function to get middle co-ordinate
    function getMiddleCoOrdinate(first, last) {
        first = Number(first);
        last = Number(last);
        return Math.round((first + last) / 2);
    }

    //function to get id by co-ordinate
    function emptyMiddleCell(dataVal) {
        $('.ball').each(function (index) {
            var data = $(this).attr('data');
            if (data == dataVal) {
                var id = this.id;
                $('#' + id).find('div').remove('circle');
                $('#' + id).find('div').remove('div');
                $('#' + id).removeClass('ball');
                $('#' + id).addClass('normal');
                $('#' + id).css("background-color", "beige");
            }
        });
    }
    //function to fill the cell
    function fillCellOnClick(dataVal) {
        $('.ball').each(function (index) {
            var data = $(this).attr('data');
            if (data == dataVal) {
                var id = this.id;
                $('#' + id).removeClass('normal');
                $('#' + id).addClass('ball');
                $('#' + id).append('<div class="circle"></div>');
            }
        });
    }

});