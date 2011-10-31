(function() {
    var d = document,
        id = "localStorageList",
        el = d.getElementById(id),
        i, s, es, k,
        ls = window.localStorage,
        ss = window.sessionStorage,
        style = ("<style>$ th, $ td {padding:0 1em;text-align:left;}$ th{font-weight:bold}$ pre{max-width:400px;max-height:300px;overflow:auto;white-space:pre-wrap;}$ h1{font:16px/32px sans-serif;}</style>").replace(/\$/g,"#"+id);
    if (!el) {
        el = d.createElement("table");
        d.body.appendChild(el);
        el.addEventListener("click",handler,!1);
    }
    function render() {
        s = style + "<tr><th colspan=3><h1>localStorage inspector</h1><th><a href=# class=x>close</a><tr><th>storage key<th>size<th><th><a href=# class=lca>clear all</a>";
        s += ls.length ? "" : "<tr><td>No Data";
        for (i=0;i<ls.length;i++) {
            k = ls.key(i);
            s += ("<tr><td>$<td>" + ls[k].length + "<td><a href=# data-k=$class=lv>view</a><td><a href=# data-k=$class=lc>clear</a>").replace(/\$/g,k);
        }
        s += "<tr><th colspan=3><h1>sessionStorage</h1><tr><th>storage key<th>size<th><th><a href=# class=sca>clear all</a>";
        s += ss.length ? "" : "<tr><td>No Data";
        for (i=0;i<ss.length;i++) {
            k = ss.key(i);
            s += ("<tr><td>$<td>" + ss[k].length + "<td><a href=# data-k=$class=sv>view</a><td><a href=# data-k=$class=sc>clear</a>").replace(/\$/g,k);
        }
        el.innerHTML = s;
    }
    function handler(e, t) {
        t=e.target;
        e.preventDefault();
        var k = t.getAttribute("data-k");
        switch (t.className) {
            case "lc":
                ls.removeItem(k);
                render();
                break;
            case "lv":
                t.parentNode.innerHTML = "<pre>" + ls[k] + "</pre>";
                break;
            case "lca":
                ls.clear();
                render();
                break;
            case "sc":
                ss.removeItem(k);
                render();
                break;
            case "sv":
                t.parentNode.innerHTML = "<pre>" + ss[k] + "</pre>";
                break;
            case "sca":
                ss.clear();
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