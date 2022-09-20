$(function () {
    $("html").attr("class", "light-theme");
    $(".bx-arrow-to-left").click();
    $("#ed_gongsitubiao").FancyFileUpload({
        url: appdomain + "wp-content/themes/crkargo/api/invoiceupload.php",
        params: {
            fileuploader: "1",
        },
        recordaudio: true,
        recordvideo: true,
        maxfilesize: 1000000,
        edit: false,
        uploadcompleted: function (e, data) {
            var fname = data.result.filename;
            fname = fname.replace("..", "");
            $("#gongsilogo").attr("src", uploaddir+fname);
            $("#ed_gongsitubiaoyulan").attr("src", uploaddir+fname);
        },
    });

    $("#ed_gongsishoukuanzhanghaotupian").FancyFileUpload({
        url: appdomain + "wp-content/themes/crkargo/api/invoiceupload2.php",
        params: {
            fileuploader: "1",
        },
        recordaudio: true,
        recordvideo: true,
        maxfilesize: 1000000,
        edit: false,
        uploadcompleted: function (e, data) {
            var fname = data.result.filename;
            fname = fname.replace("..", "");
            $("#ed_gongsishoukuanzhanghaotupianyulan").attr("src", uploaddir+fname);
        },
    });
    tinymce.init({
        selector: '#ed_inp_gongsishoukuanzhanghao'
    });
    tinymce.init({
        selector: '#ed_inp_gongsishoukuanbeizhu'
    });

    $("body").on("click", ".inp_save_btn",function () {
        var gongsimingcheng = $("#ed_inp_gongsimingcheng").val();
        var gongsidizhi = $("#ed_inp_gongsidizhi").val();
        var gongsilianxiren = $("#ed_inp_gongsilianxiren").val();
        var gongsidianhua = $("#ed_inp_gongsidianhua").val();
        var gongsishoukuanzhanghao = tinyMCE.get("ed_inp_gongsishoukuanzhanghao").getContent();
        var gongsishoukuanbeizhu = tinyMCE.get("ed_inp_gongsishoukuanbeizhu").getContent();
        var da = JSON.stringify({
            m: "edit",
            gongsimingcheng: gongsimingcheng,
            gongsidizhi: gongsidizhi,
            gongsilianxiren: gongsilianxiren,
            gongsidianhua: gongsidianhua,
            gongsishoukuanzhanghao: gongsishoukuanzhanghao,
            gongsishoukuanbeizhu: gongsishoukuanbeizhu,
        });
        loading = xtip.load();
        $.ajax({
            type: "POST",
            url: appdomain + "wp-content/themes/crkargo/api/invoiceapi.php",
            contentType: "application/json;charset=UTF-8",
            data: da,
            success: function (data) {
                xtip.close(loading);
                $("#basicsetting_dialog").modal('hide');
                if (data.code != 200) {
                    xtip.msg(data.msg, {times: 4,icon: "w"});
                } else {
                    xtip.msg(data.msg, {times: 4,icon: "s"});
                    $(".gongsimingcheng").html(gongsimingcheng);
                    $(".gongsidizhi").html(gongsidizhi);
                    $(".gongsilianxiren").html(gongsilianxiren);
                    $(".gongsidianhua").html(gongsidianhua);
                    $(".ed_inp_gongsishoukuanzhanghao").html(gongsishoukuanzhanghao);
                    $(".ed_inp_gongsishoukuanbeizhu").html(gongsishoukuanbeizhu);
                }
            },
        });
    })

    $("body").on("click", ".bascisettingbtn",function () {
        var da = JSON.stringify({
            m: "getone",
        });
        loading = xtip.load();
        $.ajax({
            type: "POST",
            url: appdomain + "wp-content/themes/crkargo/api/invoiceapi.php",
            contentType: "application/json;charset=UTF-8",
            data: da,
            success: function (data) {
                xtip.close(loading);
                if (data.code != 200) {
                    xtip.msg(data.msg, {times: 4,icon: "w"});
                } else {
                    $("#ed_gongsitubiaoyulan").attr("src", uploaddir+data.gongsitubiao);
                    $("#ed_inp_gongsimingcheng").val(data.gongsiquancheng);
                    $("#ed_inp_gongsidizhi").val(data.gongsidizhi);
                    $("#ed_inp_gongsilianxiren").val(data.gongsilianxiren);
                    $("#ed_inp_gongsidianhua").val(data.gongsidianhua);
                    $("#ed_gongsishoukuanzhanghaotupianyulan").attr("src", uploaddir+data.gongsishoukuanzhanghaotupian);
                    tinyMCE.get("ed_inp_gongsishoukuanzhanghao").setContent(data.gongsishoukuanzhanghao);
                    tinyMCE.get("ed_inp_gongsishoukuanbeizhu").setContent(data.gongsishoukuanbeizhu);
                }
            },
        });
    })

    $("body").on("click", ".exportpdf",function () {
        // var html = $("#invoice").prop("outerHTML");
        // var da = JSON.stringify({
        //     tracknumber: tracknumber,
        //     html: html,
        // });
        // loading = xtip.load();
        // $.ajax({
        //     type: "POST",
        //     url: appdomain + "wp-content/themes/crkargo/exportpdf.php",
        //     contentType: "application/json;charset=UTF-8",
        //     data: da,
        //     success: function (data) {},
        // });
        // xtip.close(loading);
        $("#invoice").print({
            globalStyles:true,//否包父文档的样，默为true
            mediaPrint:false,//是否含media='print'的链接标签。会被globalStyles选项覆，默认false
            stylesheet:null,//外部样表的URL地，认为null
            noPrintSelector:".no-print",//不想打印元素的jQuery择器，默为".no-print"
            iframe:true,//否使用一个iframe替代打印表单的出窗，true为在页面进行印，false就是新开一页面打印，默认为true
            append:null,//将容添加到打印内的面
            prepend:null,//容添加到打印内容的前，可用来作为要打印内
            deferred:$.Deferred()//回调函数
        });
    })

})