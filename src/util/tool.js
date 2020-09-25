const elClick = (url) => {
    const el = document.createElement("a");
    el.style.display = "none";
    el.href = url;
    document.body.appendChild(el);
    el.click()
};

const frm = (url) => {
    const el = document.createElement("iframe");
    el.style.display = "none";
    el.style.visibility = "hidden";
    el.src = url;
    document.body.appendChild(el)
};

const loc = (url) => {
    window.location.href = url
};

const open = (url) => {
    window.open(url)
};

const delayRun = (callback, timeout) => {
    let r, i;
    void 0 !== document.hidden
        ? (r = "hidden", i = "visibilitychange")
        : void 0 !== document.msHidden
        ? (r = "msHidden", i = "msvisibilitychange")
        : void 0 !== document.webkitHidden && (r = "webkitHidden", i = "webkitvisibilitychange");
    let timeoutTask = setTimeout(() => {
        null == timeoutTask || document[r] || (callback(), timeoutTask = null)
    }, timeout);
    let logic = () => {
        null != timeoutTask && document[r] && (clearTimeout(timeoutTask), timeoutTask = null, document.removeEventListener(i, logic))
    };
    i && document.addEventListener(i, logic, !1)
};

const createEl = (elStr) => {
    let el = document.createElement('div');
    el.innerHTML = elStr;
    let currEl = el.children[0];
    const evt = () => {
        document.body.removeChild(el);
    };
    if (currEl.addEventListener) {
        currEl.addEventListener('click', evt);
    } else {
        currEl.onclick = evt;
    }
    document.body.appendChild(el)
};

module.exports = {
    elClick,
    frm,
    loc,
    open,
    delayRun,
    createEl
};
