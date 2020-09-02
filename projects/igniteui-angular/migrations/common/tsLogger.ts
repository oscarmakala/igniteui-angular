import fs = require('fs');
import path = require('path');
import ts = require('typescript/lib/tsserverlibrary');

function noop() { }

function nowString() {
    // E.g. "12:34:56.789"
    const d = new Date();
    return `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}.${d.getMilliseconds()}`;
}

export class Logger implements ts.server.Logger {
    private fd = -1;
    private seq = 0;
    private inGroup = false;
    private firstInGroup = true;

    constructor(
        private readonly traceToConsole: boolean,
        private readonly level: ts.server.LogLevel,
        private readonly logFilename?: string,
    ) {
        if (logFilename) {
            try {
                const dir = path.dirname(logFilename);
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir);
                }
                this.fd = fs.openSync(logFilename, 'w');
            } catch {
                // swallow the error and keep logging disabled if file cannot be opened
            }
        }
    }

    static padStringRight(str: string, padding: string) {
        return (str + padding).slice(0, padding.length);
    }

    close() {
        if (this.fd >= 0) {
            fs.close(this.fd, noop);
        }
    }

    getLogFileName() {
        return this.logFilename;
    }

    perftrc(s: string) {
        this.msg(s, ts.server.Msg.Perf);
    }

    info(s: string) {
        this.msg(s, ts.server.Msg.Info);
    }

    err(s: string) {
        this.msg(s, ts.server.Msg.Err);
    }

    startGroup() {
        this.inGroup = true;
        this.firstInGroup = true;
    }

    endGroup() {
        this.inGroup = false;
    }

    loggingEnabled() {
        return !!this.logFilename || this.traceToConsole;
    }

    hasLevel(level: ts.server.LogLevel) {
        return this.loggingEnabled() && this.level >= level;
    }

    msg(s: string, type: ts.server.Msg = ts.server.Msg.Err) {
        if (!this.canWrite) { return; }

        s = `[${nowString()}] ${s}\n`;
        if (!this.inGroup || this.firstInGroup) {
            const prefix = Logger.padStringRight(type + ' ' + this.seq.toString(), '          ');
            s = prefix + s;
        }
        this.write(s);
        if (!this.inGroup) {
            this.seq++;
        }
    }

    private get canWrite() {
        return this.fd >= 0 || this.traceToConsole;
    }

    private write(s: string) {
        if (this.fd >= 0) {
            const buf = Buffer.from(s);
            fs.writeSync(this.fd, buf, 0, buf.length, /*position*/ null);
        }
        if (this.traceToConsole) {
            console.warn(s);
        }
    }
}
