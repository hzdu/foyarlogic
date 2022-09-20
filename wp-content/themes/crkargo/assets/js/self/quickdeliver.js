$(function () {
    $(".inputtoken").focus();

    $(".inputtoken").keypress(function (e) {
        if (e.which == 13) {
            $(".deliverbtn").click();
        }
    });

    $("body").on("click", ".deliverbtn", function (){
        var isjiesuan;
        var luodifei = $(".inputluodifei").val();
        var inputtoken = $('.inputtoken').val();
        if (isEmpty(inputtoken)) {
            xtip.msg(ee("对不起,签收密码不能为空"), {times: 4,icon: "e"});
            $(".inputtoken").focus();
            return;
        }
        switch ($(".caiwu_jiesuan").prop("checked")) {
            case true:
                isjiesuan = "1";
                break;
            case false:
                isjiesuan = "0";
                break;
        }
        var da = JSON.stringify({
            m: "deliver",
            num: appnum,
            token: inputtoken,
            luodifei: luodifei,
            jiesuan:isjiesuan,
        });
        loading = xtip.load();
        $.ajax({
            type: "POST",
            url: appdomain + "wp-content/themes/crkargo/api/quickdeliverapi.php",
            contentType: "application/json;charset=UTF-8",
            data: da,
            success: function (data) {
                xtip.close(loading);
                if (data.code!=200){
                    // Qual.sdb(data.msg);
                    xtip.msg(data.msg, {times: 4,icon: "w"});
                }else{
                    $(".arrivedinfo").html(data.msg);
                    $(".tracknumber").html(data.tracknumber);
                    $(".goodsnumber").html(data.goodsnumber);
                    $(".customername").html(data.customername);
                    $(".customerphone").html(data.phone);
                    $(".customeraddress").html(data.address);
                    $(".customerpostcode").html(data.postcode);
                    $(".huozhi").html(data.huozhi);
                    $(".luodifei").html(data.luodifei);
                    $(".yunfei").html(data.yunfei);
                    $(".shishoubaoxianfei").html(data.shishoubaoxianfei);
                    $(".daishou").html(data.daishou);
                }
            },
        });

    })
})