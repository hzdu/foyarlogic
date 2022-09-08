$(function () {
  var pricetable_html = heredoc(function () {
    /*
    <tr>
        <td>
        <input class="form-check-input xuanhang" type="checkbox">
        </td>
        <td>
        <input class="form-control" type="text" placeholder="最小值">
        </td>
        <td>
        <input class="form-control" type="text" placeholder="最大值">
        </td>
        <td>
        <input class="form-control" type="text" placeholder="价格">
        </td>
        <td>
        <div class="btn-group">
            <button type="button" class="btn btn btn-primary delprice"><i class="bx bx-unlink"></i>
            </button>
        </div>
        </td>
    </tr>
      */
  });
  $(".xuanquanbu").change(function () {
    var c = $(this).prop("checked");
    switch (c) {
      case true:
        $(".xuanhang").prop("checked", true);
        break;
      case false:
        $(".xuanhang").prop("checked", false);
        break;
    }
  });
  $(document).on("click", ".newprice", function () {
    $("#pricetablecontent").append(pricetable_html);
  })
  $(".saveprice").on("click", function () {
    // 遍历表格获取所有数据并存储为json
    var milasUrl = {}; //新建对象，用来存储所有数据
    var subMilasUrlArr = {}; //存储每一行数据
    var tableData = {};
    $("#pricetablecontent tr").each(function (trindex, tritem) {
      //遍历每一行
      tableData[trindex] = new Array();
      $(tritem)
        .find("input")
        .each(function (tdindex, tditem) {
          tableData[trindex][tdindex] = $(tditem).val(); //遍历每一个数据，并存入
          subMilasUrlArr[trindex] = tableData[trindex]; //将每一行的数据存入
        });
      for (var key in subMilasUrlArr) {
        milasUrl[key] = subMilasUrlArr[key]; //将每一行存入对象
      }
    });
    var da = JSON.stringify({
      m: "add",
      id: $("#channelid").attr("dataid"),
      prices: milasUrl,
    });
    loading = xtip.load();
    $.ajax({
      type: "POST",
      url: appdomain + "wp-content/themes/crkargo/api/pricetableapi.php",
      contentType: "application/json;charset=UTF-8",
      data: da,
      success: function (data) {
        if (data.code != 200) {
          // Qual.sdb(data.msg);
          xtip.msg(data.msg, {times: 4,icon: "w"});
        } else {
          // console.log(data.msg);
          window.location.reload();
        }
        xtip.close(loading);
      },
    });
  });

  $("#pricetablecontent").on("click", ".delprice", function () {
    if(typeof($(this).attr("dataid"))=="undefined"){
      $(this).parent().parent().parent().remove();
    }else{
      var da = JSON.stringify({
        m: "delete",
        id: $(this).attr("dataid"),
      });
      loading = xtip.load();
      $.ajax({
        type: "POST",
        url: appdomain + "wp-content/themes/crkargo/api/pricetableapi.php",
        contentType: "application/json;charset=UTF-8",
        data: da,
        success: function (data) {
          if (data.code != 200) {
            // Qual.sdb(data.msg);
            xtip.msg(data.msg, {times: 4,icon: "w"});
          } else {
            // console.log(data);
            window.location.reload();
          }
          xtip.close(loading);
        },
      });
    }
  })

});
