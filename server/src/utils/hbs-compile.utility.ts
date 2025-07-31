import { promises } from 'fs';
import { compile } from 'handlebars';
import { join } from 'path';

export async function hbsCompiler(
  fileName: string,
  directory: string,
  context: unknown
): Promise<string> {
  const content = await promises.readFile(join(process.cwd(), 'src', directory, fileName), 'utf8');
  const template = compile(content);
  return template(context);
}
