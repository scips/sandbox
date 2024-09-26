# parse-json

Just a command line utility to parse json

## Usage

Pipe json via stdin.
Pass as many args as you want.
The args represents keys in dot format to access the basic type you are looking for.

### Example

    cat sample.json | ./parse-json.js program.id title images.illustration.title start_date

    curls -s "https://somejson.somewhere/test.json" | ./parse-json.js program.id

