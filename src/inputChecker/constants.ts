export const RG_SQL1 = /(\s*([\0\b\'\"\n\r\t\%\_\\]*\s*(((select\s*.+\s*from\s*.+)|(insert\s*.+\s*into\s*.+)|(update\s*.+\s*set\s*.+)|(delete\s*.+\s*from\s*.+)|(drop\s*.+)|(truncate\s*.+)|(alter\s*.+)|(exec\s*.+)|(\s*(all|any|not|and|between|in|like|or|some|contains|containsall|containskey)\s*.+[\=\>\<=\!\~]+.+)|(let\s+.+[\=]\s*.*)|(begin\s*.*\s*end)|(\s*[\/\*]+\s*.*\s*[\*\/]+)|(\s*(\-\-)\s*.*\s+)|(\s*(contains|containsall|containskey)\s+.*)))(\s*[\;]\s*)*)+)/i;
export const RG_SQL2 = /(?:^\s*[;>"\s]*(?:union|select|create|rename|truncate|load|alter|delete|update|insert|desc))|(?:(?:select|create|rename|truncate|load|alter|delete|update|insert|desc)\s+(?:concat|char|load_file)\s?\()|(?:end\s*\);)|("\s+regexp\W)/i;
export const RG_SQL3 = /(?:^admin\s*"|(\/\*)+"+\s?(?:--|#|\/\*|{)?)|(?:"\s*or[\w\s-]+\s*[+<>=(),\s*[\d"])/i;
export const RG_SQL4 = /(?:union\s*(?:all|distinct)?\s*[([]\s*select)|(?:like\s*"\%)|(?:"\s*like\W*["\d])|(?:"\s*(?:n?and|x?or|not|\|\||\&\&)\s+[\s\w]+=\s*\w+\s*having)|(?:"\s*\*\s*\w+\W+")|(?:"\s*[^?\w\s=.,;\/)(]+\s*[(@]*\s*\w+\W+\w)|(?:select\s*[\[\]()\s\w\.,-]+from)/i;
export const RG_SQL5 = /(?:(?:n?and|x?or|not\|\||\&\&)\s+[\s\w+]+(?:regexp\s*\(|sounds\s+like\s*|[=\d]+x))|("\s*\d\s*(?:--|#))|(?:"[%&<>^=]+\d\s*(=|or))|(?:"\W+[\w+-]+\s*=\s*\d\W+")|(?:"\s*is\s*\d.+"?\w)|(?:"\|?[\w-]{3,}[^\w\s.]+")|(?:"\s*is\s*[\d.]+\s*\W.*")/i;

export const RG_XSS1 = /(\b)(on\S+)(\s*)=|javascript|<(|\/|[^\/>][^>]+|\/[^>][^>]+)>/ig;
export const RG_XSS2 = /<([A-Za-z_{}()/]+(\s|=)*)+>(.*<[A-Za-z/>]+)*/ig;
export const RG_XSS3 = /<script.*?>.*?<\/script>/igm;
export const RG_XSS4 = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>|javascript:|on\w+=|&#|%3C|%3E|%20|%22|%27/ig;