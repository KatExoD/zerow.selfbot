window.onload = (() => {
    //Theme
    let theme = localStorage.getItem("theme")
    if(!["dark", "light"].includes(theme))theme = "dark"
    setTheme(theme)

    //terminal emulator
    if(window.location.pathname === "/commands"){
        startAnimation("shell")
    }else if(window.location.pathname === "/online"){
        startAnimation("online")
    }
})

window.DerokuConstants = /*startConstants*/{
    versions: [
        {
            name: "0.1",
            deprecated: true,
            public: true,
            web: false,
            release: 1554595200000
        },
        {
            name: "0.2",
            deprecated: true,
            public: true,
            web: false,
            release: 1554686077000
        },
        {
            name: "0.3",
            deprecated: true,
            public: true,
            web: false,
            release: 1556056800000
        },
        {
            name: "0.4",
            deprecated: true,
            public: true,
            web: false,
            release: 1556406856000
        },
        {
            name: "0.5",
            deprecated: true,
            public: true,
            web: false,
            release: 1556406856000
        },
        {
            name: "0.6",
            deprecated: false,
            public: true,
            web: false,
            release: 1556406856000
        },
        {
            name: "0.7",
            deprecated: false,
            public: true,
            web: true,
            release: 1588441549286
        }
    ]
}/*endConstants*/

async function startAnimation(type){
    if(type === "shell"){
        document.getElementById("shell").style.visibility = "inherit"
        document.getElementById("shell").style.height = "inherit"
        /** @type {HTMLUListElement} */
        let shellBody = $("body > div:nth-child(4) > div.shell-wrap > ul")[0]
        if(!shellBody)return false
        shellBody.innerHTML = ""
        shellBody.innerHTML = "<li>D:\\code\\DerokuSelfbot&gt; </li>"
        let text = ['n','o','d','e']
        let element = shellBody.children[0]
        shellBody.appendChild(element)
        let spanElement = document.createElement("span")
        spanElement.style.color = "#A50"
        element.appendChild(spanElement)
        let writeInterval = setInterval(() => {
            if(text.length == 0)return callback()
            let toWrite = text.shift()
            spanElement.innerText += toWrite
        }, 100)
        let callback = () => {
            clearInterval(writeInterval)
            let text2 = [' ','i','n','d','e','x']
            writeInterval = setInterval(() => {
                if(text2.length == 0)return callback2()
                let toWrite = text2.shift()
                element.innerHTML += toWrite
            }, 100);
            let callback2 = () => {
                clearInterval(writeInterval)
                let line2 = document.createElement("li")
                shellBody.appendChild(line2)
                line2.innerText = "­"
                writeInterval = setInterval(() => {
                    if(line2.innerText === "­")return line2.innerText = "Lancement du selfbot"
                    if(line2.innerText.endsWith("...")){
                        line2.innerText = "Lancement du selfbot"
                    }else if(line2.innerText.endsWith("..")){
                        line2.innerText = "Lancement du selfbot..."
                    }else if(line2.innerText.endsWith(".")){
                        line2.innerText = "Lancement du selfbot.."
                    }else{
                        line2.innerText = "Lancement du selfbot."
                    }
                }, 250);
                setTimeout(() => {
                    clearInterval(writeInterval)
                    line2.innerText = "Lancement terminé!"
                    let lines = []
                    lines[0] = lines[2] = lines[4] = lines[6] = lines[8] = lines[10] = '<span style="color:#0A0"> ·▄▄▄▄•▄▄▄ .▄▄▄        ▄▄▌ ▐ ▄▌</span>'
                    lines[1] = '<span style="color:#0A0">▪▀·.█▌▀▄.▀·▀▄ █·▪     ██· █▌▐█</span>'
                    lines[3] = '<span style="color:#0A0">▄█▀▀▀•▐▀▀▪▄▐▀▀▄  ▄█▀▄ ██▪▐█▐▐▌</span>'
                    lines[5] = '<span style="color:#0A0">█▌▪▄█▀▐█▄▄▌▐█•█▌▐█▌.▐▌▐█▌██▐█▌</span>'
                    lines[7] = '<span style="color:#0A0">·▀▀▀ • ▀▀▀ .▀  ▀ ▀█▄▀▪ ▀▀▀▀ ▀▪ ▀</span>'
                    lines[9] = ''
                    lines.forEach(l => {
                        let elem = document.createElement("li")
                        elem.innerHTML = l
                        shellBody.appendChild(elem)
                    })
                }, 1746);
            }
        }
    }else if(type === "online"){
        window.process = {
            argv: ["node", "index.js", "--web"],
            version: "14.0.0",
            browser: true,
            nextTick: (function () {
                var canSetImmediate = typeof window !== 'undefined'
                && window.setImmediate;
                var canMutationObserver = typeof window !== 'undefined'
                && window.MutationObserver;
                var canPost = typeof window !== 'undefined'
                && window.postMessage && window.addEventListener
                ;
            
                if (canSetImmediate) {
                    return function (f) { return window.setImmediate(f) };
                }
            
                var queue = [];
            
                if (canMutationObserver) {
                    var hiddenDiv = document.createElement("div");
                    var observer = new MutationObserver(function () {
                        var queueList = queue.slice();
                        queue.length = 0;
                        queueList.forEach(function (fn) {
                            fn();
                        });
                    });
            
                    observer.observe(hiddenDiv, { attributes: true });
            
                    return function nextTick(fn) {
                        if (!queue.length) {
                            hiddenDiv.setAttribute('yes', 'no');
                        }
                        queue.push(fn);
                    };
                }
            
                if (canPost) {
                    window.addEventListener('message', function (ev) {
                        var source = ev.source;
                        if ((source === window || source === null) && ev.data === 'process-tick') {
                            ev.stopPropagation();
                            if (queue.length > 0) {
                                var fn = queue.shift();
                                fn();
                            }
                        }
                    }, true);
            
                    return function nextTick(fn) {
                        queue.push(fn);
                        window.postMessage('process-tick', '*');
                    };
                }
            
                return function nextTick(fn) {
                    setTimeout(fn, 0);
                };
            })(),
            get title(){
                return $("#app-mount > div > p").text()
            },
            set title(title){
                return $("#app-mount > div > p").text(title)
            },
            env: {},
            on: noop,
            addListener: noop,
            once: noop,
            off: noop,
            removeListener: noop,
            removeAllListeners: noop,
            emit: noop,
            binding(){
                throw new Error('process.binding is not supported');
            },
            cwd(){
                return "/root/Deroku"
            },
            chdir(){
                throw new Error('process.chdir is not supported');
            },
            stdout: Object.assign(new EventEmitter(), {
                isTTY: true,
                write(data){
                    return term.write(data)
                }
            }),
            stderr: Object.assign(new EventEmitter(), {
                isTTY: true,
                write(data){
                    return term.write(data)
                }
            }),
            stdin: Object.assign(new window.streamModule.Readable(), {
                setRawMode(isRaw){
                    process.stdin.isRaw = !!isRaw
                },
                isRaw: false,
                isPaused(){
                    return false
                }
            }),
            platform: "web"
        }
        process.title = "Zerow. Selfbot - Initialisation"
        window.derokuDebug = true
        function noop() {}
        window.require = function(id){
            if(!window.require.cache)window.require.cache = {}
            if(window.require.cache[id])return window.require.cache[id]
            let module = (()=>{
                console.debug("REQUIRE", `got id "${id}".`)
                if(id === "fs"){
                    return {
                        nocache: false,
                        exports: {}
                    }
                }else if(id === "buffer"){
                    return {
                        nocache: false,
                        exports: window.buffer
                    }
                }else if(id === "stream"){
                    return {
                        nocache: false,
                        exports: window.streamModule
                    }
                }else if(id === "util"){
                    return {
                        nocache: false,
                        exports: window.util
                    }
                }else if(id === "events"){
                    return {
                        nocache: false,
                        exports: window.EventEmitter
                    }
                }else if(id === "path"){
                    return {
                        nocache: false,
                        exports: window.pathModule
                    }
                }else if(id === "crypto"){
                    return {
                        nocache: true,
                        exports: window.cryptoModule
                    }
                }else if(id === "/root/Deroku/config.js"){
                    return {
                        nocache: false,
                        exports: window.DerokuSelfbot.config
                    }
                }else if(id === "readline"){
                    return {
                        nocache: false,
                        exports: window.readlineModule
                    }
                }else if(id === "os"){
                    return {
                        nocache: false,
                        exports: {
                            platform(){
                                return process.platform
                            },
                            homedir(){
                                return window.pathModule.join(process.cwd(), "..")
                            }
                        }
                    }
                }
                return {
                    nocache: true,
                    exports: {}
                }
            })()
            if(!module.nocache)window.require.cache[id] = module.exports
            return module.exports
        }
        window.__dirname = process.cwd()
        window.__filename = process.cwd()+"/index.js"
        document.querySelector(".shell-wrap").style.visibility = "visible"
        let term = new Terminal({
            theme: {
                background: "#1f1d30",
                foreground: "#c5c2d6",
                black: "#302f3d",
                red: "#e66533",
                blue: "#49ace9",
                brightBlack: "#504e65",
                brightBlue: "#60b6eb",
                brightCyan: "#60dbeb",
                brightGreen: "#60ebb1",
                brightMagenta: "#e798b3",
                brightRed: "#e97749",
                brightWhite: "#c5c2d6",
                brightYellow: "#e69533",
                cursor: "#1f1d30",
                cursorAccent: "#c5c2d6",
                cyan: "#49d6e9",
                green: "#49e9a6",
                magenta: "#df769b",
                white: "#b6b3cc",
                yellow: "#e4b781"
            },
            rendererType: "dom",
            windowsMode: ['Windows', 'Win16', 'Win32', 'WinCE'].includes(navigator.platform),
            cols: Math.floor($("#terminal").width() / 9)
        })
        window.term = term
        window.onresize = () => {
            term.resize(Math.floor($("#terminal").width() / 9), term.rows)
        }
        let fitAddon = new FitAddon.FitAddon()
        term.loadAddon(fitAddon);
        term.open(document.getElementById('terminal'));
        term.write('Bienvenue sur la version WEB du \x1B[32mZerow. Selfbot\x1B[0m\n\r\nVeuillez suivre les instructions au dessus.\n\r')

        term.onKey(e => {
            const ev = e.domEvent;
            oldconsole.log(e)

            let name = (()=>{
                if(ev.code.startsWith("Key"))return ev.key.toLowerCase()
                if(ev.code.startsWith("Arrow"))return ev.key.slice(5).toLowerCase()
                if(ev.code.startsWith("Digit"))return ev.key.toLowerCase()
                if(ev.code === "Escape")return "escape"
                if(ev.code === "Space")return "space"
                if(ev.code === "Enter")return "return"
            })()
            
            const key = {
              sequence: e.key,
              name: name,
              ctrl: ev.ctrlKey,
              meta: ev.metaKey,
              shift: ev.shiftKey
            };           

            process.stdin.emit("keypress", e.key, key)
        })

        let versions = window.DerokuConstants.versions.filter(version => version.public && version.web && !version.deprecated && Date.now() > version.release)
        let version = versions[versions.length - 1]
        let scrpt = document.createElement("script")
        scrpt.src = "/updates/"+version.name+"/index.js"
        scrpt.type = "application/javascript"
        let hashres = await fetch("/updates/hash.txt")
        let hashs = (await hashres.text()).split(/[\n\r]+/g).find(e => e.startsWith(version.name+" ")).split(" ")[3]
        scrpt.integrity = "sha256-"+hashs
        scrpt.id = "DerokuSelfbotImport"
        let crypto = document.createElement("script")
        crypto.src = "/crypto.js"
        window.Buffer = buffer.Buffer

        let util = require("util")

        let oldconsole = window.oldconsole = window.console
        let countMap = new Map()
        let group = ""
        window.console = {
            get memory(){
                return oldconsole.memory
            },
            assert(condition, ...data){
                if(!!condition)return
                window.console.error(...data)
            },
            clear(){
                term.clear()
            },
            count(label){
                let count = countMap.get(label) || 0
                count++
                countMap.set(label, count)
                window.console.log(`${String(typeof label === "undefined" ? "default" : label)}: ${count}`)
            },
            debug(){
                return window.console.log(...arguments)
            },
            dir(){
                return window.console.log(...arguments)
            },
            dirxml(){
                return window.console.log(...arguments)
            },
            error(...args){
                process.stderr.write(util.format(...args).split(/[\n]/g).map(e => group + e).join("\n\r")+"\n\r")
            },
            exception(){
                return window.console.error(...arguments)
            },
            group(){
                group = new Array(group.length + 4).join(" ")
            },
            groupCollapsed(){
                return window.console.group()
            },
            groupEnd(){
                if(group.length === 0)return
                group = new Array(group.length - 4).join(" ")
            },
            info(){
                return window.console.log(...arguments)
            },
            log(...args){
                process.stdout.write(util.format(...args).split(/[\n]/g).map(e => group + e).join("\n\r")+"\n\r")
            },
            profile(reportName){},
            profileEnd(reportName){},
            table(...tabularData){},
            time(label){},
            timeEnd(label){},
            timeStamp(label){},
            timeline(label){},
            timelineEnd(label){},
            trace(){
                return window.console.log(...arguments)
            },
            warn(message, ...optionalParams){
                window.console.error(...arguments)
            }
        }
        scrpt.onload = () => {
            console.debug("Loader", `Loaded Zerow. Selfbot version V2.`)
        }
        crypto.onload = () => {
            document.head.appendChild(scrpt)
        }
        document.head.appendChild(crypto)
    }
}

function setTheme(theme){
    if(!["dark", "light"].includes(theme))theme = "dark"
    if(theme === "dark"){
        let body = document.body
        body.classList.remove("theme-light")
        body.classList.add("theme-dark")
    }else{
        let body = document.body
        body.classList.remove("theme-dark")
        body.classList.add("theme-light")
    }
    localStorage.setItem("theme", theme)
    document.querySelector(window.selectors.ThemeButton).innerHTML = `<img src="${({dark: "https://discordapp.com/assets/522c8314225487737f7dd4ead8d4a731.svg", light: "https://discordapp.com/assets/5828a9abe4bd7a7dfbd221d64133aa43.svg"})[theme]}" width="30" height="30" alt="" style="margin-right: 10px;" draggable="false">`
}

function setOppositeTheme(){
    let theme = localStorage.getItem("theme")
    setTheme(({dark: "light", light: "dark"})[theme] || "dark")
}