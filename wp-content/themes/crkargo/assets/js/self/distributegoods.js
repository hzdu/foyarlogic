$(function () {
  $("#sendgoodsdate").val(new Date());
  $(".calcbtn").on("click", function () {
    var sendgoodsdate = $("#sendgoodsdate").val();
    dateFormat = /^(\d{4})-(\d{2})-(\d{2})$/;

    if (dateFormat.test(sendgoodsdate)) {
      calc(sendgoodsdate);
    } else {
      // Qual.sdb(ee("日期格式不正确"));
      xtip.msg(ee("日期格式不正确"), {times: 4,icon: "e"});
      return;
    }
  });

  function calc(dates) {
    var tablehtml = heredoc(function () {/*
        <div class="card">
            <div class="card-body">
                <h5 class="mb-0">方案-{0}</h5>
                <span class="badge bg-secondary">您的货物正常发货成本:{1}</span>
                <span class="badge bg-secondary">优化后发货成本为:{2}</span>
                <span class="badge bg-danger">采用优化后的方案可多赚金额:{3}</span>
                <hr />
                <div class="table-responsive">
                    <table class="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>运单号</th>
                                <th>密度</th>
                                <th>运费</th>
                                <th>渠道</th>
                            </tr>
                        </thead>
                        <tbody>
                        {4}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    */});
    var tablebodyhtml = heredoc(function () {/*
    <tr>
    <td>{0}</td>
    <td>{1}</td>
    <td>{2}</td>
    <td>{3}</td>
    </tr>
    <tr>
    <td>{4}</td>
    <td>{5}</td>
    <td>{6}</td>
    <td>{7}</td>
    </tr>    
    */});
    var da = JSON.stringify({
      m: "calc",
      dd: dates,
    });
    loading = xtip.load();
    $.ajax({
      type: "POST",
      url: appdomain + "wp-content/themes/crkargo/api/distributegoodsapi.php",
      contentType: "application/json;charset=UTF-8",
      data: da,
      success: function (data) {
        if (data.code != 200) {
          // Qual.sdb(data.msg);
          xtip.msg(data.msg, {times: 4,icon: "w"});
        } else {
          $("#pagemain").html("");
          var i = 1;
          $.each(data.plans, function (index, item) {
            var tablebody = String.format(tablebodyhtml, item[0].tracknumber, item[0].density,item[0].sumprice, item[0].channel_name, item[1].tracknumber, item[1].density,item[1].sumprice, item[1].channel_name);

            $("#pagemain").append(String.format(tablehtml, i, item.normalamount, item.planamount, item.diffamount, tablebody));
            i = i + 1;
          });
          xtip.close(loading);
          // Qual.sdb(data.msg);
        }
      },
    });
  }
});
