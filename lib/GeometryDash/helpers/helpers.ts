import * as fs from 'fs';

const typeMap: Record<string, string> = {
    'String': 'string',
    'Integer': 'number',
    'Bool': 'boolean',
    'Boolean': 'boolean',
}

function generateType(tsv: string, name: string) {
    const list: { key: string, name: string, Type: string, comment: string }[] = []
    tsv.split('\n').slice(1).forEach(line => {
        const columns = line.trim().split(/.\t/);
        if (columns.length >= 4) {
            const key = columns[0]!;
            const name = columns[1]!.toLowerCase().replace(/\/|\s/g, '');
            const type = typeMap[columns[2]!] || 'unidentified';
            const comment = columns[3]!
            list.push({ key, name, Type: type, comment })
            // str += `\t${name}:\t\t[${key}, ${type}]\t\t\t//${comment}\n`
        }
    });
    const max_name_length = Math.max(...list.map(item => item.name.length)) + 1
    const max_type_length = Math.max(...list.map(item => item.Type.length)) + 1
    const max_key_length = Math.max(...list.map(item => item.key.length)) + 1

    const typeStr = `export type ${name} = {\n` + list.map(
        item =>   `  ${item.name.padEnd(max_name_length, ' ')}: `
                + `${item.Type}`.padEnd(max_type_length, ' ')
                + `// ${item.comment}`).join('\n')
              + '\n}\n'

    const mapStr = `export const ${name}_Map = {\n` + list.map(
        item =>   `  ${item.key.padStart(max_key_length, ' ')}: `
                + `"${item.name}",`).join('\n')
              + '\n}\n'
    
    return typeStr + mapStr
}

// For every file under  lib/GeometryDash/helpers/source/Server/
// Generate the type and map for each file
// Save the type and map to a file under lib/GeometryDash/helpers/generated/Server/

const files = fs.readdirSync('lib/GeometryDash/helpers/source/Server/')
files.forEach(file => {
    const tsv = fs.readFileSync(`lib/GeometryDash/helpers/source/Server/${file}`, 'utf8')
    const name = file.split('.')[0]!
    const str = generateType(tsv, name)
    if (!fs.existsSync('lib/GeometryDash/helpers/generated/Server/')) {
        fs.mkdirSync('lib/GeometryDash/helpers/generated/Server/', { recursive: true })
    }
    fs.writeFileSync(`lib/GeometryDash/helpers/generated/Server/${name}.ts`, str)
})


