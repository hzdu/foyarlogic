$(function () {
    $("#goodslist").on("click","tr",function(e){
        var dataid = $(this).children().eq(0).attr("dataid");
        console.log(dataid);
        window.location.href = "/viewgoods?id="+dataid;
    })
})