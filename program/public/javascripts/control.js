$(document).ready(function() {
    $('#search').click(function (event) {
        event.preventDefault();
        var str=$('#somebook').val();
        $('.col-sm-6 ').each(function(){
            if(!$(this).text().match(str)){
                $(this).hide(1000);
            }else{
                $(this).show(1000);
            }
        })
    });
});