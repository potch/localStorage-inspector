(function() {
    var d = document,
        id = "localStorageList",
        el = d.getElementById(id),
        i, s, es, k,
        ls = window.localStorage,
        style = ("<style>$ th, $ td {padding:0 1em;text-align:left;}$ th{font-weight:bold}$ pre{max-width:400px;max-height:300px;overflow:auto;white-space:pre-wrap;}$ h1 {font-size:16px}</style>").replace(/\$/g,"#"+id);
    if (!el) {
        el = d.createElement("table");
        d.body.appendChild(el);
        el.addEventListener("click",handler,!1);
    }
    function render() {
        s = style +
            "<th colspan=3><h1>localStorage inspector</h1><th><a href=\"#\" class=\"x\">close</a><tr><th>storage key<th>size<th><th><a href=\"#\" class=\"ca\">clear all</a>";
        for (var i=0;i<ls.length;i++) {
            k = ls.key(i);
            s += ("<tr><td>$<td>" + ls[k].length + "<td><a href=\"#\" data-k=\"$\"class=\"v\">view</a><td><a href=\"#\" data-k=\"$\"class=\"c\">clear</a>").replace(/\$/g,k);
        }
        el.innerHTML = s;
    }
    function handler(e, t) {
        t=e.target;
        e.preventDefault();
        var k = t.getAttribute("data-k");
        switch (t.className) {
            case "c":
                ls.removeItem(k);
                render();
                break;
            case "v":
                t.parentNode.innerHTML = "<pre>" + ls[k] + "</pre>";
                break;
            case "ca":
                ls.clear();
                render();
                break;
            case "x":
                el.style.display="none";
                break;
        };
    }
    el.setAttribute("id", id);
    el.setAttribute("style","position:fixed;top:20px;right:20px;padding:20px;background:#fff;font:12px/20px monospace;z-index:99999;max-height:100%;overflow:auto;border-radius:10px;border:2px solid #000");
    el.style.display="block";
    render();
})();