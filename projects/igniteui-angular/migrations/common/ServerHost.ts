import ts = require('typescript/lib/tsserverlibrary');

export class ServerHost implements ts.server.ServerHost {
    readonly args: string[];
    readonly newLine: string;
    readonly useCaseSensitiveFileNames: boolean;

    constructor() {
        this.args = ts.sys.args;
        this.newLine = ts.sys.newLine;
        this.useCaseSensitiveFileNames = ts.sys.useCaseSensitiveFileNames;
    }

    public write(data: string): void {
        ts.sys.write(data);
    }

    public writeOutputIsTTY(): boolean {
        return ts.sys.writeOutputIsTTY();
    }

    public readFile(path: string, encoding?: string): string | undefined {
        if (!this.fileExists(path)) { return; }
        return ts.sys.readFile(path, encoding);
    }

    public getFileSize(path: string): number {
        return ts.sys.getFileSize(path);
    }

    public writeFile(path: string, data: string, writeByteOrderMark?: boolean): void {
        return ts.sys.writeFile(path, data, writeByteOrderMark);
    }

    public watchFile(path: string, callback: ts.FileWatcherCallback, pollingInterval?: number):
        ts.FileWatcher {
        return ts.sys.watchFile(path, callback, pollingInterval);
    }

    public watchDirectory(path: string, callback: ts.DirectoryWatcherCallback, recursive?: boolean):
        ts.FileWatcher {
        return ts.sys.watchDirectory(path, callback, recursive);
    }

    public resolvePath(path: string): string {
        return ts.sys.resolvePath(path);
    }

    public fileExists(path: string): boolean {
        return ts.sys.fileExists(path);
    }

    public directoryExists(path: string): boolean {
        return ts.sys.directoryExists(path);
    }

    public createDirectory(path: string): void {
        return ts.sys.createDirectory(path);
    }

    public getExecutingFilePath(): string {
        return ts.sys.getExecutingFilePath();
    }

    public getCurrentDirectory(): string {
        return ts.sys.getCurrentDirectory();
    }

    public getDirectories(path: string): string[] {
        return ts.sys.getDirectories(path);
    }

    public readDirectory(
        path: string, extensions?: ReadonlyArray<string>, exclude?: ReadonlyArray<string>,
        include?: ReadonlyArray<string>, depth?: number): string[] {
        return ts.sys.readDirectory(path, extensions, exclude, include, depth);
    }

    public getModifiedTime(path: string): Date | undefined {
        return ts.sys.getModifiedTime(path);
    }

    public setModifiedTime(path: string, time: Date): void {
        return ts.sys.setModifiedTime(path, time);
    }

    public deleteFile(path: string): void {
        return ts.sys.deleteFile(path);
    }

    public createHash(data: string): string {
        return ts.sys.createHash(data);
    }

    public createSHA256Hash(data: string): string {
        return ts.sys.createSHA256Hash(data);
    }

    public getMemoryUsage(): number {
        return ts.sys.getMemoryUsage();
    }

    public exit(exitCode?: number): void {
        return ts.sys.exit(exitCode);
    }

    public realpath(path: string): string {
        return ts.sys.realpath(path);
    }

    public setTimeout(callback: (...args: any[]) => void, ms: number, ...args: any[]): any {
        return ts.sys.setTimeout(callback, ms, ...args);
    }

    public clearTimeout(timeoutId: any): void {
        return ts.sys.clearTimeout(timeoutId);
    }

    public clearScreen(): void {
        return ts.sys.clearScreen();
    }

    public base64decode(input: string): string {
        return ts.sys.base64decode(input);
    }

    public base64encode(input: string): string {
        return ts.sys.base64encode(input);
    }

    public setImmediate(callback: (...args: any[]) => void, ...args: any[]): any {
        return setImmediate(callback, ...args);
    }

    public clearImmediate(timeoutId: any): void {
        return clearImmediate(timeoutId);
    }

    public require(initialPath: string, moduleName: string) {
        try {
            const modulePath = require.resolve(moduleName, {
                paths: [initialPath],
            });
            return {
                module: require(modulePath),
                error: undefined,
            };
        } catch (e) {
            return {
                module: undefined,
                error: e as Error,
            };
        }
    }
}
