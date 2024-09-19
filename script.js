window.addEventListener("load", function () {
    if(window.tableball)
    {
        console.log("---------------1111111111");
    //   window.tableball.tball(null,"https://www.126.com");
    //   window.tableball.jball();

          window.tableball.tball("good",null);
          window.tableball.jball();
          console.log("---------------set cookie in java ok, begin to get value in js");
          let cookies = document.cookie;
          console.log(cookies);
          window.tableball.tball("good",cookies);
          window.tableball.tball("good","good");
    }
    else
    {
        console.log("---------------2222222222");
    }
});


