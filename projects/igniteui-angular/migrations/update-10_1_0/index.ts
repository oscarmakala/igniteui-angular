import {
    Rule,
    SchematicContext,
    Tree
} from '@angular-devkit/schematics';
import { UpdateChanges } from '../common/UpdateChanges';
import { getIdentifierPositions, toPath } from '../common/tsUtils';
import ts = require('typescript/lib/tsserverlibrary');

function noop() { }
const version = '10.1.0';

export default function (): Rule {
    return (host: Tree, context: SchematicContext) => {
        context.logger.info(`Applying migration for Ignite UI for Angular to version ${version}`);
        const update = new UpdateChanges(__dirname, host, context);
        const ngService = update.ngService;
        update.applyChanges();
        // replace DropPosition.None with DropPosition.AfterDropTarget
        for (const entryPath of update.tsFiles) {
            let content = host.read(entryPath).toString();
            if (content.indexOf('DropPosition.None') !== -1) {
                const pos = getIdentifierPositions(content, 'DropPosition');
                for (let i = pos.length; i--;) {
                    const end = pos[i].end + 5;
                    const isMatch = content.slice(pos[i].start, end) === 'DropPosition.None';
                    if (isMatch) {
                        content = content.slice(0, pos[i].start) + 'DropPosition.AfterDropTarget' + content.slice(end);
                    }
                }
                host.overwrite(entryPath, content);
            }

            const langServ = update.getDefaultLanguageService(entryPath);
            const path = toPath(update.projectService.currentDirectory + entryPath);
            const regex = new RegExp(/selectedRows\(\)/, 'g');
            let match;
            while ((match = regex.exec(content)) !== null) {
                const quickInfo = langServ.getQuickInfoAtPosition(path, match.index);
                const a = '5';
            }
        }

        for (const entryPath of update.templateFiles) {
            const content = host.read(entryPath).toString();
            const langServ = update.getDefaultLanguageService(entryPath);
            const path = toPath(update.currentDirectory + entryPath);
            const regex = new RegExp(/selectedRows\(\)/, 'g');
            let match;
            while ((match = regex.exec(content)) !== null) {
                const quickInfo = langServ.getQuickInfoAtPosition(path, match.index);
                const a = '5';
            }
        }
    };
}

