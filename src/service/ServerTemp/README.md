Temp solution for server

## getWords

```
import { ServerTemp } from 'Service/ServerTemp';

const serverTemp = new ServerTemp;

serverTemp.getWords(options)
  .then(
    (wordsArray) => {...},
    (rejectReport) => {...обработка ошибки}
  )
```

### options
```
{
  group,
  page,
  wordsPerExampleSentenceLTE,
  wordsPerPage
}
```
- group:number - номер группы от 0 до 5
- page:number  - номер страницы от 0 до 29 
- wordsPerExampleSentenceLTE: - **doesn't work**
- wordsPerPage: **doesn't work**

default options {page: 0, group: 0}

### rejectReport
```
{
  status: status from server,
  message: error message from server
}
```

status 400 - 'Bad Request'

WARN: for bad page/group range, `getWords` returned an empty array and status 200 'Ok'!
