$(function () {
  var product_fnames = new Array();
  var transite_fnames = new Array();
  var tempuploadid = new Array();

  $('#qrcodeCanvas1').qrcode({
    text: appdomain + "quickdeliver/?num=" + trackid
  });
  $('#qrcodeCanvas2').qrcode({
    text: appdomain + "search/?num=" + trackid
  });

  $("#inlinewallet").change(function () {
    switch ($(this).prop("checked")) {
      case true:
        break;
      case false:
        break;
    }
  })

  $("#productimgs").FancyFileUpload({
    url: appdomain + "wp-content/themes/crkargo/api/productupload.php",
    params: {
      fileuploader: "1",
    },
    recordaudio: true,
    recordvideo: true,
    maxfilesize: -1,
    edit: false,
    uploadcompleted: function (e, data) {
      product_fnames.splice(0,product_fnames.length);
      tempuploadid.push(data.result.rand_trackid)
      var fname = data.result.filename;
      var activeimage;
      fname = fname.replace("..", "");
      product_fnames.push(fname);
      // console.log(product_fnames);
      product_fnames.forEach((v, i)=>{
        activeimage = heredoc(function () {/*
              <div class="carousel-item">
                  <img src="{0}" class="d-block w-100">
              </div>
            */});
        var imgurl = appdomain + "wp-content/themes/crkargo/" + v;
        $("#previewproductimage").append(String.format(activeimage, imgurl));
      });
      $(".carousel-item").each(function (){
        $(this).removeClass("active");
      });
      $(".carousel-item").each(function (index) {
        console.log(index);
        if (index===0){
          $(this).addClass("active");
        }
      });
    },
  });
  $("#transiteimgs").FancyFileUpload({
    url: appdomain + "wp-content/themes/crkargo/api/transiteupload.php",
    params: {
      fileuploader: "1",
    },
    recordaudio: true,
    recordvideo: true,
    maxfilesize: -1,
    edit: false,
    uploadcompleted: function (e, data) {
      var fname = data.result.filename;
      fname = fname.replace("..", "");
      transite_fnames.push(data.result.filename);
      // console.log(transite_fnames);
    },
  });

  $("#inlinetransite").change(function () {
    switch ($("#inlinetransite").prop("checked")) {
      case true:
        $(".uploadtransitecontrol").removeAttr("style");
        break;
      case false:
        $(".uploadtransitecontrol").css("display", "none");
        break;
    }
  });

  $("#inputyufuamount").on("input", function () {
    this.val(checkfloatnumber(this));
  });

  $("#inputamountstatus").change(function () {
    if ($("#inputamountstatus").val()=="2"){
      $(".yufudiv").removeAttr("style");
    }else{
      $(".yufudiv").css("display", "none");
    }
  })

  $("#seldanpiaoticheng").change(function () {
    switch ($(this).val()) {
      case "0":
        $("#inputticheng").prop("disabled", true);
        break;
      case "1":
        $("#inputticheng").prop("disabled", false);
        break;
      case "2":
        $("#inputticheng").prop("disabled", false);
        break;
    }
  })

  $(".calcbaoxianfei").on("click", function () {
    var huozhi = $("#inputhuozhi").val();
    if (isEmpty(huozhi)){
      // Qual.sdb(ee("???????????????????????????"));
      xtip.msg(ee("???????????????????????????"), {times: 4,icon: "e"});
      return;
    }
    var baoxian = parseFloat(huozhi * 0.03);
    $("#inputshishoubaoxianfei").val(formatFloat(baoxian));
  })

  $("#inputcustomername").change(function () {
    var id = $(this).val();
    if (id == "null") {
      $(".customerphone").html("");
      $(".customeraddress").html("");
      $(".customerpostcode").html("");
      return;
    }
    seluserid = id;
    var da = JSON.stringify({
      m: "getone",
      id: id,
    });
    loading = xtip.load();
    $.ajax({
      type: "POST",
      url: appdomain + "wp-content/themes/crkargo/api/customerapi.php",
      contentType: "application/json;charset=UTF-8",
      data: da,
      success: function (data) {
        if (data.code != 200) {
          // Qual.sdb(data.msg);
          xtip.msg(data.msg, {times: 4,icon: "w"});
        } else {
          $(".customerphone").html(data.phone);
          $(".customeraddress").html(data.address);
          $(".customerpostcode").html(data.postcode);
          $(".customerusdwallet").html(data.dollarwallet);
          $(".customersurwallet").html(data.rublewallet);
        }
        xtip.close(loading);
      },
    });
  });

  $("#inputtransitedamount").on("input", function () {
    this.val(checkfloatnumber(this));
  });

  $("#sel_channel").change(function () {
    $(".calcchannelamount").click();
  })

  //????????????????????????
  $(".calcchannelamount").on("click", function () {
    var inputgoodsweight = $("#inputgoodsweight").val();
    var inputgoodsvolume = $("#inputgoodsvolume").val();

    var da = JSON.stringify({
      m: "calcchannelamount",
      channelid: $("#sel_qudaoxianlu").val(),
      goodsweight: inputgoodsweight,
      goodsvolume: inputgoodsvolume,
    });
    loading = xtip.load();
    $.ajax({
      type: "POST",
      url: appdomain + "wp-content/themes/crkargo/api/editgoodsapi.php",
      contentType: "application/json;charset=UTF-8",
      data: da,
      success: function (data) {
        if (data.code != 200) {
          // Qual.sdb(data.msg);
          xtip.msg(data.msg, {times: 4,icon: "w"});
        } else {
          $("#input_qudao_yunfeidanjia").val(data.danjia);
          $("#input_qudao_yunfeizonge").val(data.zonge);
          $(".showqudaodanjia").html(data.fangshi);
        }
        xtip.close(loading);
      },
    });
  })

  //?????????????????????
  $(".calcgongbujia").on("click", function () {
    var inputgoodsweight = $("#inputgoodsweight").val();
    var inputgoodsvolume = $("#inputgoodsvolume").val();

    var da = JSON.stringify({
      m: "calcchannelamount",
      channelid: $("#sel_qudaoxianlu").val(),
      goodsweight: inputgoodsweight,
      goodsvolume: inputgoodsvolume,
    });
    loading = xtip.load();
    $.ajax({
      type: "POST",
      url: appdomain + "wp-content/themes/crkargo/api/editgoodsapi.php",
      contentType: "application/json;charset=UTF-8",
      data: da,
      success: function (data) {
        if (data.code != 200) {
          // Qual.sdb(data.msg);
          xtip.msg(data.msg, {times: 4,icon: "w"});
        } else {
          $("#input_qudao_yunfeidanjia").val(data.danjia);
          $("#input_qudao_yunfeizonge").val(data.zonge);
          $(".showgongbujiadanjia").html(data.fangshi);
        }
        xtip.close(loading);
      },
    });
  })

  $("#inputotheramount").on("input", function () {
    this.val(checkfloatnumber(this));
  });

  $(".editgoodsbtn").on("click", function () {
    if (seluserid == "null") {
      // Qual.sdb(ee("??????????????????"));
      xtip.msg(ee("??????????????????"), {times: 4,icon: "w"});
      return;
    }
    var id = goodsid;
    var inputcurrency = $("#inputcurrency").val();
    var inputamountstatus = $("#inputamountstatus").val();
    var inputtracknumber = $("#inputtracknumber").val();
    var inputgoodsnumber = $("#inputgoodsnumber").val();
    var inputgoodsweight = $("#inputgoodsweight").val();
    var inputproductname = $("#inputproductname").val();
    var inlinetransite = "0";
    var inlinesendedgoods = "0";
    var inlinecleared = "0";
    var inlinearrived = "0";
    var inputtransitedamount = $("#inputtransitedamount").val();
    var inputyufuamount = $("#inputyufuamount").val();

    var gongbujiaid = $("#sel_gongbujia").val();
    var gongbujiadanjia = $("#input_gongbujia_yunfeidanjia").val();
    var gongbujiazonge = $("#input_gongbujia_yunfeizonge").val();
    var qudaoid = $("#sel_qudaoxianlu").val();
    var qudaodanjia = $("#input_qudao_yunfeidanjia").val();
    var qudaozonge = $("#input_qudao_yunfeizonge").val();
    var dabaofangshi = $("#seldabaofangshi").val();
    var dabaofei = $("#inputdabaofei").val();
    var shishoubaoxianfei = $("#inputshishoubaoxianfei").val();
    var daishou = $("#inputdaishoujine").val();
    var huozhi = $("#inputhuozhi").val();
    var zhifubaoxianfei = $("#inputzhichubaoxianfei").val();
    var tichengmethod = $("#seldanpiaoticheng").val();
    var ticheng = $("#inputticheng").val();
    var luodifei = $("#inputluodifei").val();

    if (isEmpty(inputtracknumber)) {
      // Qual.sdb(ee("?????????!????????????????????????"));
      xtip.msg(ee("?????????!????????????????????????"), {times: 4,icon: "e"});
      return;
    }
    if ($("#inputamountstatus").val()=="2"){
      if (isEmpty(inputyufuamount)) {
        // Qual.sdb(ee("?????????!???????????????????????????"));
        xtip.msg(ee("?????????!?????????????????????????????????"), {times: 4,icon: "e"});
        return;
      }
      if (parseInt(inputyufuamount) <= 0) {
        // Qual.sdb(ee("?????????!??????????????????????????????0"));
        xtip.msg(ee("?????????!??????????????????????????????0"), {times: 4,icon: "e"});
        return;
      }
    }
    if (isEmpty(inputgoodsnumber)) {
      // Qual.sdb(ee("?????????!???????????????????????????"));
      xtip.msg(ee("?????????!???????????????????????????"), {times: 4,icon: "e"});
      return;
    }
    if (isEmpty(inputgoodsweight)) {
      // Qual.sdb(ee("?????????!???????????????????????????"));
      xtip.msg(ee("?????????!???????????????????????????"), {times: 4,icon: "e"});
      return;
    }
    if (isEmpty(inputproductname)) {
      // Qual.sdb(ee("?????????!?????????????????????"));
      xtip.msg(ee("?????????!?????????????????????"), {times: 4,icon: "e"});
      return;
    }
    if (parseInt(inputgoodsnumber) < 1) {
      // Qual.sdb(ee("?????????!???????????????????????????1"));
      xtip.msg(ee("?????????!???????????????????????????1"), {times: 4,icon: "e"});
      return;
    }
    if (parseInt(inputgoodsweight) <= 0) {
      // Qual.sdb(ee("?????????!???????????????????????????0"));
      xtip.msg(ee("?????????!???????????????????????????0"), {times: 4,icon: "e"});
      return;
    }
    if ($("#inlinetransite").prop("checked")) {
      if (isEmpty(inputtransitedamount)) {
        // Qual.sdb(ee("?????????!?????????????????????"));
        xtip.msg(ee("?????????!?????????????????????"), {times: 4,icon: "e"});
        return;
      }
      if (parseInt(inputtransitedamount) <= 0) {
        // Qual.sdb(ee("?????????!????????????????????????0"));
        xtip.msg(ee("?????????!????????????????????????0"), {times: 4,icon: "e"});
        return;
      }
      inlinetransite = "1";
    }

    function checkhedan(){
      var da = JSON.stringify({
        m: "checkhedan",
        id: trackid,
      });
      loading = xtip.load();
      $.ajax({
        type: "POST",
        url: appdomain + "wp-content/themes/crkargo/api/goodsapi.php",
        contentType: "application/json;charset=UTF-8",
        data: da,
        success: function (data) {
          xtip.close(loading);
          if (data.code != 200) {
            xtip.msg(ee(data.msg), {times: 4,icon: "e"});
            return false;
          } else {
            return true;
          }
        },
      });
    }

    switch ($("#inlinesendedgoods").prop("checked")) {
      case true:
        var hedan = checkhedan();
        switch (hedan) {
          case false:
            $("#inlinesendedgoods").prop("checked", false);
            break;
          case true:
            inlinesendedgoods = "1";
            $("#inlinesendedgoods").prop("checked", true);
            break;
        }
        break;
      case false:
        $("#inlinesendedgoods").prop("checked", false);
        inlinesendedgoods = "0";
        break;
    }

    switch ($("#inlinecleared").prop("checked")) {
      case true:
        inlinecleared = "1";
        break;
      case false:
        inlinecleared = "0";
        break;
    }

    switch ($("#inlinearrived").prop("checked")) {
      case true:
        inlinearrived = "1";
        break;
      case false:
        inlinearrived = "0";
        break;
    }

    if (isEmpty(luodifei)){
      // Qual.sdb(ee("?????????!????????????????????????"));
      xtip.msg(ee("?????????!????????????????????????"), {times: 4,icon: "e"});
      return;
    }

    var da = JSON.stringify({
      m: "edit",
      id: id,
      customerid: seluserid,
      currencyid: inputcurrency,
      amountstatusid: inputamountstatus,
      productimgs: product_fnames,
      transiteimgs: transite_fnames,
      tracknumber: inputtracknumber,
      goodsnumber: inputgoodsnumber,
      goodsweight: inputgoodsweight,
      productname: inputproductname,
      transite: inlinetransite,
      sendedgoods: inlinesendedgoods,
      cleared: inlinecleared,
      arrived: inlinearrived,
      transitedamount: inputtransitedamount,
      yufuamount: inputyufuamount,
      gongbujiaid: gongbujiaid,
      gongbujiadanjia: gongbujiadanjia,
      gongbujiazonge: gongbujiazonge,
      qudaoid: qudaoid,
      qudaodanjia: qudaodanjia,
      qudaozonge: qudaozonge,
      dabaofangshi: dabaofangshi,
      dabaofei: dabaofei,
      shishoubaoxianfei: shishoubaoxianfei,
      daishou: daishou,
      huozhi: huozhi,
      zhifubaoxianfei: zhifubaoxianfei,
      tichengmethod: tichengmethod,
      ticheng: ticheng,
      luodifei: luodifei,
    });
    loading = xtip.load();
    $.ajax({
      type: "POST",
      url: appdomain + "wp-content/themes/crkargo/api/editgoodsapi.php",
      contentType: "application/json;charset=UTF-8",
      data: da,
      success: function (data) {
        if (data.code != 200) {
          // Qual.sdb(data.msg);
          xtip.msg(data.msg, {times: 4,icon: "w"});
        } else {
          // Qual.sdb(data.msg);
          xtip.msg(data.msg, {times: 4,icon: "w"});
        }
        xtip.close(loading);
      },
    });
  });
});
