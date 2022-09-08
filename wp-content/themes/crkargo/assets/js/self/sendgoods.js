$(function () {
  var product_fnames = [];
  // var transite_fnames = new Array();
  var seluserid = "null";
  var density;
  var tempuploadid = [];

  if ($("#cbgoodsvolume").prop("checked")) {
    $(".destailvolume").hide();
  }

  $("#productimgs").FancyFileUpload({
    url: appdomain + "wp-content/themes/crkargo/api/productupload.php",
    params: {
      fileuploader: "1",
    },
    recordaudio: true,
    recordvideo: true,
    maxfilesize: 1000000,
    edit: false,
    uploadcompleted: function (e, data) {
      // product_fnames.splice(0,product_fnames.length);
      tempuploadid.push(data.result.rand_trackid);
      var fname = data.result.filename;
      fname = fname.replace("..", "");
      product_fnames.push(fname);
      // console.log(product_fnames);
    },
  });
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

  $(".calcbaoxianfei").on("click", function () {
    var huozhi = $("#inputhuozhi").val();
    if (isEmpty(huozhi)){
      // Qual.sdb(ee("请先填入对应的货值"));
      xtip.msg(ee("请先填入对应的货值"), {times: 4,icon: "e"});
      return;
    }
    var baoxian = parseFloat(huozhi * 0.03);
    $("#inputshishoubaoxianfei").val(formatFloat(baoxian));
  })

  $("#cbgoodsvolume").change(function () {
    if ($("#inlinegoodsvolume").prop("checked")) {
      $(".goodsvolume").show();
      $(".destailvolume").hide();
    }else{
      $(".goodsvolume").hide();
      $(".destailvolume").show();
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

  $("#sel_channel").change(function () {
    $(".calcchannelamount").click();
  })

  //试算运费成本
  $(".calcchannelamount").on("click", function () {
    var inputgoodsweight = $("#inputgoodsweight").val();
    var inputgoodslong = $("#inputgoodslong").val();
    var inputgoodswidth = $("#inputgoodswidth").val();
    var inputgoodsheight = $("#inputgoodsheight").val();
    var inputgoodsvolume = $("#inputgoodsvolume").val();

    if (isEmpty(inputgoodsweight) || parseInt(inputgoodsweight)<0){
      // Qual.sdb(ee("对不起!货物重量不能为空或小于0"));
      xtip.msg(ee("对不起!货物重量不能为空或小于0"), {times: 4,icon: "e"});
      return;
    }
    if (isEmpty(inputgoodsvolume) || parseInt(inputgoodsvolume)<0){
      // Qual.sdb(ee("对不起!货物体积不能为空或小于0"));
      xtip.msg(ee("对不起!货物体积不能为空或小于0"), {times: 4,icon: "e"});
      return;
    }

    var da = JSON.stringify({
      m: "calcchannelamount",
      channelid: $("#sel_channel").val(),
      goodsweight: inputgoodsweight,
      goodslong: inputgoodslong,
      goodswidth: inputgoodswidth,
      goodsheight: inputgoodsheight,
      goodsvolume: inputgoodsvolume,
    });
    loading = xtip.load();
    $.ajax({
      type: "POST",
      url: appdomain + "wp-content/themes/crkargo/api/sendgoodsapi.php",
      contentType: "application/json;charset=UTF-8",
      data: da,
      success: function (data) {
        if (data.code != 200) {
          // Qual.sdb(data.msg);
          xtip.msg(data.msg, {times: 4,icon: "w"});
        } else {
          $("#input_gongbujia_yunfeizonge").val(data.amount);
          $("#input_gongbujia_yunfeidanjia").val(data.danjia);
          $(".showjisuanfangshi").html(data.jisuanfangshi);
        }
        xtip.close(loading);
      },
    });

  })

  $("#inputamountstatus").change(function () {
    if ($("#inputamountstatus").val()=="2"){
      $(".yufudiv").removeAttr("style");
    }else{
      $(".yufudiv").css("display", "none");
    }
  })

  $(".sendgoodsbtn").on("click", function () {
    if (seluserid === "null") {
      // Qual.sdb(ee("请选择收件人"));
      xtip.msg(ee("请选择收件人"), {times: 4,icon: "e"});
      return;
    }
    // $(".calcchannelamount").click();
    var inputcurrency = $("#inputcurrency").val();
    var inputamountstatus = $("#inputamountstatus").val();
    var inputtracknumber = $("#inputtracknumber").val();
    var inputgoodsnumber = $("#inputgoodsnumber").val();
    var inputgoodsweight = $("#inputgoodsweight").val();
    var inputproductname = $("#inputproductname").val();
    var inlinetransite = "0";
    var inputgoodslong = $("#inputgoodslong").val();
    var inputgoodswidth = $("#inputgoodswidth").val();
    var inputgoodsheight = $("#inputgoodsheight").val();
    var inputgoodsvolume = $("#inputgoodsvolume").val();
    var inputchannelamount = $("#inputchannelamount").val();
    var inputyufuamount = $("#inputyufuamount").val();
    var fahuoqudao = $("#sel_channel").val();
    var dabaofangshi = $("#seldabaofangshi").val();
    var dabaofei = $("#inputdabaofei").val();
    var shishoubaoxianfei = $("#inputshishoubaoxianfei").val();
    var daishoujine = $("#inputdaishoujine").val();
    var huozhi = $("#inputhuozhi").val();
    var zhifubaoxianfei = $("#inputzhichubaoxianfei").val();
    var danpiaoticheng = $("#seldanpiaoticheng").val();
    var ticheng = $("#inputticheng").val();
    var yunfeidanjia  = $("#input_gongbujia_yunfeidanjia").val();
    var yunfeizonge  = $("#input_gongbujia_yunfeizonge").val();
    var cbgoodsvolume;
    switch ($("#cbgoodsvolume").prop("checked")) {
      case true:
        cbgoodsvolume = 1;
        break;
      case false:
        cbgoodsvolume = 0;
        break;
    }
    if ($("#inlinetransite").prop("checked")) {
      inlinetransite = "1";
    }
    var da = JSON.stringify({
      m: "add",
      customerid: seluserid,
      currencyid: inputcurrency,
      amountstatusid: inputamountstatus,
      productimgs: product_fnames,
      tracknumber: inputtracknumber,
      goodsnumber: inputgoodsnumber,
      goodsweight: inputgoodsweight,
      productname: inputproductname,
      transite: inlinetransite,
      density: density,
      goodslong: inputgoodslong,
      goodswidth: inputgoodswidth,
      goodsheight: inputgoodsheight,
      goodsvolume: inputgoodsvolume,
      channelamount: inputchannelamount,
      channelid: fahuoqudao,
      yufuamount: inputyufuamount,
      dabaofangshi: dabaofangshi,
      dabaofei: dabaofei,
      shishoubaoxianfei: shishoubaoxianfei,
      daishoujine: daishoujine,
      huozhi: huozhi,
      zhifubaoxianfei: zhifubaoxianfei,
      danpiaoticheng: danpiaoticheng,
      ticheng: ticheng,
      yunfeidanjia: yunfeidanjia,
      yunfeizonge: yunfeizonge,
      cbgoodsvolume: cbgoodsvolume,
    });
    loading = xtip.load();
    $.ajax({
      type: "POST",
      url: appdomain + "wp-content/themes/crkargo/api/sendgoodsapi.php",
      contentType: "application/json;charset=UTF-8",
      data: da,
      success: function (data) {
        if (data.code != 200) {
          // Qual.sdb(data.msg);
          xtip.msg(data.msg, {times: 4,icon: "w"});
        } else {
          $("#primary-pills-home").html("");
          $("#primary-pills-home").append("<div id='qrcodeCanvas1'></div>");
          $("#primary-pills-profile").html("");
          $("#primary-pills-profile").append("<div id='qrcodeCanvas2'></div>");

          $('#qrcodeCanvas1').qrcode({
            text: appdomain + "quickdeliver/?num=" + data.newid
          });
          $('#qrcodeCanvas2').qrcode({
            text: appdomain + "search/?num=" + data.newid
          });
          // Qual.sdb(data.msg);
          xtip.msg(data.msg, {times: 4,icon: "s"});
        }
        xtip.close(loading);
      },
    });
  });
});
