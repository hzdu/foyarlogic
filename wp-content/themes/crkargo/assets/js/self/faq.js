$(function () {
    var selid;
    $(".editfaq").on("click", function () {
        var id = $(this).attr("dataid");
        selid = id;
        var da = JSON.stringify({
            m: "getone",
            id: id,
        });
        loading = xtip.load();
        $.ajax({
            type: "POST",
            url: appdomain + "wp-content/themes/crkargo/api/faqapi.php",
            contentType: "application/json;charset=UTF-8",
            data: da,
            success: function (data) {
                if (data.code != 200) {
                    // Qual.sdb(data.msg);
                    xtip.msg(data.msg, {times: 4,icon: "e"});
                } else {
                    $("#ed_input_faq_title").val(data.title);
                    $("#ed_input_faq_content").val(data.content);
                }
                xtip.close(loading);
            },
        });
    })

    $(".savefaqbtn").on("click", function () {
        var title = $("#input_faq_title").val();
        var content = $("#input_faq_content").val();
        if (isEmpty(title)){
            Qual.sdb("对不起!问题不能为空");
            return;
        }
        if (isEmpty(content)){
            Qual.sdb("对不起!答案不能为空");
            return;
        }
        var da = JSON.stringify({
            m: "add",
            title: title,
            content: content,
        });
        loading = xtip.load();
        $.ajax({
            type: "POST",
            url: appdomain + "wp-content/themes/crkargo/api/faqapi.php",
            contentType: "application/json;charset=UTF-8",
            data: da,
            success: function (data) {
                if (data.code != 200) {
                    // Qual.sdb(data.msg);
                    xtip.msg(data.msg, {times: 4,icon: "e"});
                } else {
                    window.location.reload();
                }
                xtip.close(loading);
            },
        });
    })

    $(".editfaqbtn").on("click", function () {
        var title = $("#ed_input_faq_title").val();
        var content = $("#ed_input_faq_content").val();
        if (isEmpty(title)){
            Qual.sdb("对不起!问题不能为空");
            return;
        }
        if (isEmpty(content)){
            Qual.sdb("对不起!答案不能为空");
            return;
        }
        var da = JSON.stringify({
            m: "edit",
            id: selid,
            title: title,
            content: content,
        });
        loading = xtip.load();
        $.ajax({
            type: "POST",
            url: appdomain + "wp-content/themes/crkargo/api/faqapi.php",
            contentType: "application/json;charset=UTF-8",
            data: da,
            success: function (data) {
                if (data.code != 200) {
                    // Qual.sdb(data.msg);
                    xtip.msg(data.msg, {times: 4,icon: "e"});
                } else {
                    window.location.reload();
                }
                xtip.close(loading);
            },
        });
    })

    $(".delfaq").on("click", function () {
        var id = $(this).attr("dataid");
        var da = JSON.stringify({
            m: "delete",
            id: id,
        });
        loading = xtip.load();
        $.ajax({
            type: "POST",
            url: appdomain + "wp-content/themes/crkargo/api/faqapi.php",
            contentType: "application/json;charset=UTF-8",
            data: da,
            success: function (data) {
                if (data.code != 200) {
                    // Qual.sdb(data.msg);
                    xtip.msg(data.msg, {times: 4,icon: "e"});
                } else {
                    window.location.reload();
                }
                xtip.close(loading);
            },
        });
    })

})