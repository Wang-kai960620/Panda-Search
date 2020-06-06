const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);

const hashMap = xObject || [
  {
    logo: "https://juejin.im/favicon.ico",
    url: "https://juejin.im",
  },
  {
    logo: "https://www.bilibili.com/favicon.ico",
    url: "https://www.bilibili.com",
  },
];
const simplifyUrl = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, "");
};
const render = () => {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach((node, index) => {
    const $li = $(`<li>
    <div class="site">
      <div class="logo">
      <img src="${node.logo}" class="newLogo"></img>
      </div>
       <div class="link">${simplifyUrl(node.url)}</div>
        <div class = "close">
         <svg class="icon">
          <use xlink:href="#icon-bianji"></use>
         </svg>
        </div>
      </div>
  </li>`).insertBefore($lastLi);
    $li.on("click", () => {
      window.open(node.url);
    });
    $li.on("click", ".close", (e) => {
      e.stopPropagation();
      hashMap.splice(index, 1);
      render();
    });
  });
};
render();
$(".addButton").on("click", () => {
  let url = window.prompt("请问你要添加的网址是多少");
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }
  hashMap.push({
    logo: url + "/favicon.ico",
    url: url,
  });
  console.log(hashMap);
  render();
});

window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap);
  localStorage.setItem("x", string);
};
