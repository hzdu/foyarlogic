$(function () {
    $("#updateroles").on("click", function () {
        var userid = $(this).attr("dataid");
        var inputusername = $("#inputusername").val();
        var inputaddress = $("#inputaddress").val();
        var inputphone = $("#inputphone").val();
        var inputemail = $("#inputemail").val();
        var inputwebchat = $("#inputwebchat").val();
        var inputwhatsapp = $("#inputwhatsapp").val();
        var inputtelegram = $("#inputtelegram").val();

        if (isEmpty(inputusername)) {
            // Qual.sdb(ee("对不起!姓名不能为空"));
            xtip.msg(ee("对不起!姓名不能为空"), {times: 4,icon: "e"});
            return;
        }
        if (isEmpty(inputaddress)) {
            // Qual.sdb(ee("对不起!地址不能为空"));
            xtip.msg(ee("对不起!地址不能为空"), {times: 4,icon: "e"});
            return;
        }
        if (isEmpty(inputphone)) {
            // Qual.sdb(ee("对不起!电话不能为空"));
            xtip.msg(ee("对不起!电话不能为空"), {times: 4,icon: "e"});
            return;
        }
        if (isEmpty(inputemail)) {
            // Qual.sdb(ee("对不起!电子邮件不能为空"));
            xtip.msg(ee("对不起!电子邮件不能为空"), {times: 4,icon: "e"});
            return;
        }

        var da = JSON.stringify({
            m: "edit",
            id: userid,
            inputusername: inputusername,
            inputaddress: inputaddress,
            inputphone: inputphone,
            inputemail: inputemail,
            inputwebchat: inputwebchat,
            inputwhatsapp: inputwhatsapp,
            inputtelegram: inputtelegram,
        });
        loading = xtip.load();
        $.ajax({
            type: "POST",
            url: appdomain+ "/wp-content/themes/crkargo/api/mycardapi.php",
            contentType: "application/json;charset=UTF-8",
            data: da,
            success: function (data) {
                if (data.code != 200) {
                    // Qual.sdb(data.msg);
                    xtip.msg(data.msg, {times: 4,icon: "w"});
                } else {
                    // Qual.sdb(data.msg);
                    xtip.msg(data.msg, {times: 4,icon: "s"});
                }
                xtip.close(loading);
            },
        });

    })
})